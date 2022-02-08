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
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Dish } from "../types";
import { addDish } from "../utils/api";
import { categories } from "../utils/food";

interface AddDishFormProps {
  potluckId: string;
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>;
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
  takenDishes: string[];
}

export default function AddDishForm({
  potluckId,
  setDishes,
  showForm,
  takenDishes,
}: AddDishFormProps) {
  const [formData, setFormData] = useState<Dish>({
    name: "",
    description: "",
    category: "",
    attendee: {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
    },
    potluck_id: potluckId,
  });
  const { name, attendee } = formData;
  const isTaken = takenDishes.includes(name.toLowerCase().trim());

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addDish(formData)
      .then((data) => {
        setDishes((prevState) => [...prevState, data]);
        localStorage.setItem("name", data.attendee.name);
        localStorage.setItem("email", data.attendee.email);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setFormData({
          ...formData,
          name: "",
        });
        showForm(false);
      });
  }
  return (
    <Dialog open={true} onClose={() => showForm(false)}>
      <div
        style={{
          padding: 20,
        }}
      >
        <form onSubmit={handleSubmit}>
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
                    textTransform: "capitalize",
                  }}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormGroup sx={{ display: "flex", mb: 2 }}>
            <FormControlLabel control={<Checkbox />} label="Vegetarian" />
            <FormControlLabel control={<Checkbox />} label="Vegan" />
          </FormGroup>
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
                attendee: { ...attendee, name: e.target.value },
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
                attendee: { ...attendee, email: e.target.value },
              })
            }
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={!name || takenDishes.includes(name.toLowerCase().trim())}
            sx={{
              mb: 2,
              mt: 2,
            }}
          >
            Add Dish
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
