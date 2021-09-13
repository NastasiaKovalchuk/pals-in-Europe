import { AnyAction } from "redux";
import { SET_USER, UNSET_USER, SET_MASTER } from "../types/types";

export const userReducer = (
  state = {},
  action: AnyAction
) => {
  switch (action.type) {
    case SET_USER:
      // console.log('action =>', action);
      return {...state, 
        name: action.payload.name,
        userID: action.payload.id,
        role: action.payload.role,
      };
    case UNSET_USER:
      // console.log('action =>', action);
      return {
        name: '',
        userID: '',
        masterID: '',
        adminID: '',
        role: '',
      };
    
      case SET_MASTER:
      console.log('masterReducer ===>', action);
      return {
        ...state,
        name: action.payload.name,
        masterID: action.payload.masterID,
        role: action.payload.role,
      };
    // case SET_ADMIN:
    //   return {...state,
    //     name: action.payload.login,
    //     adminID: action.payload.adminID,
    //     role: action.payload.role,
    //   };

    // case GET_USER:
    //   console.log('GET_USER =>', action.payload);
    //   return {
    //     name: action.payload.login,
    //     id: action.payload,
    //   };
      
    default:
      return state;
  }
};
