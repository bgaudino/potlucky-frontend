import { useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  useMediaQuery
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Potluck } from "../types";
import { formatTime, formatDate } from "../utils/datetime";
import Label from "./Label";
import { isEmail } from "../utils/validation";
import { sendEmail } from "../utils/api";

export default function PotluckInfo(props: { potluck: Potluck }) {
  const { potluck } = props;
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [email, setEmail] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  function copyLink() {
    const link = `${window.location.origin}/potlucks/${potluck._id}`;
    navigator.clipboard.writeText(link);
    setSnackbarText("Link copied to clipboard");
    setShowSnackbar(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await sendEmail(email, potluck);
      setSnackbarText("Email sent!");
    } catch (err) {
      setSnackbarText("Error sending email");
    } finally {
      setEmail("");
      setShowSnackbar(true);
    }
  }

  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ m: "1rem 0" }}>
        {potluck?.name}
      </Typography>
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={snackbarText}
        autoHideDuration={3000}
      />
      <Typography variant="body2">
        <Label text="Date" />
        {formatDate(potluck?.date)} at {formatTime(potluck?.date)}
      </Typography>
      {potluck?.location && (
        <Typography variant="body2">
          <Label text="Location" />
          {potluck?.location}
        </Typography>
      )}
      {potluck?.description && (
        <Typography variant="body2">
          <Label text="Description" />
          {potluck?.description}
        </Typography>
      )}
      <Typography variant="body2">
        <Label text="Host" />
        {potluck?.host.name}
        {potluck?.host.email && (
          <>
            &nbsp; (
            <a href={`mailto:${potluck?.host.email}`}>{potluck?.host.email}</a>)
          </>
        )}
      </Typography>
      <Typography variant="h5" component="h2" sx={{ m: "1rem 0" }}>
        Share
      </Typography>
      <Box display="flex" alignItems="center">
        <form onSubmit={handleSubmit} style={{
          flexGrow: 1,
        }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={!email || !isEmail(email)}
                    edge="end"
                    type="submit"
                  >
                    <SendIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
        <Button
          variant="outlined"
          color="secondary"
          onClick={copyLink}
          sx={{ ml: 1 }}
        >
          {!isMobile && <span>Copy Link&nbsp;</span>}
          <ContentCopyIcon />
        </Button>
      </Box>
      {/* <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Invitees:</strong>{" "}
        {inviteeList.map((invitee) => invitee).join(", ")}
      </Typography> */}
    </div>
  );
}
