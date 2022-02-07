import { AppBar, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="lg">
        <Link to="/">
          <h3 style={{ color: "white" }}>🍯 Potlucky</h3>
        </Link>
      </Container>
    </AppBar>
  );
}
