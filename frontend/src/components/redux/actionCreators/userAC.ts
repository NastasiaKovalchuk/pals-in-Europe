import { AppDispatch } from "../../../index";
import { User, UserStateValue } from "../initState";
import {
  SET_USER,
  UNSET_USER,
  GET_MESSAGE,
  GET_USER_ACCOUNT,
} from "../types/types";

export const getUserAC = () => async (dispatch: AppDispatch) => {
  const response = await fetch("http://localhost:8080/checkuser", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (result.role === "user") {
    dispatch({
      type: SET_USER,
      payload: {
        adminID: "",
        userID: result.userID,
        masterID: "",
        role: result.role,
        name: result.name,
      },
    });
  } else if (result.role === "master") {
    dispatch({
      type: SET_USER,
      payload: {
        adminID: "",
        userID: "",
        masterID: result.masterID,
        role: result.role,
        name: result.name,
      },
    });
  }
};

export const userSignupAC =
  (name: string, login: string, email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    // console.log('userSignupAC');
    const response = await fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    if (!result.message) {
      dispatch({
        type: SET_USER,
        payload: result,
      });
    } else if (result.message) {
      dispatch({
        type: GET_MESSAGE,
        payload: result.message,
      });
    }
  };

export const userLoginAC =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const result = await response.json();
    // console.log('loginUserAC ====>', result);
    if (!result.message) {
      dispatch({
        type: SET_USER,
        payload: result,
      });
    } else if (result.message) {
      dispatch({
        type: GET_MESSAGE,
        payload: result.message,
      });
    }
  };

export const logoutAC = () => async (dispatch: AppDispatch) => {
  // console.log('logoutAC', logoutAC);
  const responce = await fetch("http://localhost:8080/logout", {
    credentials: "include",
  });
  const result = await responce.json();
  // console.log('logoutAC =>', result);
  if (result.success) {
    // console.log("Сессия окончена");
    dispatch({
      type: UNSET_USER,
      payload: "",
    });
  }
};

export const getUserAccountAC =
  (user: object) => async (dispatch: AppDispatch) => {
    const response = await fetch("http://localhost:8080/user/account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    dispatch({
      type: GET_USER_ACCOUNT,
      payload: result,
    });
  };

export const masterLoginAC =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    const response = await fetch("http://localhost:8080/master/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const result = await response.json();

    if (!result.message) {
      console.log("result", result);
      dispatch({
        type: SET_USER,
        payload: {
          adminID: "",
          userID: "",
          masterID: result._id,
          role: "master",
          name: result.mastername,
        },
      });
    } else if (result.message) {
      dispatch({
        type: GET_MESSAGE,
        payload: result.message,
      });
    }
  };

export const masterSignupAC =
  (
    name: string,
    login: string,
    email: string,
    password: string,
    category: string,
    experience: string,
    description: string,
    city: string,
    street: string,
    phoneNumber: string
  ) =>
  async (dispatch: AppDispatch) => {
    const response = await fetch("http://localhost:8080/master/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      console.log("result", result);
      dispatch({
        type: SET_USER,
        payload: {
          adminID: "",
          userID: "",
          masterID: result._id,
          role: "master",
          name: result.mastername,
        },
      });
    } else if (result.message) {
      dispatch({
        type: GET_MESSAGE,
        payload: result.message,
      });
    }
  };
