# AI Content Assistant

A production-ready AI SaaS application for intelligent content generation, powered by Groq (llama-3.3-70b-versatile) and built with React 19 + FastAPI.

---

## Quick Start

### Prerequisites
| Tool    | Minimum version |
|---------|-----------------|
| Python  | 3.10+           |
| Node.js | 18+             |
| Git     | any             |

---

### 1 — Clone

```bash
git clone <your-repo-url>
cd AI-Content-Assistant
```

---

### 2 — Backend setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (macOS / Linux)
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env from the example
copy .env.example .env        # Windows
# cp .env.example .env        # macOS / Linux

# Edit .env and add your Groq API key
# GROQ_API_KEY=gsk_...
```

**Start the backend:**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend runs at **http://localhost:8000**

| Endpoint      | Method | Description                  |
|---------------|--------|------------------------------|
| `/`           | GET    | Health root                  |
| `/health`     | GET    | `{ "status": "healthy" }`    |
| `/api/chat`   | POST   | Send message, get AI reply   |
| `/docs`       | GET    | Swagger UI                   |

---

### 3 — Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env from the example
copy .env.example .env        # Windows
# cp .env.example .env        # macOS / Linux

# The default value works for local development:
# VITE_API_URL=http://localhost:8000
```

**Start the frontend:**
```bash
npm run dev
```

Frontend runs at **http://localhost:5173** (or 5174 if 5173 is occupied)

---

### 4 — Verify everything works

1. Open **http://localhost:5173** (or 5174) in your browser
2. You should see the AI Content Assistant chat UI
3. Type a message — e.g. *"Write a LinkedIn post about AI"*
4. The backend processes it through Groq and returns a real AI response

---

## Environment Variables

### Backend (`backend/.env`)

| Variable           | Required | Default                    | Description                  |
|--------------------|----------|----------------------------|------------------------------|
| `GROQ_API_KEY`     | **Yes**  | —                          | Groq API key                 |
| `HOST`             | No       | `0.0.0.0`                  | Uvicorn bind address         |
| `PORT`             | No       | `8000`                     | Uvicorn port                 |
| `GROQ_MODEL`       | No       | `llama-3.3-70b-versatile`  | Groq model identifier        |
| `GROQ_MAX_TOKENS`  | No       | `1024`                     | Max tokens per response      |
| `GROQ_TEMPERATURE` | No       | `0.7`                      | Response temperature (0–1)   |

Get a free Groq API key at **https://console.groq.com/keys**

### Frontend (`frontend/.env`)

| Variable       | Required | Default                  | Description              |
|----------------|----------|--------------------------|--------------------------|
| `VITE_API_URL` | No       | `http://localhost:8000`  | FastAPI backend base URL |

---

## Architecture

```
AI-Content-Assistant/
├── frontend/                     # React 19 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/           # Navbar, Sidebar, ChatWindow, Message, etc.
│   │   ├── context/              # ChatContext — global state + sendMessage()
│   │   ├── services/
│   │   │   ├── api.js            # Axios instance + interceptors
│   │   │   └── chatService.js    # POST /api/chat — only file knowing the endpoint
│   │   ├── utils/
│   │   │   └── helpers.js        # generateUUID, formatTimestamp, validateMessage
│   │   ├── data/
│   │   │   └── mockChats.js      # Sidebar + prompt card data
│   │   ├── pages/
│   │   │   └── Home.jsx          # App shell layout
│   │   └── App.jsx
│   ├── .env.example
│   └── vite.config.js            # Dev proxy: /api/* → localhost:8000
│
└── backend/                      # FastAPI + Uvicorn + Groq
    ├── app/
    │   ├── routes/
    │   │   ├── chat.py           # POST /api/chat  (thin — no logic)
    │   │   └── health.py         # GET  /health
    │   ├── services/
    │   │   ├── chat_service.py   # Business logic layer
    │   │   └── llm_service.py    # ← ONLY file that knows about Groq
    │   ├── models/
    │   │   └── chat_models.py    # Pydantic ChatRequest / ChatResponse
    │   ├── utils/
    │   │   ├── exception_handlers.py
    │   │   └── logging_config.py
    │   ├── config.py             # All settings via pydantic-settings
    │   └── main.py               # App factory
    ├── .env.example
    └── requirements.txt
```

---

## Network Flow

```
Browser (React)
    │
    │  POST /api/chat  { message: "..." }
    ▼
Vite dev proxy (localhost:5173 or 5174)
    │
    │  forwards to localhost:8000
    ▼
FastAPI (Uvicorn)
    │
    ├─ chat.py route  ──► ChatService.generate_response()
    │                          │
    │                          └──► LLMService.complete()
    │                                    │
    │                                    └──► Groq API (llama-3.3-70b-versatile)
    │
    │  { response: "...", timestamp: "...", model: "..." }
    ▼
React (ChatContext.sendMessage)
    │
    └──► Renders AI message bubble in ChatWindow
```

---

## Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import the repository on [Vercel](https://vercel.com/), set **Root Directory** to `frontend/`
3. Add environment variable: `VITE_API_URL=https://your-app.onrender.com`
4. Deploy

### Backend → Render
1. Import the repository on [Render](https://render.com/), set **Root Directory** to `backend/`
2. `render.yaml` configures the build and start commands automatically
3. Add secret: `GROQ_API_KEY=gsk_...`
4. Add: `CORS_ORIGINS=["https://your-app.vercel.app"]`
5. Deploy

---

## Tech Stack

| Layer      | Technology                                       |
|------------|--------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS, Axios, React Icons |
| Backend    | Python 3.10+, FastAPI, Uvicorn, pydantic-settings|
| AI         | Groq API — llama-3.3-70b-versatile               |
| Deployment | Vercel (frontend) · Render (backend)             |

---

## Roadmap

| Phase | Status | Description                                    |
|-------|--------|------------------------------------------------|
| 1     | ✅     | Project structure scaffold                     |
| 2     | ✅     | Dev environment (React + FastAPI running)      |
| 3     | ✅     | ChatGPT-style UI                               |
| 4     | ✅     | Frontend ↔ Backend integration (mock)          |
| 5     | ✅     | Groq AI integration                            |
| 5.5   | ✅     | Debugging & stabilisation                      |
| 6     | 🔜     | Chat history & conversation management         |
| 7     | 🔜     | Authentication                                 |
| 8     | 🔜     | Deployment hardening                           |

---

## License

MIT — see [LICENSE](./LICENSE)
