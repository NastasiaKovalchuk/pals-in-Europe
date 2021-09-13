import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getMasterAccountAC } from '../../redux/actionCreators/masterAC';
import { RootStateValue } from '../../redux/reducers/rootReducer';
import css from '../Master.module.css';
import { Link } from "react-router-dom";

export const ReviewsMaster = () => {
  // const dispatch = useDispatch();
  const reviews = useSelector((state: RootStateValue) => state.master.reviews)
  console.log('ReviewsMaster tsx ===>', reviews);

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
  //     dispatch(getMasterAccountAC(result));
  //   }
  //   getMasterAccount();
  // }, [dispatch]);


  return (
    <div className={css.masterAccount}>
      <div>
        <Link to='/account'>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to='/account/orders'>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to='/account/profile'>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to='/account/reviews'>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
      {reviews.map((review) => {
        return <div></div>
      })
      }
      <div>RewievsMaster</div>
    </div>
  )
}


