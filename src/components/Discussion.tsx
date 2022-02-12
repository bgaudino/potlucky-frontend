import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Divider,
  TextField
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { createComment, getComments } from "../utils/api";
import { formatDate, formatTime } from "../utils/datetime";

export default function Discussion(props: { potluckId: string | undefined }) {
  const { potluckId } = props;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const context: any = useContext(UserContext);
  const { user } = context;

  useEffect(() => {
    if (!potluckId) return;
    getComments(potluckId)
      .then((data) => setComments(() => data))
      .catch((err) => console.log(err));
  }, [potluckId]);

  async function handleSubmit() {
    if (loading) return;
    setLoading(true);
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
      setLoading(false);
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
          if (!comment) return;
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
              if (!comment) return;
              handleSubmit();
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!comment || loading}
          fullWidth
          sx={{
            mt: 2,
            mb: 4
          }}
        >
          Post Comment
        </Button>
      </form>
    </List>
  );
}
