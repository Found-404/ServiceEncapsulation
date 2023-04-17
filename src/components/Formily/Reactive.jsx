import { Button } from "antd";
import { observable, autorun } from "@formily/reactive";

const obs1 = observable({
  aa: 0,
});

const dispose = autorun(() => {
  const obs2 = autorun.memo(() =>
    observable({
      bb: 0,
    })
  );
  // console.log(obs1.aa, obs2.bb++);
});

const Reactive = () => {
  const btnClick = () => {
    obs1.aa++;
  };

  return (
    <>
      <Button onClick={btnClick}>点击</Button>
    </>
  );
};

export default Reactive;
