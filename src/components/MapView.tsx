// src/components/MapView.tsx
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup } from "react-leaflet";
import axios from "axios";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = [number, number];

export type Field = {
  id: string;
  name: string;
  area?: string;
  status?: string;
  // polygon as array of [lat,lng] (one linear ring)
  polygon?: LatLng[];
};

interface Props {
  selectedFieldId: string;
  selectedView: string; // "ndvi" | "ndwi" | "lst" | "disease" etc.
  fields: Field[];
  apiBaseUrl?: string; // defaults to env var
  initialOpacity?: number;
}

export default function MapView({
  selectedFieldId,
  selectedView,
  fields,
  apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  initialOpacity = 0.7,
}: Props) {
  const [tileUrl, setTileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(initialOpacity);
  const [hotspots, setHotspots] = useState<{ lat: number; lng: number; value: number }[]>([]);

  const field = useMemo(() => fields.find((f) => f.id === selectedFieldId) ?? fields[0], [fields, selectedFieldId]);

  // compute centroid (simple average) for map center
  const center: LatLngExpression = useMemo(() => {
    if (!field?.polygon || field.polygon.length === 0) return [10.0, 78.0];
    const latSum = field.polygon.reduce((s, p) => s + p[0], 0);
    const lngSum = field.polygon.reduce((s, p) => s + p[1], 0);
    return [latSum / field.polygon.length, lngSum / field.polygon.length];
  }, [field]);

  useEffect(() => {
    if (!field) return;
    setLoading(true);
    setError(null);
    setTileUrl(null);

    const controller = new AbortController();

    axios
      .get(`${apiBaseUrl}/get-layer/${selectedView}/${selectedFieldId}`, {
        signal: controller.signal,
      })
      .then((res) => {
        // expected response: { tile_url: "https://..../{z}/{x}/{y}?..." }
        setTileUrl(res.data.tile_url);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) setError(err.message || "Failed to load layer");
      })
      .finally(() => setLoading(false));

    // optional fetch hotspots (if endpoint exists)
    axios
      .get(`${apiBaseUrl}/get-hotspots/${selectedFieldId}/${selectedView}`)
      .then((res) => setHotspots(res.data.hotspots || []))
      .catch(() => setHotspots([]));

    return () => controller.abort();
  }, [selectedView, selectedFieldId, apiBaseUrl, field]);

  // Esri World Imagery as satellite basemap (no api key)
  const ESRI_WORLD_IMAGERY = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  return (
    <div className="relative">
      {/* Simple controls */}
      <div className="absolute z-50 right-4 top-4 bg-white p-2 rounded shadow space-y-2 w-44">
        <div className="text-sm font-medium">Layer: {selectedView}</div>
        <div className="flex items-center justify-between text-xs">
          <label>Overlay</label>
          <input type="checkbox" checked={!!tileUrl} readOnly />
        </div>
        <div className="text-xs">Opacity</div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={overlayOpacity}
          onChange={(e) => setOverlayOpacity(Number(e.target.value))}
        />
        {loading && <div className="text-xs text-muted-foreground">Loading tiles…</div>}
        {error && <div className="text-xs text-destructive">Error: {error}</div>}
      </div>

      <MapContainer center={center} zoom={15} style={{ height: 480, width: "100%" }} scrollWheelZoom>
        {/* Satellite base */}
        <TileLayer url={ESRI_WORLD_IMAGERY} attribution="&copy; Esri &mdash; Source imagery" />

        {/* GEE tile overlay */}
        {tileUrl && <TileLayer url={tileUrl} opacity={overlayOpacity} zIndex={600} />}

        {/* Field polygon */}
        {field?.polygon && <Polygon positions={[field.polygon]} pathOptions={{ color: "yellow", weight: 2 }} />}

        {/* Hotspots (optional) */}
        {hotspots.map((h, i) => (
          <CircleMarker key={i} center={[h.lat, h.lng]} radius={8 + h.value * 2} eventHandlers={{}} pane="markerPane">
            <Popup>
              <div>
                <div>Value: {h.value}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute left-4 bottom-4 z-50 bg-white p-2 rounded shadow text-sm">
        <div className="font-medium">Legend</div>
        <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-green-500" /> Good</div>
        <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-yellow-400" /> Moderate</div>
        <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-red-500" /> Poor</div>
      </div>
    </div>
  );
}
