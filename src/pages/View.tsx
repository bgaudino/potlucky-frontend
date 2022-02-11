import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPotluck } from "../utils/api";
import AddDishForm from "../components/AddDishForm";
import { Dish, Potluck } from "../types";
import PotluckInfo from "../components/PotluckInfo";
import { Chip, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Discussion from "../components/Discussion";
import Dishes from "../components/Dishes";

export default function View() {
  const [potluck, setPotluck] = useState<Potluck | null>(null);
  const [dishes, setDishes] = useState<Dish[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddDishForm, setShowAddDishForm] = useState(false);

  const { id } = useParams();

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
      <Dishes dishes={dishes} setDishes={setDishes} />
      <Typography variant="h5" sx={{ mt: 4, mb: 0 }}>
        Discussion
      </Typography>
      <Discussion potluckId={potluck?._id} />
    </div>
  );
}
