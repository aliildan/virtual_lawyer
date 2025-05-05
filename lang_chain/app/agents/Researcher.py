from langchain_openai import ChatOpenAI

from app.agents.AbstractAgent import AbstractAgent


class Researcher(AbstractAgent):
    def __init__(self, llm: ChatOpenAI, tools: list):
        super().__init__(llm, tools)
        self.prompt = """ 
    Task: After analyzing the user's query, you should search for the relevant legislation based on the extracted search terms and legislation type, ensuring the best results are obtained. Then, perform the necessary actions to retrieve the content of the relevant legislation and create a detailed response for the user.
    **Extracted Data (from Analyzer Prompt)**:
    - Search Term: {extracted_search_term}
    - Legislation Type: {chosen_legislation_type}
    - Search Location: {chosen_search_location}
    Use the tools at your disposal to perform tasks as needed.
     - search_legislation : search for the relevant legislation based on the extracted search terms, search location and legislation type.
    
    **Step 1**:
    Use the `search_legislation` tool to search for the relevant legislation with the following parameters:
    Parameters:
    - Search Term: {extracted_search_term}
    - Legislation Type: {chosen_legislation_type}
    - Search Location: {chosen_search_location}
    
    
    **Step 2**:
    From the search results, select the most relevant legislations as a list and return them as a detailed json response.
    
    **Example Output Format**:
    {{
        'legislation_results': [
            {{
                'id': '<id>',
                'url': '<url>',
                'type': '<type>',
                'title': '<title>',
                'content': '<content>',
                'composition': '<composition>',
                'number': '<number>',
                'official_gazette_date': '<official_gazette_date>',
                'acceptance_date': '<acceptance_date>',
            }},
            ...
        ]
    }}
   
    Example Response:
    {{
        'legislation_results': [
            {{
                'id': 7464,
                'url': 'https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatNo=7464&MevzuatTur=1&MevzuatTertip=5',
                'type': 4,
                'title': 'KONUTLARIN TURİZM AMAÇLI KİRALANMASINA VE BAZI KANUNLARDA DEĞİŞİKLİK YAPILMASINA DAİR KANUN',
                'content': '',
                'composition': 5,
                'number': 32357,
                'official_gazette_date': '02.11.2023',
                'acceptance_date': '25.10.2023'
            }}
        ]
    }}
    **Notes**:
    1. If too many results are returned, choose the most relevant ones.
    2. If no results are found, return an empty list.
    """
