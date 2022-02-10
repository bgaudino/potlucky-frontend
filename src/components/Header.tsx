import { AppBar, Box, Container, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import Settings from "./Settings";

export default function Header() {
  const context: any = useContext(UserContext);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { user } = context;
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
            <IconButton onClick={() => setSettingsOpen(true)}>
              <AccountCircleIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
      <Settings open={settingsOpen} setOpen={setSettingsOpen} />
    </AppBar>
  );
}
