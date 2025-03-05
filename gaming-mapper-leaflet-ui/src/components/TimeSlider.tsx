import { Typography, Box, Slider } from "@mui/material";
import "@fontsource/vt323"; // Import the VT323 font (console-style)

interface SliderProps {
    setSelectedYearFunc: (value: number) => void;
    selectedYear: number;
}

export default function TimeSlider({ setSelectedYearFunc, selectedYear }: SliderProps) {
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSelectedYearFunc(newValue as number);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: "60px",
                left: "50%",
                transform: "translateX(-50%)",
                // display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "400px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "5px",
                borderRadius: "10px",
                zIndex: 1000,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                margin: "12px",

                // "@media (orientation: landscape)": {
                //     top: "90px",
                // },
                // "@media (orientation: landscape) and (max-width: 768px)": {
                //     top: "90px",
                //     width: "85%",
                // },
            }}
        >
            {/* Year Selection Slider */}
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        textAlign: "center",
                        letterSpacing: "1px", // Slight spacing for a classic look
                        textTransform: "uppercase", // Adds to the retro feel
                    }}
                >
                    Select Console Year
                </Typography>
                <Slider
                    value={selectedYear}
                    onChange={handleSliderChange}
                    min={1970}
                    max={2024}
                    step={1}
                    marks={[
                        { value: 1970, label: "1970" },
                        { value: 2024, label: "2024" },
                    ]}
                    valueLabelDisplay="auto"
                    sx={{
                        width: "90%",
                    }}
                />
            </Box>
        </Box>
    );
}
