import { RootStateValue } from "./reducers/rootReducer";

export interface UserStateValue {
    name: string;
    userID: string;
    masterID: string;
    adminID: string;
}

export interface Category {
  _id: string;
  category: string;
}

export interface Search {
  category: string,
  location: string,
}

export interface Master {
  _id: string;
  email: string;
  mastername: string;
  password: string;
  login: string;
  category: {
    _id: string,
    category: string
  };
  experience: string;
  location: string,
}

const initState: RootStateValue = {
  masters: [],
  categories: [],
  user: {
    name: "",
    userID: "",
    masterID: "",
    adminID: "",
  },
  search: {
    category: "",
    location: "",
  },
};

export default initState;
