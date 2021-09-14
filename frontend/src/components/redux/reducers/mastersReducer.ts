import { GET_MASTERS, EDIT_MASTER } from '../types/types';
import { AnyAction } from "redux";

export const mastersReducer = (
  state = [],
  action: AnyAction
) => {
  switch (action.type) {
    case GET_MASTERS:
      return action.payload
    case EDIT_MASTER:
      console.log('EDIT_MASTER ===>', action);
      return action.payload
    // case GET_AUTHORS:
    //   console.log('GET_AUTHORS ===>', action.payload.master.reviews);
    //   return [...state, action.payload.master.reviews]

    default:
      return state;
  }
};
