import { AnyAction } from "redux";
import { SET_USER, UNSET_USER, SET_MASTER, SET_ADMIN } from "../types/types";

export const userReducer = (
  state = {},
  action: AnyAction
) => {
  switch (action.type) {
    case SET_USER:
      return {
        name: action.payload,
      };
    case UNSET_USER:
      return {
        name: "",
      };
    case SET_MASTER:
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
