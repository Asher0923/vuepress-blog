---
title: 'Vue进阶'

---

## 双向绑定

采用数据劫持结合发布-订阅模式的方式，通过`Object.defineproperty()`来劫持各个属性的`setter`、`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调

![截屏2021-09-21 10.47.42](/Users/zhangtao/Desktop/截屏2021-09-21 10.47.42.png)

- Compile   --  解析指令
- Observer --  监听数据
- Watcher  --  更新试图
- MVVM     --  

