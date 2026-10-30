"""
retrieval.py – BM25-based FAQ retrieval engine for the College AI Assistant.
"""

import json
import math
import re
from datetime import date
from pathlib import Path
from typing import Optional

from rank_bm25 import BM25Okapi

# ── Paths ──────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).parent.parent
KB_DIR = BASE_DIR / "knowledge_base"
FAQ_PATH = KB_DIR / "faq_data.json"
SOURCES_PATH = KB_DIR / "source_inventory.json"

# ── Retrieval Config ───────────────────────────────────────────────────────
TOP_K = 3
MIN_BM25_SCORE = 0.5         # below this → fallback answer
CLARIFICATION_SCORE = 0.3   # between this and MIN → ask for clarification

# ── Load Data ──────────────────────────────────────────────────────────────

def _load_approved_sources() -> dict:
    """Return mapping of source_id → source record for non-expired, approved sources."""
    data = json.loads(SOURCES_PATH.read_text(encoding="utf-8"))
    approved = {}
    today = date.today()
    for src in data["sources"]:
        if src["approval_status"] != "approved":
            continue
        expiry = date.fromisoformat(src["expiry_date"])
        if expiry < today:
            continue  # skip expired sources
        approved[src["source_id"]] = src
    return approved


def _load_faqs(approved_sources: dict) -> list[dict]:
    """Return FAQs that reference only approved, non-expired sources."""
    data = json.loads(FAQ_PATH.read_text(encoding="utf-8"))
    return [faq for faq in data["faqs"] if faq["source_id"] in approved_sources]


def _tokenize(text: str) -> list[str]:
    """Lowercase and split on non-alphanumeric characters."""
    return re.findall(r"[a-z0-9]+", text.lower())


class FAQRetriever:
    """BM25-based retrieval engine over the college FAQ knowledge base."""

    def __init__(self):
        self.sources = _load_approved_sources()
        self.faqs = _load_faqs(self.sources)
        self._build_index()

    def _build_index(self):
        """Build the BM25 index from FAQ questions + keywords."""
        corpus_texts = []
        for faq in self.faqs:
            combined = (
                faq["question"] + " " +
                " ".join(faq.get("keywords", [])) + " " +
                faq.get("answer", "")[:200]
            )
            corpus_texts.append(_tokenize(combined))
        self.bm25 = BM25Okapi(corpus_texts)
        self.corpus_texts = corpus_texts

    def search(self, query: str) -> dict:
        """
        Search the knowledge base for the given query.

        Returns a dict with:
          - status: "answered" | "clarification_needed" | "not_found"
          - results: list of top-k FAQs with scores
          - top_answer: the single best FAQ (if answered)
          - sources: source records for the top results
        """
        query_tokens = _tokenize(query)
        if not query_tokens:
            return {"status": "not_found", "results": [], "top_answer": None}

        scores = self.bm25.get_scores(query_tokens)
        ranked = sorted(
            enumerate(scores), key=lambda x: x[1], reverse=True
        )[:TOP_K]

        top_results = []
        for idx, score in ranked:
            if score < 0.01:
                continue
            faq = self.faqs[idx]
            top_results.append({
                "score": round(float(score), 4),
                "faq": faq,
                "source": self.sources.get(faq["source_id"]),
            })

        if not top_results:
            return {"status": "not_found", "results": [], "top_answer": None}

        best_score = top_results[0]["score"]

        if best_score >= MIN_BM25_SCORE:
            return {
                "status": "answered",
                "results": top_results,
                "top_answer": top_results[0],
            }
        elif best_score >= CLARIFICATION_SCORE:
            return {
                "status": "clarification_needed",
                "results": top_results,
                "top_answer": None,
            }
        else:
            return {
                "status": "not_found",
                "results": top_results,
                "top_answer": None,
            }

    def get_all_categories(self) -> list[str]:
        """Return unique categories from the knowledge base."""
        return sorted(set(faq["category"] for faq in self.faqs))

    def get_faqs_by_category(self, category: str) -> list[dict]:
        """Return all FAQs for a given category."""
        return [f for f in self.faqs if f["category"].lower() == category.lower()]

    def get_suggested_questions(self, n: int = 4) -> list[str]:
        """Return a diverse sample of suggested questions."""
        sample_ids = ["ADM001", "CRS001", "FEE001", "SCH001",
                      "LIB001", "CAM001", "PLC001", "EXM002"]
        out = []
        for faq in self.faqs:
            if faq["id"] in sample_ids:
                out.append(faq["question"])
            if len(out) >= n:
                break
        return out
