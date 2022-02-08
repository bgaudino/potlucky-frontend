import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import Home from "./pages/Home";
import Create from "./pages/Create";
import View from "./pages/View";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/potlucks/:id" element={<View />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
