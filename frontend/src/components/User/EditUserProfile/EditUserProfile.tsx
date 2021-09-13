import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMasterAccountAC } from '../../redux/actionCreators/masterAC';
import { RootStateValue } from '../../redux/reducers/rootReducer';
// import css from '../Master.module.css';
import { Link } from "react-router-dom";


export const EditUserProfile = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state: RootStateValue) => state.master)

  // useEffect(() => {
  //   const getMasterAccount = async () => {
  //     const response = await fetch(
  //       'http://localhost:8080/master/account',
  //       {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         }
  //       }
  //     )
  //     const result = await response.json();
  //     // console.log('getMasterAccount ===>', result);  
  //     dispatch(getMasterAccountAC(result));
  //   }
  //   getMasterAccount();
  // }, [dispatch]);

  return (
    <div >
     
    </div>
  )
}


