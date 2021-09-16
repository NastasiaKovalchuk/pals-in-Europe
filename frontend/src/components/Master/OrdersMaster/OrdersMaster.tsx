import { FormEvent, useEffect, useState } from "react";
import { Order } from "../../../redux/initState";
import { HeaderMaster } from "../HeaderMaster.tsx/HeaderMaster";
import css from "../Master.module.css";
import { AnyAction } from "redux";
import { InputNumber, Result } from "antd";

export const OrdersMaster = () => {
  const [show, setShowModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [rating, setRating] = useState(0);

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
      setOrders(result.masterOrders);
    };
    getMasterOrders();
  }, []);

  const onChangeStatus = async (
    event: any,
    status: "Pending" | "Accepted" | "Declined" | "Fullfilled" | "Cancel"
  ) => {
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
            order.status = status;
          }
          return order;
        })
      );
    }
  };

  async function onSubmit(e: FormEvent, clientId: string, rating: number) {
    e.preventDefault();
    console.log(clientId, rating);
    const response = await fetch(`http://localhost:8080/master/rateClient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientId, rating }),
      credentials: "include",
    });
    const result = await response.json();
    if (result.message === "success") {
      setShowModal(false);
    }
  }

  function onChangeRating(value: number) {
    setRating(value);
  }

  return (
    <div className={css.masterAccount}>
      <div className={css.link}>
        <HeaderMaster />
      </div>
      <h4>My orders</h4>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div className={css.orderCard} key={index}>
            {order.status === "Pending" ? (
              <>
                <div className={css.orderInfo}>
                  <span>Order information:</span>
                  <div>
                    {" "}
                    date of creation:
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
                    {order.client.name}
                    <span>email:</span>
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
                    onClick={(e: any) => onChangeStatus(e, "Accepted")}
                    value={order._id}
                    className={css.accepted}
                  >
                    Accepted
                  </button>
                  <button
                    onClick={(e: any) => onChangeStatus(e, "Declined")}
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
                  <div>
                    {" "}
                    date of creation:
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
                    {order.client.name} <span>email:</span>
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
                    onClick={(e: any) => onChangeStatus(e, "Declined")}
                    value={order._id}
                    className={css.declined}
                  >
                    Declined
                  </button>
                  <button
                    onClick={(e: AnyAction) => onChangeStatus(e, "Fullfilled")}
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
                  <div>
                    {" "}
                    date of creation:
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
                    {order.client.name} <span>email:</span>
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
                  <div>
                    {" "}
                    date of creation:
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
                    {order.client.name} <span>email:</span>
                    {order.client.email}
                  </div>
                </div>
                <div>
                  <span>Service request:</span>
                  <div>
                    Date: {order.date}, service: {order.service}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                    }}
                    value={order._id}
                    className={css.fullfilled}
                  >
                    Rate client
                  </button>
                  <div className={show ? css.overlay : css.hide}>
                    <form
                      onSubmit={(e) => onSubmit(e, order.client._id, rating)}
                      className={show ? css.modal : css.hide}
                    >
                      <p>Leave your rating</p>
                      (max - 5)
                      <InputNumber
                        min={1}
                        max={5}
                        defaultValue={1}
                        onChange={onChangeRating}
                      />
                      <button className={css.btn} type="submit">
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {order.status === "Cancel" ? (
              <>
                <div className={css.orderInfo}>
                  <div className={css.cancelOrder}>
                    This order has been canceled
                  </div>
                  <span>Order information:</span>
                  <div>
                    {" "}
                    date of creation:
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
      ) : (
        <div>You have no orders</div>
      )}
    </div>
  );
};
