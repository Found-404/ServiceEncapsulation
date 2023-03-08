import { DatePicker } from "antd";
import React, { useState } from "react";

import moment from "moment";

const { RangePicker } = DatePicker;
const Datepicker = ({ time, form, nameDate }) => {
  const [dates, setDates] = useState(time);
  const [value, setValue] = useState(null);
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooLateTwo = dates[0] && current.diff(dates[0], "days") < 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    const tooEarlyTwo = dates[1] && dates[1].diff(current, "days") < 7;
    return !!tooEarly || !!tooLate || !!tooLateTwo || !!tooEarlyTwo;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
      // console.log(dates[0].format("YYYY-MM-DD"), "新的数据");
      // ## 重构数据
      const newTime = form.getFieldValue("table").map((tit) => {
        if (Number(tit.key) === nameDate + 1) {
          return {
            ...tit,
            date: [
              moment(dates[0].format("YYYY-MM-DD"), "YYYY-MM-DD"),
              moment(dates[1].format("YYYY-MM-DD"), "YYYY-MM-DD"),
            ],
          };
        } else {
          return { ...tit };
        }
      });
      // ## 将重构的数据应用
      form.setFieldsValue({
        table: newTime,
      });
    }
  };
  return (
    <RangePicker
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val)}
      onChange={(val) => setValue(val)}
      onOpenChange={onOpenChange}
      onBlur={() => console.log("blur has been triggered")}
    />
  );
};
export default Datepicker;
