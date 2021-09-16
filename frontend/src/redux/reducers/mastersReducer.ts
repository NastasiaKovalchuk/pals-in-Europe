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
      console.log('EDIT_MASTER ===>', state)
      return state.map((master: Master) => {
        if(master._id === action.payload._id){
          master = action.payload
        }
        return master;
      })
    // case CHANGE_STATUS_ORDER:
    //   console.log('CHANGE_STATUS_ORDER ===>', state);
    //   // return state.map((master: Master) => {
    //   //   if(master._id === action.payload.master._id){
    //   //      return action.payload
    //   //   }
    //     return action.payload;
      // })
    default:
      return state;
  }
};
