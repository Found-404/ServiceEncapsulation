import React from "react";
import Formtable from "./components/Table/Formtable";
import Datepickerdemo from "./components/Table/Demo"
import CheckboxForm from "./components/CheckboxForm/CheckboxForm";
import EditTable from "./components/Table/EditTable";
import Formily from "./components/Formily/Demo";
import Reactive from "./components/Formily/Reactive";

const App = () => {
  return (
    <div>
      <h1>测试Demo</h1>
      {/* <Formtable></Formtable> */}
      {/* <Datepickerdemo></Datepickerdemo> */}
      {/* <CheckboxForm></CheckboxForm> */}
      {/* <EditTable /> */}
      {/* <Formily /> */}
      <Reactive />
    </div>
  );
};

export default App;
