import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMasterAccountAC } from '../../redux/actionCreators/masterAC';
import { RootStateValue } from '../../redux/reducers/rootReducer';
import css from '../Master.module.css';
import { Link } from "react-router-dom";

export const OrdersMaster = () => {
  const user = useSelector((state: RootStateValue) => state.master)
  console.log('OrdersMaster tsx ===>', user);


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
          <button className={css.btn}>Reviews</button>
        </Link>
      </div>
      
      <div>OrdersMaster</div>
    </div>
  )
}
