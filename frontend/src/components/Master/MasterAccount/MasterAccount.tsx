import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { getMasterAccountAC } from '../../redux/actionCreators/masterAC';
import { RootStateValue } from '../../redux/reducers/rootReducer';

export const MasterAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateValue) => state)
console.log(user);

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
  //     // console.log(result);  
  //     dispatch(getMasterAccountAC(result));
  //   }
  //   getMasterAccount();
  // }, [dispatch]);
  return (
    <div>
      Аккаунт мастера
    </div>
  )
}
