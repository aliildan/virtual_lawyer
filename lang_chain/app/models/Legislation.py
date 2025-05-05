from pydantic import BaseModel
from typing import Optional


class Legislation(BaseModel):
    id: int
    type: int
    title: str
    content: Optional[str] = ""
    composition: int
    official_gazette_date: str
    number: int
    acceptance_date: str
    url: str

    def to_json(self):
        return {
            "id": self.id,
            "type": self.type,
            "title": self.title,
            "content": self.content,
            "composition": self.composition,
            "official_gazette_date": self.official_gazette_date,
            "number": 1,
            "acceptance_date": self.acceptance_date,
            "url": self.url
        }


