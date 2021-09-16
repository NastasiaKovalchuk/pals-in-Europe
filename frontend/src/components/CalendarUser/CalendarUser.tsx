import { useEffect, useState } from "react";
import "./CalendarUser.scss";
import { Calendar, Badge, Modal } from "antd";
import moment from "moment";
import Draggable from "react-draggable";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { HeaderMaster } from "../Master/HeaderMaster.tsx/HeaderMaster";
import { Appointment, Master, User } from "../../redux/initState";
import { HeaderUser } from "../User/HeaderUser.tsx/HeaderUser";

export const UserCalendarComponent = () => {
  const [modalMaster, setModalMaster] = useState<Master>();
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);
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
  const masters = useSelector((state: RootStateValue) => state.masters);

  const draggleRef = React.createRef();

  const handleOk = (e: any) => {
    e.stopPropagation()
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    e.stopPropagation()
    setVisible(false);
  };

  const showModal = (item: Appointment) => {
    let master;
    for (let i = 0; i < masters.length; i++) {
      for (let j = 0; j < masters[i].appointments.length; j++) {
        if (masters[i].appointments[j].date === item.date && masters[i].appointments[j].time === item.time && masters[i].appointments[j].user._id == item.user._id) {
          master = masters[i];
        }
      }
    }
    setVisible(true);
    setModalMaster(master);
  };

  useEffect(() => {
    if (state.userID) {
      if (masters.length > 0) {
        const arr = masters.map((master: Master) => master.appointments).flat();
        setUserAppointments(arr.filter(appointment => appointment.user._id === state.userID))
      }
    }
  }, [masters, state.masterID, state.userID]);

  function getListData(value: { date: () => any }) {
    let listData = [];
    for (let i = 0; i < userAppointments.length; i++) {
      if (Number(userAppointments[i].date.split("-")[0]) === value.date()) {
        listData.push(userAppointments[i]);
      }
    }
    return listData;
  }

  function dateCellRender(value: any) {
    const listData = getListData(value);

    return (
      <ul>
        {listData.map((item: Appointment) => (
          <li key={item.user.email} className="events">
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
                <Draggable
                  disabled={disabled}
                >
                  {/* @ts-ignore */}
                  <div ref={draggleRef}>{modal}</div>
                </Draggable>
              )}
            >
              <p>{modalMaster ? modalMaster.name : ""}</p>
              <br />
              <img src={modalMaster ? modalMaster.picture : ""} alt="" />
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
