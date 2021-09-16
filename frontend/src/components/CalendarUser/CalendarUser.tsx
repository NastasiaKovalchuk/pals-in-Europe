import { useEffect, useState } from "react";
import "./CalendarUser.scss";
import { Calendar, Badge, Modal } from "antd";
import moment from "moment";
import Draggable from "react-draggable";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { HeaderMaster } from "../Master/HeaderMaster.tsx/HeaderMaster";
import { Appointment, Master, Order, User } from "../../redux/initState";
import { Link } from "react-router-dom";
import { HeaderUser } from "../User/HeaderUser.tsx/HeaderUser";

export const UserCalendarComponent = () => {
  const [modalOrder, setModalOrder] = useState<Order>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [value, setValue] = useState(moment());
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const state = useSelector((state: RootStateValue) => state.user);

  const draggleRef = React.createRef();

  const handleOk = (e: any) => {
    e.stopPropagation();
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    e.stopPropagation();
    setVisible(false);
  };

  const showModal = (item: Order) => {
    setVisible(true);
    setModalOrder(item);
  };

  useEffect(() => {
    if (state.userID) {
      fetch("http://localhost:8080/user/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          setOrders(result.userOrders);
        });
    }
  }, [state.masterID, state.userID]);

  function getListData(value: { date: () => any }) {
    let listData = [];
    for (let i = 0; i < orders.length; i++) {
      if (Number(orders[i].date.split("-")[2]) === value.date()) {
        listData.push(orders[i]);
      }
    }
    return listData;
  }

  function dateCellRender(value: any) {
    const listData = getListData(value);

    return (
      <ul>
        {listData.map((item: Order) => (
          <li key={item._id} className="events">
            <Badge
              className="badge"
              //@ts-ignore
              onClick={(e) => {
                e.stopPropagation();
                showModal(item);
              }}
              status={"default"}
              title="hi"
              text={item.time}
            />

            <Modal
              title={
                <div
                  style={{
                    width: "100%",
                    // cursor: "move",
                  }}
                  onMouseOver={() => {
                    if (disabled) {
                      setDisabled(false);
                    }
                  }}
                  onMouseOut={() => {
                    setDisabled(true);
                  }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                >
                  
                  Your appointment
                  
                </div>
              }
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              modalRender={(modal) => (
                <Draggable disabled={disabled}>
                  {/* @ts-ignore */}
                  <div ref={draggleRef}>{modal}</div>
                </Draggable>
              )}
            >
              <p>Master: <Link to={`/master/${modalOrder?.master._id}`}>{modalOrder ? modalOrder.master.name : ""}</Link></p>
              <img src={modalOrder?.master.picture} alt="" />
              <p>Status: {modalOrder ? modalOrder.status : ""}</p>
              <p>Date: {modalOrder ? modalOrder.date : ""}</p>
              <p>Time: {modalOrder ? modalOrder.time : ""}</p>
              {/* <br /> */}
              <p>Service: {modalOrder ? modalOrder.service : ""}</p>
              <p>Comment: {modalOrder ? modalOrder.comment : ""}</p>
              <img src={modalOrder ? modalOrder.master.email : ""} alt="" />
            </Modal>
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value: { month: () => number }) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value: any) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  const onChange = (e: any) => {
    setValue(e);
  };

  const onSelect = () => {
    // alert('hi')
  };

  return (
    <>
      <div className="mainUser">
        <div className="link2">
          <div className="headUs">
            <HeaderUser />
          </div>
          <div className="calendarUser">
            <Calendar
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
              value={value}
              onChange={onChange}
              defaultValue={moment()}
              onSelect={onSelect}
            //@ts-ignore
            //   validRange={[moment([2021, 8, 12]), moment()]}
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
};
