import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import css from "../Master.module.css";
import { Link } from "react-router-dom";

export const OrdersMaster = () => {

  const [orders, setOrders] = useState();
  const user = useSelector((state: RootStateValue) => state.user);
  const masters = useSelector((state: RootStateValue) => state.masters);
  // console.log('OrdersMaster tsx ===>', user);

  useEffect(() => {
    const master = masters.find((el) => el._id === user.masterID);
    console.log('OrdersMaster ==>', master);
    
    // setOrders(master.orders)
  }, [masters, user.masterID]);

  return (
    <div className={css.masterAccount}>
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
};
