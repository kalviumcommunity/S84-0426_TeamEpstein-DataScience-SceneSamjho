class InsightsEngine:
    def __init__(self):
        pass

    def generate_insights(self, df):
        # Calculate distributions
        weather_counts = df["weather"].value_counts(normalize=True).mul(100).round(2).to_dict()
        time_counts = df["time"].value_counts(normalize=True).mul(100).round(2).to_dict()
        road_counts = df["road_type"].value_counts(normalize=True).mul(100).round(2).to_dict()
        
        insights = []
        
        if weather_counts:
            top_weather = max(weather_counts, key=weather_counts.get)
            insights.append(f"{top_weather.title()} weather is associated with {weather_counts[top_weather]}% of recorded accidents.")
            
        if time_counts:
            top_time = max(time_counts, key=time_counts.get)
            insights.append(f"Most accidents occur during the {top_time}, accounting for {time_counts[top_time]}% of incidents.")
            
        if road_counts:
            top_road = max(road_counts, key=road_counts.get)
            insights.append(f"{top_road.replace('_', ' ').title()}s have the highest accident rate ({road_counts[top_road]}%).")
            
        return {
            "data": {
                "weather": weather_counts,
                "time": time_counts,
                "road_type": road_counts
            },
            "insights": insights
        }

insights_engine = InsightsEngine()