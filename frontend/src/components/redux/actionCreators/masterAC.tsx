
import { AppDispatch } from "../../../index";
import { SET_MASTER } from "../types/types";

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
    // console.log('masterSignupAC', result);
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



