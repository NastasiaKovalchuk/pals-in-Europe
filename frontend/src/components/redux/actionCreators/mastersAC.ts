import { Master } from "../initState";
import { GET_MASTERS } from "../types/types";

export const getMastersAC = (masters: Master[]) => {
  return {
    type: GET_MASTERS,
    payload: masters
  }
}
