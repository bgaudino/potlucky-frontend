import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormGroup,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React, { useState, useContext } from "react";
import { Dish } from "../types";
import { addDish, editDish } from "../utils/api";
import { categories } from "../utils/food";
import UserContext from "../context/userContext";

interface AddDishFormProps {
  potluckId: string;
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>;
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
  takenDishes: string[];
  currentDish?: Dish;
}

export default function AddDishForm({
  potluckId,
  setDishes,
  showForm,
  takenDishes,
  currentDish
}: AddDishFormProps) {
  const context: any = useContext(UserContext);
  const { user, changeUser } = context;
  const [formData, setFormData] = useState<Dish>(
    currentDish || {
      name: "",
      description: "",
      category: "",
      attendee: {
        name: user?.name || "",
        email: user?.email || ""
      },
      potluck_id: potluckId,
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isKosher: false,
      isHalal: false
    }
  );
  const { name, attendee } = formData;
  const isTaken = takenDishes.includes(name.toLowerCase().trim());

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addDish(formData)
      .then((data) => {
        setDishes((prevState) => [...prevState, data]);
        changeUser(data.attendee);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setFormData({
          ...formData,
          name: ""
        });
        showForm(false);
      });
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentDish) return;
    editDish(formData, currentDish?._id || "")
      .then((data) => {
        console.log(data);
        setDishes((prevState) => {
          const updatedDishes = prevState.map((dish) => {
            if (dish._id === data._id) {
              return data;
            }
            return dish;
          });
          return updatedDishes;
        });
        changeUser(data.attendee);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setFormData({
          ...formData,
          name: ""
        });
        showForm(false);
      });
  }

  function handleCheckboxChange(e: any) {
    const { name, checked } = e.target;
    if (name === "isVegan" && checked) {
      setFormData((prevState) => ({
        ...prevState,
        isVegan: true,
        isDairyFree: true,
        isVegetarian: true
      }));
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  }

  return (
    <Dialog open={true} onClose={() => showForm(false)}>
      <div
        style={{
          padding: 20
        }}
      >
        <form onSubmit={currentDish ? handleUpdate : handleCreate}>
          <TextField
            label="Dish Name"
            type="text"
            error={isTaken}
            fullWidth
            variant="standard"
            name="name"
            value={name}
            helperText={
              !name
                ? "Required"
                : isTaken
                ? "Someone else has already added this dish"
                : ""
            }
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              fullWidth
              variant="standard"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              sx={{ mb: 2 }}
            >
              {categories.map((category: string) => (
                <MenuItem
                  key={category}
                  value={category}
                  sx={{
                    textTransform: "capitalize"
                  }}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            type="text"
            name="name"
            error={!attendee.name}
            helperText={!attendee.name ? "Required" : ""}
            value={attendee.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                attendee: { ...attendee, name: e.target.value }
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            type="email"
            name="email"
            value={attendee.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                attendee: { ...attendee, email: e.target.value }
              })
            }
            sx={{ mb: 2 }}
          />
          <FormGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              mb: 2
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isVegetarian}
                  name="isVegetarian"
                  onChange={handleCheckboxChange}
                />
              }
              label="Vegetarian"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isVegan}
                  name="isVegan"
                  onChange={handleCheckboxChange}
                />
              }
              label="Vegan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isGlutenFree}
                  name="isGlutenFree"
                  onChange={handleCheckboxChange}
                />
              }
              label="Gluten Free"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isDairyFree}
                  name="isDairyFree"
                  onChange={handleCheckboxChange}
                />
              }
              label="Dairy Free"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isKosher}
                  name="isKosher"
                  onChange={handleCheckboxChange}
                />
              }
              label="Kosher"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isHalal}
                  name="isHalal"
                  onChange={handleCheckboxChange}
                />
              }
              label="Halal"
            />
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={!name || takenDishes.includes(name.toLowerCase().trim())}
            sx={{
              mb: 2,
              mt: 2
            }}
          >
            {currentDish ? "Update" : "Create"} Dish
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => showForm(false)}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Dialog>
  );
}
