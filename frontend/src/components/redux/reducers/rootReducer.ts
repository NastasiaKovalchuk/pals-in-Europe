import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { masterReducer } from "./mastersReducer";
import { UserStateValue } from '../initState';

export interface RootStateValue {
  user: UserStateValue,

}

export const rootReducer = combineReducers({
    user: userReducer,
    masters: masterReducer,
})
