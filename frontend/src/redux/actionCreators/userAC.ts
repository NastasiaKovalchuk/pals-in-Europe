import { AppDispatch } from "../../index";
import { SET_USER, UNSET_USER, GET_MESSAGE, EDIT_USER } from "../types/types";

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
  (
    name: string,
    login: string,
    email: string,
    password: string,
    onSuccesSignup: () => void
  ) =>
  async (dispatch: AppDispatch) => {
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
        picture:
          "https://freerangestock.com/sample/116135/handsome-man-avatar-.jpg",
      }),
    });
    const result = await response.json();
    if (!result.message) {
      dispatch({
        type: SET_USER,
        payload: {
          adminID: "",
          userID: result._id,
          masterID: "",
          role: "user",
          name: result.name,
        },
      });
      onSuccesSignup();
    } else if (result.message) {
      dispatch({
        type: GET_MESSAGE,
        payload: result.message,
      });
    }
  };

export const userLoginAC =
  (login: string, password: string, onSuccesLogin: () => void) =>
  async (dispatch: AppDispatch) => {
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
    if (!result.message) {
      dispatch({
        type: SET_USER,
        payload: {
          adminID: "",
          userID: result.id,
          masterID: "",
          role: result.role,
          name: result.name,
        },
      });
      onSuccesLogin();
    } else if (result.message) {
      dispatch({
        type: GET_MESSAGE,
        payload: result.message,
      });
    }
  };

export const logoutAC = () => async (dispatch: AppDispatch) => {
  const responce = await fetch("http://localhost:8080/logout", {
    credentials: "include",
  });
  const result = await responce.json();
  if (result.success) {
    dispatch({
      type: UNSET_USER,
      payload: "",
    });
  }
};

export const masterLoginAC =
  (login: string, password: string, onSuccesLogin: () => void) =>
  async (dispatch: AppDispatch) => {
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
      onSuccesLogin();
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
    phoneNumber: string,
    onSuccesSignup: () => void
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
      onSuccesSignup();
    } else if (result.message) {
      dispatch({
        type: GET_MESSAGE,
        payload: result.message,
      });
    }
  };

export const editUserProfileAC =
  (name?: string, login?: string, email?: string) =>
  async (dispatch: AppDispatch) => {
    const response = await fetch(`http://localhost:8080/user/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, login, email }),
      credentials: "include",
    });
    const result = await response.json();

    if (result.message === "success") {
      dispatch({
        type: EDIT_USER,
        payload: name,
      });
    }
  };
