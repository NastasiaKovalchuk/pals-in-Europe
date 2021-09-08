import { AppDispatch } from "../../../index";
import { SET_USER, UNSET_USER } from "../types/types";


export const getUserAC = (name: string) => {
  return {
    type: SET_USER,
    payload: name
  }
};

export const userSignupAC = (
  name: string,
  login: string,
  email: string,
  password: string) => async (dispatch: AppDispatch) => {
console.log('userSignupAC');

    const response = await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        login,
        email,
        password,
      }),
    });
    const result = await response.json();
    console.log('userSignupAC', result);
    dispatch({
      type: SET_USER,
      payload: result,
    })
  }

export const userLoginAC = (login: string, password: string) => async (dispatch: AppDispatch) => {
  const response = await fetch('http://localhost:8080/user/login', {
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
  console.log('loginUserAC', result);
  dispatch({
    type: SET_USER,
    payload: result,
  })
}

export const logoutAC = () => {
  return {
    type: UNSET_USER,
    payload: ''
  }
};
