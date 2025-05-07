# Virtual Lawyer - LangChain Integration

This project is developed for self-learning purposes and integrates the **LangChain** framework to build a virtual lawyer application. The application uses advanced natural language processing to assist users with legal queries in Turkish, document analysis, and works in conjunction with a web scraper for data extraction.

## Project Structure

```
virtual_lawyer/
├── lang_chain/
│   ├── app/
│   │   ├── agents/       # Task-specific LangChain agents
│   │   ├── enums/        # Enumerations for structured data representation
│   │   ├── models/       # Data models and schemas
│   │   ├── tools/        # Utility tools for various tasks
│   │   ├── __init__.py       # Package initializer
│   │── ReadMe.md         # Documentation for the app module
│   │   ├── main.py           # Entry point for the app module
│   │   ├── requirements.txt  # Python dependencies specific to the app module
```

### Folder Details

- **agents/**: Implements LangChain agents for specific legal tasks, such as document analysis and question answering.
- **enums/**: Defines enumerations for structured and consistent data representation.
- **models/**: Contains data models and schemas used throughout the application.
- **tools/**: Includes utility tools for tasks like data extraction and processing.



## Features

- **Legal Document Analysis**: Extracts key information from contracts, agreements, and other legal documents.
- **Question Answering**: Provides answers to legal queries in Turkish using pre-trained language models.
- **Customizable Workflows**: Easily extendable with new agents, chains, and prompts.
- **Web Scraping Integration**: Works with a scraper to gather relevant legal data from online sources.

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/aliildan/virtual_lawyer.git
    cd virtual_lawyer/lang_chain
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Ensure you are using Python 3.11:
    ```bash
    python --version
    # If not Python 3.11, create a virtual environment with Python 3.11
    python3.11 -m venv venv
    source venv/bin/activate
    ```


. Start using the virtual lawyer by running the main script:
    ```bash
    python main.py
    ```


## Acknowledgments

- LangChain for providing the foundational framework.
- OpenAI for advancements in language models.
- The web scraping community for tools and techniques that enhance data collection.
