import { CHANGE_STATUS_ORDER } from './../types/types';
import { Master } from "../initState";
import { GET_MASTERS, EDIT_MASTER } from "../types/types";
import { AppDispatch } from "../../index";

export const getMastersAC = (masters: Master[]) => {
  return {
    type: GET_MASTERS,
    payload: masters
  }
}

export const editMasterProfileAC = (
  name?: string, login?: string,
  email?: string,
  category?: string, experience?: string,
  description?: string, city?: string,
  street?: string, phoneNumber?: string) => async (dispatch: AppDispatch) => {
    const response = await fetch(`http://localhost:8080/master/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, login, email, category, experience, description, city, street, phoneNumber
      }),
      credentials: "include",
    });
    const result = await response.json();
    // console.log('editMaste /rProfileAC ===>', result);

    dispatch({
      type: EDIT_MASTER,
      payload: result
    })
  }

// export const changeMasterOrderStatusAC =
//   (id: string, changeStatus: string) => async (dispatch: AppDispatch) => {
//     console.log('changeMasterOrderStatusAC===>', id, changeStatus);
    
//     const response = await fetch(`http://localhost:8080/master/changeStatus`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({id, changeStatus}),
//       credentials: "include",
//     });
//     const result = await response.json();
//     // console.log('CHANGE_STATUS_ORDER ===>', result);
    
//     dispatch({
//       type: CHANGE_STATUS_ORDER,
//       payload: result
//     })
//   }
