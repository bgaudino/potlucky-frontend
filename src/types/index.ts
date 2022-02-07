export interface Potluck {
  _id?: string;
  name: string;
  date: string;
  location: string;
  description: string;
  host: User;
}

export interface Dish {
  _id?: string;
  name: string;
  description: string;
  attendee: User
  potluck_id: string;
}

export interface User {
  name: string;
  email?: string;
}