import { AnyAction } from "redux";
import { SET_USER, UNSET_USER, SET_MASTER, SET_ADMIN } from "../types/types";

export const userReducer = (
    state = {},
    action: AnyAction
  ) => {
    switch (action.type) {
      case SET_USER:      
      // console.log('SET_USER ==>', action);
        return {
          name: action.payload.name,
          userID: action.payload.userID,
        };
      case UNSET_USER:
        return {
          username: "",
          userID: "",
        };
        case SET_MASTER:
          // console.log('SET_MASTER ==>', action);
        return {
          name: action.payload.name,
          masterID: action.payload.masterID,
        };
        case SET_ADMIN:      
        return {
          name: action.payload.login,
          adminID: action.payload.adminID,
        };
      default:
        return state;
    }
  };
  