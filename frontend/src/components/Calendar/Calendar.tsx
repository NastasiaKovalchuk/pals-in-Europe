import { useEffect, useState } from "react";
import "./Calendar.scss";
import { Calendar, Badge, Modal } from "antd";
import moment, { Moment } from "moment";
import Draggable from "react-draggable";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { HeaderMaster } from "../Master/HeaderMaster.tsx/HeaderMaster";
import { Appointment, Master, Order, User } from "../../redux/initState";

export const CalendarComponent = () => {
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

  const onStart = (event: any, uiData: { x: number; y: number }) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    //@ts-ignore
    const targetRect = this.draggleRef?.current?.getBoundingClientRect();
    // setBounds({
    //   left: -targetRect?.left + uiData?.x,
    //   right: clientWidth - (targetRect?.right - uiData?.x),
    //   top: -targetRect?.top + uiData?.y,
    //   bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    // });
  };

  const showModal = (item: Order) => {
    setVisible(true);
    setModalOrder(item);
  };

  useEffect(() => {
    console.log(state.masterID);

    if (state.masterID) {
      fetch("http://localhost:8080/master/orders", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => console.log(result));
    }
  }, [state.masterID]);

  function getListData(value: { date: () => any }) {
    let listData: Order[] = [];
    for (let i = 0; i < orders.length; i++) {
      // if (Number(orders[i].date.split("-")[0]) === value.date()) {
      //   listData.push(user[i]);
      // }
    }
    return listData;
  }

  function dateCellRender(value: Moment) {
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
                  onFocus={() => {}}
                  onBlur={() => {}}
                >
                  Your client
                </div>
              }
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              modalRender={(modal) => (
                <Draggable
                  disabled={disabled}
                  // bounds={bounds}
                  // onStart={(event: any, uiData: any) => onStart(event, uiData)}
                >
                  {/* @ts-ignore */}
                  <div ref={draggleRef}>{modal}</div>
                </Draggable>
              )}
            >
              <p>
                {modalOrder && modalOrder.client.name
                  ? modalOrder.client.name
                  : ""}
              </p>
              <br />
              <p>
                {modalOrder && modalOrder.client.email
                  ? modalOrder.client.email
                  : ""}
              </p>
            </Modal>
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value: Moment) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value: Moment) {
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
      <div className="masterAccount">
        <div className="link2">
          <HeaderMaster />
          <div className="calendar">
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
