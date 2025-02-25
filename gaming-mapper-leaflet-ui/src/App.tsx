import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { FeatureCollection } from "geojson";
import MapLibreTileLayer from "./MapLibreTileLayer";
import React from "react";
import MemoizedMarker from "./components/MemoizedMarker";

export default function App() {
  const [gameData, setGameData] = useState<FeatureCollection | null>(null);
  
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/gaming-systems.geojson`)
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

// Fetch Wikipedia content for a specific gaming system
const fetchWikiContent = async (title: string, id: string) => {
  const wikiContent = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
  )
    .then((response) => response.json())
    .then((data) => (data.extract ? data.extract : "No summary available."))
    .catch(() => "Error loading Wikipedia content.");

  return wikiContent;
};

const markers = React.useMemo(() => (
  gameData?.features.map((feature: any) => (
    <MemoizedMarker
      key={feature.id}
      feature={feature}
      fetchWikiContent={fetchWikiContent}
    />
  ))
), [gameData]);  // Re-run when gameData changes

// Inside the main component:
return (
  <div id="map-container" style={{ height: "100vh", width: "100%" }}>
    <MapContainer center={[40.67, -96.59]} maxZoom={22} zoom={3} style={{ height: "100%", width: "100%" }}>
      {/* This works, but need API when deploying */}
      {/* <MapLibreTileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url="https://tiles.stadiamaps.com/styles/alidade_smooth.json"
        maxZoom={22}
      /> */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />

      {/* Marker Clustering with Custom Cluster Icons */}
      <MarkerClusterGroup
        showCoverageOnHover={true}
        maxClusterRadius={50}
        spiderfyDistanceMultiplier={2.5}  // Increase spacing when expanded
        disableClusteringAtZoom={15} // Uncluster markers at close zoom
        spiderLegPolylineOptions={{ weight: 1.5, color: "#007bff", opacity: 0.6 }} // Style spider lines
        iconCreateFunction={createClusterIcon} // Apply the custom cluster styling
      >
        {markers}
      </MarkerClusterGroup>
    </MapContainer>
  </div>
);
}

export function renderToDom(container: HTMLElement) {
  createRoot(container).render(<App />);
}
