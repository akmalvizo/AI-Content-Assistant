"""
app/routes/health.py
--------------------
Health check route for AI Content Assistant.
Used by Render and monitoring tools to verify the service is alive.
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health", summary="Health Check")
async def health_check():
    """
    Returns a simple status payload confirming the API is operational.
    Render and uptime monitors will call this endpoint periodically.
    """
    # TODO: extend with DB connectivity and LLM reachability checks in Phase 2
    return {"status": "ok", "service": "AI Content Assistant API"}
