import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import numpy as np

class AccidentRiskModel:
    def __init__(self):
        # Improved model to handle class imbalances, deeper trees for complex features
        self.classifier = RandomForestClassifier(
            n_estimators=150, 
            max_depth=12,
            class_weight="balanced", 
            random_state=42
        )
        self.pipeline = None
        self.is_trained = False
        self.default_lat = 0.0
        self.default_lon = 0.0
        
    def _create_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Feature Engineering step to derive new signals"""
        df_feat = df.copy()
        
        # 1. Fill missing spatial features
        if "latitude" not in df_feat:
            df_feat["latitude"] = self.default_lat
        if "longitude" not in df_feat:
            df_feat["longitude"] = self.default_lon
            
        # 2. String Interaction features
        # Crossing factors like 'night_rain' or 'highway_snow'
        df_feat["time_weather"] = df_feat["time"] + "_" + df_feat["weather"]
        df_feat["weather_road"] = df_feat["weather"] + "_" + df_feat["road_type"]
        df_feat["time_road"] = df_feat["time"] + "_" + df_feat["road_type"]
        
        # 3. Aggregated risk profiles (example placeholder for spatial binning logic)
        # Using simple lat/lon bucket representation (pseudo blocks)
        df_feat["lat_bin"] = df_feat["latitude"].round(1).astype(str)
        df_feat["lon_bin"] = df_feat["longitude"].round(1).astype(str)
        
        return df_feat
        
    def train(self, df: pd.DataFrame):
        # Compute baseline aggregates from historical inputs
        if "latitude" in df:
            self.default_lat = df["latitude"].median()
        if "longitude" in df:
            self.default_lon = df["longitude"].median()
            
        df_feat = self._create_features(df)
        
        # Define the subset of features
        cat_features = [
            "time", "weather", "road_type", 
            "time_weather", "weather_road", "time_road",
            "lat_bin", "lon_bin"
        ]
        num_features = ["latitude", "longitude"]
        
        X = df_feat[cat_features + num_features]
        
        # Target: severity (convert to binary logic: moderate/severe/fatal = high risk)
        y = df["severity"].apply(lambda x: 1 if x in ["severe", "moderate", "fatal"] else 0)
        
        # Preprocessor with ColumnTransformer
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), num_features),
                ('cat', OneHotEncoder(handle_unknown='ignore'), cat_features)
            ])
            
        # Construct the Scikit-Learn Pipeline
        self.pipeline = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('classifier', self.classifier)
        ])
            
        self.pipeline.fit(X, y)
        self.is_trained = True
        
    def predict_risk(self, req):
        if not self.is_trained:
            raise ValueError("Model is not trained yet. Please upload data first.")
            
        # Safely wrap request variables
        lat = req.latitude if req.latitude is not None else self.default_lat
        lon = req.longitude if req.longitude is not None else self.default_lon
        
        # Convert Request to DataFrame format
        input_data = pd.DataFrame([{
            "time": str(req.time).lower(),
            "weather": str(req.weather).lower(),
            "road_type": str(req.road_type).lower(),
            "latitude": lat,
            "longitude": lon
        }])
        
        probs = self.pipeline.predict_proba(self._create_features(input_data))[0]
        
        # Return probability of class 1 (high risk)
        risk = probs[1] if len(probs) > 1 else 0.0
        return risk

ml_model = AccidentRiskModel()
