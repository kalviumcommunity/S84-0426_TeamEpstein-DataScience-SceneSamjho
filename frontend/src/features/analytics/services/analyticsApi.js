const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

async function parseJsonResponse(response, endpointName) {
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpointName}`);
  }

  return response.json();
}

export async function fetchAnalyticsSnapshot(signal) {
  const [kpisRes, trendsRes, contextRes] = await Promise.all([
    fetch(`${API_BASE_URL}/analytics/kpis/`, { signal }),
    fetch(`${API_BASE_URL}/analytics/trends/`, { signal }),
    fetch(`${API_BASE_URL}/analytics/indian-context/`, { signal }),
  ]);

  const [kpisPayload, trendsPayload, contextPayload] = await Promise.all([
    parseJsonResponse(kpisRes, "KPI data"),
    parseJsonResponse(trendsRes, "trend data"),
    parseJsonResponse(contextRes, "Indian context data"),
  ]);

  return {
    kpis: kpisPayload || {},
    trendData: Array.isArray(trendsPayload) ? trendsPayload : [],
    contextData: contextPayload || {},
  };
}
