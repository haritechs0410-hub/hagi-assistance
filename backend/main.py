"""
main.py – FastAPI backend for the College AI FAQ Assistant.
"""

import os
import re
import html
from datetime import datetime
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator

from retrieval import FAQRetriever

# ── Load environment ───────────────────────────────────────────────────────
load_dotenv(Path(__file__).parent / ".env")

ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
]

# ── Fallback message ───────────────────────────────────────────────────────
FALLBACK_MESSAGE = (
    "I'm sorry, but I couldn't find sufficient verified information about "
    "this question in the college FAQ knowledge base. I don't want to give "
    "you incorrect information. Please contact the relevant college department "
    "for confirmation or visit the official college website."
)

CLARIFICATION_PREFIX = (
    "Your question could match several topics. Could you please clarify what "
    "you're looking for? For example, are you asking about: "
)

# ── Prompt injection guard ─────────────────────────────────────────────────
INJECTION_PATTERNS = [
    r"ignore.{0,30}(previous|above|prior|all).{0,30}(instruction|prompt|context)",
    r"you are now",
    r"act as",
    r"disregard",
    r"system prompt",
    r"jailbreak",
    r"roleplay as",
    r"pretend.{0,20}you",
    r"forget.{0,30}instruction",
]
INJECTION_RE = re.compile("|".join(INJECTION_PATTERNS), re.IGNORECASE)

MAX_QUERY_LENGTH = 500

# ── App ────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="College FAQ AI Assistant API",
    description="Retrieval-first FAQ API for Greenfield College",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# ── Init retriever ─────────────────────────────────────────────────────────
retriever = FAQRetriever()


# ── Pydantic models ────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    query: str

    @field_validator("query")
    @classmethod
    def validate_query(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Query cannot be empty.")
        if len(v) > MAX_QUERY_LENGTH:
            raise ValueError(
                f"Query too long. Maximum {MAX_QUERY_LENGTH} characters allowed."
            )
        # Sanitize HTML entities to prevent injection through rendered content
        v = html.escape(v)
        return v


class SourceResponse(BaseModel):
    source_id: str
    title: str
    department: str
    official_url: str
    last_verified_date: str
    is_demo: bool


class FAQResult(BaseModel):
    faq_id: str
    category: str
    question: str
    answer: str
    confidence: float
    source: Optional[SourceResponse]


class ChatResponse(BaseModel):
    status: str          # "answered" | "clarification_needed" | "not_found" | "error"
    answer: Optional[str]
    results: list[FAQResult]
    clarification_options: list[str]
    timestamp: str


# ── Helpers ────────────────────────────────────────────────────────────────

def _check_injection(query: str) -> bool:
    """Return True if the query appears to be a prompt injection attempt."""
    return bool(INJECTION_RE.search(query))


def _build_source_response(src: Optional[dict]) -> Optional[SourceResponse]:
    if not src:
        return None
    return SourceResponse(
        source_id=src["source_id"],
        title=src["title"],
        department=src["department"],
        official_url=src["official_url"],
        last_verified_date=src["last_verified_date"],
        is_demo="DEMONSTRATION DATA" in src.get("notes", ""),
    )


def _build_faq_result(item: dict) -> FAQResult:
    faq = item["faq"]
    return FAQResult(
        faq_id=faq["id"],
        category=faq["category"],
        question=faq["question"],
        answer=faq["answer"],
        confidence=item["score"],
        source=_build_source_response(item.get("source")),
    )


# ── Routes ─────────────────────────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "service": "College FAQ AI Assistant",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/api/categories")
async def get_categories():
    """Return all FAQ categories available."""
    return {"categories": retriever.get_all_categories()}


@app.get("/api/suggestions")
async def get_suggestions():
    """Return suggested questions for display in the chat UI."""
    return {"suggestions": retriever.get_suggested_questions(n=6)}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint. Retrieves answers using BM25 search."""
    timestamp = datetime.utcnow().isoformat()
    query = request.query  # already validated and HTML-escaped

    # Prompt injection guard
    if _check_injection(query):
        return ChatResponse(
            status="error",
            answer=(
                "I can only answer questions about college information. "
                "I cannot process this type of request."
            ),
            results=[],
            clarification_options=[],
            timestamp=timestamp,
        )

    try:
        search_result = retriever.search(query)
    except Exception as e:
        return ChatResponse(
            status="error",
            answer="An internal error occurred. Please try again later.",
            results=[],
            clarification_options=[],
            timestamp=timestamp,
        )

    results = [_build_faq_result(r) for r in search_result.get("results", [])]
    status = search_result["status"]

    if status == "answered":
        top = search_result["top_answer"]
        answer = top["faq"]["answer"]
        return ChatResponse(
            status="answered",
            answer=answer,
            results=results[:TOP_K_RESPONSE],
            clarification_options=[],
            timestamp=timestamp,
        )

    elif status == "clarification_needed":
        options = [r["faq"]["question"] for r in search_result["results"][:3]]
        clarification = (
            CLARIFICATION_PREFIX +
            "; ".join(f'"{q}"' for q in options) + "?"
        )
        return ChatResponse(
            status="clarification_needed",
            answer=clarification,
            results=results,
            clarification_options=options,
            timestamp=timestamp,
        )

    else:
        return ChatResponse(
            status="not_found",
            answer=FALLBACK_MESSAGE,
            results=[],
            clarification_options=[],
            timestamp=timestamp,
        )


# ── Config constant ────────────────────────────────────────────────────────
TOP_K_RESPONSE = 3


# ── Global error handler ───────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected server error occurred."},
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True,
    )
