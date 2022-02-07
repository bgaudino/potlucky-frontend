import { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import { Potluck } from "../types";
import { formatTime, formatDate } from "../utils/datetime";
import Label from "./Label";

export default function PotluckInfo(props: { potluck: Potluck }) {
  const { potluck } = props;
  const [showSnackbar, setShowSnackbar] = useState(false);

  function copyLink() {
    const link = `${window.location.origin}/potlucks/${potluck._id}`;
    navigator.clipboard.writeText(link);
    setShowSnackbar(true);
  }
  return (
    <div>
      <h1>{potluck?.name}</h1>
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message="Link copied to clipboard"
        autoHideDuration={3000}

      />
      <Button
        variant="text"
        color="primary"
        size="small"
        onClick={copyLink}
      >
        Copy Link
      </Button>
      <div className="grid">
        <p>
          <Label text="Description" />
          {potluck?.description}
        </p>
        <p>
          <Label text="Location" />
          {potluck?.location}
        </p>
        <p>
          <Label text="Date" />
          {formatDate(potluck?.date)}
        </p>
        <p>
          <Label text="Time" />
          {formatTime(potluck?.date)}
        </p>
        <p>
          <Label text="Host" />
          {potluck?.host.name}
        </p>
        <p>
          <Label text="Host Email" />
          {potluck?.host.email}
        </p>
      </div>
    </div>
  );
}
