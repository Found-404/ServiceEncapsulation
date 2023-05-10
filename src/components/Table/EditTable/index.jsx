import { Button, Space } from "antd";
import React, { useState } from "react";
import EditTable, { useEditTable } from "./EditTable";

const EditTableDemo = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      name: "Edward King 0",
      age: "32",
      address: 0,
    },
    {
      key: 1,
      name: "Edward King 1",
      age: "32",
      address: 0,
    },
  ]);
  const [handleDelete, handleAdd] = useEditTable(dataSource, setDataSource);
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      select: true,
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Button type="link" onClick={() => handleDelete(record.key)}>
            删除
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <EditTable
        dataSource={dataSource}
        setDataSource={setDataSource}
        columns={columns}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleAdd({
              key: dataSource.length,
              name: `自定义 ${dataSource.length}`,
              age: "32",
              address: 0,
            })
          }
        >
          添加
        </Button>
        <Button type="primary" onClick={() => console.log(dataSource)}>
          提交
        </Button>
      </Space>
    </>
  );
};

export default EditTableDemo;
