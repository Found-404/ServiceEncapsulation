import React from "react";
import { Form, Table, Input, Space, Button, InputNumber } from "antd";
// import styler from './index.less';
export default function EditTable(props) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const columns = (add, remove) => {
    const rules = [{ required: true, message: "请填充内容!" }];
    return [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        sorter: (a, b) => a.key - b.key,
        render: (a) => a + 1,
      },
      {
        title: "name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name - b.name,
        render: (_, record) => {
          return (
            <Form.Item
              rules={rules}
              name={[record.name, "name"]}
              // fieldKey={[record.fieldKey, "name"]}
            >
              <Input placeholder="place input name" />
            </Form.Item>
          );
        },
      },
      {
        title: "age",
        dataIndex: "age",
        key: "age",
        render: (_, record) => {
          return (
            <Form.Item
              rules={rules}
              name={[record.name, "age"]}
              // fieldKey={[record.fieldKey, "age"]}
            >
              <Input placeholder="place input age" />
            </Form.Item>
          );
        },
      },
      {
        title: "address",
        dataIndex: "address",
        key: "address",
        render: (_, record, index) => {
          return (
            <Form.Item shouldUpdate noStyle>
              {({ getFieldValue }) =>
                getFieldValue(["table", index, "name"]) === "yh" ? (
                  <Form.Item
                    rules={rules}
                    name={[record.name, "address"]}
                    // fieldKey={[record.fieldKey, "address"]}
                  >
                    <Input placeholder="pleace input address" />
                  </Form.Item>
                ) : (
                  <Form.Item
                    rules={rules}
                    name={[record.name, "address"]}
                    // fieldKey={[record.fieldKey, "address"]}
                  >
                    <InputNumber />
                  </Form.Item>
                )
              }
            </Form.Item>
          );
        },
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (text, record) => {
          return (
            <Space>
              <i
                type="text"
                onClick={() => add()}
                className="iconfont iconaddData"
              />
              <i
                type="text"
                onClick={() => remove(record.name)}
                className="iconfont icondelete"
              />
            </Space>
          );
        },
      },
    ];
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={{ table: [{ name: "1" }, { name: "2" }] }}
        onFinish={onFinish}
      >
        <Form.Item label colon={false}>
          <Form.List name="table">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Table dataSource={fields} columns={columns(add, remove)} />
                </div>
              );
            }}
          </Form.List>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
