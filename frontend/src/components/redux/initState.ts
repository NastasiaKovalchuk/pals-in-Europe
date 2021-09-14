import { RootStateValue } from "./reducers/rootReducer";

export interface Review {
  _id: string;
  text: string;
  author: User;
  master: string;
}

export interface UserStateValue {
  name: string;
  userID: string;
  masterID: string;
  adminID: string;
  role: string;
}

export interface Category {
  _id: string;
  category: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  login: string;
  rating: number;
  picture: string;
}

export interface Search {
  category: string;
  location: string;
}

export interface Master {
  picture: string | undefined;
  _id: string;
  email: string;
  name: string;
  password: string;
  login: string;
  rating: string;
  description: string;
  phoneNumber: string;
  category: {
    _id: string;
    category: string;
  };
  experience: string;
  reviews: Review[];
  location: {
    _id: string;
    city: string;
    street: string;
    coordinates: number[];
  };
}

export interface Review {
  _id: string,
  text: string,
  author: User,
  createdAt: string,
  updatedAt: string,
}

const initState: RootStateValue = {
  masters: [],
  categories: [],
  user: {
    name: "",
    userID: "",
    masterID: "",
    adminID: "",
    role: "",
  },
  search: {
    category: "",
    location: "",
  },
  errorMessage: "",
};

export default initState;
