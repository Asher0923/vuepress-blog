---
title: 'Hooks'
---

## 概述

> Hooks的单词意思是钩子，React Hooks意思就是尽量使用纯函数组件，如果需要外部功能或副作用，就是用Hooks把外部代码“钩”进来

## useState

- 纯函数组件没有状态，userState()用于为函数组件引入状态

  ```js
  // 基本用法
  const [state, setstate] = useState(initialState);
  ```

  ```jsx
  import React, { useState } from 'react'
  
  function State() {
    const [count, setCount] = useState(0);
  
    const click = () => {
      console.log(count)
      let _count = count
      setCount(_count + 1)
    }
  
    return (
      <>
        <p>{count}</p>
        <button onClick={click} > + </button>
      </>
    )
  }
  
  export default State
  ```

## useContext

- 组件之间共享状态

  ```jsx
  import React, { useContext } from 'react'
  
  function Context() {
    const AppContext = React.createContext({})
  
    const A = () => {
      const { name } = useContext(AppContext)
      return (
        <p>A组件的名字{name}</p>
      )
    }
  
    const B = () => {
      const { name } = useContext(AppContext)
      return (
        <p>B组件的名字{name}</p>
      )
    }
  
    return (
      <AppContext.Provider value={{ name: 'hook测试' }}>
        <A />
        <B />
      </AppContext.Provider>
    )
  }
  
  export default Context
  ```

## useReducer

- 在React中通常都是用Redux进行状态管理，Redux的概念是组件发出action与状态管理器通信，状态管理器收到action之后，使用Reducer函数返回新的状态， useReducer钩子用来引入Reducer功能

  ```js
  // 基本用法
  const [state, dispatch] = useReducer(reducer, initialState)
  ```

  ```jsx
  import React, { useReducer } from 'react'
  
  const Reducer = () => {
    const reducer = (state, action) => {
      switch (action.type) {
        case 'add_type':
          return {
            count: state.count + 1
          }
        default:
          return state
      }
    }
  
    const [state, dispatch] = useReducer(reducer, { count: 0 })
  
    const addClick = () => {
      dispatch({
        type: 'add_type'
      })
    }
  
    return (
      <>
        <p>{state.count}</p>
        <button onClick={addClick}>+</button>
      </>
    )
  
  }
  
  export default Reducer
  ```

## useEffect

- 用来引入具有副作用的操作，常见的就是向服务器请求数据

- useEffect()接受两个参数，第一个参数是一个函数，异步操作的代码放在里面。第二个参数是一个数组，用于给出Effect的依赖项，只要这个数组发生变化，useEffect()就会执行，第二个参数可以省略，这时每个组件渲染时，都会执行useEffect()

  ```js
  // 基本用法
  useEffect(()  =>  {
    // Async Action
  }, [dependencies])
  ```

  ```jsx
  import React, { useState, useEffect } from 'react'
  
  const Effect = () => {
  
    const [data, setData] = useState([]);
  
    useEffect(() => {
      getData()
    }, [])
  
    const getData = () => {
      fetch('http://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(res => {
        setData(res)
      })
    }
  
    return (
      <>
        {
          data.map(item => {
            return (
              <div key={item.id}>{item.title}</div>
            )
          })
        }
      </>
    )
  
  }
  
  export default Effect
  ```

## 自定义Hook

- 将Hooks的代码封装起来，变成一个自定义的Hook，便于共享

  ```js
  const usePerson = (personId) => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});
    useEffect(() => {
      setLoading(true);
      fetch(`https://swapi.co/api/people/${personId}/`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
          setLoading(false);
        });
    }, [personId]);  
    return [loading, person];
  };
  ```