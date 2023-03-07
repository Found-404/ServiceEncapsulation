import { Button, Form, Input, Popconfirm, Select, Table, Checkbox } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  select,
  children,
  dataIndex,
  record,
  check,
  handleSave,
  ...restProps
}) => {
  //   const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  //   useEffect(() => {
  //     if (editing) {
  //       inputRef.current.focus();
  //     }
  //   }, [editing]);
  //   const toggleEdit = () => {
  //     // setEditing(!editing);
  //     form.setFieldsValue({
  //       [dataIndex]: record[dataIndex],
  //     });
  //   };
  const save = async () => {
    try {
      const values = await form.validateFields();
      //   toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  const selectChange = async () => {
    try {
      const values = await form.validateFields();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  const checkChange = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        initialValue={children[1]}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    );
  }
  if (select) {
    childNode = (
      <Form.Item initialValue={children[1]} name={dataIndex}>
        <Select
          onChange={selectChange}
          options={[
            {
              value: "0",
              label: "第一条",
            },
            {
              value: "1",
              label: "第二条",
            },
          ]}
        />
      </Form.Item>
    );
  }
  if (check) {
    childNode = (
      <Form.Item name={dataIndex} initialValue={children[1]}>
        <Checkbox.Group>
          <Checkbox value={1} onChange={checkChange}>
            必填
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const Text = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      name: "Edward King 0",
      age: "32",
      address: "0",
      check: [1],
    },
    {
      key: 1,
      name: "Edward King 1",
      age: "32",
      address: "1",
      check: [1],
    },
  ]);
  const [count, setCount] = useState(2);
  // 返回Table所选数据key
  const [returnselectedRowKeys, setreturnselectedRowKeys] = useState([]);
  const onreyurnSelectChange = (newSelectedRowKeys, datas) => {
    console.log("出参勾选", newSelectedRowKeys, datas);
    setreturnselectedRowKeys(newSelectedRowKeys);
  };
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
    },
    {
      title: "address",
      dataIndex: "address",
      select: true,
    },
    {
      title: "check",
      dataIndex: "check",
      check: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: "0",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable && !col.select && !col.check) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        select: col.select,
        check: col.check,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const returnRowSelection = {
    selectedRowKeys: returnselectedRowKeys,
    onChange: onreyurnSelectChange,
  };
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Button onClick={() => console.log(dataSource)}>提交</Button>
      <Table
        pagination={{
          pageSize: 4,
          hideOnSinglePage: true,
        }}
        rowSelection={returnRowSelection}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default Text;
