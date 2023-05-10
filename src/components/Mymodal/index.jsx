import { Button, Space } from "antd";
import React, { useState, useMemo } from "react";
import Modal from "./Modal";

/* 挂载方式调用modal */
export default function App() {
  const [visible, setVisible] = useState(false);
  const [nameShow, setNameShow] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
    setNameShow(!nameShow);
  };
  /* 防止 Model 的 PureComponent 失去作用 */
  const [handleClose, handleOk, handleCancel] = useMemo(() => {
    const Ok = () => console.log("点击确定按钮");
    const Close = () => setVisible(false);
    const Cancel = () => console.log("点击取消按钮");
    return [Close, Ok, Cancel];
  }, []);

  return (
    <>
      <Modal
        onCancel={handleCancel}
        onClose={handleClose}
        onOk={handleOk}
        title={"Modal1"}
        visible={visible}
        width={700}
      >
        <div className="feel">内容。。。。。。。</div>
      </Modal>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setVisible(!visible);
            setNameShow(false);
          }}
        >
          model show
        </Button>
        <Button type="primary" onClick={handleClick}>
          model show ( 显示作者 )
        </Button>
      </Space>
    </>
  );
}
