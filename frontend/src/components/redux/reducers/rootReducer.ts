import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { mastersReducer } from "./mastersReducer";
import { categoryReducer } from "./categoryReducer";
import { Category, Master, UserStateValue, Search } from '../initState';
import { searchReducer } from "./searchReducer";
import { errorMessageReducer } from './errorMessageReducer';
export interface RootStateValue {
  user: UserStateValue,
  masters: Master[],
  // categories == state.categories from useSelector
  categories: string[]
  search: Search,
  errorMessage: string,
}

export const rootReducer = combineReducers({
    user: userReducer,
    masters: mastersReducer,
    categories: categoryReducer,
    search: searchReducer,
    errorMessage: errorMessageReducer,
})
