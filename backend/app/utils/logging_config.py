"""
app/utils/logging_config.py
----------------------------
Configures Python's standard logging for the entire application.
Call `setup_logging()` once at startup in main.py.
"""

import logging
import sys


def setup_logging(level: str = "INFO") -> None:
    """
    Configure root logger with a clean, timestamped format.

    Args:
        level: Logging level string — DEBUG | INFO | WARNING | ERROR.
    """
    log_level = getattr(logging, level.upper(), logging.INFO)

    logging.basicConfig(
        level=log_level,
        format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        stream=sys.stdout,
    )

    # Suppress noisy third-party loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("httpx").setLevel(logging.WARNING)

    logging.getLogger(__name__).info("Logging initialised at level: %s", level.upper())
