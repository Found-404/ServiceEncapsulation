import { Button, Form, Input, InputNumber, Table } from "antd";
import React, { useEffect, useState } from "react";
import _ from "lodash";

import { getUserList } from "./server";

const EditTable = (props) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);

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
      render: (a, b, c) => {
        return (
          <>
            <Form form={form}>
              <Form.Item
                name={`age_${b.key}`}
                initialValue={a}
                rules={[
                  { required: true, message: "此项为必填项" },
                  {
                    pattern: /\s\S+|S+\s|\S/,
                    message: "不可只输入空格",
                  },
                  {
                    validator: (rule, value) => {
                      const reg = new RegExp(
                        /^((0{1}\.[1-9]{1,}\d*)|(0{1}\.0{1,}[1-9]{1,}\d*)|([1-9]\d*\.{1}\d{1,})|([1-9]+\d*))$/
                      );
                      if (!reg.test(value)) {
                        return Promise.reject("请输入正数");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  onBlur={(e) => {
                    form.validateFields().then(async () => {
                      let tableData = _.cloneDeep(dataSource);
                      b = Object.assign(b, { age: e.target.value });
                      tableData[c] = b;
                      setDataSource(tableData);
                      // form.setFieldsValue({
                      //   [`age_${b.key}`]: b.age,
                      // })
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </>
        );
      },
    },
    {
      title: "测试",
      dataIndex: "test",
      key: "test",
      render: (a, b, c) => {
        return (
          <>
            <Form form={form}>
              <Form.Item
                name={`test_${b.key}`}
                initialValue={a}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <InputNumber
                  onBlur={(e) => {
                    form.validateFields().then(async () => {
                      let tableData = _.cloneDeep(dataSource);
                      b = Object.assign(b, { test: e.target.value });
                      tableData[c] = b;
                      setDataSource(tableData);
                      // form.setFieldsValue({
                      //   [`test_${b.key}`]: b.test,
                      // })
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      // ## 模拟请求后获取的table数据
      const data = [
        {
          key: "1",
          name: "胡彦斌",
          age: 32,
          test: 100,
        },
        {
          key: "2",
          name: "胡彦祖",
          age: 42,
          test: 100,
        },
        {
          key: "3",
          name: "胡英军",
          age: 80,
          test: 100,
        },
        {
          key: "4",
          name: "胡图图",
          age: 20,
          test: 100,
        },
      ];
      setDataSource(data);
    }, 1000);
  }, []);

  const onFinish = async () => {
    // ## 点击Submit提交后
    console.log(dataSource);
    await form.validateFields(); // 表单校验
    const data = await getUserList(); // 接口提交
    console.log(data);
  };

  return (
    <>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <Button htmlType="submit" type="primary" onClick={onFinish}>
        Submit
      </Button>
    </>
  );
};

export default EditTable;
