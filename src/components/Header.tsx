import { AppBar, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="lg">
        <Link to="/">
          <Typography component="h1" variant="h6" mb={2} mt={2} color="white">
            🍯 Potlucky
          </Typography>
        </Link>
      </Container>
    </AppBar>
  );
}
