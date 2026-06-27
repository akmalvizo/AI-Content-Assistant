# AI Content Assistant

A production-ready AI SaaS application for intelligent content generation and conversational AI assistance.

## Description

AI Content Assistant is a full-stack web application that leverages large language models to help users generate, refine, and manage AI-powered content. Built with a modern React frontend and a FastAPI backend, it is designed to be scalable, maintainable, and deployment-ready.

## Features (Planned)

- 💬 Real-time AI chat interface
- 🧠 LLM-powered content generation
- 📋 Prompt template library
- 🔄 Conversation history management
- 📤 Export and share content
- 🌐 REST API with FastAPI backend
- ⚡ Fast, responsive UI with React 19 + Vite

## Tech Stack

### Frontend
- [React 19](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Axios](https://axios-http.com/) — HTTP client

### Backend
- [Python](https://www.python.org/) — Language
- [FastAPI](https://fastapi.tiangolo.com/) — Web framework
- [Uvicorn](https://www.uvicorn.org/) — ASGI server

### Deployment
- **Frontend** → [Vercel](https://vercel.com/)
- **Backend** → [Render](https://render.com/)

## Folder Structure

```
AI-Content-Assistant/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── TypingLoader.jsx
│   │   │   └── PromptCards.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   ├── context/
│   │   │   └── ChatContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── README.md
│   └── index.html
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── chat.py
│   │   │   └── health.py
│   │   ├── services/
│   │   │   └── llm_service.py
│   │   ├── models/
│   │   ├── utils/
│   │   ├── config.py
│   │   └── main.py
│   ├── .env.example
│   ├── .gitignore
│   ├── requirements.txt
│   ├── render.yaml
│   └── README.md
├── docs/
├── .gitignore
├── LICENSE
├── README.md
└── CHANGELOG.md
```

## Installation

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- Git

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## Deployment

### Frontend → Vercel
1. Push the repository to GitHub
2. Import the project on [Vercel](https://vercel.com/) and set the root directory to `frontend/`
3. Configure environment variables from `frontend/.env.example`
4. Deploy

### Backend → Render
1. Import the project on [Render](https://render.com/) and set the root directory to `backend/`
2. Set environment variables from `backend/.env.example`
3. Render will use `render.yaml` for build and start configuration

## License

MIT License — see [LICENSE](./LICENSE) for details.
