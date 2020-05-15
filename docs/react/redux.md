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
  
      default:
        return state
    }
  }
  
  export default reducer
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
   
  3. 不传参数，可以通过this.props.dispatch来分发action
  
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
      default:
        return state
    }
  }
  
  export default reducer
  ```

## CombineReducers

- combineReducers这个函数是为了拆分不同的reducer，然后各自的reducer可以独立去操作state中属于自己的部分

- combineReducers里面传递一个参数，参数类型是Object

- key可以自己定义，value就是单个的reducer

- 最终combineReducers会把各自独立的reducer进行整合，然后生成最终的reducer，传递到createStore中

  > 1. 通过combineReducers包裹之后的reducer会按照顺序依次调用
  > 2. 每一次reducer调用传递过来的state，都是上一次的state，每个字render互不干扰

  ```js
  // reducerA.js
  const initState = {}
  
  const sendData = {
    name: 'asher'
  }
  
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case 'send_type':
        return Object.assign({}, state, sendData)
      default:
        return state
    }
  }
  
  export default reducer
  ```

  ```js
  // reducerB.js
  const initState = {}
  
  const addData = {
    name: 'ASHER'
  }
  
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case 'add_type':
        return Object.assign({}, state, addData)
      default:
        return state
    }
  }
  
  export default reducer
  ```

  ```js
  // reducers/index.js
  import reducerA from './reducerA'
  import reducerB from './reducerB'
  import { combineReducers } from 'redux'
  
  const reducers = combineReducers({
    reducerA,
    reducerB
  })
  
  export default reducers
  ```

  ```jsx
  // 组件中mapStateToProps
  const mapStateToProps = (state) => {  
    return state.reducerA
  }
  ```

## Redux-Dev-Tool

> 安装完redux-dev-tool之后，需要在createStore函数中配置，由于createStore中会配置其他中间件，所以需要利用compose增强函数来实现

```js
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'

const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

// createStore接收三个参数  reducer   初始时的state  中间件
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(...middleware)))

export default store
```

## 中间件

> 简单理解就是一种独立运行于各个框架之间的代码，本质是一个函数，可访问请求对象和响应对象，可对请求进行拦截处理，处理后再将控制权向下传递，也可以终止请求，向客户端做出响应
>
> 在Redux中，中间件就是运行在action发送出去，到达reducer之间的一段代码，就可以把代码调用流程变为action->middlewares->reducer，这种机制可以让我们改变数据流，实现例如异步action，action过滤，日志输入，异常报告等功能
>
> redux提供了applyMiddleware的方法，可以应用多个中间件

## Rudux-thunk

> Redux Store仅支持同步数据流，使用thunk等中间件可以帮助redux实现异步性，可以使用thunk 让actionCreator 派遣函数或Promise，而不是返回action对象，在没有thunk的时候，我们通常都是利用componentDidMount等生命周期调取接口后再dispatch，按照thunk之后，可以在action中直接调用接口，增加可复用性

- 不添加redux-thunk

  ```js
  // 组件
  import { get } from '../store/actions/sendAction'
  
  componentDidMount() {
      fetch('http://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(data => {
          this.props.getAction(data)
      })
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          getAction: (data) => dispatch(get(data))
      }
  }
  
  // action 
  export const get = (data) => {
      return {
          type: 'get_type',
          val: {
              data
          }
      }
  }
  ```

- 添加redux-thunk

  ```js
  // 组件
  import { get } from '../store/actions/sendAction'
  
  componentDidMount() {
      this.props.getAction()
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          getAction: () => dispatch(get())
      }
  }
  
  // action
  export const get = () => {
      return (dispatch) => {
          fetch('http://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(data => {
              dispatch({
                  type: "get_type",
                  val: {
                      data
                  }
              })
          })
      }
  } 
  
  // store
  import { createStore, applyMiddleware, compose } from 'redux'
  import thunk from 'redux-thunk'
  import reducers from './reducers/index'
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
  
  // createStore接收三个参数  reducer   初始时的state  中间件
  const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))
  
  export default store
  ```

## Redux-Saga

> redux-saga是一个用于管理应用程序Side Effect副作用（例如：异步操作等）的library，它的目的是让副作用管理更加的简单，执行更高效
>
> redux-saga就是redux的一个中间件，可以通过正常的redux action从主应用程序启动，暂停和取消，可以访问完整的redux state，也能够dispatch redux action
>
> redux-saga使用了ES6的generator功能，让异步流程更加易于读取，写入和测试，通过这种方式让异步看起来更加像标准同步的js代码

- createSagaMiddleware()

  创建一个Redux middleware，并将Sagas连接到Redux Store，通过createStore第三个参数传入

- middleware.run(saga,...args)

  动态的运行saga，只能用于applyMiddleware阶段之后执行Saga

- saga辅助函数

  - takeEvery

    触发多少次就会执行多少次异步action

  - takeLatest

    自动取消之前所有启动但仍在执行的异步任务，保证最后一次的异步action执行

  - throttle

    第一个参数为毫秒值，在执行一个异步任务之后，但是同时还会接受一次action的异步任务，放在底层的buffer中，最多保留最近一个，但在设置的第一个参数毫秒时间内不会执行异步任务

- Effect创建器

  - select(selector,...args)

    获取redux中的state，如果调用select的参数为空（即yield select()），那么effect会取得完整的state（与调用getState()的结果相同）

  - call(fn,...args)

    创建一个Effect描述信息，用来命令middleware以参数args调用函数fn

  - take(pattern)

    阻塞的方法，用来匹配发出的action

  - put(action)

    用来命令middleware向Store发起一个action，这个effect是非阻塞型的

```js
// store
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers/index'
// 引入redux-saga中的createSagaMiddleware函数
import createSagaMiddleware from 'redux-saga'
//导入saga.js
import rootSaga from './saga'
// 执行
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

// createStore接收三个参数  reducer   初始时的state  中间件
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(sagaMiddleware)))
// 执行rootSaga
sagaMiddleware.run(rootSaga)

export default store
```

```js
// saga.js
import { takeEvery, takeLatest, throttle, put, call } from 'redux-saga/effects'

function* rootSaga() {
  yield takeEvery('get_type', getData) // dispatch 对应type的action时，触发函数
  yield takeLatest('get_type', getData)
  yield throttle(0, 'get_type', getData)
}

function* getData() {
  const res = () => {
    return fetch('http://jsonplaceholder.typicode.com/posts').then(res => res.json()).then((res) => {
      return res
    })
  }
  const data = yield call(res)
  // 获取数据后触发此action，经reducer传给store
  yield put({
    type: 'update_type',
    val: {
      data
    }
  })
}

export default rootSaga
```

```js
// action
// 获取
export const get = {
  type: 'get_type',
}
// 更新
export const update = (data) => {
  return {
    type: 'update_type',
    val: {
      data
    }
  } 
}
```

- all

  ```js
  import { all } from 'redux-saga'
  import sagaOne from './sagaOne'
  import sagaTwo from './sagaTwo'
  
  export function* rootSaga() {
    yield all([sagaOne(), sagaTwo()])
  }
  ```