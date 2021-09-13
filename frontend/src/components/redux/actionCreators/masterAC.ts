
import { AppDispatch } from "../../../index";
import { SET_MASTER, GET_ACCOUNT, EDIT_MASTER } from "../types/types";

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
  experience: string) => async (dispatch: AppDispatch) => {
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
        experience
      }),
    });
    const result = await response.json();
    dispatch({
      type: SET_MASTER,
      payload: result,
    })
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
  dispatch({
    type: SET_MASTER,
    payload: result,
  })
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
    type: GET_ACCOUNT,
    payload: result
  })
}


export const editMasterProfileAC = (
  name: string, 
  login: string, 
  phoneNumber: string, 
  email: string, 
  description: string,
  category: string) => async (dispatch: AppDispatch) => {
  const response = await fetch('http://localhost:8080/master/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      login,
      phoneNumber,
      email,
      description,
      category,
    }),
    credentials: "include",
  });
  const result = await response.json();
  dispatch({
    type: EDIT_MASTER,
    payload: result
  })
}
