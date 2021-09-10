import { AnyAction } from "redux";
import { SET_SEARCH } from "../types/types";

export const searchReducer = (
  state = {},
  action: AnyAction
) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
          ...state,
          category: action.payload,
      }
      
    default:
      return state;
  }
};
