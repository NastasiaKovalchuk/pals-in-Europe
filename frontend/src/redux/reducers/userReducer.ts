import { AnyAction } from "redux";
import { EDIT_USER, SET_USER, UNSET_USER } from "../types/types";

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

    case EDIT_USER:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
