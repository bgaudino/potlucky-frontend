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
  category: string;
  attendee: User;
  potluck_id: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  isKosher?: boolean;
  isHalal?: boolean;
}

export interface User {
  name: string;
  email?: string;
}
