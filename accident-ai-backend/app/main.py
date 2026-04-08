from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, insights, predict, recommendations, hotspots
import pandas as pd
from app.services.data_processor import processor
from app.services.model import ml_model
from app.services.insights_engine import insights_engine
import os

app = FastAPI(title="Accident Insight Engine API")

# Add CORS to allow frontend fetching
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def preload_data():
    try:
        csv_path = os.path.join(os.path.dirname(__file__), "../data/real_accidents.csv")
        if os.path.exists(csv_path):
            df = pd.read_csv(csv_path)
            processor.load_data(df)
            ml_model.train(processor.df)
            print(f"✅ Loaded {len(processor.df)} real world records into the engine.")
    except Exception as e:
        print(f"⚠️ Could not load initial data: {e}")

app.include_router(upload.router, prefix="/api")
app.include_router(insights.router, prefix="/api")
app.include_router(predict.router, prefix="/api")
app.include_router(recommendations.router, prefix="/api")
app.include_router(hotspots.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to Accident Insight Engine API"}
