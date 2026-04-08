from fastapi import APIRouter, HTTPException
from app.models.schemas import PredictionRequest, PredictionResponse
from app.services.data_processor import processor
from app.services.model import ml_model

router = APIRouter(tags=["Predict"])

@router.post("/predict", response_model=PredictionResponse)
async def predict_risk(req: PredictionRequest):
    if processor.df is None or processor.df.empty:
        raise HTTPException(status_code=400, detail="Data not loaded.")
        
    try:
        # Re-train model if new data was uploaded and not yet trained
        if not ml_model.is_trained:
            ml_model.train(processor.df)
            
        risk = ml_model.predict_risk(req)
        return {"risk_probability": round(float(risk), 2)}
    except ValueError as val_err:
        raise HTTPException(status_code=400, detail=str(val_err))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
