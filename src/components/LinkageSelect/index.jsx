import React from "react";
import { Form, Select } from "antd";

const style = {
  width: "100px",
};

const LinkageSelect = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Form layout="inline" form={form}>
        <Form.Item
          name="sheng"
          label="省"
          rules={[
            { required: true, message: "请选择省" },
            ({ getFieldValue, setFieldValue }) => ({
              validator: (rule, value) => {
                console.log(value, rule);
              },
            }),
          ]}
        >
          <Select
            style={style}
            allowClear
            options={[
              {
                value: "1",
                label: "1",
              },
              {
                value: "2",
                label: "2",
              },
              {
                value: "3",
                label: "3",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="市"
          name="shi"
          rules={[
            { required: true, message: "请选择市" },
            ({ getFieldValue, setFieldValue }) => ({
              validator: (rule, value) => {
                console.log(value, rule);
              },
            }),
          ]}
        >
          <Select
            style={style}
            allowClear
            options={[
              {
                value: "1",
                label: "1",
              },
              {
                value: "2",
                label: "2",
              },
              {
                value: "3",
                label: "3",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="区"
          name="qv"
          rules={[
            { required: true, message: "请选择区" },
            ({ getFieldValue, setFieldValue }) => ({
              validator: (rule, value) => {
                console.log(value, rule);
              },
            }),
          ]}
        >
          <Select
            style={style}
            allowClear
            options={[
              {
                value: "1",
                label: "1",
              },
              {
                value: "2",
                label: "2",
              },
              {
                value: "3",
                label: "3",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LinkageSelect;
