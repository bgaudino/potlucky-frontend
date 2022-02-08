import { AppBar, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  const user = {
    name: localStorage.getItem("name") || "Guest",
    email: localStorage.getItem("email"),
  };
  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Link to="/">
            <Typography
              variant="h4"
              component="h1"
              color="#fff"
              sx={{
                m: "1rem 0",
              }}
            >
              🍯 Potlucky
            </Typography>
          </Link>
          <Box display="flex" alignItems="center">
            <Typography component="span" color="#fff">
              Hello, {user.name}
            </Typography>
            &nbsp;
            <AccountCircleIcon sx={{ color: "#fff" }} />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
