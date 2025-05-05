from langchain_openai import ChatOpenAI
from langgraph.graph.graph import CompiledGraph
from langgraph.prebuilt import create_react_agent


class AbstractAgent:
    def __init__(self,llm:ChatOpenAI, tools: list):
        self.llm = llm.bind_tools(tools)
        self.tools = tools
        self.prompt = """"""
        self.agent = create_react_agent(model=self.llm, tools=self.tools, state_modifier=self.prompt)

    def get_agent(self) ->CompiledGraph:
        return self.agent