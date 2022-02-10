import { useState } from "react";
import { makeTheme, colors } from "./theme/theme";
import Main from "./Main";
import ThemeContext from "./context/themeContext";

function App() {
  const [theme, setTheme] = useState(
    makeTheme(localStorage.getItem("primaryColor") || colors[0])
  );

  function handleThemeChange(
    primaryColor: string,
    secondaryColor: string | null = null
  ) {
    setTheme(makeTheme(primaryColor, secondaryColor));
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        changeTheme: handleThemeChange,
      }}
    >
      <Main />
    </ThemeContext.Provider>
  );
}

export default App;
