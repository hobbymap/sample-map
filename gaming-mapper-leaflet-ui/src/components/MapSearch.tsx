import { Autocomplete, Box, TextField } from "@mui/material";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry,  } from "geojson";
import { useMemo, useState } from "react";
import { useMap } from "react-leaflet";

function MapSearch({ gameData }: { gameData: FeatureCollection<Geometry, GeoJsonProperties> | undefined }) {
    const map = useMap();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<Feature<Geometry, GeoJsonProperties>[] | undefined>(undefined);

    const gamingSystems = useMemo(() => {
        return gameData ? gameData.features : [];
      }, [gameData]);
  
    return (
        <Box sx={{ padding: 2 }}>
            <Autocomplete
                freeSolo
                options={gamingSystems.map(f => f?.properties?.gaming_system)}
                inputValue={searchTerm}
                onInputChange={(_, value) => {
                  setSearchTerm(value);
                    if (gameData && value) {
                        const filtered: Feature<Geometry, GeoJsonProperties>[] = gameData.features.filter(f =>
                        f?.properties?.gaming_system.toLowerCase().includes(value.toLowerCase())
                        );
                        setFilteredOptions(filtered);
                    } else {
                        setFilteredOptions([]);
                    }
                  }}
                onChange={(_, selectedName) => {
                  let filtered: Feature<Geometry, GeoJsonProperties>[] | undefined = filteredOptions;
                  if (gameData) {
                    filtered = gameData.features.filter(f =>
                      f?.properties?.gaming_system.toLowerCase().includes(selectedName?.toLowerCase())
                      );
                    setFilteredOptions(filtered)
                    if (filtered) {
                      const match: any = filtered.find(
                        (f: any) => f?.properties?.gaming_system.toLowerCase() === selectedName?.toLowerCase()
                      );
                      if (
                        match &&
                        match?.geometry &&
                        match.geometry &&
                        Array.isArray(match.geometry.coordinates) &&
                        match.geometry.coordinates.length === 2
                      ) {
                        const [lng, lat] = match.geometry.coordinates;
                        map.flyTo([lat, lng], 8, { animate: true, duration: 1.5 });
                      }
                    }
                  }
                }}
                renderInput={(params) => (
                <TextField
                    // spread operator to destructure array/object
                    {...params}
                    label="Search Consoles"
                    variant="filled"
                    sx={{
                      position: "absolute",
                      bottom: "15%",
                      margin: "5px",
                      left: "50%",
                      width: "200px",
                      transform: "translateX(-50%)",
                      zIndex: 1000,
                      backgroundColor: "white",
                      color: "",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                      borderRadius: "5px",
                    }}
                    slotProps={{
                      inputLabel: {
                        sx: {
                          fontWeight: "bold",
                        },
                      }
                    }}
                />
                )}
            />
        </Box>
    );
}

export default MapSearch;