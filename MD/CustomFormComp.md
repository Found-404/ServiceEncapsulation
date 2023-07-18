# From.Item 包裹自定义 RangePicker 组件

## 起初

业务当中要对`RangePicker`进行封装，对可选日期进行限制



## 问题

但是被`<Form.Item>`包裹的自定义组件往往无法进行`setFieldValue`,好在 antd 默认为子组件传递了`onChange`&&`value`

> `value`为`<Form.Item>` name 对应的字段值



## 代码

```js
import React, { memo, useState } from "react";
import { Button, Form, DatePicker, Space } from "antd";
import moment from "moment";

import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { RangePicker } = DatePicker;

/**
 * 自定义组件
 */
const CustomComp = memo((props) => {
  const { onChange, value, disabled, platform } = props;
  // 将value设置为dates状态默认值，不然你在外部form.setFieldValue是不生效的
  const [dates, setDates] = useState(value);

  function handleChange(value) {
    // value修改传入的onChange也要触发修改
    onChange && onChange(value);
  }

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    let dayLimit = 29;
    let weeks = null;
    if (platform === "ebay") {
      // 当属性platform为ebay的时候要禁用周一选择，并改变最大选择日期为27天
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
```

## 注意

**不同的自定义组件要视情况而定**
