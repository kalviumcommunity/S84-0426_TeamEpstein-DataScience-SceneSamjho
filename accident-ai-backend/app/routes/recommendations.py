from fastapi import APIRouter, HTTPException
from app.services.data_processor import processor
from app.services.recommendation_engine import rec_engine

router = APIRouter(tags=["Recommendations"])

@router.get("/recommendations")
async def get_recommendations():
    if processor.df is None or processor.df.empty:
        raise HTTPException(status_code=400, detail="No data available. Please upload a CSV first.")
        
    df = processor.df
    
    weather_counts = df["weather"].value_counts(normalize=True).mul(100).to_dict()
    time_counts = df["time"].value_counts(normalize=True).mul(100).to_dict()
    road_counts = df["road_type"].value_counts(normalize=True).mul(100).to_dict()
    
    recs = rec_engine.generate_recommendations(weather_counts, time_counts, road_counts)
        
    return {"recommendations": recs}
