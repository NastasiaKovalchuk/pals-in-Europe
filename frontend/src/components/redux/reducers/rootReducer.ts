import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { masterReducer } from "./mastersReducer";
import { categoryReducer } from "./categoryReducer";
import { Category, Master, UserStateValue, Search } from '../initState';

export interface RootStateValue {
  user: UserStateValue,
  masters: Master[],
  // categories == state.categories from useSelector
  categories: string[]
  search: Search
}

export const rootReducer = combineReducers({
    user: userReducer,
    masters: masterReducer,
    categories: categoryReducer,
})
