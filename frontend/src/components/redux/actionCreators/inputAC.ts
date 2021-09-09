import { Search } from "../initState";
import { GET_INPUT, GET_INPUT_SAGA } from "../types/types";

export const getInputAC = (input: string) => {
  return {
    type: GET_INPUT,
    payload: input,
  }
}

export const getInputSagaAC = (text: string) => {
  return {
    type: GET_INPUT_SAGA,
    payload: text,
  }
}
