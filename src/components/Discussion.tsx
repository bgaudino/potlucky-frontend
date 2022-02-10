import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { createComment, getComments } from "../utils/api";
import { formatDate, formatTime } from "../utils/datetime";

export default function Discussion(props: { potluckId: string | undefined }) {
  const { potluckId } = props;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const context: any = useContext(UserContext);
  const { user } = context;

  useEffect(() => {
    if (!potluckId) return;
    getComments(potluckId)
      .then((data) => setComments(() => data))
      .catch((err) => console.log(err));
  }, [potluckId]);

  async function handleSubmit() {
    try {
      const res = await createComment(
        user.name || "Guest",
        user.email,
        comment,
        potluckId || ""
      );
      setComments(() => [...comments, res]);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setComment("");
    }
  }

  return (
    <List>
      {comments.map((comment) => (
        <div key={comment._id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{comment.displayName[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.displayName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.body}
                  </Typography>
                  {` - ${formatDate(comment.createdAt)} @ ${formatTime(
                    comment.createdAt
                  )}`}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider />
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          multiline
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </form>
    </List>
  );
}
