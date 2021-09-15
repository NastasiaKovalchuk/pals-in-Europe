import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMasterAccountAC } from '../../../redux/actionCreators/masterAC';
import { RootStateValue } from '../../../redux/reducers/rootReducer';
import css from "../User.module.css";
import { Route, Switch, Link } from "react-router-dom";

export const OrdersUser = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state: RootStateValue) => state.master)

  return (
    <div className={css.userAccount}>
      <div className={css.link}>
        <Link to='/account'>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to='/account/orders'>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to='/account/edit'>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to='/account/reviews'>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
    </div>
  );
}


