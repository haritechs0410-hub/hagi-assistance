# Greenfield College AI FAQ Assistant

> An AI-powered, retrieval-first FAQ assistant for college students — built with React + Vite (frontend) and Python FastAPI + BM25 (backend).

---

## ✨ Features

- **Retrieval-first architecture** — BM25 keyword search over a verified knowledge base
- **Source citations** — every answer includes official document title, department, and link
- **Safe fallback** — honest "I don't know" when information is missing
- **Prompt injection guard** — blocks jailbreak and system prompt attacks
- **Privacy compliant** — no conversation storage, no personal data collection
- **8 FAQ categories** — Admissions, Courses, Fees, Scholarships, Library, Campus, Exams, Placements
- **Premium UI** — dark glassmorphism hero, animated cards, typing indicator, responsive design

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- pip

### 1. Clone & Setup

```bash
git clone <repo-url>
cd "hagi assistance"
```

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # edit if needed
python main.py
# → API running at http://localhost:8000
# → Docs at http://localhost:8000/api/docs
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# → UI running at http://localhost:5173
```

### 4. Run Tests

```bash
cd tests
pip install pytest pytest-asyncio httpx
pytest test_backend.py -v
```

---

## 📁 Project Structure

```
hagi assistance/
├── frontend/          React + Vite UI
│   ├── src/
│   │   ├── api/           API service layer
│   │   ├── components/    Navbar, Footer, ChatWindow
│   │   ├── hooks/         useChat custom hook
│   │   └── pages/         HomePage, ChatPage, PrivacyPage
│   └── vite.config.js
│
├── backend/           Python FastAPI
│   ├── main.py            FastAPI app, routes, security
│   ├── retrieval.py       BM25 retrieval engine
│   └── requirements.txt
│
├── knowledge_base/    Verified FAQ data
│   ├── faq_data.json      30+ Q&A entries across 8 categories
│   └── source_inventory.json  9 approved sources with metadata
│
├── tests/
│   └── test_backend.py    40+ automated tests
│
└── docs/
    ├── ARCHITECTURE.md
    ├── PRIVACY_GUIDE.md
    └── MAINTENANCE.md
```

---

## 🔒 Security

- Input validated and HTML-escaped (max 500 chars)
- Regex-based prompt injection detection
- API keys in server `.env` only — never in frontend code
- CORS restricted to `localhost:5173` by default
- Retrieved documents treated as untrusted content

---

## ⚠️ Demonstration Notice

The knowledge base contains **sample demonstration data** for Greenfield College.  
All fees, statistics, and contacts are fictional placeholders.  
**Replace `knowledge_base/faq_data.json` and `source_inventory.json` with official verified documents before production use.**

---

## 📄 License

For educational and demonstration purposes only.
