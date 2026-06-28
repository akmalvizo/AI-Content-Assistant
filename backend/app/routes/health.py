"""
app/routes/health.py
--------------------
Health check route for AI Content Assistant.
Used by Render and uptime monitors to verify the service is reachable.
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health", summary="Health Check")
async def health_check():
    """
    Returns a status payload confirming the API is operational.

    Response:
        { "status": "healthy" }
    """
    return {"status": "healthy"}
