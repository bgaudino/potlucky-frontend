import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={() => navigate("/create")}
        >
          Create a Potluck
        </Button>
      </div>
      <div>
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
            Find a Potluck
          </Button>
        </form>
      </div>
    </Container>
  );
}
