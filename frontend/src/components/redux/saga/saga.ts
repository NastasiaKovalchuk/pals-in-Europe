import {
  call,
  put,
  takeEvery,
  select,
  // debounce,
  throttle,
  StrictEffect,
} from "redux-saga/effects";

import { GET_CATEGORY_SAGA, GET_INPUT_SAGA } from "../types/types"
import { getCategoryFromServer } from "../api/categoryFetch";
import { getCategoriesAC } from "../actionCreators/categoryAC";
// import { RootStateOrAny } from "react-redux";
import { RootStateValue } from "../reducers/rootReducer";
import { Category } from "../initState";
export const categories = (state: RootStateValue) => state.categories

function* getCategoryWorker(): Generator<StrictEffect, void, any> {
  // console.log('herererererererer');
  try {
    const categorySagaCall = yield call(getCategoryFromServer);
    // console.log('categorySagaCall11111111', categorySagaCall);
    yield put(getCategoriesAC(categorySagaCall))
  } catch (error) {
    // console.log("Error from getCategoryWorker", error);
    // yield put({ type: 'ОШИБКА ИЗ addTodoWorker', message: error.message});
  }
}

// function checkInput(categories: Category[], input: string) {
//   const regexp = new RegExp(input, "i")
//   const check = categories.map((el) => {
//     const returnCheck = el.category.match(regexp)
//     if (returnCheck) {
//       // console.log('check', check);
//       return returnCheck
//     }
//   })
//   if (check) {
//     return check
//   }
//   return "category not fount"
// }

// function* inputWorker(action: { payload: Category[]; }): Generator<StrictEffect, void, any> {
//   try {
//     yield select(categories)
//     //@ts-ignore
//     // const input = yield call(checkInput, action.payload, categories)
//   } catch (error) {
//     console.log(error)
//   }
// }

export function* categoryWatcher() {
  yield takeEvery(GET_CATEGORY_SAGA, getCategoryWorker)
  //@ts-ignore
  // yield throttle(100, GET_INPUT_SAGA, inputWorker)
}
