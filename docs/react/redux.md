---
title: 'Redux'
---

## 概述

> Redux是一个用于JavaScript状态容器，提供可预测化的状态管理

- 单一数据源

  整个应用的state被存储在一棵object tree中，并且这个object tree只存在于唯一一个store中

- state是只读的

  唯一改变state的方式就是触发action，action是一个用于描述已发生事件的普通对象

- 使用纯函数来执行修改

  为了描述action如何修改state，需要编写reducers，reducers只是一些纯函数，接收先前的state和action，并且返回新的state，可以复用，控制顺序，传递参数

## State

> 就是传递的数据，React项目中大致可以分为三种

- DomainDate：服务器端的数据
- UI State：决定当前UI展示的状态，比如弹框的显示隐藏，受控组件等
- App State：App级别的状态，比如请求是否添加loading

## Action

> Action是把数据从应用传到store的载体，它是store数据的唯一来源，一般来说，我们可以通过store.dispatch()将action传递给store

- Action的本质就是一个js对象

- Action对象内部必须有一个type属性来表示要执行的动作

- 多数情况下，这个type会被定义成字符串常量

- 除了type字段之外，action的结构随意进行定义

- 我们在项目中，更多的喜欢用action创建函数

- 描述了有动作要发生，并没有描述如何去更新state

  ```js
  // 新建action.js
  export const sendAction = () => {
    return {
      type: "send_type",
      value: "action"
    }
  }
  ```

## Reducer

> 本质就是一个函数，用来响应发送过来的actions，然后经过处理，把state发送给Store

- 在Reducer函数中，需要return返回值，这样Store才能接收到数据

- 函数会接收两个参数，一个是初始化state，第二个参数是action

  ```js
  // 新建reducer.js
  const initState = {
    value: "初始值"
  }
  
  const reducer = (state = initState, action) => {
    console.log(action ,state,'reducer')
    switch (action.type) {
      case 'send_type':
        return Object.assign({}, state, action)
        break;
  
      default:
        return state
        break;
    }
  }
  
  export default reducer
  ```

- combineReducers将多个不同reducer合并成一个，给createStore调用

  ```js
  import { combineReducers } from 'redux'
  import reducer1 from './reducer1'
  import reducer2 from './reducer2'
  import reducer3 from './reducer3'
  
  export default combineReducers({
    reducer1,
    reducer2,
    reducer3
  })
  ```

## Store

> 把action和reducer联系到一起的对象

- 维持应用的state

- 提供getState()方法获取state

- 提供dispatch()方法发送action

- 通过subscribe()来注册监听

- 通过subscribe()返回值来注销监听

  ```js
  //新建store.js
  import { createStore} from 'redux'
  import reducer from './reducer'
  
  const store = createStore(reducer)
  
  export default store
  ```

  ```jsx
  // 组件中使用
  import React from 'react'
  import store from '../store/index'
  import { sendAction } from '../store/action'
  
  class Child extends React.Component {
    constructor(props) {
      super(props)
    }
  
    handleClick = () => {
      const action = sendAction()
      store.dispatch(action) // 发送action
    }
  
    componentDidMount() {
      store.subscribe(() => {
        console.log('subscribe', store.getState())
        this.setState({}) // 触发render
      })
    }
  
    render() {
      return (
        <div>
          <h2>组件1</h2>
          <button onClick={this.handleClick}>+</button>
          <div>{store.getState().value}</div>
        </div>
      )
    }
  }
  export default Child 
  ```

- createStore

  ```
  // 可传递三个参数
  ```

  

## React-redux

> react-redux就是Redux官方出的用于配合React的绑定库
>
> react-redux能够使react组件从Redux store中很方便的读取数据，并且向store中分发actions来更新数据

## Provider

- 包裹在根组件最外层，使所有的子组件都可以拿到state

- 接收store作为props，然后通过context往下传递，这样react中任何组件都可以通过context获取到store

  ```jsx
  // App.js
  import React from 'react';
  import './App.css';
  import Router from './router'
  import { Provider } from 'react-redux'
  import store from './store/index'
  
  function App() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router></Router>
        </div>
      </Provider>
    );
  }
  
  export default App;
  ```

## Connect

- Provider内部组件如果想要使用state中的数据，就必须要connect进行一层包裹封装，换一句话说就是必须要被connect进行加强

- connect就是方便我们组件能够获取到store中的state

- connect参数说明

  1. mapStateToProps(state, ownProps)

     这个函数允许我们将store中数据作为props绑定到组件上（需要接收state的组件传递这个参数）

  2. mapDispatchToProps(dispatch, ownProps)

     将action作为props绑定到我们自己的函数中（需要发送action的组件传递这个参数）

  ```jsx
  // 接收组件
  import React from 'react'
  import { connect } from 'react-redux'
  
  class Child2 extends React.Component {
  
    constructor(props) {
      super(props)
    }
  
    render() {
      return (
        <div>
          <h2> 组件2</h2>
          <div>{this.props.count}</div>
        </div>
      )
    }
  
  }
  const mapStateToProps = (state) => {
    return state
  }
  
  export default connect(mapStateToProps)(Child2)
  ```

  ```jsx
  //发送组件
  import React from 'react'
  import { connect } from 'react-redux'
  
  class Child extends React.Component {
    constructor(props) {
      super(props)
    }
  
    handleClick = () => {
      this.props.sendAction()
    }
  
    render() {
      return (
        <div>
          <h2>组件1</h2>
          <button onClick={this.handleClick}>+</button>
        </div>
      )
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      sendAction : ()=>{
        dispatch({
          type: 'add_action'
        })
      }
    }
  }
  // 此组件为发送方，需要实现connect的第二个参数，第一个参数传null
  export default connect(null, mapDispatchToProps)(Child)
  ```

  ```jsx
  // reducer
  const initState = {
    count: 0
  }
  
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case 'add_action':
        return {
          count: state.count + 1
        }
        break;
      default:
        return state
        break;
    }
  }
  
  export default reducer
  ```

## Rudux-thunk