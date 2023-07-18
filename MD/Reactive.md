# @Formily/Reactive

@formily/reactive 的核心思想是参考 Mobx 的，那为什么要重新造轮子呢？

主要有 4 点原因：

mobx 不支持 action 内部进行依赖收集
mobx 的 observable 函数不支持过滤 react node,moment,immutable 之类的特殊对象
mobx 的 observable 函数会自动将函数变成 action
mobx-react-lite 的 observer 不支持 React 并发渲染
基于以上原因，formily 不得不重新造轮子，不过该轮子是强依赖 Proxy 的，也就是不支持 IE 浏览器，当然，重新造轮子也有它的好处：

把控性更强，可以为 formily 场景做更深的优化定制
不用考虑 Mobx 的历史包袱，代码可以更干净
如果 Mobx 版本 Break Change 或者存在安全漏洞，对 Formily 无影响

## API

### observable

#### observable/observable.deep

> 创建深度劫持响应式对象

```js
import { observable, autorun } from "@formily/reactive";
import { Button } from "antd";

const obs = observable({
  aa: {
    bb: 123,
  },
});

autorun(() => {
  console.log(obs.aa.bb); // 默认会先执行一次
});

const Reactive = () => {
  const btnClick = () => {
    obs.aa.bb = 123456; // 触发修改再次执行autorun内函数
  };

  return (
    <>
      <Button onClick={btnClick}>点击</Button>
    </>
  );
};

export default Reactive;
```

#### observable.shallow

> 创建浅劫持响应式对象，也就是只会对目标对象的第一级属性操作响应

```js
import { observable, autorun } from "@formily/reactive";
import { Button } from "antd";

const obs = observable.shallow({
  aa: {
    bb: 111,
  },
});

autorun(() => {
  console.log(obs.aa.bb);
});

const Reactive = () => {
  const btnClick = () => {
    obs.aa.bb = 123456; // 不会触发
    obs.aa = { bb: 123456 }; // 会触发(并且由于每次都会是一个新的对象造成持续触发)
  };

  return (
    <>
      <Button onClick={btnClick}>点击</Button>
    </>
  );
};

export default Reactive;
```

#### observable.computed

> 创建一个计算缓存器

```js
import { Button } from "antd";
import { observable, autorun } from "@formily/reactive";

const obs = observable({
  aa: 11,
  bb: 22,
});

const computed = observable.computed(() => obs.aa + obs.bb);

autorun(() => {
  console.log(computed.value);
});

const Reactive = () => {
  const btnClick = () => {
    obs.aa = 33; // 默认第一次为33，修改触发拦截输出55
  };

  return (
    <>
      <Button onClick={btnClick}>点击</Button>
    </>
  );
};

export default Reactive;
```

#### observable.ref

> 创建引用劫持响应式对象

```js
import { Button } from "antd";
import { observable, autorun } from "@formily/reactive";

const ref = observable.ref(1);

autorun(() => {
  console.log(ref.value);
});

const Reactive = () => {
  const btnClick = () => {
    ref.value = 2;
  };

  return (
    <>
      <Button onClick={btnClick}>点击</Button>
    </>
  );
};

export default Reactive;
```

#### observable.box

> 与 ref 相似，只是读写数据是通过 get/set 方法

```js
import { Button } from "antd";
import { observable, autorun } from "@formily/reactive";

const box = observable.box(1);

autorun(() => {
  console.log(box.get());
});

const Reactive = () => {
  const btnClick = () => {
    box.set(2);
  };

  return (
    <>
      <Button onClick={btnClick}>点击</Button>
    </>
  );
};

export default Reactive;
```

### autorun

接收一个 tracker 函数，如果函数内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行

```js
import { Button } from "antd";
import { observable, autorun } from "@formily/reactive";

const obs = observable({});

const dispose = autorun(() => {
  console.log(obs.aa);
});

const Reactive = () => {
  const btnClick = () => {
    obs.aa = 123;
  };

  return (
    <>
      <Button onClick={btnClick}>点击</Button>
    </>
  );
};

export default Reactive;
```

### autorun/memo

> 在 autorun 中用于创建持久引用数据，仅仅只会受依赖变化而重新执行 memo 内部函数
> 注意：请不要在 If/For 这类语句中使用，因为它内部是依赖执行顺序来绑定当前 autorun 的

