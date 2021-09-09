
export interface UserStateValue {
    name: string;
    userID: string;
    masterID: string;
    adminID: string;
}

export interface InitStateValue {
  masters: Master[]
  user: UserStateValue
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

const initState: InitStateValue = {
  masters: [],
  user: {
    name: "",
    userID: "",
    masterID: "",
    adminID: "",
  },
};

export default initState;
