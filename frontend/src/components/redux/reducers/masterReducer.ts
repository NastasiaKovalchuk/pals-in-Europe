import { AnyAction } from "redux";
import { SET_MASTER, GET_ACCOUNT } from "../types/types";

export const masterReducer = (
  state = {},
  action: AnyAction
) => {
  switch (action.type) {
    case SET_MASTER:
      // console.log('masterReducer ===>', action);
      return {
        ...state,
        name: action.payload.name,
        masterID: action.payload.masterID,
        role: action.payload.role,
      };
    case GET_ACCOUNT:
      // console.log('GET_ACCOUNT ===>', action.payload.masterAccount);
      return {
        ...state,
        name: action.payload.masterAccount.name,
        password: action.payload.masterAccount.password,
        login: action.payload.masterAccount.login,
        _id: action.payload.masterAccount._id,
        role: 'master',
        picture: action.payload.masterAccount.picture,
        email: action.payload.masterAccount.email,
        rating: action.payload.masterAccount.rating,
        description: action.payload.masterAccount.description,
        phoneNumber: action.payload.masterAccount.phoneNumber,
        category: action.payload.masterAccount.category,
        experience: action.payload.masterAccount.experience,
        reviews: action.payload.masterAccount.reviews,
        location: action.payload.masterAccount.location,
      };
    default:
      return state;
  }
};
