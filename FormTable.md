# antd中的表格表单+日期限制

经常会遇到这种需求，一个表格中需要有可编辑的input，甚至可能还会有日期组件，而官方的demo中并没有这类案例

## Formtable

```jsx

import { Button, Form, Input, Table } from "antd";
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
      render: (text, record, index) => {
        return (
          <Form.Item name={["table", index, "age"]}>
            <Input placeholder="请输入年龄" />
          </Form.Item>
        );
      },
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: (text, record, index) => {
        return (
          <Form.Item name={["table", index, "date"]}>
            <Datepicker time={text} />
          </Form.Item>
        );
      },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
    // 定时器模拟请求
      form.setFieldsValue({
        table: [
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            date: [
              moment("2002-01-30", "YYYY-MM-DD"),
              moment("2002-01-30", "YYYY-MM-DD"),
            ],
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            date: [
              moment("2012-01-30", "YYYY-MM-DD"),
              moment("2022-01-30", "YYYY-MM-DD"),
            ],
          },
        ],
      });
    }, 200);
    
  }, [form]);

  const onFinish = (values) => {
    console.log('点击Submit获取值',values);
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


```


## Datepicker

该日期组件进行了选择限制，比如我选择了1月01日，那么结束日期就只能选择1月08日

```jsx

import { DatePicker } from 'antd';
import React, { useState } from 'react';
const { RangePicker } = DatePicker;
const Datepicker = ({time}) => {
  const [dates, setDates] = useState(time);
  const [value, setValue] = useState(null);
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    // 此处的常量就是限制选择范围的
    // 跟官方的不同 这里限制了仅可选择第七天
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooLateTwo = dates[0] && current.diff(dates[0], 'days') < 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    const tooEarlyTwo = dates[1] && dates[1].diff(current, 'days') < 7;
    return !!tooEarly || !!tooLate ||!!tooLateTwo || !!tooEarlyTwo;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  return (
    <RangePicker
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val)}
      onChange={(val) => setValue(val)}
      onOpenChange={onOpenChange}
      onBlur={() => console.log('blur has been triggered')}
    />
  );
};
export default Datepicker;

```