import { Button, Form, Table } from "antd";
import React, { useEffect } from "react";

import Datepicker from "./Datepicker";

import moment from "moment";

const Formtable = (props) => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: (text, record, index) => {
        return (
          <Form.Item name={["table", index, "date"]}>
            <Datepicker time={text} form={form} nameDate={index} />
          </Form.Item>
        );
      },
    },
  ];

  useEffect(() => {
    // ## 初始化表格数据(在没有请求到数据前有一行做展示)
    form.setFieldsValue({
      table: [
        {
          key: "",
          name: "",
          age: "",
          date: "",
        },
      ],
    });
    setTimeout(() => {
      // ## 模拟请求后获取的table数据
      form.setFieldsValue({
        table: [
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            date: [
              moment("2022-01-30", "YYYY-MM-DD"),
              moment("2022-02-01", "YYYY-MM-DD"),
            ],
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            date: [
              moment("2022-02-01", "YYYY-MM-DD"),
              moment("2022-03-31", "YYYY-MM-DD"),
            ],
          },
          {
            key: "3",
            name: "胡英军",
            age: 80,
            date: [
              moment("2022-02-01", "YYYY-MM-DD"),
              moment("2022-03-31", "YYYY-MM-DD"),
            ],
          },
          {
            key: "4",
            name: "胡图图",
            age: 20,
            date: [
              moment("2022-02-01", "YYYY-MM-DD"),
              moment("2022-03-31", "YYYY-MM-DD"),
            ],
          },
        ],
      });
    }, 1000);
  }, []);

  const onFinish = (values) => {
    // ## 点击Submit提交后
    console.log(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="table" valuePropName="dataSource">
        <Table bordered columns={columns} pagination={false} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Formtable;
