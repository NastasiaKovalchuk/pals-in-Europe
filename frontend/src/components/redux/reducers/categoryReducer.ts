import { AnyAction } from "redux";
import { GET_CATEGORY } from "../types/types";

export const categoryReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case GET_CATEGORY:
      return action.payload.sort((a: string, b: string) => a.localeCompare(b));

    default:
      return state;
  }
};
