import { LinearProgress, Typography } from "@mui/material";
import FullScreenContainer from "./FullScreenContainer";

export default function LoadingScreen() {
  return (
    <FullScreenContainer>
      <div>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Loading...
        </Typography>
        <LinearProgress />
      </div>
    </FullScreenContainer>
  );
}
