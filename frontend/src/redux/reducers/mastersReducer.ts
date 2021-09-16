// import { CHANGE_STATUS_ORDER } from './../types/types';
import { Master } from '../initState';

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
      return state.map((master: Master) => {
        if(master._id === action.payload._id){
          master = action.payload
        }
        return master;
      })

    default:
      return state;
  }
};
