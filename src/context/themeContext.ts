import { createTheme } from "@mui/material";
import { createContext } from "react";

const ThemeContext: any = createContext({
  theme: createTheme({
    palette: {
      primary: {
        main: "#00bcd4",
      },
      secondary: {
        main: "#f50057",
      },
    },
  }),
  changeTheme: () => {},
});

export default ThemeContext;
