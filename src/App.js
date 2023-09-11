import React from "react";
import { Space, Divider } from "antd";
// import Formtable from "./components/Table/Formtable";
// import Datepickerdemo from "./components/Table/Demo"
// import CheckboxForm from "./components/CheckboxForm/CheckboxForm";
// import EditTableDemo from "./components/Table/EditTable";
// import Formily from "./components/Formily/Demo";
// import Reactive from "./components/Formily/Reactive";
// import Memo from './components/Memo'
// import UseTime from './components/UseTime'
// import Upload from "./components/Upload";
// import CustomFormComp from "./components/CustomFormComp";
// import Mymodal from "./components/Mymodal";
import MemoTwo from './components/MemoTwo'
// import Toast from "./components/Toast";
import EditTable from './components/EditTableTwo'
import Echarts from './components/Echarts'
import MergeTable from "./components/MergeTable";
import LinkageSelect from "./components/LinkageSelect";
import MarkdownReact from "./components/MarkdownReact";
import { Link, Route, Routes } from "react-router-dom";


const App = () => {

  const LinkArr = [
    {
      to: "/echarts",
      label: "图表",
      element: <Echarts />
    },
    {
      to: "/EditTable",
      label: "可编辑Table",
      element: <EditTable />
    },
    {
      to: "/mergeTable",
      label: "合并Table",
      element: <MergeTable />
    },
    {
      to: "/MemoTwo",
      label: "MemoTwo",
      element: <MemoTwo />
    },
    {
      to: "/linkageSelect",
      label: "联动Select",
      element: <LinkageSelect />
    },
    {
      to: "/MarkdownReact",
      label: "MarkdownReact",
      element: <MarkdownReact />
    },
  ]

  return (
    <div>
      <h1>测试Demo</h1>
      <Space style={{ marginBottom: '20px' }}>
        {
          LinkArr.map((ele, index) => {
            return <div key={index} >
              <Link to={ele.to}>{ele.label}</Link>
              {
                index !== LinkArr.length - 1 && <Divider type="vertical" />
              }
            </div>
          })
        }
      </Space>
      <Routes>
        {
          LinkArr.map((ele, index) => {
            return <Route key={index} path={ele.to} element={ele.element} />
          })
        }
      </Routes>

    </div>
  );
};

export default App;
