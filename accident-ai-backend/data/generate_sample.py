import pandas as pd
import numpy as np

# Generate random mock data
np.random.seed(42)

n_samples = 400

time_buckets = ["morning", "afternoon", "evening", "night"]
weather_types = ["clear", "rain", "fog", "snow"]
road_types = ["highway", "city_street", "rural_road", "residential"]
severities = ["minor", "moderate", "severe"]

data = {
    "time": np.random.choice(time_buckets, n_samples),
    "weather": np.random.choice(weather_types, n_samples),
    "road_type": np.random.choice(road_types, n_samples),
    "latitude": np.random.uniform(40.6, 40.9, n_samples),
    "longitude": np.random.uniform(-74.1, -73.7, n_samples),
    "severity": np.random.choice(severities, n_samples, p=[0.6, 0.3, 0.1])
}

df = pd.DataFrame(data)
df.to_csv("sample_accidents.csv", index=False)
