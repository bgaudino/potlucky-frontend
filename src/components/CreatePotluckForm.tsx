import { useState } from "react";
import { Potluck } from "../types";
import { createEvent } from "../utils/api";
import { getCurrentDatetime } from "../utils/datetime";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const initialFormData: Potluck = {
  name: "",
  description: "",
  location: "",
  date: getCurrentDatetime(),
  host: {
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
  },
};

export default function CreatePotluckForm() {
  const [formData, setFormData] = useState<Potluck>(initialFormData);
  const { name, description, location, date, host } = formData;
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function handleHostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      host: {
        ...formData.host,
        [e.target.name]: e.target.value,
      },
    });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await createEvent(formData);
      localStorage.setItem("name", result.host.name);
      localStorage.setItem("email", result.host.email);
      navigate(`/potlucks/${result._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField variant="standard"
        label="Event Name"
        fullWidth
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <TextField variant="standard"
        label="Time and Date"
        fullWidth
        type="datetime-local"
        name="date"
        onChange={handleChange}
        value={date}
        sx={{ mt: 2 }}
      />
      <TextField variant="standard"
        label="Location"
        fullWidth
        type="text"
        name="location"
        onChange={handleChange}
        value={location}
        sx={{ mt: 2 }}
      />
      <TextField variant="standard"
        label="Description"
        fullWidth
        type="textarea"
        name="description"
        onChange={handleChange}
        value={description}
        sx={{ mt: 2 }}
      />
      <TextField variant="standard"
        label="Host"
        fullWidth
        type="text"
        name="name"
        onChange={handleHostChange}
        value={host.name}
        sx={{ mt: 2 }}
      />
      <TextField variant="standard"
        label="Email"
        fullWidth
        type="text"
        name="email"
        onChange={handleHostChange}
        value={host.email}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Create
      </Button>
    </form>
  );
}
