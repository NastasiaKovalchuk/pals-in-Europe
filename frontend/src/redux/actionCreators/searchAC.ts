import { SET_SEARCH } from "../types/types";

export const setSearchValue = (value: string) => {
  return {
    type: SET_SEARCH,
    payload: value
  }
}

