import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMasterAccountAC } from '../../../redux/actionCreators/masterAC';
import { Order } from "../../../redux/initState";
import { RootStateValue } from '../../../redux/reducers/rootReducer';
import "./OrdersUser.scss";
import { HeaderUser } from "../HeaderUser.tsx/HeaderUser";
import css from '../User.module.css'


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

  const onChangeStatusCancel = async (event: any, status: string) => {
    event.preventDefault();
    const id = event.target.value;
    const response = await fetch(`http://localhost:8080/user/changeStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
      credentials: "include",
    });
    const result = await response.json();
    if (result.message === "success") {
      setOrders(
        orders.map((order) => {
          if (order._id === id) {
            order.status = "Cancel";
          }
          return order;
        })
      );
    }
  };

  return (
    <div className={css.userAccount}>
      <div className={css.link}>
        <HeaderUser />
      </div>
      <h4>My orders</h4>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div className={css.orderCard} key={index}>
            <div className={css.orderInfo}>
              <span>Order information:</span>
              <div> <span>date of creation:</span>
                {order.createdAt.slice(0, 10)}
              </div>
            </div>
            {order.status === "Pending" ? (
              <>
                <div className={css.orderInfo}>
                  <div className={css.status}> <span>status: </span>{order.status}</div>
                </div>
                <div>
                <span>Master: </span>
                  <div>
                    <span>Name: </span>
                    {order.master.name}, <span>email:</span>{" "}
                    {order.master.email}
                  </div>
                </div>
                <div>
                  <span>Service request:</span>
                  <div>
                  <span> Date:</span> {order.date}, <span>service: </span>{order.service}
                  </div>
                </div>
                <div className={css.chooseStatus}>
                  <button
                    // @ts-ignore
                    onClick={(e: any) => onChangeStatusCancel(e, "Cancel")}
                    value={order._id}
                    className={css.cancel}>Cancel</button>
                </div>
              </>
            ) : (
              <> </>
            )}

            {order.status === "Cancel" ? (
              <>
                <div className={css.orderInfo}>
                  <div className={css.cancel} style={{ width: "200px" }}>
                    status: {order.status}
                  </div>
                </div>
                <div>
                <span>Master: </span>
                  <div>
                    <span>Name: </span>
                    {order.master.name}, <span>email:</span>
                    {order.master.email}
                  </div>
                </div>
                <div>
                  <span>Service request:</span>
                  <div>
                    Date: {order.date}, service: {order.service}
                  </div>
                </div>
                
              </>
            ) : (
              <></>
            )}
            {order.status === "Accepted" ? (
              <>
                <div className={css.orderInfo}>
                  <div className={css.accepted} style={{ width: "200px" }}>
                    status: {order.status}
                  </div>
                </div>
                <div>
                <span>Master: </span>
                  <div>
                    <span>Name: </span>
                    {order.master.name}, <span>email:</span>
                    {order.master.email}
                  </div>
                </div>
                <div>
                  <span>Service request:</span>
                  <div>
                    Date: {order.date}, service: {order.service}
                  </div>
                </div>
                <div className={css.chooseStatus}>
                  <button
                    // @ts-ignore
                    onClick={(e: any) => onChangeStatusCancel(e, "Cancel")}
                    value={order._id}
                    className={css.cancel}>Cancel</button>
                </div>
              </>
            ) : (
              <></>
            )}
            {order.status === "Fullfilled" ? (
              <>
                <div className={css.orderInfo}>
                  <div className={css.fullfilled} style={{ width: "200px" }}>
                    status: {order.status}
                  </div>
                </div>
                <div>
                <span>Master: </span>
                  <div>
                    <span>Name: </span>
                    {order.master.name}, <span>email:</span>
                    {order.master.email}
                  </div>
                </div>
                <div>
                  <span>Service request:</span>
                  <div>
                    Date: {order.date}, service: {order.service}
                  </div>
                </div>
                <div className={css.chooseStatus}>
                  <button
                    // @ts-ignore
                    onClick={(e: any) => onChangeStatusCancel(e, "Cancel")}
                    value={order._id}
                    className={css.cancel}>Cancel</button>
                </div>
              </>
            ) : (
              <></>
            )}
            {order.status === "Declined" ? (
              <>
                <div className={css.orderInfo}>
                  <div className={css.declined} style={{ width: "200px" }}>
                    status: {order.status}
                  </div>
                </div>
                <div>
                <span>Master: </span>
                  <div>
                    <span>Name: </span>
                    {order.master.name}, <span>email:</span>
                    {order.master.email}
                  </div>
                </div>
                <div>
                  <span>Service request:</span>
                  <div>
                    Date: {order.date}, service: {order.service}
                  </div>
                </div>
                <div className={css.chooseStatus}>
                  <button
                    // @ts-ignore
                    onClick={(e: any) => onChangeStatusCancel(e, "Cancel")}
                    value={order._id}
                    className={css.cancel}>Cancel</button>
                </div>
              </>
            ) : (
              <></>
            )}

          </div>
        ))
      ) 
      : 
      <div>You have no orders</div>
      
      }
    </div>
  );
}


