import { useEffect, useState } from "react";
import { Order } from "../../../redux/initState";
import { HeaderMaster } from "../HeaderMaster.tsx/HeaderMaster";
import css from '../Master.module.css'

export const OrdersMaster = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getMasterOrders = async () => {
      const response = await fetch("http://localhost:8080/master/orders", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });
      const result = await response.json();
      // console.log('getUserOrders ===>', result);
      setOrders(result.masterOrders)
    };
    getMasterOrders();
  }, []);

  return (
    <div className={css.masterAccount}>
      <div className={css.link}>
      <HeaderMaster />
      </div>
      <h4>My orders</h4>
      {orders ?
        orders.map((order, index) => (
          <div className={css.orderCard} key={index}>
            <div className={css.orderInfo}><span>Order information:</span>
              <div>№ {order.number},
                date of creation: {order.createdAt.slice(0, 10)}</div>
              <div className={css.status}>status: {order.status}</div>
            </div>
            <div><span>Client:</span>
              <div><span>Name: </span>{order.client.name}, <span>email:</span> {order.client.email}</div>
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
};
