import pandas as pd
from sklearn.cluster import DBSCAN

class HotspotDetector:
    def __init__(self):
        pass

    def detect_hotspots(self, df: pd.DataFrame):
        if "latitude" not in df.columns or "longitude" not in df.columns:
            return []
            
        # Extract valid coordinates
        coords = df[['latitude', 'longitude']].dropna()
        if coords.empty:
            return []
            
        # DBSCAN Clustering
        # eps=0.02 degrees is roughly ~2km, min_samples requires at least 5 accidents to form a hotspot
        db = DBSCAN(eps=0.02, min_samples=5)
        clusters = db.fit_predict(coords)
        
        coords['cluster'] = clusters
        
        # Filter out noise points (label -1)
        hotspot_data = coords[coords['cluster'] != -1]
        
        if hotspot_data.empty:
            return []
            
        # Compute centroid (center of hotspot) and severity/count for each cluster
        # Also let's merge with the original df to get severity logic, if needed, but simple count is fine
        stats = hotspot_data.groupby('cluster').agg(
            latitude=('latitude', 'mean'),
            longitude=('longitude', 'mean'),
            accident_count=('latitude', 'size')
        ).reset_index()
        
        # Sort hotspots by the number of accidents
        stats = stats.sort_values(by='accident_count', ascending=False)
        
        results = []
        for _, row in stats.iterrows():
            results.append({
                "cluster_group": int(row['cluster']),
                "center_latitude": round(row['latitude'], 5),
                "center_longitude": round(row['longitude'], 5),
                "accident_count": int(row['accident_count'])
            })
            
        return results

hotspot_detector = HotspotDetector()
