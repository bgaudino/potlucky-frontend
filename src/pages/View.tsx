import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPotluck } from "../utils/api";
import AddDishForm from "../components/AddDishForm";
import { Dish, Potluck } from "../types";
import PotluckInfo from "../components/PotluckInfo";
import { Button } from "@mui/material";

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
          <h3>Dishes</h3>
          {dishes.length ? (
            <ul>
              {dishes.map((dish) => (
                <li key={dish._id}>
                  {dish?.attendee?.name} is bringing {dish?.name}
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowAddDishForm((prevState) => !prevState)}
          >
            Add a dish
          </Button>
        </>
      )}
    </div>
  );
}
