---
title: 'JS基础-Event Loop'
---

## 进程和线程

- 进程：CPU资源分配的最小单位
- 线程：CPU调度的最小单位

## 浏览器端Event Loop

1. 同步任务会一次加入执行栈(Call Stack)中执行

2. 异步任务丢给WebAPIs,进入Event Table(事件表),当事件表中的异步任务完成后会在Event Queue（事件队列）中注册回调函数

3. 当执行栈中的没有任务在执行的时候，引擎会从事件队列读取任务压入执行栈中处理执行。

4. js解析器会不断地重复检查主线程执行栈是否为空，然后重复第3步，这就是Event Loop（事件循环）

   ![](https://s1.ax1x.com/2020/04/23/JdFMtJ.png)

- WebAPIs是由C++实现的浏览器创建的线程，处理诸如DOM事件、http请求、定时器等异步事件

##### 微任务和宏任务

- 宏任务
  1. script(整体代码)
  2. setTimeout
  3. setInterval
  4. I/O 
  5. UI rendering
- 微任务
  1. Promise.then
  2. MutationObserver

##### 事件运行顺序

1. 执行同步任务，同步任务不需要做特殊处理，直接执行 --- 第一轮从 script开始
2. 宏任务队列头部取出一个任务执行
3. 执行过程中遇到微任务则将其添加到微任务的队列，宏任务则添加到宏任务队列
4. 执行完当前宏任务，将微任务队列中所有任务依次执行
5. **微任务执行过程中产生了新的微任务，则继续执行完微任务，直到微任务队列为空**

## Node中Event Loop

##### 微任务和宏任务

- 宏任务
  1. setTimeout
  2. setInterval
  3. setImmediate
  4. I/O 
- 微任务
  1. process.nextTick
  2. Promise.then

![tHibJs.png](https://s1.ax1x.com/2020/06/11/tHibJs.png)

##### 六个阶段

Node的事件循环分成了六个阶段，每个阶段对应一个宏任务队列

1. timers(计时器)--执行setTimeout以及setInterval的回调
2. I/O callbacks--处理网络、流、TCP的错误回调
3. idel,prepare--可忽略
4. poll(轮询)--执行poll中的I/O队列，检查定时器是否到时间
5. check(检查)--存放setImmediate回调
6. close callbacks--可忽略

##### 轮询顺序

- 每个阶段都要等对应的宏任务队列执行完毕才会进入到下一阶段的宏任务队列
- 每个阶段执行完执行微任务队列中所有的任务
- **process.nextTick()优先于promise.then()**

``` js
console.log('node  start')

const p1 = new Promise((resolve, reject) => {
  console.log('promise')
  resolve()
})

p1.then(() => {
  console.log('then')
})

setImmediate(() => {
  console.log('setImmediate');
})

setTimeout(() => {
  console.log('setTimeout');
}, 0)

process.nextTick(() => {
  console.log('nextTick');
})

console.log('node end')
```

