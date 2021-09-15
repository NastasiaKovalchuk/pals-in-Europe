import { useEffect, useState } from "react";
import "./Calendar.scss";
import { Calendar, Badge, Modal } from "antd";
import moment from "moment";
import Draggable from "react-draggable";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { HeaderMaster } from "../Master/HeaderMaster.tsx/HeaderMaster";

export const CalendarComponent = () => {
  const [modalUser, setModalUser] = useState({});
  const [user, setUser] = useState<any[]>([]);
  const [value, setValue] = useState(moment());
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const master = useSelector((state: RootStateValue) => state.user);

  // console.log(master);

  const draggleRef = React.createRef();

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
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

  const showModal = (item: any) => {
    setVisible(true);
    setModalUser(item);
  };

  useEffect(() => {
    if (master.masterID) {
      fetch(`http://localhost:8080/master/test/${master.masterID}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          setUser(result.appointments);
        });
    }
  }, [master.masterID]);
  console.log(user);

  function getListData(value: { date: () => any }) {
    let listData = [];
    for (let i = 0; i < user.length; i++) {
      if (Number(user[i].date.split("-")[0]) === value.date()) {
        listData.push(user[i]);
      }
    }
    return listData;
  }

  function dateCellRender(value: any) {
    const listData = getListData(value);

    return (
      <ul>
        {listData.map((item) => (
          //@ts-ignore
          <li key={item.user.email} className="events">
            {/* @ts-ignore */}
            <Badge
              className="badge"
              //@ts-ignore
              onClick={() => showModal(item)}
              status={"default"}
              title="hi"
              text={`${item.time}: ${item.user.email}`}
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
              //@ts-ignore
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
              {/* @ts-ignore */}
              <p>{modalUser && modalUser.user ? modalUser.user.email : ""}</p>
              <br />
              {/* @ts-ignore */}
              <p>{modalUser && modalUser.user ? modalUser.user.login : ""}</p>
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
      <div className="masterAccount">
        <div className="link2">
          <HeaderMaster />
          <div className="calendar">
            <Calendar
              // @ts-ignore
              dateCellRender={user.length > 0 ? dateCellRender : ""}
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
