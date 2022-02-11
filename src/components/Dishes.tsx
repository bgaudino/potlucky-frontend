import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Typography,
  useMediaQuery
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Dish } from "../types";
import { useContext } from "react";
import UserContext from "../context/userContext";
import { deleteDish } from "../utils/api";
import AddDishForm from "./AddDishForm";

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

function displayRestrictions(dish: Dish) {
  const restrictions: string[] = [];
  if (dish.isVegan) restrictions.push("VV");
  else {
    if (dish.isVegetarian) restrictions.push("V");
    if (dish.isDairyFree) restrictions.push("DF");
  }
  if (dish.isGlutenFree) restrictions.push("GF");
  if (dish.isKosher) restrictions.push("K");
  if (dish.isHalal) restrictions.push("H");
  return restrictions;
}

export default function Dishes(props: { dishes: Dish[]; setDishes: any }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { dishes, setDishes } = props;
  const context: any = useContext(UserContext);
  const { user } = context;
  const [currentDish, setCurrentDish] = useState<Dish | null>(null);
  const takenDishes = dishes
    .filter((dish: Dish) => dish !== currentDish)
    .map((dish: Dish) => dish.name.toLowerCase().trim());

  const isMobile = useMediaQuery("(max-width:600px)");

  async function handleDelete(id: string | undefined) {
    if (!id) return;
    try {
      const res = await deleteDish(id);
      if (res._id === id) {
        setDishes((prevDishes: Dish[]) =>
          prevDishes.filter((dish) => dish._id !== id)
        );
      }
    } catch (err) {
      alert("Error deleting dish");
    }
  }

  if (!dishes.length)
    return (
      <Typography variant="body2" sx={{ mt: 1 }}>
        No dishes yet!
      </Typography>
    );

  return (
    <ul>
      {dishes.map((dish: Dish) => (
        <li
          key={dish._id}
          style={{
            display: isMobile ? "block" : "flex",
            justifyContent: "space-between"
          }}
        >
          <Box
            component="span"
            display={isMobile ? "block" : "flex"}
            alignItems="center"
          >
            <Typography
              variant="body1"
              sx={{
                padding: 1,
                fontSize: "1.05rem"
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
            {displayRestrictions(dish).map((restriction: string) => (
              <Chip
                key={restriction}
                label={restriction}
                sx={{ ml: 1 }}
                color="primary"
              />
            ))}
          </Box>
          {dish?.attendee.name === user?.name && (
            <div>
              <Button
                size="small"
                color="info"
                onClick={() => {
                  setCurrentDish(dish);
                  setShowEditForm(true);
                }}
              >
                <EditIcon />
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(dish?._id)}
              >
                <DeleteIcon />
              </Button>
            </div>
          )}
          {isMobile && <Divider />}
        </li>
      ))}
      {showEditForm && currentDish && (
        <AddDishForm
          potluckId={dishes.length > 0 ? dishes[0].potluck_id : ""}
          setDishes={setDishes}
          showForm={setShowEditForm}
          takenDishes={takenDishes}
          currentDish={currentDish}
        />
      )}
    </ul>
  );
}
