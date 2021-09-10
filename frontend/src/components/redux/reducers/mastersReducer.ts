import { AnyAction } from "redux";
import { GET_MASTERS } from "../types/types";

export const masterReducer = (
  state = [],
  action: AnyAction
) => {
  switch (action.type) {
    case GET_MASTERS:
      return action.payload
      
    default:
      return state;
  }
};
