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
- 在JSX中只能使用表达式，不能出现语句
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

  ``` jsx
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

  ```jsx
  class ShoppingList extends React.Component {
    constructor(props) { 
      super(props)
    }
    // class创建的组件中 必须有render方法 且显示return一个react对象或者null
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
  
- 区别

  |      区别       | 函数组件 | 类组件 |
  | :-------------: | :------: | :----: |
  |   是否有this    |   没有   |   有   |
  | 是否有生命周期  |   没有   |   有   |
  | 是否有状态state |   没有   |   有   |
  
- 事件绑定

  采取驼峰命名法，比如onClick用来绑定单击事件

  事件传递参数：1、箭头函数   2、bind绑定

  ```jsx
  handleClick(params) {
      console.log(params)
  }
  
  handleClick1(params) {
      console.log(params)
  }
  
  render() {
      return (
          <div>
              <h1 className="colorStyle" onClick={() => { this.handleClick1('箭头函数') }}>箭头函数</h1>
              <h1 className="colorStyle" onClick={this.handleClick.bind(this, "bind")}>bind</h1>
          </div>
      )
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

- Mounting

  该阶段的函数只执行一次

  1. contructor()

     获取props，初始化state

  2. componentWillMount() --> UNSAFE_componentWillMount(16.9版本重命名)

     组件被挂载到页面之前调用，在render函数之前调用，因此在这方法中设置setState不会触发重新渲染；

     无法获取页面中的DOM对象；可以发送ajax请求获取数据（通常会在componentDidMount阶段请求）

     注：在此阶段请求数据不能保证会在render之前完成，但是在服务端渲染时，componentDidMount不会被执行，因此可以在componentWillMount中发送请求

  3. render()

     渲染组件到页面中，无法获取页面中的DOM对象，不要在render方法中调用setState方法，否则会递归渲染

  4. componentDidMount()

     组件已经挂载到页面中，可以进行DOM操作，可以发送请求获取数据，可以通过setState修改状态的值，修改完会重新渲染

- Updating

  该阶段的函数执行多次，每当组件的props或state改变的时候，都会触发运行阶段的函数

  1. componentWillReceiveProps()

     组件接受到新的props前触发这个方法，可以通过this.props获取上一次的值，若需要响应属性的改变，可以通过对比this.props和nextProps，并在该方法中使用this.setState()处理改变状态

     注意：修改state不会触发该方法

     ```jsx
     componentWillReceiveProps(nextProps) {
       console.log('componentWillReceiveProps', this.props, nextProps)
     }
     ```

  2. shouleComponentUpdate()

     根据这个方法的返回值决定是否重新渲染组件，返回true重新渲染，返回false后续render方法不会调用；

     通过某个条件渲染组件，降低组件渲染频率，提升组件性能；

     注意：这个方法必须返回布尔值

     ```jsx
     shouldComponentUpdate(nextProps, nextState) {
       console.log('shouldComponentUpdate', nextProps, nextState)
       return nextState.count % 2 === 0
     }
     ```

  3. componentWillUpdate()

     组件将要更新，不能修改状态，否则会循环渲染

     ```jsx
     componentWillUpdate(nextProps, nextState) {
       console.log('componentWillUpdate', nextProps, nextState)
     }
     ```

  4. render()

     重新渲染组件，与Mounting阶段的render是同一个函数，只要组件的属性或状态改变了，这个方法就会重新执行

  5. componentDidUpdate()

     组件已经被更新，参数为旧的属性和状态对象

     ```jsx
     componentDidUpdate(prevProps, prevState) {
       console.log('componentDidUpdate', prevProps, prevState)
     }
     ```

- Unmounting

  组件销毁阶段：只要组件不再被渲染到页面中，这个方法就会被调用，只能执行一次

  1. componentWillUnmount()

     卸载组件的时候，执行清理工作，比如清除定时器，清除componentDidMount创建的DOM对象

## 受控组件和非受控组件

- 受控组件

  1. 设置value值，value由state控制

  2. value值一般在onChange事件中通过setState进行修改

     ```jsx
     constructor(props) {
         super(props)
         this.state = {
             name: "asher11"
         }
     }
     
     handleChange(e) {
         this.setState({
             name: e.target.value
         })
     }
     
     render() {
         return (
             <div>
                 <input type="text" onChange={this.handleChange} value={this.state.name} />
             </div>
         )
     }
     ```

- 非受控组件

  1. 不设置value值

  2. 通过ref获取dom节点然后再去value值

     ```jsx
     constructor(props) {
         super(props)
         this.handleSubmit = this.handleSubmit.bind(this);
         this.input = React.createRef();
     }
     
     handleSubmit(event) {
         alert('A name was submitted: ' + this.input.current.value);
         event.preventDefault();
     }
     
     render() {
         return (
             <form onSubmit={this.handleSubmit}>
                 <label>
                     Name:
                     <input defaultValue="Bob" type="text" ref={this.input} />
                 </label>
                 <input type="submit" value="Submit" />
             </form>
         )
     }
     ```

## 单向数据流

> React中采用自上而下的单向数据流，只能由父组件传递到子组件，若子组件想传递参数到父组件，需要通过父组件传递过来的回调函数，子组件调用回调函数将数据作为参数传递给父组件

## 路由

- 基本使用

  1. 安装

     ```
     npm install react-router-dom --save-dev
     ```

  2. src目录下新建路由文件 Router.js

     ```jsx
     import React from 'react'
     import { Route, Switch, withRouter, BrowserRouter as Router } from 'react-router-dom'
     import Child1 from './components/child'
     import Child2 from './components/child2'
     import Parent from './components/parent'
     
     class Routers extends React.Component {
     
       render() {
         return (
           <Router>
             <Switch>
               <Route path="/" exact component={withRouter(Parent)}></Route>
               <Route path="/child1" exact component={withRouter(Child1)}></Route>
               <Route path="/child2" exact component={withRouter(Child2)}></Route>
             </Switch>
           </Router>
         )
       }
     
     }
     
     export default Routers
     ```

  3. 修改App.js

     ```jsx
     import React from 'react';
     import './App.css';
     import Router from './router'
     
     function App() {
       return (
         <div className="App">
           <Router></Router>
         </div>
       );
     }
     
     export default App;
     ```

  4. 组件中使用LInk跳转

     ```jsx
     import React from "react"
     import { Link } from "react-router-dom"
     
     class Parent extends React.Component {
       constructor(props) {
         super(props)
       }
     
       render() {
         return (
           <div>
             <h1>parent</h1>
             <Link to="/child1">组件1</Link>
             <br />
             <Link to="/child2">组件2</Link>
           </div>
         )
       }
     }
     
     export default Parent
     ```

  5. 代码解析

     a.路由分为两种BrowserRouter 和 HashRouter

     b.Switch标签代表只匹配一个路由

     c.Link标签类似a标签，to属性即可理解为href属性

     d.Route的path表示属性匹配路径，exact表示路径必须与path值完全一致，component表示匹配后渲染的组件

- 路由传参

  1. params

     路由文件

     ```jsx
     <Route path="/child1/:id" exact component={withRouter(Child1)}></Route>
     ```

     Link处

     ```jsx
     {/* html方式 */}
     <Link to={'/child1/' + 2}>组件1</Link>
      {/* js方式 */}
      this.props.history.push('/child1/' + 33)
     ```

     取参

     ```js
     this.props.match.params.id
     ```

  2. query

     路由文件不用配置

     Link处

     ```jsx
     {/* html方式 */}
     <Link to = {{ pathname: "/child2", query: { name: "asher" } }}>组件2</Link>
     {/* js方式 */}
     <button type="button" onClick={() => { this.props.history.push({ pathname: '/child2', query: { name: "asher" } }) }}>跳转至组件2</button>
     ```

     取参

     ```js
     this.props.location.query.name
     ```

  3. state

     路由文件不用配置

     Link处

     ```jsx
     {/* html方式 */}
     <Link to = {{ pathname: "/child2", state: { name: "asher" } }}>组件2</Link>
     {/* js方式 */}
     <button type="button" onClick={() => { this.props.history.push({ pathname: '/child2', state: { name: "asher" } }) }}>跳转至组件2</button>
     ```

     取参

     ```
     this.props.location.state.name
     ```

     注意：query在页面刷新后参数会消失，state不会。query和state都是隐式传递，不会在地址栏展示
  
## 高阶组件

  

  