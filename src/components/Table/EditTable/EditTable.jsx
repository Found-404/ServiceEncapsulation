import { Button, Form, Input, Popconfirm, Select, Table } from "antd";
import React, { useContext, useRef, memo } from "react";
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
  handleSave,
  ...restProps
}) => {
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  /**
   * 改变数据后触发handleSave保存重置数据
   * @param
   */
  const save = async () => {
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
        <Select
          onChange={save}
          options={[
            {
              value: 0,
              label: "第一条",
            },
            {
              value: 1,
              label: "第二条",
            },
            {
              value: 2,
              label: "第三条",
            },
          ]}
        />
      </Form.Item>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export const useEditTable = (dataSource, setDataSource) => {
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const handleAdd = (newData) => {
    setDataSource([...dataSource, newData]);
  };
  return [handleDelete, handleAdd];
};

const EditTable = memo((props) => {
  const { dataSource, setDataSource, columns, ...otherProps } = props;
  // const [count, setCount] = useState(2);

  /**
   * 删除数据
   * @param
   */
  // const handleDelete = (key) => {
  //   const newData = dataSource.filter((item) => item.key !== key);
  //   setDataSource(newData);
  // };

  /**
   * 添加数据
   * @param
   */
  // const handleAdd = () => {
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: "32",
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  /**
   * 编辑保存数据
   * @param
   */
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

  return (
    <div>
      <Table
        pagination={{
          pageSize: 4,
          hideOnSinglePage: true,
        }}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns?.map((col) => {
          if (!col.editable && !col.select) {
            return col;
          }
          return {
            ...col,
            onCell: (record) => ({
              record,
              editable: col.editable,
              select: col.select,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave,
            }),
          };
        })}
        {...otherProps}
      />
    </div>
  );
});
export default EditTable;
