import { Modal, Button } from "antd";
import React, { SetStateAction, useState } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";

interface ModalType {
  visible: boolean;
  setVisible: any;
  showModal: () => void;
}

const ModalComp = ({ visible, setVisible, showModal }:ModalType) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = React.createRef();

  //   const showModal = () => {
  //     setVisible(true);
  //   };

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
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };

  return (
    <>
      <Button onClick={showModal}>Open</Button>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Draggable Modal
          </div>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event: any, uiData: any) => onStart(event, uiData)}
          >
            {/* @ts-ignore */}
            <div ref={this.draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <p>
          Just don&apos;t learn physics at school and your life will be full of
          magic and miracles.
        </p>
        <br />
        <p>
          Day before yesterday I saw a rabbit, and yesterday a deer, and today,
          you.
        </p>
      </Modal>
    </>
  );
};

export default ModalComp;
