import { GET_MASTERS } from '../types/types';
import { AnyAction } from "redux";

export const mastersReducer = (
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
