import { Box, Chip, Typography } from "@mui/material";
import { Dish } from "../types";

function getColor(category: string) {
  switch (category) {
    case "main":
      return "primary";
    case "side":
      return "secondary";
    case "dessert":
      return "info";
    case "beverage":
      return "error";
    default:
      return "default";
  }
}

export default function Dishes(props: { dishes: Dish[] }) {
  const { dishes } = props;

  if (!dishes.length)
    return (
      <Typography variant="body2" sx={{ mt: 1 }}>
        No dishes yet!
      </Typography>
    );

  return (
    <ul>
      {dishes.map((dish: Dish) => (
      <li key={dish._id}>
          <Box component="span" display="flex" alignItems="center">
            <Typography
              variant="body1"
              sx={{
                padding: 1,
                fontSize: "1.05rem",
              }}
            >
              <span>{dish?.attendee.name}</span>
              &nbsp;is bringing&nbsp;
              <span>{dish?.name}</span>
            </Typography>
            {dish?.category && (
              <Chip
                label={dish?.category}
                sx={{ ml: 1 }}
                color={getColor(dish?.category)}
              />
            )}
          </Box>
        </li>
      ))}
    </ul>
  );
}
