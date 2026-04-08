from fastapi import APIRouter, HTTPException
import numpy as np
from app.services.data_processor import processor
from app.services.insights_engine import insights_engine

router = APIRouter(tags=["Insights"])

@router.get("/insights")
async def get_insights():
    if processor.df is None or processor.df.empty:
        raise HTTPException(status_code=400, detail="No data available. Please upload a CSV first.")
        
    df = processor.df
    
    return insights_engine.generate_insights(df)

@router.get("/data")
async def get_raw_data():
    if processor.df is None or processor.df.empty:
        raise HTTPException(status_code=400, detail="No data available.")
    
    # Return max 1000 items with unique IDs for the frontend Map
    df = processor.df.head(1000).copy()
    df["id"] = ["ACC-" + str(i).zfill(4) for i in range(len(df))]
    # Capitalize first letters like the front-end expects:
    for col in ['time', 'weather', 'road_type', 'severity']:
        df[col] = df[col].astype(str).str.title()
    
    records = df.to_dict(orient="records")
    return {"data": records}
