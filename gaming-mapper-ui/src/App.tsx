import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Map, MapRef, Source, Layer, MapMouseEvent, Popup } from "@vis.gl/react-maplibre";
import { GeoJSON, Geometry, GeoJsonProperties } from "geojson";

export default function App() {
  const mapRef = useRef<MapRef>(null); // mapRef might be null initially
  const [popupInfo, setPopupInfo] = useState<{ content: any; coordinates: any } | null>(null); // State to store popup content

  // Default GeoJSON for testing
  const defaultLoc: GeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        id: 1,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-74.006, 40.7128],
        },
        properties: {
          gaming_system: "Magnavox Odyssey",
          game_name: "Table Tennis",
          release_date: "9/1/1972",
          release_location_city: "New York",
          author: "Ralph Baer",
          company: "Magnavox",
          icon: "game-icon", // Use the same icon for all points
        },
      },
    ],
  };

  const [gameData, setGameData] = useState<GeoJSON<Geometry, GeoJsonProperties>>();

  // Fetch JSON from public folder
  useEffect(() => {
    fetch("/gaming-systems.geojson") // Path relative to public/
      .then((response) => response.json())
      .then((data) => setGameData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  // Load image for the icon once map is loaded
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("load", async () => {
        // Check if the image already exists before adding
        if (!mapRef?.current?.hasImage("game-icon")) {
          const _image: any = await mapRef.current?.loadImage("/icons/console.png");
          if (_image) {
            mapRef.current?.addImage("game-icon", _image?.data); // Add the icon once to the map
          }
        }
      });
    }
  }, [gameData]);

  // Handle click event on the map
  const onClick = (event: MapMouseEvent) => {
    if (mapRef.current) {
      // Query features at the clicked point
      const features = mapRef.current.queryRenderedFeatures(event.point);

      if (features.length > 0) {
        const feature: any = features[0]; // Get the clicked feature
        if (feature) {
          // Handle the case if the clicked feature is a cluster
          if (feature.properties.cluster) {
            const clusterId = feature.properties.cluster_id;
            const geojsonSource: any = mapRef.current?.getSource("gameData");
            if (geojsonSource) {
              geojsonSource.getClusterExpansionZoom(clusterId).then((zoom: number) => {
                mapRef.current?.easeTo({
                  center: feature.geometry?.coordinates,
                  zoom: zoom,
                  duration: 500,
                });
              });
            }
          } else {
            // Handle the case for individual points (non-clustered)
            const {
              gaming_system,
              game_name,
              release_date,
              release_location_city,
              author,
              company,
            } = feature.properties;
            const coordinates = feature.geometry?.coordinates;

            // Set the popup content
            const popupContent = (
              <div>
                <h3>{game_name}</h3>
                <p><strong>System:</strong> {gaming_system}</p>
                <p><strong>Author:</strong> {author}</p>
                <p><strong>Release Date:</strong> {release_date}</p>
                <p><strong>Location:</strong> {release_location_city}</p>
                <p><strong>Company:</strong> {company}</p>
              </div>
            );

            // Set the popup state and position
            setPopupInfo({
              content: popupContent,
              coordinates,
            });
          }
        }
      }
    }
  };

  return (
    <>
      <Map
        id="map-container"
        initialViewState={{
          latitude: 40.67,
          longitude: -96.59,
          zoom: 3,
        }}
        mapStyle="https://demotiles.maplibre.org/style.json"
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="gameData"
          type="geojson"
          data={gameData && "features" in gameData ? gameData : defaultLoc}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer
            id="gameIcons"
            type="symbol"
            layout={{
              "icon-image": "game-icon", // Use the added image
              "icon-size": 0.1, // Adjust icon size
              "icon-allow-overlap": true,
            }}
          />
        </Source>

        {/* Display popup if popupInfo state is set */}
        {popupInfo && (
          <Popup
            longitude={popupInfo?.coordinates[0]}
            latitude={popupInfo?.coordinates[1]}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
          >
            {popupInfo?.content}
          </Popup>
        )}
      </Map>
    </>
  );
}

export function renderToDom(container: HTMLElement) {
  createRoot(container).render(<App />);
}
