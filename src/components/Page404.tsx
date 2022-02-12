import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FullScreenContainer from "./FullScreenContainer";

export default function Page404() {
  const navigate = useNavigate();
  return (
    <FullScreenContainer>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Oops!
      </Typography>
      <img
        style={{
          height: "150px",
          width: "auto",
          maxWidth: "100%"
        }}
        src="https://images.unsplash.com/photo-1584472376859-889e77a8ccac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
        alt="Empty grocery store shelves"
      />
      <Typography variant="subtitle1">There's nothing here</Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Home
      </Button>
    </FullScreenContainer>
  );
}
