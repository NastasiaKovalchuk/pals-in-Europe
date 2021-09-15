
import { GET_MESSAGE } from "../types/types";

export const errorMessageReducerAC = (message: string) => {
  return {
    type: GET_MESSAGE,
    payload: message,
  }
}
