import { useState, useEffect, useRef } from "react";

// 第一参数为你定时的数字
// 第二参数为你定时结束时想做的事
// 返回的第一参数为可变值
// 返回第二参数为触发函数
export function useTimer(Num, callBack = () => {}) {
  const [num, setNum] = useState(Num);
  const ref = useRef(null);
  // 调用这个方法,开始倒数
  const start = () => {
    setNum(Num); // 重新赋值
    // 定时器
    ref.current = setInterval(() => {
      setNum((num) => num - 1);
    }, 1000);
  };
  // 倒数为0 关闭定时器
  useEffect(() => {
    if (num === 0) {
      return () => {
        clearInterval(ref.current); // 关闭定时器
        callBack(); // 自己想做的事
      };
    }
  }, [num]);

  // 解决当正在计数的组件开始倒数 删除组件导致无法取消定时器
  useEffect(() => {
    return () => {
      clearInterval(ref.current);
    };
  }, []);
  // 返回可变值 与 触发函数
  return {
    num, // 可变值
    start, // 触发函数
  };
}

function App() {
  const { num, start } = useTimer(5, () => {
    setIsShow(true);
  });

  const [IsShow, setIsShow] = useState(true);

  const isShow = () => {
    setIsShow(false);
    start();
  };

  return (
    <div>
      <button disabled={!IsShow} onClick={isShow}>
        {IsShow ? "显示" : "还有" + num + "秒恢复"}
      </button>
    </div>
  );
}

export default App;
