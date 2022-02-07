import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Dish } from "../types";
import { addDish } from "../utils/api";

interface AddDishFormProps {
  potluckId: string;
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>;
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddDishForm({
  potluckId,
  setDishes,
  showForm,
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
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
            fullWidth
            variant="standard"
            name="name"
            value={name}
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
              {["Appetizer", "Main Course", "Dessert"].map(
                (category: string) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            type="text"
            name="name"
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
            disabled={!name}
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
            onClick={() => showForm(false)}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Dialog>
  );
}
