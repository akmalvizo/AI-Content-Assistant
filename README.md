# AI Content Assistant

A production-ready AI SaaS application for intelligent content generation and conversational AI assistance.

## Description

AI Content Assistant is a full-stack web application that leverages large language models to help users generate, refine, and manage content. Built with a React 19 frontend and a FastAPI backend, it is designed to be modular, scalable, and deployment-ready.

## Features (Planned)

- 💬 Real-time AI chat interface
- 🧠 LLM-powered content generation (Groq API)
- 📋 Prompt template library
- 🔄 Conversation history management
- 📤 Export and share content
- 🌐 REST API with FastAPI backend
- ⚡ Fast, responsive UI with React 19 + Vite + Tailwind CSS

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS, Axios, React Icons |
| Backend    | Python 3.12+, FastAPI, Uvicorn, python-dotenv   |
| Deployment | Frontend → Vercel · Backend → Render            |

## Folder Structure

```
AI-Content-Assistant/
├── frontend/                  # React 19 + Vite application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/        # Reusable UI components (Phase 3)
│   │   ├── context/
│   │   │   └── ChatContext.jsx
│   │   ├── hooks/             # Custom React hooks (Phase 3)
│   │   ├── pages/
│   │   │   └── Home.jsx       # Landing page
│   │   ├── services/
│   │   │   └── api.js         # Axios client + service functions
│   │   ├── App.jsx
│   │   ├── index.css          # Tailwind directives
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                   # FastAPI application
│   ├── app/
│   │   ├── models/            # Pydantic schemas (Phase 3)
│   │   ├── routes/
│   │   │   ├── chat.py        # Placeholder (Phase 3)
│   │   │   └── health.py      # GET /health
│   │   ├── services/
│   │   │   └── llm_service.py # LLM abstraction (Phase 3)
│   │   ├── utils/
│   │   ├── config.py          # Pydantic settings
│   │   └── main.py            # App factory + CORS + routers
│   ├── .env.example
│   ├── .gitignore
│   ├── render.yaml
│   └── requirements.txt
├── docs/
├── .gitignore
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- Git

---

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env

# Start development server
npm run dev
```

Frontend runs at **http://localhost:5173**

---

### Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env

# Start development server
uvicorn app.main:app --reload
```

Backend runs at **http://localhost:8000**

---

## API Endpoints

| Method | Path      | Description                         |
|--------|-----------|-------------------------------------|
| GET    | `/`       | `{ "message": "Backend is running successfully." }` |
| GET    | `/health` | `{ "status": "healthy" }`           |
| GET    | `/docs`   | Swagger UI (interactive API docs)   |

## Environment Variables

### Frontend (`frontend/.env`)

| Variable       | Default                    | Description             |
|----------------|----------------------------|-------------------------|
| `VITE_API_URL` | `http://localhost:8000`    | FastAPI backend base URL |

### Backend (`backend/.env`)

| Variable       | Default     | Description                      |
|----------------|-------------|----------------------------------|
| `GROQ_API_KEY` | _(empty)_   | Groq LLM API key (Phase 3)       |
| `HOST`         | `0.0.0.0`   | Uvicorn bind address             |
| `PORT`         | `8000`      | Uvicorn port                     |

## Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import repo on [Vercel](https://vercel.com/), set root directory to `frontend/`
3. Add `VITE_API_URL` pointing to your Render backend URL
4. Deploy

### Backend → Render
1. Import repo on [Render](https://render.com/), set root directory to `backend/`
2. `render.yaml` configures build + start commands automatically
3. Add `GROQ_API_KEY` and `CORS_ORIGINS` as secret environment variables
4. Deploy

## Roadmap

| Phase | Description                                              |
|-------|----------------------------------------------------------|
| ✅ 1  | Project structure — folders, placeholders, config files  |
| ✅ 2  | Dev environment — Tailwind, Vite, FastAPI running locally |
| 🔜 3  | LLM integration — Groq API, streaming chat responses     |
| 🔜 4  | Chat UI — full conversation interface, prompt cards      |
| 🔜 5  | Auth, history persistence, deployment hardening          |

## License

MIT License — see [LICENSE](./LICENSE) for details.
