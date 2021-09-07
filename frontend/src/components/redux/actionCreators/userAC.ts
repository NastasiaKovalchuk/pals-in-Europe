import { AppDispatch } from "../../..";
import { SET_USER } from "../types/userTypes";


export const loginUser = (login: string, password: string) => async (dispatch: AppDispatch) => {
    // some fetch to back, get as a result nick
    /*
    if (result.status === 200) {
        dispatch({
            type: SET_USER,
            payload: result.name,
        })
    } else {
        dispatch({
            type: SET_USER,
            payload: result.name,
        })
    }
    */
}

export const signUser = (login: string, password: string, username: string) => async (dispatch: AppDispatch) => {
    // some fetch to back, get as a result nick
    /*
    if (result.status === 200) {
        dispatch({
            type: SET_USER,
            payload: result.name,
        })
    } else {
        dispatch({
            type: SET_USER,
            payload: result.name,
        })
    }
    */
}