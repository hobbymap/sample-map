import { IconButton, Typography, Box } from "@mui/material";

interface GamerIconProps {
  onClickFunc: (value: boolean) => void;
}

export default function GamerIcon({ onClickFunc }: GamerIconProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center", // Center vertically
        gap: "10px", // Space between icon and text
      }}
    >
      {/* Clickable Logo */}
      <IconButton
        onClick={() => onClickFunc(true)}
        sx={{
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Gaming Mapper Logo"
          style={{ width: "50px", height: "50px" }}
        />
      </IconButton>

      {/* Text to the Right of Icon */}
      <Typography
        variant="h6"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "left",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
        }}
      >
        The Gaming Mapper
      </Typography>
    </Box>
  );
}
