import { createTheme } from "@mui/material";

const colors = [
  "#f44336",
  "#e91e63",
  "#097031",
  "#00bcd4",
  "#3f51b5",
  "#9c27b0",
  "#673ab7",
  "#ff9800",
  "#795548",
  "#607d8b",
  "#f50057",
];

export const theme = createTheme({
  palette: {
    primary: {
      main: colors[Math.floor(Math.random() * (colors.length))],
    },
    secondary: {
      main: colors[Math.floor(Math.random() * (colors.length))],
    },
  },
  typography: {
    fontFamily: "Short Stack, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
