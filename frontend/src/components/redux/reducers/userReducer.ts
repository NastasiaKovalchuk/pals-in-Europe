import { AnyAction } from "redux";
import { SET_USER, UNSET_USER, GET_USER_ORDER } from "../types/types";

export const userReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      // console.log('action =>', action);
      return action.payload;
    case UNSET_USER:
      // console.log('action =>', action);
      return {
        name: "",
        userID: "",
        masterID: "",
        adminID: "",
        role: "",
      };
    case GET_USER_ORDER:
      console.log('GET_USER_ORDER =>', action);
      return action.payload;
    default:
      return state;
  }
};
