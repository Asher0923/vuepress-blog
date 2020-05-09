---
title: 'React入门'
---

## 概述

React起源于Facebook的内部项目，13年5月开源，是用来构建UI的JavaScript库，使用JSX语法创建组件，实现组件化开发，通过Diff算法和虚拟DOM实现视图的高效更新

## 虚拟DOM

> React将DOM抽象为虚拟DOM，虚拟DOM是用一个对象来描述DOM，通过对比前后两个对象的差异，最终只把变化的部分重新渲染，提高渲染的效率

- 为什么用虚拟DOM

  当dom发生更改时需要遍历，原生dom可遍历属性多达231个，且大部分与渲染无关，更新页面代价较大

- 虚拟DOM的处理方式

  1. 用JavaScript对象结构方式表示DOM树的结构，然后用这个树构建一个真正的DOM树，插到文档中
  2. 当状态变更的时候，重新构造一颗新的对象树，然后用新的树和旧的树进行比较，记录两颗树差异
  3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

## Diff算法

> 传统diff算法的复杂度为O(n^3)，React通过定制大胆的策略，将复杂度转换成O(n)复杂度的问题
>
> 当使用React的时候，在某个时间点render()函数创建了一颗React元素树，在下一个state或者props更新的时候，render()函数将创建一颗新的React元素树，React将对比这两颗树的不同之处，计算出如何高效的更新UI（只更新变化的地方）
>
> React中有两种假定：
>
> 1. 两个不同类型的元素会产生不同的树（根元素不同结构树一定不同）
> 2. 开发者可以通过key属性指定不同树中没有发生改变的子元素

- 如果两棵树的根元素类型不同，React会销毁旧树，创建新树

  ``` html
  <!-- 旧树 -->
  <div>
    <Counter />
  </div>
  <!-- 新树 -->
  <span>
  	<Counter />
  </span>
  <!-- 执行过程：destory Counter -> insert Counter -->
  ```
  
- 对于类型相同的React DOM元素，React会对比两者的属性是否相同，只更新不同的属性，当处理完这个DOM节点，React会递归处理子节点

  ``` html
  <!-- 旧 -->
  <div className="before" title="stuff" />
  <!-- 新 -->
  <div className="after" title="stuff" />
  <!-- 只更新：className 属性 -->
  
  <!-- 旧 -->
  <div style={{color: 'red', fontWeight: 'bold'}} />
  <!-- 新 -->
  <div style={{color: 'green', fontWeight: 'bold'}} />
  <!-- 只更新：color属性 -->
  ```

- 在子节点的后面添加一个节点，这时候两棵树的转化工作执行的很好

  ``` html
  <!-- 旧 -->
  <ul>
      <li>first</li>
      <li>second</li>
  </ul>
  <!-- 新 -->
  <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
  </ul>
  <!-- 执行过程：React会匹配新旧两个<li>first</li>，匹配两个<li>second</li>，然后添加 <li>third</li> -->
  ```

- 但是如果在开始位置插入一个元素

  ``` html
  <!-- 旧 -->
  <ul>
      <li>second</li>
      <li>third</li>
  </ul>
  <!-- 新 -->
  <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
  </ul>
  <!-- 在没有key属性时执行过程：React将改变每一个子节点删除重新创建，而非保持<li>second</li>，<li>third</li>不变 -->
  ```

- key属性

  为了解决以上问题，React提供了一个key属性，当子节点带有key属性，React会通过key来匹配原始树和后来的树

  ``` html
  <!-- 旧 -->
  <ul>
      <li key="1">second</li>
      <li key="2">third</li>
  </ul>
  <!-- 新 -->
  <ul>
      <li key="0">first</li>
      <li key="1">second</li>
      <li key="2">third</li>
  </ul>
  <!-- 执行过程：React知道带有key'0'的元素时新的，对于'1'和'2'仅仅移动位置即可 -->
  ```
  

## 安装

- 通过脚手架

  ``` js
  npm install create-react-app -g // 全局安装脚手架
  create-react-app my-app // 创建项目
  默认目录：
    ├── package.json
    ├── public                  // 这个是webpack的配置的静态目录
    │   ├── favicon.ico
    │   ├── index.html          // 默认是单页面应用，这个是最终的html的基础模板
    │   └── manifest.json       
    ├── src
    │   ├── App.css             // App根组件的css
    │   ├── App.js              // App组件代码
    │   ├── App.test.js         // 单元测试
    │   ├── index.css           // 启动文件样式
    │   ├── index.js            // 启动的文件（开始执行的入口）！！！！
    │   ├── logo.svg
    │   └── serviceWorker.js    
    └── yarn.lock
  ```
  
- 不使用脚手架

  ``` js
  npm install -S react react-dom
  react：React库的入口点
  react-dom：提供了针对DOM的方法，比如讲创建的虚拟DOM渲染到页面
  ```

  ``` js
  // 1. 导入 react
  import React from 'react'
  import ReactDOM from 'react-dom'
  
  // 2. 创建 虚拟DOM
  // 参数1：元素名称  参数2：元素属性对象(null表示无)  参数3：当前元素的子元素string||createElement()的返回值
  const divVD = React.createElement('div', {
    title: 'hello react'
  }, 'Hello React！！！')
  
  // 3. 渲染
  // 参数1：虚拟dom对象  参数2：dom对象表示渲染到哪个元素内 参数3：回调函数
  ReactDOM.render(divVD, document.getElementById('app'))
  ```

- createElement()的问题

  代码编写不友好，太复杂

  ``` js
  var dv = React.createElement(
    "div", { title: 'hello' },
  React.createElement(
      "h1", null, 'h1-text'
    ),
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        "li-1"
      ),
      React.createElement(
        "li",
        null,
        "li-2"
      )
    )
  )
  // 渲染
  ReactDom.render(dv, document.getElementById('app'))
  ```
  

## JSX

> JSX语法最终会被编译成createElement()方法

``` js
const dv = (
  <div title="标题" className="cls container">Hello JSX!</div>
)
```

- 如果在JSX中给元素添加类，需要使用classname代替class
- 在JSX中可以直接使用JS代码，直接在JSX中通过{}中间写JS代码即可
- 在JSX中只能使用表达式，但是不能出现语句
- 在JSX中注释语法：{/* 注释内容 */}

## 组件

> 如果组件仅仅是为了展示数据，那么此时就可以使用函数组件
>
> 如果组件有一定业务逻辑，需要操作数据，那么就需要使用class创建组件

- JS函数创建（无状态组件）

  1. 函数名称必须为大写字母开头，React通过这个特点来判断是不是一个组件
  2. 函数必须有返回值，返回值可以是：JSX或null
  3. 返回的JSX，必须有一个根元素
  4. 组件的返回值使用()包裹，避免换行问题

  ``` js
  function Welcome(props) {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
        </ul>
      </div>
    )
  }
  
  ReactDOM.render(
    <Welcome name="jack" />,
    document.getElementById('app')
  )
  ```
  
- class创建（有状态组件）

  ``` js
  class ShoppingList extends React.Component {
    constructor(props) { 
      super(props)
    }
    // class创建的组件中 必须有rander方法 且显示return一个react对象或者null
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for {this.props.name}</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      )
    }
  }
  ```

## props

> props作为父子组件沟通的桥梁，props对象的属性和组件的属性一一对应，但其中有一个特殊的参数props.children，props.children表示组件的子节点，可以拿到组件内放置的内容，
>
> props.children的值有三种可能
>
> 1. 如果当前组件无子节点，则为undefined
> 2. 如果有一个子节点，数据类型是object
> 3. 如果有多个节点，数据类型是array

父组件：

```jsx
import React from "react"
import Child from './child'

class Parent extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div>
        <h1> 父组件</h1>
    	<Child name="asher">子组件</Child>
      </div>
    )
  }
}
export default Parent
```

子组件：

```jsx
import React from 'react'

function Child (props){
  return (
    <div>
      <h2>{props.name}</h2>
      <h2>{props.children}</h2>
    </div>
  )
}
export default Child
```

## state

> 组件内部使用的数据，只有通过class创建组件才具有状态，不要再state中添加render方法中不需要的数据，会影响渲染性能，可以将组件内部使用但是不渲染在视图中的内容直接添加给this，不要在render方法中调用setState方法来修改state的值

```jsx
constructor(props) {
    super(props)
    this.state = {
        name: "asher11"
    }
}

render() {
    return (
      <div>
        <span>{this.state.name}</span>
      </div>
    )
  }
```

## style

- 行间样式

  ```jsx
  render() {
      return (
      <div>
      	<h1 style={{color: 'pink'}}>父组件</h1>
      </div>
      )
  }
  ```

- 对象形式

  ```jsx
  render() {
      const styleObj = {
          color: 'pink'
      }
      return (
          <div>
              <h1 style={styleObj}>父组件</h1>
          </div>
      )
  }
  ```

- 外部样式

  ```jsx
  import '../index.css'
  
  render() {
      return (
          <div>
              <h1 className="colorStyle">父组件</h1>
          </div>
      )
  }
  ```

- 关于react的样式污染问题

  > react中css没有域的概念，是全域的，所以重名的样式会互相污染，以下两种解决方式

  1. css modules

     使用cra搭建的项目默认支持css-modules，样式文件必须以[name].module.css的形式命名，以变量的形式导入样式文件，className以变量引用的方式添加

     ```jsx
     import styles from './style1.module.css'
     render() {
         return (
             <div>
                 <div className={styles.title}>我是标题</div>
             </div>
         )
     }
     ```

  2. babel-plugin-react-css-modules 插件

     使用styleName代替className，也不需要重复的写styles.xxx，但是若使用less等预编译工具需要在config-overrides.js文件中添加配置

     ```js
     const { addLessLoader } = require('customize-cra')
     module.exports = override(
         addLessLoader({
             localIdentName: '[local]--[hash:base64:5]',
             javascriptEnabled: true
         })
     )
     ```

     ```jsx
     import styles from './style2.css'
     render() {
         return (
             <div>
                 <div styleName='title'>我是标题</div>
             </div>
         )
     }
     ```

## 生命周期

> 一个组件从开始到最后消亡所经历的各种状态，就是一个组件的生命周期
>
> 组件的生命周期包含三个阶段：创建阶段（Mounting）、运行和交互阶段（Updating）、卸载阶段（Unmounting）