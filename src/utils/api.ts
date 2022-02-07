import { Potluck, Dish } from "../types";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

const endpoint = (path: string) => `${baseUrl}${path}`;

export async function createEvent(formData: Potluck) {
  const res = await fetch(endpoint("/potlucks/create"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data;
}

export async function getPotluck(id: string) {
  const res = await fetch(endpoint(`/potlucks/${id}`));
  const data = await res.json();
  return data;
}

export async function addDish(formData: Dish) {
  const res = await fetch(endpoint("/potlucks/dishes"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  console.log(data);
  return data;
}
