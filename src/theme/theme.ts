import { createTheme } from "@mui/material";

export const colors = [
  "#f44336", // red
  "#e91e63", // pink
  "#097031", // green
  "#00bcd4", // cyan
  "#3f51b5", // blue
  "#ff9800", // orange
  "#795548", // brown
  "#607d8b", // blue grey
];

export function makeTheme(
  primaryColor: string,
  secondaryColor: string | null = null
) {
  return createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor || primaryColor,
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
}
