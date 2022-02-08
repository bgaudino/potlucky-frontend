import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPotluck } from "../utils/api";
import AddDishForm from "../components/AddDishForm";
import { Dish, Potluck } from "../types";
import PotluckInfo from "../components/PotluckInfo";
import { Chip, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { theme } from "../theme/theme";

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
          <Box mt={2} display="flex" alignItems="center">
            <Typography component="h2" variant="h5">
              Dishes
            </Typography>
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
          </Box>
          {dishes.length ? (
            <ul>
              {dishes.map((dish) => (
                <li key={dish._id}>
                  <Box component="span" display="flex" alignItems="center">
                    <Typography variant="body1">
                      <span
                        style={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        {dish?.attendee.name}
                      </span>
                      &nbsp;is bringing&nbsp;
                      <span
                        style={{
                          color: theme.palette.secondary.main,
                        }}
                      >
                        {dish?.name}
                      </span>
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
          ) : (
            <Typography variant="body2" sx={{ mt: 1 }}>
              No dishes yet!
            </Typography>
          )}
          {showAddDishForm && (
            <AddDishForm
              potluckId={potluck?._id || ""}
              setDishes={setDishes}
              showForm={setShowAddDishForm}
              takenDishes={dishes.map((dish) => dish.name.toLowerCase().trim())}
            />
          )}
        </>
      )}
    </div>
  );
}
