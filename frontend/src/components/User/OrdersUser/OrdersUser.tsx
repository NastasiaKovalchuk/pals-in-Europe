import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMasterAccountAC } from '../../../redux/actionCreators/masterAC';
import { Order } from "../../../redux/initState";
import { RootStateValue } from '../../../redux/reducers/rootReducer';
import { HeaderUser } from "../HeaderUser.tsx/HeaderUser";
import css from '../User.module.css'
import "../HeaderUser.tsx/HeaderUser.scss";


export const OrdersUser = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getUserOrders = async () => {
      const response = await fetch("http://localhost:8080/user/orders", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });
      const result = await response.json();
      // console.log('getUserOrders ===>', result);
      setOrders(result.userOrders)
    };
    getUserOrders();
  }, []);
  // console.log(orders);


  return (

    // <div className="">
    //   <div className="">
    //     <Link to='/account'>
    //       <button className="">My profile</button>
    //     </Link>
    //     <Link to='/account/edit'>
    //       <button className="">Edit profile</button>
    //     </Link>
    //     <Link to='/account/orders'>
    //       <button className="">My orders</button>
    //     </Link>
    //     <Link to='/account/reviews'>
    //       <button className="">Rewievs</button>
    //     </Link>

    <div className="mainEditUser">
      <div className={css.link}>
        <HeaderUser />

      </div>
      <h4>My orders</h4>
      {orders ?
        orders.map((order, index) => (
          <div className="" key={index}>
            <div className=""><span>Order information:</span>
              <div>№ {order.number},
                date of creation: {order.createdAt.slice(0, 10)}</div>
                <div className="">status: {order.status}</div>
            </div>
            <div><span>Master:</span>
              <div> {order.master.name}, {order.master.email}</div>
            </div>
            <div><span>Service request:</span>
              <div>Date: {order.date},
                service: {order.service}
              </div>
            </div>
          </div>
        ))

        :
        <div>You have no orders</div>
      }
    </div>
  );
}


