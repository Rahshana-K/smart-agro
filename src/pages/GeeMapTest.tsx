import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup, Tooltip, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeeMapTest = () => {
  const [tileUrl, setTileUrl] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState("ndvi");
  const [hotspots, setHotspots] = useState([]);
  const [radii, setRadii] = useState([]);

  const apiBase ="http://localhost:5000";

  // More realistic adjacent field polygons (slightly irregular shapes)
  const fieldPolygons = [
    {
      name: "Field A",
      crop: "Corn 🌽",
      area: "45 acres",
      positions: [
        [10.070, 78.060],
        [10.070, 78.065],
        [10.072, 78.066],
        [10.073, 78.063],
        [10.072, 78.060],
        [10.070, 78.060],
      ],
    },
    {
      name: "Field B",
      crop: "Rice 🌾",
      area: "30 acres",
      positions: [
        [10.070, 78.065],
        [10.070, 78.070],
        [10.072, 78.071],
        [10.072, 78.066],
        [10.070, 78.065],
      ],
    },
    {
      name: "Field C",
      crop: "Wheat 🌱",
      area: "25 acres",
      positions: [
        [10.072, 78.060],
        [10.073, 78.063],
        [10.075, 78.062],
        [10.075, 78.060],
        [10.072, 78.060],
      ],
    },
    {
      name: "Field D",
      crop: "Sugarcane 🍬",
      area: "40 acres",
      positions: [
        [10.072, 78.066],
        [10.072, 78.071],
        [10.075, 78.070],
        [10.075, 78.062],
        [10.072, 78.066],
      ],
    },
  ];

  useEffect(() => {
    const fetchTile = async () => {
      try {
        const res = await fetch(`${apiBase}/get-layer/${selectedLayer}/field-a`);
        const data = await res.json();
        setTileUrl(data.tile_url);
      } catch (err) {
        console.error("Error fetching tile:", err);
      }
    };
    fetchTile();
  }, [selectedLayer, apiBase]);

  // Simulate dynamic hotspot data
  useEffect(() => {
    const hotspotSets = [
      [
        { lat: 10.071, lon: 78.062, type: "severity", value: "high" },
        { lat: 10.072, lon: 78.064, type: "severity", value: "low" },
        { lat: 10.074, lon: 78.065, type: "severity", value: "high" },
        { lat: 10.073, lon: 78.063, type: "severity", value: "low" }
      ],
      [
        { lat: 10.072, lon: 78.063, type: "severity", value: "low" },
        { lat: 10.073, lon: 78.065, type: "severity", value: "high" },
        { lat: 10.070, lon: 78.067, type: "severity", value: "high" },
        { lat: 10.073, lon: 78.062, type: "severity", value: "high" }
      ],
      [
        { lat: 10.070, lon: 78.066, type: "severity", value: "high" },
        { lat: 10.073, lon: 78.064, type: "severity", value: "low" },
        { lat: 10.071, lon: 78.068, type: "severity", value: "high" },
        { lat: 10.072, lon: 78.067, type: "severity", value: "low" }
      ]
    ];
    let idx = 0;
    setHotspots(hotspotSets[idx]);
    setRadii(new Array(hotspotSets[idx].length).fill(10));
    const interval = setInterval(() => {
      idx = (idx + 1) % hotspotSets.length;
      setHotspots(hotspotSets[idx]);
      setRadii(new Array(hotspotSets[idx].length).fill(10));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Animate radii for expanding circles
  useEffect(() => {
    if (hotspots.length === 0) return;
    let growing = true;
    const minRadius = 10;
    const maxRadius = 30;
    const step = 1;
    const anim = setInterval(() => {
      setRadii(prev =>
        prev.map(r =>
          growing
            ? r + step > maxRadius ? maxRadius : r + step
            : r - step < minRadius ? minRadius : r - step
        )
      );
      // Reverse direction if any radius hits bounds
      setRadii(prev => {
        if (prev.some(r => r >= maxRadius)) growing = false;
        if (prev.some(r => r <= minRadius)) growing = true;
        return prev;
      });
    }, 120);
    return () => clearInterval(anim);
  }, [hotspots]);

  // Color logic for severity/moisture
  const getHotspotColor = (type, value) => {
    if (type === "severity") {
      if (value === "high") return "red";
      if (value === "low") return "yellow";
    }
    if (type === "moisture") {
      if (value === "high") return "darkblue";
      if (value === "low") return "yellow";
    }
    return "gray";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌾 Field Digital Twin Test</h1>
      <p>Choose a layer to visualize (NDVI, NDWI, LST):</p>

      <select
        value={selectedLayer}
        onChange={(e) => setSelectedLayer(e.target.value)}
        style={{ marginBottom: "10px", padding: "6px" }}
      >
        <option value="ndvi">NDVI (Vegetation Health)</option>
        <option value="ndwi">NDWI (Water Index)</option>
        <option value="lst">Land Surface Temp</option>
      </select>

      <div style={{ height: "500px", width: "100%", marginTop: "10px" }}>
        <MapContainer
          center={[10.07, 78.06]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Basemap */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* GEE Overlay */}
          {tileUrl && (
            <TileLayer
              key={tileUrl}
              attribution="Google Earth Engine"
              url={tileUrl}
              opacity={0.7}
            />
          )}

          {/* Field boundary polygons */}
          {fieldPolygons.map((field, idx) => (
            <Polygon
              key={field.name}
              positions={field.positions}
              pathOptions={{ color: "green", weight: 3, fillOpacity: 0.2 }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                {field.name}
              </Tooltip>
              <Popup>
                <b>{field.name}</b> <br />
                Crop: {field.crop} <br />
                Area: {field.area}
              </Popup>
            </Polygon>
          ))}
          {/* Hotspot zones */}
          {hotspots.map((h, idx) => (
            <CircleMarker
              key={idx}
              center={[h.lat, h.lon]}
              radius={radii[idx] || 10}
              color={getHotspotColor(h.type, h.value)}
              fillOpacity={0.7}
            >
              <Popup>
                Hotspot {idx + 1} <br />
                {h.type === "severity"
                  ? `Severity: ${h.value}`
                  : `Moisture: ${h.value}`}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default GeeMapTest;
