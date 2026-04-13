🚦 Project: Traffic Accident Correlation Analysis

Team Members:  Akanksha Kumari, Keshav Yadav,  Avinash Guleria

1. The Problem: "Data Rich, Insight Poor."

Traffic police departments collect massive amounts of accident data every day. However, this data often sits idle in logs. Without analysis, interventions remain reactive (responding after an accident) rather than proactive (preventing one).

    Vague Goals: General safety campaigns are often broad and fail to address specific high-risk scenarios.

    Hidden Correlations: Patterns between road geometry, specific weather types, and time-of-day are invisible to the naked eye.

    Resource Misallocation: Without data, police resources might be deployed to low-risk areas while "death traps" go unmonitored.

💡 2. The Solution: Question → Data → Insight

We apply the Data Science Lifecycle to move from raw evidence to targeted action.
Phase A: The Question (Framing) 🎯

We don't just "look at data." We ask: "Which road types become high-risk hotspots specifically during monsoon weather at night?" This focus ensures every line of code we write serves a specific purpose.
Phase B: Data as Evidence (Investigation) 🔍

We treat data as a witness. We investigate its provenance, cleaning messy logs and accounting for reporting biases. We combine:

    📝 Incident Logs: Severity, time, and location.

    🌦️ Weather Data: Historical climate matching.

    🛣️ Infrastructure Info: Road surface and lighting quality.

Phase C: Actionable Insights (Intervention) 💡

The end goal isn't a chart; it's an intervention.

    Observation: Accidents spike on Route 10 when it rains.

    Insight: Accidents spike because Route 10's "S-Curve" lacks drainage.

    Targeted Action: Install high-friction surfacing and improved drainage at that specific curve.

🛠️ 3. Technology Stack

We utilize the standard Data Science "Starter Pack" to perform this analysis:

    🐍 Language: Python – The backbone of modern data science.

    📓 Environment: Jupyter Notebooks – For interactive, reproducible research.

    📊 Libraries:

        Pandas & NumPy: For data wrangling, cleaning, and handling the "messy" real-world logs.

        Matplotlib & Seaborn: For statistical visualization to reveal hidden correlations between environment and accident frequency.