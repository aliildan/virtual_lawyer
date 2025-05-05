from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from app.agents.Analyzer import Analyzer
from app.agents.Lawyer import Lawyer
from app.agents.Researcher import Researcher
from app.tools.GetLegislationDetailTool import get_legislation_content
from app.tools.GetLegislationTypesTool import get_legislation_types
from app.tools.SearchLegislationTool import search_legislation
from app.tools.SearchLocationsTool import get_search_locations
from langchain_ollama import ChatOllama

# Let’s query the agent to see the result.
def print_stream(stream):
    for s in stream:
        message = s["messages"][-1]
        if isinstance(message, tuple):
            print(message)
        else:
            message.pretty_print()

load_dotenv()

tools = [get_legislation_types, get_search_locations, search_legislation, get_legislation_content]
llm = ChatOpenAI(model="gpt-4o-mini")
# llm = ChatOllama(model="deepseek-r1")

analyzer = Analyzer(tools=[get_legislation_types, get_search_locations], llm=llm)
analyzer_agent = analyzer.get_agent()

researcher = Researcher(tools=[search_legislation], llm=llm)
researcher_agent = researcher.get_agent()

lawyer = Lawyer(tools=[get_legislation_content], llm=llm)
lawyer_agent = lawyer.get_agent()

inputs = {"messages": [("user", "Bir kira sözleşmesi feshi nasıl yapılır?")]}

analyzer_agent_response = analyzer_agent.invoke(inputs)
print(analyzer_agent_response)
researcher_agent_response = researcher_agent.invoke({"messages": analyzer_agent_response["messages"]})

print_stream(lawyer_agent.stream({"messages": researcher_agent_response["messages"]}, stream_mode="values"))