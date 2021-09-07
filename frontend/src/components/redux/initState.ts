
export interface InitStateValue {
  user: {
    username: string;
    userID: string;
  };
}

const initState: InitStateValue = {
  user: {
    username: "",
    userID: "",
  },
};

export default initState;
