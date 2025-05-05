import logging
import requests
from langchain_core.tools import tool

from app.models.Legislation import Legislation

"""
This tool fetches the content of a legislation based on the legislation object.
Args:
    id (int): The id of the legislation.
    type (int): The type of the legislation.
    composition (int): The composition of the legislation.
    official_gazette_date (str): The official gazette date of the legislation.
    title (str): The title of the legislation.
    number (int): The number of the legislation.
    acceptance_date (str): The acceptance date of the legislation.
    url (str): The url of the legislation.
"""
@tool
def get_legislation_content(id: int,
                            type: int,
                            composition: int,
                            official_gazette_date: str,
                            title: str,
                            number: int,
                            acceptance_date: str,
                            url: str) -> str | None:
    """Get the content of a legislation based on the legislation object. """

    print(f"Fetching content for legislation: id: {id} type:{type} composition:{composition} official_gazette_date:{official_gazette_date} title;{title} number:{number} acceptance_date:{acceptance_date} url:{url}")
    url = "http://localhost:3000/api/legislation/getLegislationContent"
    response = requests.post(url, json={"id": id,"title":title , "type": type, "composition": composition, "official_gazette_date": official_gazette_date, "number": number, "acceptance_date": acceptance_date, "url": url})

    if response.status_code == 200:
        # Parse the response into the Pydantic model
        response_json = response.json()
        print("Response JSON: ", response_json)
        if 'data' in response_json and response_json['data']:
            detailed_legislation = Legislation(**response_json['data'])
            return detailed_legislation.model_dump_json()
    else:
        logging.error("Failed to fetch LegislationDetailContentResponse data")
        return None
