import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPotluck } from "../utils/api";
import AddDishForm from "../components/AddDishForm";
import { Dish, Potluck } from "../types";
import PotluckInfo from "../components/PotluckInfo";
import { Button, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Discussion from "../components/Discussion";
import Dishes from "../components/Dishes";
import Chart from "../components/Chart";
import LoadingScreen from "../components/LoadingScreen";

export default function View() {
  const [potluck, setPotluck] = useState<Potluck | null>(null);
  const [dishes, setDishes] = useState<Dish[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
  const [showAddDishForm, setShowAddDishForm] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const minLoadingTime = 500;

  useEffect(() => {
    let minLoadingTimeElapsed = false;
    setTimeout(() => (minLoadingTimeElapsed = true), minLoadingTime);
    getPotluck(id || "")
      .then((data) => {
        if (data.message === "Potluck not found") {
          navigate("/404");
          return;
        }
        setPotluck(() => data.potluck);
        setDishes(() => data.dishes);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      })
      .finally(() => {
        if (minLoadingTimeElapsed) {
          setLoading(() => false);
        } else {
          setTimeout(() => setLoading(() => false), minLoadingTime);
        }
      });
      // eslint-disable-next-line
  }, [id]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="container">
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
            display: "flex"
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
      {dishes.length > 0 && (
        <>
          <Button onClick={() => setShowCharts(!showCharts)}>
            {showCharts ? "Hide" : "Show"} Chart
          </Button>
          {showCharts && (
            <Box
              width="100%"
              height={200}
              display="flex"
              justifyContent="center"
            >
              <Chart dishes={dishes} />
            </Box>
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
