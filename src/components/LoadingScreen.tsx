import { Box, LinearProgress, Typography } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      margin={0}
      padding={0}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div>
        <Typography variant="h4">Loading...</Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </div>
    </Box>
  );
}
