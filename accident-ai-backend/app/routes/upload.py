from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io
from app.services.data_processor import processor

router = APIRouter(tags=["Upload"])

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")
    
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        
        required_cols = {"time", "weather", "road_type", "latitude", "longitude", "severity"}
        if not required_cols.issubset(set(df.columns.str.lower().str.strip())):
            raise HTTPException(status_code=400, detail=f"CSV must contain columns: {', '.join(required_cols)}")
            
        processor.load_data(df)
        
        return {
            "status": "success",
            "message": f"Successfully loaded {len(processor.df)} rows.",
            "rows": len(processor.df)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
