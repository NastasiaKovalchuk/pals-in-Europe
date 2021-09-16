import { useEffect, useState } from "react";
import { Order } from "../../../redux/initState";
import { HeaderMaster } from "../HeaderMaster.tsx/HeaderMaster";
import css from "../Master.module.css";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
// import { changeMasterOrderStatusAC } from "../../../redux/actionCreators/mastersAC";

export const OrdersMaster = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMasterOrders = async () => {
      const response = await fetch("http://localhost:8080/master/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      // console.log('getUserOrders ===>', result);
      setOrders(result.masterOrders);
    };
    getMasterOrders();
  }, []);

  const onChangeStatusAccepted = async (event: any, status: string) => {
    event.preventDefault();
    const id = event.target.value;
    const response = await fetch(`http://localhost:8080/master/changeStatus`, {
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
            order.status = "Accepted";
          }
          return order;
        })
      );
    }
  };

  const onChangeStatusDeclined = async (event: any, status: string) => {
    event.preventDefault();
    const id = event.target.value;
    const response = await fetch(`http://localhost:8080/master/changeStatus`, {
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
            order.status = "Declined";
          }
          return order;
        })
      );
    }
  };

  const onChangeStatusFullfilled = async (event: any, status: string) => {
    event.preventDefault();
    const id = event.target.value;
    const response = await fetch(`http://localhost:8080/master/changeStatus`, {
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
            order.status = "Fullfilled";
          }
          return order;
        })
      );
    }
  };

  console.log('orders', orders);
  
  return (
    <div className={css.masterAccount}>
      <div className={css.link}>
        <HeaderMaster />
      </div>
      <h4>My orders</h4>
      {orders.length > 0 ? 
        orders.map((order, index) => (
          <div className={css.orderCard} key={index}>
            
            {order.status === "Pending" ? (
              <>
              <div className={css.orderInfo}>
              <span>Order information:</span>
              <div> date of creation:
                {order.createdAt.slice(0, 10)}
              </div>
            </div>
                <div className={css.orderInfo}>
                  <div className={css.status}>status: {order.status}</div>
                </div>
                <div>
                  <span>Client:</span>
                  <div>
                    <span>Name: </span>
                    {order.client.name}, <span>email:</span>
                    {order.client.email}
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
                    onClick={(e: any) =>
                      onChangeStatusAccepted(e, "Accepted")
                    }
                    value={order._id}
                    className={css.accepted}
                  >
                    Accepted
                  </button>
                  <button
                    // @ts-ignore
                    onClick={(e: any) =>
                      onChangeStatusDeclined(e, "Declined")
                    }
                    value={order._id}
                    className={css.declined}
                  >
                    Declined
                  </button>
                </div>
              </>
            ) : (
              <> </>
            )}
            {order.status === "Accepted" ? (
              <>
              <div className={css.orderInfo}>
              <span>Order information:</span>
              <div> date of creation:
                {order.createdAt.slice(0, 10)}
              </div>
            </div>
                <div className={css.orderInfo}>
                  <div className={css.accepted} style={{ width: "200px" }}>
                    status: {order.status}
                  </div>
                </div>
                <div>
                  <span>Client:</span>
                  <div>
                    <span>Name: </span>
                    {order.client.name}, <span>email:</span>
                    {order.client.email}
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
                    onClick={(e: any) =>
                      onChangeStatusDeclined(e, "Declined")
                    }
                    value={order._id}
                    className={css.declined}
                  >
                    Declined
                  </button>
                  <button
                    onClick={(e: AnyAction) =>
                      onChangeStatusFullfilled(e, "Fullfilled")
                    }
                    value={order._id}
                    className={css.fullfilled}
                  >
                    Fullfilled
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
            {order.status === "Declined" ? (
              <>
              <div className={css.orderInfo}>
              <span>Order information:</span>
              <div> date of creation:
                {order.createdAt.slice(0, 10)}
              </div>
            </div>
                <div className={css.orderInfo}>
                  <div className={css.declined} style={{ width: "200px" }}>
                    status: {order.status}
                  </div>
                </div>
                <div>
                  <span>Client:</span>
                  <div>
                    <span>Name: </span>
                    {order.client.name}, <span>email:</span>
                    {order.client.email}
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
            {order.status === "Fullfilled" ? (
              <>
              <div className={css.orderInfo}>
              <span>Order information:</span>
              <div> date of creation:
                {order.createdAt.slice(0, 10)}
              </div>
            </div>
                <div className={css.orderInfo}>
                  <div className={css.fullfilled} style={{ width: "200px" }}>
                    status: {order.status}
                  </div>
                </div>
                <div>
                  <span>Client:</span>
                  <div>
                    <span>Name: </span>
                    {order.client.name}, <span>email:</span>
                    {order.client.email}
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
             {order.status === "Cancel" ? (
              <>
              <div className={css.orderInfo}>
                  <div className={css.cancelOrder}>This order has been canceled</div>
              <span>Order information:</span>
              <div> date of creation:
                {order.createdAt.slice(0, 10)}
              </div>
            </div>
                <div className={css.orderInfo}>
                  <div className={css.cancel} style={{ width: "200px" }}>
                    status: {order.status}
                  </div>
                </div>
                <div>
                  <span>Client:</span>
                  <div>
                    <span>Name: </span>
                    {order.client.name}, <span>email:</span>
                    {order.client.email}
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
          </div>
        ))
      : 
        <div>You have no orders</div>
      }
    </div>
  );
};
