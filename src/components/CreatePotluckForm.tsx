import { useState } from "react";
import { Potluck } from "../types";
import { createEvent } from "../utils/api";
import { getCurrentDatetime } from "../utils/datetime";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { isEmail } from "../utils/validation";

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

  const isDisabled = () => {
    if (!name) return true;
    if (!date) return true;
    if (host.email && !isEmail(host.email)) return true;
    return false;
  };

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
      <TextField
        variant="outlined"
        label="Event Name"
        fullWidth
        helperText={!name ? "Required" : ""}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        sx={{ mt: 2 }}
        autoFocus
      />
      <TextField
        variant="outlined"
        label="Time and Date"
        fullWidth
        type="datetime-local"
        name="date"
        helperText={!date ? "Valid Date and TimeRequired" : ""}
        onChange={handleChange}
        value={date}
        sx={{ mt: 2 }}
      />
      <TextField
        variant="outlined"
        label="Location"
        fullWidth
        type="text"
        name="location"
        onChange={handleChange}
        value={location}
        sx={{ mt: 2 }}
      />
      <TextField
        variant="outlined"
        label="Description"
        fullWidth
        type="textarea"
        name="description"
        onChange={handleChange}
        value={description}
        sx={{ mt: 2 }}
      />
      <TextField
        variant="outlined"
        label="Host"
        fullWidth
        type="text"
        name="name"
        onChange={handleHostChange}
        helperText={!host.name ? "Required" : ""}
        value={host.name}
        sx={{ mt: 2 }}
      />
      <TextField
        variant="outlined"
        label="Email"
        fullWidth
        type="email"
        name="email"
        onChange={handleHostChange}
        value={host.email}
        helperText={
          host.email && !isEmail(host.email) ? "Invalid Email" : ""
        }
        sx={{ mt: 2 }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
        disabled={isDisabled()}
      >
        Create
      </Button>
    </form>
  );
}
