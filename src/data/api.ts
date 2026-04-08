export const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchMapData() {
  const res = await fetch(`${API_BASE_URL}/data`);
  const json = await res.json();
  return json.data;
}

export async function fetchInsights() {
  const res = await fetch(`${API_BASE_URL}/insights`);
  const json = await res.json();
  return json.insights;
}

export async function fetchRecommendations() {
  const res = await fetch(`${API_BASE_URL}/recommendations`);
  const json = await res.json();
  return json.recommendations;
}

export async function fetchPredictions(requestBody) {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  return await res.json();
}
