import { AnyAction } from "redux";
import { GET_MESSAGE } from "../types/types";

export const errorMessageReducer = (state = '', action: AnyAction) => {
  switch (action.type) {
    
    case GET_MESSAGE:
      return action.payload;

    default:
      return state;
  }
};
