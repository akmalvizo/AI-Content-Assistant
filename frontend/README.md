# AI Content Assistant — Frontend

React 19 + Vite frontend for the AI Content Assistant application.

## Tech Stack

- **React 19** — Component-based UI
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling
- **Axios** — HTTP requests to the FastAPI backend

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command         | Description                      |
|-----------------|----------------------------------|
| `npm run dev`   | Start Vite development server    |
| `npm run build` | Build for production             |
| `npm run preview` | Preview the production build   |
| `npm run lint`  | Lint source files with ESLint    |

## Environment Variables

| Variable            | Description                        |
|---------------------|------------------------------------|
| `VITE_API_BASE_URL` | Base URL of the FastAPI backend    |
| `VITE_APP_NAME`     | Display name of the application    |

## Deployment (Vercel)

1. Import the repository on [Vercel](https://vercel.com/)
2. Set the **Root Directory** to `frontend/`
3. Add environment variables from `.env.example`
4. Deploy — Vercel auto-detects Vite and sets the correct build command
