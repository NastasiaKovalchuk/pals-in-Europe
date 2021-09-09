import { Category } from "../initState";
import { GET_CATEGORY, GET_CATEGORY_SAGA } from "../types/types";

export const getCategoriesAC = (categories: Category[]) => {
  return {
    type: GET_CATEGORY,
    payload: categories
  }
}

export const getCategoriesSagaAC = () => {
  return {
    type: GET_CATEGORY_SAGA,
  }
}
