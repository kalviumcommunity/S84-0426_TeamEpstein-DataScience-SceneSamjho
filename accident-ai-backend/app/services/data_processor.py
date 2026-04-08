import pandas as pd
from typing import Optional

class DataProcessor:
    def __init__(self):
        self.df: Optional[pd.DataFrame] = None

    def load_data(self, df: pd.DataFrame):
        # Normalize columns
        df.columns = df.columns.str.lower().str.strip()
        
        # Keep only required columns
        valid_cols = ["time", "weather", "road_type", "latitude", "longitude", "severity"]
        df = df[[col for col in valid_cols if col in df.columns]]
        
        # Normalize text data
        for col in ["time", "weather", "road_type", "severity"]:
            if col in df.columns:
                df[col] = df[col].astype(str).str.lower().str.strip()
                
        # Drop missing values
        df.dropna(inplace=True)
        self.df = df

processor = DataProcessor()
