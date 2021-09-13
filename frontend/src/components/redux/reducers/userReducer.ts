import { AnyAction } from "redux";
import { SET_USER, UNSET_USER, GET_USER_ACCOUNT } from "../types/types";

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
        message: action.payload.message,
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
    
      case GET_USER_ACCOUNT:
      console.log('GET_USER_ACCOUNT ===>', action.payload.userAccount);
      return {
        // ...state,
        // name: action.payload.masterAccount.name,
        // password: action.payload.masterAccount.password,
        // login: action.payload.masterAccount.login,
        // _id: action.payload.masterAccount._id,
        // role: 'master',
        // picture: action.payload.masterAccount.picture,
        // email: action.payload.masterAccount.email,
        // rating: action.payload.masterAccount.rating,
        // description: action.payload.masterAccount.description,
        // phoneNumber: action.payload.masterAccount.phoneNumber,
        // category: action.payload.masterAccount.category,
        // experience: action.payload.masterAccount.experience,
        // reviews: action.payload.masterAccount.reviews,
        // location: action.payload.masterAccount.location,
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
