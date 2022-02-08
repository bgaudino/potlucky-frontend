import { Typography } from "@mui/material";
import CreatePotluckForm from "../components/CreatePotluckForm";

export default function Create() {
  return (
    <div className="container">
      <Typography variant="h5" component="h2" m="1rem 0">
        Create a Potluck
      </Typography>
      <CreatePotluckForm />
    </div>
  );
}
