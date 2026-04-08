from pydantic import BaseModel, Field
from typing import Optional

class PredictionRequest(BaseModel):
    time: str
    weather: str
    road_type: str
    latitude: Optional[float] = Field(default=None, description="Approximate latitude")
    longitude: Optional[float] = Field(default=None, description="Approximate longitude")

class PredictionResponse(BaseModel):
    risk_probability: float
