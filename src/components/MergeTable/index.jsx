import { Table } from "antd";

const MergeTable = () => {
  let field = "category";
  const data = [
    {
      key: 0,
      category: "水果",
      name: "桃子",
      desc: "9",
      type: "@##",
      user4: "1.0.1",
      // rowSpan: 2,
    },
    {
      key: 1,
      category: "水果",
      name: "梨子",
      desc: "7",
      type: "@##",
      user4: "1.0.1",
      // rowSpan: 0,
    },
    {
      key: 2,
      category: "蔬菜",
      name: "茄子",
      desc: "5",
      type: "@##",
      user4: "1.0.2",
      // rowSpan: 2,
    },
    {
      key: 9,
      category: "蔬菜",
      name: "番茄",
      desc: "3",
      type: "@##",
      user4: "1.0.2",
      // rowSpan: 0,
    },
    {
      key: 3,
      category: "家禽",
      name: "牛肉",
      desc: "30",
      type: "@##",
      user4: "1.0.3",
      // rowSpan: 3,
    },
    {
      key: 4,
      category: "家禽",
      name: "羊肉",
      desc: "15",
      type: "@##",
      user4: "1.0.3",
      // rowSpan: 0,
    },
    {
      key: 5,
      category: "家禽",
      name: "猪肉",
      desc: "20",
      type: "@##",
      user4: "1.0.3",
      // rowSpan: 0,
    },
    {
      key: 6,
      category: "水果",
      name: "苹果",
      desc: "20",
      type: "@##",
      user4: "1.0.3",
      // rowSpan: 0,
    },
    {
      key: 7,
      category: "水果",
      name: "菠萝",
      desc: "20",
      type: "@##",
      user4: "1.0.3",
      // rowSpan: 0,
    },
  ];
  const columns = [
    {
      title: "种类",
      dataIndex: "category",
      onCell: (record, index) => {
        // console.log(record.category, record.rowSpan)
        return { rowSpan: record.rowSpan };
      },
    },
    {
      title: "名字",
      // colSpan: 2, // 设置占位2格
      dataIndex: "name",
      /**
       * 每4行都是一个日期，从index = 0 开始，
       * 每隔4行的rowSpan为4，其余的rowSpan为0
       */
      // onCell: (_, index) => ({
      //   rowSpan: index % 2 === 0 || index === 0 ? 2 : 0,
      // }),
    },
    {
      title: "组",
      dataIndex: "type",
    },
    {
      title: "价格",
      dataIndex: "desc",
    },
    {
      title: "规格",
      dataIndex: "user4",
      onCell: (record, index) => {
        return { rowSpan: record.rowSpan };
      },
    },
  ];
  const changeData = (data, field) => {
    let count = 0; //重复项的第一项
    let indexCount = 1; //下一项
    while (indexCount < data.length) {
      var item = data.slice(count, count + 1)[0]; //获取没有比较的第一个对象
      if (!item.rowSpan) {
        item.rowSpan = 1; //初始化为1
      }
      if (item[field] === data[indexCount][field]) {
        //第一个对象与后面的对象相比，有相同项就累加，并且后面相同项设置为0
        item.rowSpan++;
        data[indexCount].rowSpan = 0;
      } else {
        count = indexCount;
      }
      indexCount++;
    }
  };
  changeData(data, field); //处理数据

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      ></Table>
    </div>
  );
};

export default MergeTable;
