import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import Create from "./pages/Create";
import View from "./pages/View";
import Header from "./components/Header";
import UserContext from "./context/userContext";
import { useContext, useState } from "react";
import ThemeContext from "./context/themeContext";

function Main() {
  const [user, setUser] = useState({
    name: localStorage.getItem("name") || "Guest",
    email: localStorage.getItem("email")
  });

  const context: any = useContext(ThemeContext);

  function changeUser(user: { name: string; email: string }) {
    setUser(user);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
  }

  return (
    <ThemeProvider theme={context?.theme}>
      <UserContext.Provider
        value={{
          user,
          changeUser
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/potlucks/:id" element={<View />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default Main;
