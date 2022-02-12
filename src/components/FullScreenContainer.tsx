import { Box } from "@mui/material";

export default function FullScreenContainer(props: {
  children: React.ReactNode;
}) {
  const { children } = props;
  return (
    <Box
      position="fixed"
      zIndex={-1}
      top={0}
      left={0}
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {children}
    </Box>
  );
}
