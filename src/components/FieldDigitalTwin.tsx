import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup, Tooltip, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const timelineData = [
  {
    date: "2024-06-01",
    ndvi: { tile_url: "https://example.com/ndvi/2024-06-01/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.071, lon: 78.062, type: "severity", value: "high" },
      { lat: 10.072, lon: 78.064, type: "severity", value: "low" }
    ] },
    ndwi: { tile_url: "https://example.com/ndwi/2024-06-01/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.073, lon: 78.065, type: "moisture", value: "high" }
    ] },
    lst: { tile_url: "https://example.com/lst/2024-06-01/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.074, lon: 78.065, type: "severity", value: "high" }
    ] }
  },
  {
    date: "2024-06-08",
    ndvi: { tile_url: "https://example.com/ndvi/2024-06-08/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.073, lon: 78.063, type: "severity", value: "low" }
    ] },
    ndwi: { tile_url: "https://example.com/ndwi/2024-06-08/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.070, lon: 78.067, type: "moisture", value: "low" }
    ] },
    lst: { tile_url: "https://example.com/lst/2024-06-08/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.073, lon: 78.062, type: "severity", value: "high" }
    ] }
  },
  {
    date: "2024-06-15",
    ndvi: { tile_url: "https://example.com/ndvi/2024-06-15/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.070, lon: 78.066, type: "severity", value: "high" }
    ] },
    ndwi: { tile_url: "https://example.com/ndwi/2024-06-15/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.072, lon: 78.067, type: "moisture", value: "high" }
    ] },
    lst: { tile_url: "https://example.com/lst/2024-06-15/{z}/{x}/{y}.png", hotspots: [
      { lat: 10.073, lon: 78.064, type: "severity", value: "low" }
    ] }
  }
];

const FieldDigitalTwin = ({ 
  apiBase = "http://localhost:5000",
  center = [10.07, 78.06],
  zoom = 13,
  height = "500px",
  width = "100%",
  fieldPolygons = null,
  showLayerSelector = true,
  initialLayer = "ndvi"
}) => {
  const [tileUrl, setTileUrl] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(initialLayer);
  const [hotspots, setHotspots] = useState([]);
  const [radii, setRadii] = useState([]);
  const [timelineIdx, setTimelineIdx] = useState(timelineData.length - 1);

  // Default field polygons if none provided
  const defaultFieldPolygons = [
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

  const fieldsToRender = fieldPolygons || defaultFieldPolygons;

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

  // Update tileUrl and hotspots based on timeline and layer
  useEffect(() => {
    const current = timelineData[timelineIdx][selectedLayer];
    setTileUrl(current.tile_url);
    setHotspots(current.hotspots);
    setRadii(new Array(current.hotspots.length).fill(10));
  }, [selectedLayer, timelineIdx]);

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
    <div>
      {showLayerSelector && (
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="layer-select" style={{ marginRight: "10px" }}>
            Choose Layer:
          </label>
          <select
            id="layer-select"
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value)}
            style={{ padding: "6px" }}
          >
            <option value="ndvi">NDVI (Vegetation Health)</option>
            <option value="ndwi">NDWI (Water Index)</option>
            <option value="lst">Land Surface Temp</option>
          </select>
        </div>
      )}

      {/* Timeline slider */}
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="timeline-slider" style={{ marginRight: "10px" }}>
          Timeline:
        </label>
        <input
          id="timeline-slider"
          type="range"
          min={0}
          max={timelineData.length - 1}
          value={timelineIdx}
          onChange={e => setTimelineIdx(Number(e.target.value))}
          style={{ width: "200px", verticalAlign: "middle" }}
        />
        <span style={{ marginLeft: "12px", fontWeight: "bold" }}>
          {timelineData[timelineIdx].date}
        </span>
      </div>

      <div style={{ height, width }}>
        <MapContainer
          center={center}
          zoom={zoom}
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
          {fieldsToRender.map((field, idx) => (
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

export default FieldDigitalTwin;