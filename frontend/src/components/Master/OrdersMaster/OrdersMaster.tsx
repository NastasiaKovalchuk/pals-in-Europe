import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMasterAccountAC } from "../../redux/actionCreators/masterAC";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import css from "../Master.module.css";
import { Link, useParams } from "react-router-dom";
import { IdParams } from "../MasterAccount/MasterAccount";

export const OrdersMaster = () => {
  
  const [orders, setOrders] = useState();
  const { id } = useParams<IdParams>();

  const masters = useSelector((state: RootStateValue) => state.masters);
  // console.log('OrdersMaster tsx ===>', user);

  useEffect(() => {
    const master = masters.find((el) => el._id === id);
    // setOrders(master.orders)
  }, []);

  return (
    <div className={css.masterAccount}>
      <Link to={`/account/${id}`}>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to={`/account/orders/${id}`}>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to={`/account/profile/${id}`}>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to={`/account/reviews/${id}`}>
          <button className={css.btn}>Rewievs</button>
        </Link>           
      <div>OrdersMaster</div>
    </div>
  );
};
