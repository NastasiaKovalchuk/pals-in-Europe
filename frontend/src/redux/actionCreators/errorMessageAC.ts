
import { GET_MESSAGE } from "../types/types";

export const errorMessageAC = (message: string) => {
  return {
    type: GET_MESSAGE,
    payload: message,
  }
}
