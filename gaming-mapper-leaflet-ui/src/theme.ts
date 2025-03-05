import { createTheme } from "@mui/material/styles";
import "@fontsource/vt323"; // Import the font

const theme = createTheme({
  typography: {
    fontFamily: '"VT323", monospace',
    h1: { fontFamily: '"VT323", monospace' },
    h2: { fontFamily: '"VT323", monospace' },
    h3: { fontFamily: '"VT323", monospace' },
    body1: { fontFamily: '"VT323", monospace' },
    body2: { fontFamily: '"VT323", monospace' },
    button: { fontFamily: '"VT323", monospace' },
  },
});

export default theme;
