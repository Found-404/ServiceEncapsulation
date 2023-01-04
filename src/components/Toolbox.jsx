
import React from "react";
import { Element, useEditor } from "@craftjs/core";
import { Container } from "./Container";
import { Row, Col, Button } from 'antd';
import { MyButton } from './Button'


export const Toolbox = () => {
  const { connectors, query } = useEditor();

  return (
    <Row container>
      <Col span={24} container direction="column" >
        <Button ref={ref => connectors.create(ref, <MyButton text="拖拽生成的按钮"/>)}>Button</Button>
      </Col>
      <Col span={24} container direction="column" >
        {/* 注意Container这里：是创建一个element标签，然后表示为Container元素，然后是个canvas节点   这样的才可以进行编辑*/}
        <Button ref={ref => connectors.create(ref, <Element is={Container} padding={20} canvas />)} >Container</Button>
      </Col>
    </Row>
  )
};
