import logging
import requests
from typing import List
from langchain_core.tools import tool
from app.models.LegislationType import LegislationType
from app.models.LegislationTypeResponse import LegislationTypeResponse


@tool
def get_legislation_types()-> List[LegislationType] | None:
    """Get all legislation types available in the system. It will be used for search_legislation_tool."""
    url = "http://localhost:3000/api/legislation/getLegislationTypes"
    response = requests.get(url)
    if response.status_code == 200:
        # Parse the response into the Pydantic model
        data = response.json()
        parsed_response = LegislationTypeResponse(**data)
        return parsed_response.data
    else:
        logging.error("Failed to fetch LegislationType data")
        return None
