import logging
import requests
from typing import  List
from langchain_core.tools import tool
from app.models.Legislation import Legislation
from app.models.LegislationSearchResponse import LegislationSearchResponse

"""
This tool fetches the content of a legislation based on the legislation object.
Args:
    search_term (str): The search term for the legislation.
    legislation_type_id (int): The type of the legislation.
    search_location (str): The search location of the legislation. (e.g. All,Title,Content)
"""
@tool
def search_legislation(search_term:str,legislation_type_id:int,search_location:str)-> List[Legislation] | None:
    """Search for legislation based on search term, legislation type, and term searching location (e.g. All,Title,Content). """
    url = "http://localhost:3000/api/legislation/search"
    payload = {
        "searchTerm": search_term,
        "legislationTypeId": legislation_type_id,
        "searchLocation": search_location
    }
    response = requests.post(url, json=payload)

    if response.status_code == 200:
        # Parse the response into the Pydantic model
        data = response.json()
        parsed_response = LegislationSearchResponse(**data)
        return parsed_response.data
    else:
        logging.error("Failed to fetch LegislationSearchResponse data")
        return None



