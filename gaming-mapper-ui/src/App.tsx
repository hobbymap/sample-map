import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Map, MapRef, Source, Layer, MapMouseEvent, Popup } from "@vis.gl/react-maplibre";
import { FeatureCollection, Feature, GeoJSON, Geometry, GeoJsonProperties } from "geojson";

export default function App() {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<{ content: any; coordinates: any } | null>(null);

  const defaultLoc: GeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        id: 99,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-74.006, 40.7128],
        },
        properties: {
          id: 99,
          gaming_system: "Magnavox Odyssey",
          game_name: "Table Tennis",
          release_date: "9/1/1972",
          release_location_city: "New York",
          author: "Ralph Baer",
          company: "Magnavox",
          icon_url: "/icons/console.png",
          icon_name: "magnavox",
          icon_attribution: ""
        },
      },
    ],
  };

  const [gameData, setGameData] = useState<FeatureCollection>();

  useEffect(() => {
    fetch("/gaming-systems.geojson")
      .then((response) => response.json())
      .then((data) => setGameData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  useEffect(() => {
    if (gameData && mapRef.current) {
      const map = mapRef.current;
  
      const loadImages = async () => {
        for (const feature of gameData.features) {
          if (feature.properties?.icon_url && feature.properties?.icon_name) {
            const imageId = `${feature.properties.icon_name}`; // Use icon_name
            
            if (!map.hasImage(imageId)) {
              try {
                const _image: any = await map.loadImage(feature.properties.icon_url);
                if (_image?.data) {
                  map.addImage(imageId, _image.data);
                }
              } catch (error) {
                console.error(`Failed to load image ${feature.properties.icon_url}:`, error);
              }
            }
          }
        }
      };
  
      loadImages(); // Run async function
    }
  }, [gameData]);

  const onClick = (event: MapMouseEvent) => {
    if (mapRef.current) {
      const features = mapRef.current.queryRenderedFeatures(event.point);

      if (features.length > 0) {
        const feature: any = features[0];
        if (feature) {
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
            const { gaming_system, game_name, release_date, release_location_city, author, company } = feature.properties;
            const coordinates = feature.geometry?.coordinates;

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
      <div id="map-container" style={{ height: "100vh", width: "100%" }}>
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
                "icon-image": ["get", "icon_name"], 
                "icon-size": 0.1,
                "icon-allow-overlap": true,
              }}
            />
          </Source>

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
      </div>
    </>
  );
}

export function renderToDom(container: HTMLElement) {
  createRoot(container).render(<App />);
}
