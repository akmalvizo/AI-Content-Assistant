"""
app/utils/exception_handlers.py
---------------------------------
Global exception handlers registered on the FastAPI application.

All errors — validation failures, unhandled exceptions — return a
consistent JSON envelope so the frontend only needs one error-handling path.

Success envelope  → { "success": true,  "data": ... }
Error envelope    → { "success": false, "message": "..." }
"""

import logging

from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger(__name__)


async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    """
    Handle HTTP exceptions (404, 405, etc.) raised by FastAPI / Starlette.
    Returns a consistent { success, message } JSON body.
    """
    logger.warning(
        "HTTP %s | %s %s | %s",
        exc.status_code, request.method, request.url.path, exc.detail,
    )
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": str(exc.detail)},
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """
    Handle Pydantic / FastAPI request-body validation errors (422).
    Extracts the first error message and surfaces it as a human-readable string.
    """
    errors = exc.errors()
    first  = errors[0] if errors else {}
    field  = " → ".join(str(loc) for loc in first.get("loc", []))
    msg    = first.get("msg", "Validation error")

    logger.warning(
        "Validation error | %s %s | field=%s msg=%s",
        request.method, request.url.path, field, msg,
    )
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "message": f"Invalid input{f' ({field})' if field else ''}: {msg}",
        },
    )


async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Catch-all handler for any unhandled exception.
    Logs the full traceback and returns a generic 500 response.
    """
    logger.exception(
        "Unhandled exception | %s %s", request.method, request.url.path
    )
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "Something went wrong. Please try again."},
    )
