class RecommendationEngine:
    def __init__(self):
        pass

    def generate_recommendations(self, weather_counts, time_counts, road_counts):
        recs = []
        
        if weather_counts.get("rain", 0) > 30:
            recs.append("High correlation with rainy weather: Invest in improved road drainage systems and anti-skid surfaces.")
        elif weather_counts.get("fog", 0) > 20:
            recs.append("High correlation with foggy weather: Install high-visibility cat's eyes and fog lights on major accident zones.")
            
        if time_counts.get("night", 0) > 35:
            recs.append("Nighttime accidents are prevalent: Install better street lighting and use reflective road markings.")
        elif time_counts.get("morning", 0) > 35:
            recs.append("Morning commute shows high risk: Deploy traffic police during peak hours to manage speed and flow.")
            
        if road_counts.get("highway", 0) > 40:
            recs.append("Highways have the highest accident rate: Increase automated speed monitoring and enforce stricter lane discipline.")
            
        if not recs:
            recs.append("Conduct regular road safety audits and ensure clear signage is maintained across all zones.")
            
        return recs

rec_engine = RecommendationEngine()
