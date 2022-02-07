import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/potlucks/" + code);
  }
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: "25vh",
        display: "grid",
        gap: 2
      }}
    >
      <div>
        <Typography component="h1" variant="h5" mb={1}>
          Create a Potluck
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={() => navigate("/create")}
        >
          Create
        </Button>
      </div>
      <div>
        <Typography component="h1" variant="h5" mb={1}>
          Find a Potluck
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Potluck Code"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            disabled={!code}
            type="submit"
          >
            Find
          </Button>
        </form>
      </div>
    </Container>
  );
}
