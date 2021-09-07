import { AnyAction } from "redux";
import { SET_USER, UNSET_USER } from "../types/userTypes";

export const userReducer = (
    state = {},
    action: AnyAction
  ) => {
    switch (action.type) {
      case SET_USER:      
        return {
          name: action.payload.username,
          userID: action.payload.userID,
        };
  
      case UNSET_USER:
        return {
          username: "",
          userID: "",
        };
  
      default:
        return state;
    }
  };
  