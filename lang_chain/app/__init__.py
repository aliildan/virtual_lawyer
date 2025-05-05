# app/__init__.py

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("The app package has been initialized.")
