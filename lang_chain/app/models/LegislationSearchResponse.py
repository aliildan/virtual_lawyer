from typing import List, Optional
from pydantic import BaseModel
from app.models.Legislation import Legislation


class LegislationSearchResponse(BaseModel):
    resultCount:  Optional[int] = 0
    data: List[Legislation]