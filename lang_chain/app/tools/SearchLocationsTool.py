from app.enums.SearchLocations import SearchLocations
from langchain_core.tools import tool

@tool
def get_search_locations():
    """
    This tool returns the list of available search locations from the SearchLocations enum.

    Returns:
        list: A list of available search locations.
    """
    return list(SearchLocations.__members__.values())