from fastapi import APIRouter, HTTPException
from app.services.data_processor import processor
from app.services.hotspot_detector import hotspot_detector

router = APIRouter(tags=["Hotspots"])

@router.get("/hotspots")
async def get_hotspots():
    if processor.df is None or processor.df.empty:
        raise HTTPException(status_code=400, detail="No data available. Please upload a CSV first.")
        
    df = processor.df
    hotspots = hotspot_detector.detect_hotspots(df)
    
    return {
        "message": f"Successfully detected {len(hotspots)} clustering hotspots.",
        "hotspots": hotspots
    }
