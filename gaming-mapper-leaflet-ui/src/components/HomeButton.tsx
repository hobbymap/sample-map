import { useMap } from "react-leaflet";
import HomeIcon from "@mui/icons-material/Home"; // Import Home Icon
import { IconButton } from "@mui/material";

function HomeButton() {
  const map = useMap();

  const resetView = () => {
    map.setView([40.67, -96.59], 3); // Default center and zoom
  };

  return (
    <IconButton
      onClick={resetView}
      sx={{
        position: "absolute",
        top: "25%", // Placed above the zoom controls
        left: "10px",
        zIndex: 1000,
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "10px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
    >
      <HomeIcon sx={{ fontSize: 30, color: "primary.main" }} />
    </IconButton>
  );
}

export default HomeButton;