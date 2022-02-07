import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPotluck } from "../utils/api";
import AddDishForm from "../components/AddDishForm";
import { Dish, Potluck } from "../types";
import { categoryColorMap } from "../utils/food";
import PotluckInfo from "../components/PotluckInfo";
import { Chip, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function View() {
  const [potluck, setPotluck] = useState<Potluck | null>(null);
  const [dishes, setDishes] = useState<Dish[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddDishForm, setShowAddDishForm] = useState(false);

  const { id } = useParams();

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

  useEffect(() => {
    getPotluck(id || "")
      .then((data) => {
        setPotluck(() => data.potluck);
        setDishes(() => data.dishes);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      {loading ? null : (
        <>
          {potluck && <PotluckInfo potluck={potluck} />}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3>Dishes</h3>
            <Fab
              color="primary"
              size="small"
              onClick={() => setShowAddDishForm((prevState) => !prevState)}
              sx={{
                margin: "0 1rem",
                display: "flex",
              }}
            >
              <AddIcon />
            </Fab>
          </div>
          {dishes.length ? (
            <ul>
              {dishes.map((dish) => (
                <li
                  key={dish._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: "2rem",
                  }}
                >
                  {dish?.attendee?.name} is bringing {dish?.name}
                  {dish?.category && (
                    <Chip
                      label={dish?.category}
                      sx={{ ml: 1 }}
                      color={getColor(dish?.category)}
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            "No dishes yet"
          )}
          {showAddDishForm && (
            <AddDishForm
              potluckId={potluck?._id || ""}
              setDishes={setDishes}
              showForm={setShowAddDishForm}
            />
          )}
        </>
      )}
    </div>
  );
}
