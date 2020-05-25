---
title: 'Vue Router'
---

## 概述

> 官方路由插件，和vue.js深度集成，适合用于构建单页面应用，vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转，在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换，路由模块的本质就是建立起url和页面之间的映射关系

## 实现原理

> SPA单页面应用，只有一个完整的页面，在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容，单页面应用的核心之一就是**更新视图而不重新请求页面**，vue-router在实现单页面前端路由时，提供了两种方式 ：Hash模式和History模式，根据mode参数来决定采用哪一种方式

## Hash模式

- vue-router默认hash模式，使用url的hash来模拟一个完整的url，当url改变时，页面不会重新加载
- hash(#)是url的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说hash出现在url中，但不会被包含在http请求中，对后端完全没有影响，因此改变hash不会重新加载页面
- 每一次改变#后的部分，都会在 浏览器的访问历史中增加一个记录，使用“后退”按钮，就可以回到上一个位置；所以说hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash模式的原理是onhashchange事件，可以在window对象上监听这个事件

## History模式

- hash模式中url上会自带#，如果不想要这个#，就用history模式，这种模式充分利用了H5 history interface中新增的pushState()和replaceState()方法。这两个方法应用于浏览器记录栈，在当前已有的back、forward、go基础上，它们提供了对历史记录修改的功能，只是当它们执行修改时，虽然改变了当前的url，但浏览器不会立即向后端发送请求

## 起步

- HTML

  ```html
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/">Go to Home</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
  ```

- JavaScript

  ```js
  import Vue from "vue";
  import VueRouter from "vue-router";
  import Home from "../views/Home.vue";
  
  Vue.use(VueRouter);
  
  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ];
  
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });
  
  export default router;
  // main.js中导入
  ```

## 动态路由匹配

- 当同一个组件需要根据不同的参数来渲染时，可以在路由路径中使用动态路径参数来实现

  ```js
  const User = {
    template: '<div>User</div>'
  }
  
  const router = new VueRouter({
    routes: [
      // 动态路径参数 以冒号开头
      { path: '/user/:id', component: User }
    ]
  })
  ```

- 一个路径参数使用一个冒号来标记，多个参数使用斜杠分割，参数值会被设置到this.$route.params中，可以在每个组件中使用

  ```js
  this.$route.params.id
  ```

- 响应路由参数的变化

  当使用路由参数时，例如从/user/foo导航至/user/bar，原来的组件实例会被复用，因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效，不过这也意味着组件的生命周期钩子不会再被调用

## 嵌套路由

- VueRouter的参数中使用children配置

  ```js
  const router = new VueRouter({
    routes: [
      { path: '/user/:id', component: User,
        children: [
          {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'profile',
            component: UserProfile
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: 'posts',
            component: UserPosts
          }
        ]
      }
    ]
  })
  ```

## 编程式导航

- 除了使用router-link创建a标签来定义导航链接，还可以借助router的实例方法来实现，在Vue实例内部，可以通过$router访问路由实例

  ```js
  // 字符串
  router.push('home')
  
  // 对象
  router.push({ path: 'home' })
  
  // 命名的路由
  router.push({ name: 'user', params: { userId: '123' }})
  
  // 带查询参数，变成 /register?plan=private
  router.push({ path: 'register', query: { plan: 'private' }})
  ```

- 如果提供了path，params会被忽略，需要使用一下方式来实现

  ```js
  const userId = '123'
  router.push({ name: 'user', params: { userId }}) // -> /user/123
  router.push({ path: `/user/${userId}` }) // -> /user/123
  // 这里的 params 不生效
  router.push({ path: '/user', params: { userId }}) // -> /user
  ```

- router.go(n)

  这个方法的参数是一个整数，意思是在history记录中向前或后退多少步

  ```js
  // 在浏览器记录中前进一步，等同于 history.forward()
  router.go(1)
  
  // 后退一步记录，等同于 history.back()
  router.go(-1)
  
  // 前进 3 步记录
  router.go(3)
  ```

## 导航守卫

- 全局前置守卫

  ```js
  const router = new VueRouter({ ... })
  
  router.beforeEach((to, from, next) => {
    // ...
  })
  ```

  当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫resolve完之前一直处于等待中

  每个守卫方法接收三个参数：

  - to：Route：即将要进入的目标路由对象
  - from：Route：当前导航正要离开的路由
  - next：Function：一定要调用该方法来resolve这个钩子，执行效果依赖next方法的调用参数
    1. next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)
    2. next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
    3. next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项
    4. next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调

- 全局后置钩子

  ```js
  router.afterEach((to, from) => {
    // ...
  })
  ```

  