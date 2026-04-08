# Accident Insight Engine Backbone API

Welcome to the backend for the Accident Insight Engine. It is built using Python, FastAPI, and scikit-learn.

## Tech Stack
- FastAPI (main framework)
- pandas (data ingestion and wrangling)
- numpy (numerical computations)
- scikit-learn (RandomForest machine learning integration)
- Uvicorn (application server)

## Getting Started

1. Set up a Python virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Generate Sample Data:
   ```bash
   python data/generate_sample.py
   ```
   *This creates a `sample_accidents.csv` file under `data/`.*

4. Run the API Server:
   ```bash
   uvicorn app.main:app --reload
   ```

5. Explore the Interactive API Documentation:
   Navigate to `http://127.0.0.1:8000/docs` in your web browser.

## API Endpoints

- `POST /api/upload`: Upload a CSV file structured with specific accident columns.
- `GET /api/insights`: Receive group-by statistics and percentage data related to time, weather, and road conditions.
- `POST /api/predict`: Leverage the ML model (Random Forest) for a binary risk classification score based on context variables.
- `GET /api/recommendations`: Retrieve actionable text insights dynamically based on the uploaded data.
- `GET /api/hotspots`: Extract geographic accident hotspots dynamically clustered via DBSCAN.
