import {Autocomplete, Box, TextField } from "@mui/material";
import { FeatureCollection,  } from "geojson";
import { useMemo, useState } from "react";
import { useMap } from "react-leaflet";

function MapSearch({ gameData }: { gameData: FeatureCollection | null }) {
    const map = useMap();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<any[]>([]);

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
                        const filtered: any = gameData.features.filter(f =>
                        f?.properties?.gaming_system.toLowerCase().includes(value.toLowerCase())
                        );
                        setFilteredOptions(filtered);
                    } else {
                        setFilteredOptions([]);
                    }
                  }}
                onChange={(_, selectedName) => {
                  const filtered: any = gameData?.features.filter(f =>
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
                }}
                renderInput={(params) => (
                <TextField
                    // spread operator to destructure array/object
                    {...params}
                    label="Search Console"
                    variant="outlined"
                    sx={{
                    position: "absolute",
                    bottom: "200px",
                    left: "50%",
                    width: "200px",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                    backgroundColor: "white",
                    borderRadius: "5px",
                    }}
                />
                )}
            />
        </Box>
    );
}

export default MapSearch;