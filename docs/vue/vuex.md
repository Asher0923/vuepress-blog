---
title: 'Vuex'
---

## 概览

- Vuex是专门为Vue.js应用程序开发的状态管理模式，采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

- 每一个Vuex应用的核心就是store（仓库），store是一个容器，包含着应用中大部分的状态（state），Vuex和单纯的全局对象有以下两个不同点

  1. Vuex的状态存储是响应式的，当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会得到高效更新

  2. 不可以在直接改变store中的状态，改变store中的状态的唯一途径就是显式的提交（commit）mutation

     ```js
     // store/index.js
     import Vue from 'vue'
     import Vuex from 'vuex'
     
     const store = new Vuex.Store({
       state: {
         count: 0
       },
       mutations: {
         increment (state) {
           state.count++
         }
       }
     })
     ```

     ```js
     // 组件中
     methods: {
       increment() {
         this.$store.commit('increment')
         console.log(this.$store.state.count)
       }
     }
     ```

## State

- 存储基本数据。Vuex使用单一状态树，用一个对象就包含了全部的应用层级状态，由于Vuex的状态存储是响应式的，从store实例中读取状态最简单的方法就是在计算属性中返回某个状态

  ```js
  computed: {
      count () {
        return store.state.count
      }
    }
  ```

- 这种模式导致组件依赖全局状态单例，在模块化的构建系统中，需要在每个使用state的组件中都导入store，所以Vue通过store选项，提供了一种机制将状态从根组件注入到每一个子组件中，通过在根实例注册store，所有子组件都能通过this.$store访问到

  ```js
  // main.js
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
  
  // 组件
    computed: {
      count () {
        return this.$store.state.count
      }
    }
  ```

- mapState辅助函数

  当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余

  ```js
  // 在单独构建的版本中辅助函数为 Vuex.mapState
  import { mapState } from 'vuex'
  
  export default {
    // ...
    computed: mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,
  
      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',
  
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })
  }
  ```

  当映射的计算属性的名称与state的子节点名称相同时，我们也可以给mapState传一个字符串数组

  ```js
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
  ])
  ```

  mapState函数返回的是一个对象，可以使用对象展开运算符将其与局部计算属性混合使用

  ```js
  computed: {
    localComputed () { /* ... */ },
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      // ...
    })
  }
  ```

## Getter

- 从state基本数据派生出的数据

  ```js
  computed: {
    doneTodosCount () {
      return this.$store.state.todos.filter(todo => todo.done).length
    }
  }
  ```

- 如果有多个组件用到此属性，我们需要复制这个函数或者抽取到一个共享函数然后在多出导入，无论哪一种方式都不是很理想，Vuex允许我们在store中定义Getter(可以认为是store的计算属性)，就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

  ```js
  const store = new Vuex.Store({
    state: {
      todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
      ]
    },
    getters: {
      doneTodos: state => {
        return state.todos.filter(todo => todo.done)
      }
    }
  })
  ```

- 通过属性访问

  1. Getter会暴露为store.getters对象，可以以属性的形式访问这些值

     ```js
     store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
     ```

  2. Getter也可以接受其他getter作为第二个参数

     ```js
     getters: {
       // ...
       doneTodosCount: (state, getters) => {
         return getters.doneTodos.length
       }
     }
     ```

  3. 组件中使用

     ```js
     computed: {
       doneTodosCount () {
         return this.$store.getters.doneTodosCount
       }
     }
     ```

- 通过方法访问

  1. 可以让getter返回一个函数，来实现给getter传参，在对store中的数组进行查询时非常有用

     ```js
     getters: {
       // ...
       getTodoById: (state) => (id) => {
         return state.todos.find(todo => todo.id === id)
       }
     }
     ```

- mapGetters辅助函数

  仅仅是将store中的getter映射到局部计算属性

  ```js
  import { mapGetters } from 'vuex'
  
  export default {
    // ...
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
      ])
    }
  }
  ```

  如果需要将一个getter属性另取一个名字，使用对象形式

  ```js
  ...mapGetters({
    // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    doneCount: 'doneTodosCount'
  })
  ```

## Mutation

- 更改Vuex的store中的状态的唯一方法就是提交mutation，Vuex中mutation非常类似于事件，每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)，这个回调函数就是我们实际进行状态更改的地方，并且它会接受state作为第一个参数

  ```js
  const store = new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      increment (state) {
        // 变更状态
        state.count++
      }
    }
  })
  ```

  不能直接调用mutation handler，这个选项更像是事件注册，当触发一个类型为increment的mutation时，调用此函数，要唤醒一个mutation handler，你需要以相应的type调用store.commit方法

  ```js
  store.commit('increment')
  ```

- 提交载荷（Payload）

  你可以向store.commit传入额外的参数，即mutation的载荷(payload)

  ```js
  // ...
  mutations: {
    increment (state, n) {
      state.count += n
    }
  }
  
  store.commit('increment', 10)
  ```

- mutation必须是同步函数

  使用devtools调试的时候会有问题

  ```js
  mutations: {
    someMutation (state) {
      api.callAsyncMethod(() => {
        state.count++
      })
    }
  }
  ```

  现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的

- mapMutations辅助函数

  将组件中的methods映射为store.commit调用

  ```js
  import { mapMutations } from 'vuex'
  
  export default {
    // ...
    methods: {
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
  
        // `mapMutations` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
  }
  ```

## Action

- Action类似于mutation，不同在于

  1. Action提交的是mutation，而不是直接变更状态
  2. Action可以包含任意异步操作

  ```js
  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      }
    }
  })
  ```

  通过解构来简化代码

  ```js
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
  ```

- 分发Action

  Action通过store.dispatch方法触发

  ```js
  store.dispatch('increment')
  ```

  乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：

  ```js
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
  ```

  Actions 支持同样的载荷方式和对象方式进行分发：

  ```js
  // 以载荷形式分发
  store.dispatch('incrementAsync', {
    amount: 10
  })
  
  // 以对象形式分发
  store.dispatch({
    type: 'incrementAsync',
    amount: 10
  })
  ```

- mapActions辅助函数

  ```js
  import { mapActions } from 'vuex'
  
  export default {
    // ...
    methods: {
      ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
  
        // `mapActions` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      ]),
      ...mapActions({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      })
    }
  }
  ```

## Module

- 分模块，每个模块都有自己的state、getter、mutation和action 

  ```js
  const moduleA = {
    state: () => ({ ... }),
    mutations: { ... },
    actions: { ... },
    getters: { ... }
  }
  
  const moduleB = {
    state: () => ({ ... }),
    mutations: { ... },
    actions: { ... }
  }
  
  const store = new Vuex.Store({
    modules: {
      a: moduleA,
      b: moduleB
    }
  })
  
  store.state.a // -> moduleA 的状态
  store.state.b // -> moduleB 的状态
  ```