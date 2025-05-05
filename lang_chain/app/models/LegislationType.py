from pydantic import BaseModel


class LegislationType(BaseModel):
    name:str
    legislationTypeId:int