import { FormEvent, useEffect, useState } from "react";
import { Order } from "../../../redux/initState";
import { HeaderUser } from "../HeaderUser.tsx/HeaderUser";
import css from "../User.module.css";
import "../HeaderUser.tsx/HeaderUser.scss";
import { InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { editMasterAC } from "../../../redux/actionCreators/mastersAC";

export const OrdersUser = () => {
  const [leftReview, setLeftReview] = useState(false);
  const [show, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserOrders = async () => {
      const response = await fetch("http://localhost:8080/user/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      // console.log('getUserOrders ===>', result);
      setOrders(result.userOrders);
    };
    getUserOrders();
  }, []);

  const onChangeStatus = async (
    event: any,
    status:
      | "Pending"
      | "Accepted"
      | "Declined"
      | "Fullfilled"
      | "Cancel"
      | "Fullfilled & Rated"
  ) => {
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
            order.status = status;
          }
          return order;
        })
      );
    }
  };

  async function onSubmit(
    e: FormEvent,
    masterId: string,
    rating: number,
    reviewText: string
  ) {
    e.preventDefault();
    console.log(masterId, rating, reviewText);
    const response = await fetch(`http://localhost:8080/user/reviewMaster`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ masterId, rating, reviewText }),
      credentials: "include",
    });
    const result = await response.json();
    if (result.message === "success") {
      dispatch(editMasterAC(result.master));
      alert("Thank you for your feedback");
      setShowModal(false);
      await onChangeStatus(e, "Fullfilled & Rated");
    }
  }

  function onChangeRating(value: number) {
    setRating(value);
  }

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
              <div>
                {" "}
                <span>date of creation:</span>
                {order.createdAt.slice(0, 10)}
              </div>
            </div>
            {order.status === "Pending" ? (
              <>
                <div className={css.orderInfo}>
                  <div className={css.status}>
                    {" "}
                    <span>status: </span>
                    {order.status}
                  </div>
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
                    <span> Date:</span> {order.date}, <span>service: </span>
                    {order.service}
                  </div>
                </div>
                <div className={css.chooseStatus}>
                  <button
                    // @ts-ignore
                    onClick={(e: any) => onChangeStatus(e, "Cancel")}
                    value={order._id}
                    className={css.cancel}
                  >
                    Cancel
                  </button>
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
                    className={css.cancel}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
            {order.status === "Fullfilled & Rated" ? (
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                    }}
                    value={order._id}
                    className={css.fullfilled}
                  >
                    Rate master
                  </button>
                </div>
                <div className={show ? css.overlay : css.hide}>
                  <form
                    onSubmit={(e) =>
                      onSubmit(e, order.master._id, rating, reviewText)
                    }
                    className={show ? css.modal : css.hide}
                  >
                    Review:
                    <input
                      placeholder="comment for the master"
                      type="text"
                      value={reviewText}
                      style={{ height: 100 }}
                      onChange={(
                        ev: React.ChangeEvent<HTMLInputElement>
                      ): void => setReviewText(ev.target.value)}
                    />
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
