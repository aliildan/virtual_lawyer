from typing import List
from pydantic import BaseModel

from app.models.LegislationType import LegislationType


class LegislationTypeResponse(BaseModel):
    data: List[LegislationType]