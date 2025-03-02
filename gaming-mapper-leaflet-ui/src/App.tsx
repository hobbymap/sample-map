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
import Slider from "@mui/material/Slider";
import { Box, Dialog, DialogTitle, DialogContent, Typography, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function App() {
  const [gameData, setGameData] = useState<FeatureCollection | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024); // Default year, show all years
  const [aboutOpen, setAboutOpen] = useState(false); // State for About Dialog

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

const markers = React.useMemo(() => {
  if (!gameData) return [];

  // Store unique markers in a Map (ensures no duplicate markers)
  const uniqueMarkers = new Map<string, any>();

  gameData.features.forEach((feature: any) => {
    const releaseYear = new Date(feature.properties.release_date).getFullYear();

    // Add only if the release year is <= selectedYear
    if (releaseYear <= selectedYear) {
      uniqueMarkers.set(feature.id, feature); // Prevents duplicate markers
    }
  });

  return Array.from(uniqueMarkers.values()).map((feature) => (
    <MemoizedMarker key={feature.id} feature={feature} fetchWikiContent={fetchWikiContent} />
  ));
}, [gameData, selectedYear]); // Updates only when data or selected year changes

const handleSliderChange = (_: Event, newValue: number | number[]) => {
  setSelectedYear(newValue as number);
};

// Inside the main component:
return (
  <div id="map-container" style={{ height: "100vh", width: "100%", position: "relative" }}>
    {/* Floating Info Button */}
    <IconButton
      onClick={() => setAboutOpen(true)}
      sx={{
        position: "absolute",
        bottom: 20, // Moves it to the lower part of the screen
        left: 20, // Moves it to the left side
        zIndex: 5000, // Ensures it's above the map
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "15px", // Makes button larger
        boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
    >
      <InfoIcon sx={{ fontSize: 40, color: "primary.main" }} /> {/* Makes the icon larger */}
    </IconButton>

    {/* About Page Dialog */}
    <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)}>
      <DialogTitle>About This Map</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          This interactive map displays the **history of gaming systems** and their **global releases**.
          Explore the different gaming consoles by selecting a year, and clicking on the markers to view more details.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2, fontStyle: "italic" }}>
          Data sourced from Wikipedia and other gaming archives.
        </Typography>
      </DialogContent>
    </Dialog>

    <Box
      sx={{
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)", // Centers it horizontally
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "15px",
        borderRadius: "8px",
        zIndex: 1000,
        width: "350px", // Adjust width as needed
        textAlign: "center", // Centers text and slider label
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centers content inside
      }}
    >
      <Typography variant="h6">Select Year</Typography>
      <Slider
        value={selectedYear}
        onChange={handleSliderChange}
        min={1970}
        max={2024}
        step={1}
        marks
        valueLabelDisplay="auto"
        sx={{
          width: "90%", // Ensure slider doesn't take full width
        }}
      />
    </Box>
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
