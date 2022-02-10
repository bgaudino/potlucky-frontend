import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import ThemeContext from "../context/themeContext";
import { colors } from "../theme/theme";

export default function Settings({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const context: any = useContext(UserContext);
  const themeContext: any = useContext(ThemeContext);
  const { primaryColor, changeTheme } = themeContext;
  const { user, changeUser } = context;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [color, setColor] = useState(
    primaryColor || localStorage.getItem("primaryColor")
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    changeUser({ ...user, name, email });
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleSubmit}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="color-label">Theme</InputLabel>
            <Select
              labelId="primary-color-label"
              value={color}
              onChange={(e: any) => {
                localStorage.setItem("primaryColor", e.target.value);
                setColor(e.target.value);
                changeTheme(e.target.value);
              }}
              sx={{
                mt: 1,
                mb: 1,
                p: 1.5,
                color: color,
              }}
            >
              {colors.map((c) => (
                <MenuItem
                  key={c}
                  value={c}
                  sx={{
                    p: 1.5,
                    color: c,
                  }}
                >
                  {c.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
