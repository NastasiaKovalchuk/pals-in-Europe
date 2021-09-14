import { AppDispatch } from "../../../index";
import { SET_MASTER, GET_MASTER_ACCOUNT, EDIT_MASTER, GET_MESSAGE } from "../types/types";

export const getMasterAC = (user: object) => {
  // console.log('getMasterAC ===================>', user);
  return {
    type: SET_MASTER,
    payload: user
  }
}
export const masterSignupAC = (
  name: string,
  login: string,
  email: string,
  password: string,
  category: string,
  experience: string,
  description: string,
  city: string,
  street: string,
  phoneNumber: string) => async (dispatch: AppDispatch) => {
    const response = await fetch('http://localhost:8080/master/signup', {
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
        category,
        experience,
        description,
        city,
        street,
        phoneNumber,
      }),
    });

    const result = await response.json();
    if (!result.message) {
      dispatch({
        type: SET_MASTER,
        payload: result,
      })
    } else if (result.message) {
      dispatch({
        type: GET_MESSAGE,
        payload: result.message,
      })
    }
  }

export const masterLoginAC = (login: string, password: string) => async (dispatch: AppDispatch) => {
  const response = await fetch('http://localhost:8080/master/login', {
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
  
  if (!result.message) {
    dispatch({
      type: SET_MASTER,
      payload: result,
    })
  } else if (result.message) {
    dispatch({
      type: GET_MESSAGE,
      payload: result.message,
    })
  }
}

export const getMasterAccountAC = (user: object) => async (dispatch: AppDispatch) => {
  const response = await fetch('http://localhost:8080/master/account', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });
  const result = await response.json();
  // console.log('getMasterAccountAC ===>', result);
  dispatch({
    type: GET_MASTER_ACCOUNT,
    payload: result
  })
}



