
export interface UserStateValue {
    name: string;
    userID: string;
    masterID: string;
    adminID: string;
}

export interface InitStateValue {
  user: UserStateValue
}

const initState: InitStateValue = {
  user: {
    name: "",
    userID: "",
    masterID: "",
    adminID: "",
  },
};

export default initState;
