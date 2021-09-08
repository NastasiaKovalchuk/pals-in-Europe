import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { UserStateValue } from '../initState';

export interface RootStateValue {
  user: UserStateValue,

}

export const rootReducer = combineReducers({
    user: userReducer,
})
