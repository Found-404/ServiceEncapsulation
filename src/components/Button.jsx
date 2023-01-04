import React from "react";
import { useNode } from "@craftjs/core";
import { Button } from 'antd';


export const MyButton = (props) => {
  const { connectors: { connect, drag } } = useNode();
  const { text } = props;
  return (
    // 说这个组件是可以拖动的
    <Button ref={ref => connect(drag(ref))} >
      {text}
    </Button>
  )
}

// 给按钮的默认配置，如果不传就走的这个参数，默认文字为`按钮`
export const ButtonDefaultProps = {
  text: '按钮',
};

MyButton.craft = {
  props: ButtonDefaultProps
}
