import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { FeatureCollection } from "geojson";
import MapLibreTileLayer from "./MapLibreTileLayer";

export default function App() {
  const [gameData, setGameData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/gaming-systems.geojson")
      .then((response) => response.json())
      .then((data) => setGameData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  function MapClickHandler() {
    useMapEvent("click", () => {});
    return null;
  }

  // Custom cluster icon function
  const createClusterIcon = (cluster: any) => {
    const count = cluster.getChildCount(); // Get number of markers in cluster
    return new L.DivIcon({
      html: `<div style="
        background-color: rgba(0, 123, 255, 0.7);
        color: white;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: bold;
        border: 2px solid white;
      ">${count}</div>`,
      className: "custom-cluster-icon",
      iconSize: [40, 40], // Size of the cluster icon
    });
  };

  return (
    <div id="map-container" style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[40.67, -96.59]} maxZoom={22} zoom={3} style={{ height: "100%", width: "100%" }}>
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {/* <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        /> */}
        <MapLibreTileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/styles/alidade_smooth.json"
          maxZoom={22}
        />
        <MapClickHandler />

        {/* Marker Clustering with Custom Cluster Icons */}
        <MarkerClusterGroup
          showCoverageOnHover={false}
          maxClusterRadius={50}
          iconCreateFunction={createClusterIcon} // Apply the custom cluster styling
        >
          {gameData?.features.map((feature: any) => (
            <Marker
              key={feature.id}
              position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
              icon={L.icon({
                iconUrl: feature.properties.icon_url || "/icons/console.png", // Fallback if icon is missing
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
              })}
            >
              <Popup>
                <h3>{feature.properties.game_name}</h3>
                <p><strong>System:</strong> {feature.properties.gaming_system}</p>
                <img 
                  src={feature.properties.image_url} 
                  alt={feature.properties.gaming_system} 
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    marginBottom: "10px"
                  }} 
                />
                <p><strong>Author:</strong> {feature.properties.author}</p>
                <p><strong>Release Date:</strong> {feature.properties.release_date}</p>
                <p><strong>Location:</strong> {feature.properties.release_location_city}</p>
                <p><strong>Company:</strong> {feature.properties.company}</p>
                <p><strong>Details:</strong> {feature.properties.details}
                  <a target={"blank"} href={feature.properties.details_url}> Read more...</a>
                </p>
                <a style={{fontSize: "5px"}} target={"blank"} href={feature.properties.icon_attribution_url}>{feature.properties.icon_attribution_title}</a>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export function renderToDom(container: HTMLElement) {
  createRoot(container).render(<App />);
}
