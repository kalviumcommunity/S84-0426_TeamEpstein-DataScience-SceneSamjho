import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { AccidentRecord } from "@/data/types";
import "leaflet/dist/leaflet.css";

const severityColors: Record<string, string> = {
  Minor: "#10b981",
  Moderate: "#f59e0b",
  Severe: "#ef4444",
  Fatal: "#dc2626",
};

const severityRadius: Record<string, number> = {
  Minor: 6, Moderate: 8, Severe: 10, Fatal: 14,
};

export default function AccidentMap({ data }: { data: AccidentRecord[] }) {
  return (
    <div className="chart-container overflow-hidden" style={{ height: 480 }}>
      <h3 className="font-display text-sm font-semibold text-foreground mb-4">Accident Locations</h3>
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={11}
        style={{ height: "calc(100% - 28px)", borderRadius: "0.5rem" }}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        {data.map((a, i) => (
          <CircleMarker
            key={a.id || i}
            center={[a.latitude || 0, a.longitude || 0]}
            radius={severityRadius[a.severity || "Minor"]}
            pathOptions={{ color: severityColors[a.severity || "Minor"], fillColor: severityColors[a.severity || "Minor"], fillOpacity: 0.4, weight: 2 }}
          >
            <Popup>
              <div style={{ fontSize: 12 }}>
                <strong>{a.id || `Accident ${i}`}</strong> — {a.severity}<br />
                {a.time}<br />
                Weather: {a.weather} | Road: {a.road_type || a.roadType}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
