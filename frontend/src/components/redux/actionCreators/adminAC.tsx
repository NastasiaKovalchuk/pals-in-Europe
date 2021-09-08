
import { AppDispatch } from "../../../index";
import { SET_ADMIN } from "../types/types";

export const adminLoginAC = (login: string, password: string) => async (dispatch: AppDispatch) => {
  const response = await fetch('http://localhost:8080/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({
      login,
      password,
    }),
  });
  const result = await response.json();
  console.log('adminLoginAC', result);
  dispatch({
    type: SET_ADMIN,
    payload: result,
  })
}



