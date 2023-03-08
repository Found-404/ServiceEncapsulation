import { Checkbox, Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
const CheckboxGroup = Checkbox.Group;

// 子checkbox可选选项
const plainOptions = ["Apple", "Pear", "Orange"];
// 默认子checkbox已选选项
const defaultCheckedList = ["Pear", "Orange"];
const CheckboxForm = () => {
  const [form] = Form.useForm();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  // 子checkbox Change改变
  const onChange = (list) => {
    form.setFieldValue("checks", list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    form.setFieldValue(
      "checkAll",
      !!list.length && list.length < plainOptions.length
    );
    form.setFieldValue("checkAll", list.length === plainOptions.length);
  };
  
  // 全选Checkbox Change改变
  const onCheckAllChange = (e) => {
    form.setFieldValue("checks", e.target.checked ? plainOptions : []);
    setIndeterminate(
      !!form.getFieldValue("checks").length &&
        form.getFieldValue("checks").length < plainOptions.length
    );
    form.setFieldValue("checkAll", e.target.checked);
  };

  // 判断默认选项是否不为空 改变全选checkbox为半选
  useEffect(() => {
    if (checkedList.length) {
      setIndeterminate(
        !!form.getFieldValue("checks").length &&
          form.getFieldValue("checks").length < plainOptions.length
      );
    }
  }, [checkedList.length, form]);

  // 提交
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="input" label="user">
          <Input />
        </Form.Item>
        <Form.Item label="选择">
          <Form.Item
            name="checkAll"
            noStyle
            initialValue={checkAll}
            valuePropName="checked"
          >
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange}>
              Check all
            </Checkbox>
          </Form.Item>
          <Form.Item name="checks" noStyle initialValue={checkedList}>
            <CheckboxGroup options={plainOptions} onChange={onChange} />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CheckboxForm;
