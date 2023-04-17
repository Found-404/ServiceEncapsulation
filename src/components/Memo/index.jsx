import { memo, useState, useCallback, useMemo } from "react";

const Com1 = (props) => {
  console.log(`Com1 ---- ${props.count}`);
  return <div> {props.count}</div>;
};

const Com2 = (props) => {
  console.log(`Com2 ---- ${props.count}`);
  return <div> {props.count}</div>;
};

const Com3 = (props) => {
  console.log(`Com3 ---- ${props.count}`);
  return <div>{props.count}</div>;
};

const Com4 = (props) => {
  console.log(`Com4 ---- `);
  return <button onClick={props.handleCount3}>count1 * 2 + 1</button>;
};

const MemoCom1 = memo(Com1);
const MemoCom2 = memo(Com2);
const MemoCom3 = memo(Com3);
const MemoCom4 = memo(Com4);

const App = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const memoCount3 = useMemo(() => {
    return count1 * Math.random();
  }, [count1]);

  const handleCount3 = (e) => {
    console.log("handleCount3", e.target);
    setCount1(count1 + 1);
  };

  const callbackHandleCount3 = useCallback(
    (e) => {
      handleCount3(e);
    },
    [count1]
  );

  return (
    <>
      count1
      <MemoCom1 count={count1} />
      <button onClick={() => setCount1(count1 + 1)}>count1 + 1</button>
      count2
      <MemoCom2 count={count2} />
      <button onClick={() => setCount2(count2 + 1)}>count2 + 1</button>
      count3
      <MemoCom3 count={memoCount3} />
      count4
      <MemoCom4 handleCount3={handleCount3} />
    </>
  );
};
export default App;
