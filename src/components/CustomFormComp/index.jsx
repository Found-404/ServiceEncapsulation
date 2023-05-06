import React, { memo, useState } from "react";
import { Button, Form, DatePicker, Space } from "antd";
import moment from "moment";

import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { RangePicker } = DatePicker;

const CustomComp = memo((props) => {
  const { onChange, value, disabled, platform } = props;
  const [dates, setDates] = useState(value);

  function handleChange(value) {
    onChange && onChange(value);
  }

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    let dayLimit = 29;
    let weeks = null;
    if (platform === "ebay") {
      dayLimit = 27;
      weeks = moment(current).format("dddd") === "星期一";
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > dayLimit;
    const tooLateTwo = dates[0] && current.diff(dates[0], "days") < dayLimit;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > dayLimit;
    const tooEarlyTwo = dates[1] && dates[1].diff(current, "days") < dayLimit;
    if (platform === "ebay") {
      if (dates[0] || dates[1]) {
        return !!tooEarly || !!tooLate || !!tooLateTwo || !!tooEarlyTwo;
      }
      return !weeks;
    }
    return !!tooEarly || !!tooLate || !!tooLateTwo || !!tooEarlyTwo;
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
      disabled={disabled}
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val)}
      onChange={handleChange}
      onOpenChange={onOpenChange}
    />
  );
});

const CustomFormComp = () => {
  const [form] = Form.useForm();
  const setValue = () => {
    form.setFieldValue("demo", [moment("2023-01-01"), moment()]);
  };
  const getValue = () => {
    console.log(
      form.getFieldValue("demo")?.map((ele) => moment(ele).format("YYYY-MM-DD"))
    );
  };
  return (
    <Form form={form}>
      <Form.Item name="demo" label="Demo" wrapperCol={{ span: 4 }}>
        <CustomComp platform="ebay" />
      </Form.Item>
      <Space>
        <Button type="primary" onClick={setValue}>
          赋值
        </Button>
        <Button type="primary" onClick={getValue}>
          查看
        </Button>
      </Space>
    </Form>
  );
};

export default CustomFormComp;
