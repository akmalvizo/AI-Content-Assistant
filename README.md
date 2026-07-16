<div align="center">

![AI Content Assistant Banner](docs/assets/banner.png)

# AI Content Assistant

**Your All-in-One AI Writing Partner**

A production-ready AI SaaS application for intelligent content generation, powered by **Groq (llama-3.3-70b-versatile)** and built with **React 19 + FastAPI**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-6366f1?style=for-the-badge&logo=vercel)](https://ai-content-assistant-akmal.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Groq](https://img.shields.io/badge/Groq-LLM%20API-F55036?style=flat-square)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

**🔗 Try it live: [ai-content-assistant-akmal.vercel.app](https://ai-content-assistant-akmal.vercel.app/)**

</div>

---

## ✨ Overview

From blog posts to LinkedIn updates, **AI Content Assistant** helps you write smarter, not harder. It offers 15+ content modes, AI-powered suggestions, and professional templates — all wrapped in a clean, ChatGPT-style interface with light and dark mode.

| Feature | Description |
|---|---|
| 🧠 **15+ Content Modes** | Blog posts, SEO copy, LinkedIn posts, Instagram captions, YouTube scripts, emails, ad copy, and more |
| 💡 **AI-Powered Suggestions** | Smart, context-aware content ideas tailored to each mode |
| 📄 **Professional Templates** | Ready-to-use prompts and frameworks to get started fast |
| 🌗 **Light & Dark Mode** | Built for focus and productivity in any environment |
| 🔒 **Secure & Fast** | Your data is safe with us |

**Designed for:** Creators · Marketers · Entrepreneurs · Professionals

---

## 🚀 Quick Start

### Prerequisites

| Tool    | Minimum version |
|---------|-----------------|
| Python  | 3.10+           |
| Node.js | 18+             |
| Git     | any             |

### 1 — Clone

```bash
git clone <your-repo-url>
cd AI-Content-Assistant
```

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

### 4 — Verify everything works

1. Open **http://localhost:5173** (or 5174) in your browser
2. You should see the AI Content Assistant chat UI
3. Type a message — e.g. *"Write a LinkedIn post about AI"*
4. The backend processes it through Groq and returns a real AI response

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable           | Required | Default                    | Description                  |
|--------------------|----------|-----------------------------|-------------------------------|
| `GROQ_API_KEY`     | **Yes**  | —                           | Groq API key                  |
| `HOST`             | No       | `0.0.0.0`                   | Uvicorn bind address           |
| `PORT`             | No       | `8000`                      | Uvicorn port                   |
| `GROQ_MODEL`       | No       | `llama-3.3-70b-versatile`   | Groq model identifier          |
| `GROQ_MAX_TOKENS`  | No       | `1024`                      | Max tokens per response        |
| `GROQ_TEMPERATURE` | No       | `0.7`                       | Response temperature (0–1)     |

Get a free Groq API key at **[console.groq.com/keys](https://console.groq.com/keys)**

### Frontend (`frontend/.env`)

| Variable       | Required | Default                  | Description              |
|----------------|----------|---------------------------|----------------------------|
| `VITE_API_URL` | No       | `http://localhost:8000`   | FastAPI backend base URL   |

---

## 🏗️ Architecture

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

### Network Flow

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
    └──► Vercel AI message bubble in ChatWindow
```

---

## ☁️ Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import the repository on [Vercel](https://vercel.com/), set **Root Directory** to `frontend/`
3. Add environment variable: `VITE_API_URL=https://ai-content-assistant-w2qt.vercel.app/
4. Deploy

### Backend → Vercel
1. Import the repository on [Vercel](https://vercel.com/), set **Root Directory** to `backend/`
2. Add secret: `GROQ_API_KEY=gsk_...`
3. Add: `CORS_ORIGINS=https://ai-content-assistant-akmal.vercel.app/
4. Deploy

**Live app:** [https://ai-content-assistant-akmal.vercel.app/](https://ai-content-assistant-akmal.vercel.app/)

---

## 🛠️ Tech Stack

| Layer      | Technology                                        |
|------------|----------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS, Axios, React Icons   |
| Backend    | Python 3.10+, FastAPI, Uvicorn, pydantic-settings  |
| AI         | Groq API — llama-3.3-70b-versatile                 |
| Deployment | Vercel (frontend) · Vercel (backend)               |

---

## 🗺️ Roadmap

| Phase | Status | Description                                    |
|-------|--------|--------------------------------------------------|
| 1     | ✅     | Project structure scaffold                       |
| 2     | ✅     | Dev environment (React + FastAPI running)         |
| 3     | ✅     | ChatGPT-style UI                                  |
| 4     | ✅     | Frontend ↔ Backend integration (mock)             |
| 5     | ✅     | Groq AI integration                               |
| 5.5   | ✅     | Debugging & stabilisation                         |
| 6     | 🔜     | Chat history & conversation management            |
| 7     | 🔜     | Authentication                                    |
| 8     | ✅     | Deployment hardening                              |

---

<div align="center">

Muhammad Akmal made with ❤️ using React, FastAPI, and Groq API

</div>
