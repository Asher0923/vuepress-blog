---
title: 'Web基础-路由'
---

## 前端路由

> 简单的说就是保证只有一个HTML页面，且与用户交互时不刷新和跳转页面的同时，为SPA中的每个视图展示形式匹配一个特殊的url，在刷新、前进、后退和SEO时均通过这个特殊的url来实现

## hash模式

> 这里的hash就是指url后的#号以及后面的字符，比如说"www.baidu.com/#hash"，其中"#hash"就是hash值，由于hash值的变化不会导致浏览器向服务器发送请求，而且hash的改变会触发hashchange事件，浏览器的前进后退也能对其进行控制，所以在H5的history模式出现之前，基本都是使用hash模式来实现前端路由

```js
// 简单实现低配版
class Routers{
  constructor(){
    //键值对形式存储路由
    this.routes = {}
    //当前路由的url
    this.currentUrl = ""
    this.refresh = this.refresh.bind(this)
    window.addEventListener("load", this.refresh, false)
    window.addEventListener("hashchange", this.refresh, false)
  }

  //将path路径与对应的callback函数存储
  register(path, callback){
    this.routes[path] = callback || function(){}
  }

  refresh(){
    this.currentUrl = location.hash.slice(1) || "/"
    this.routes[this.currentUrl]()
  }
}
```

## history模式

- 在HTML5之前，浏览器就已经有了history对象，多用于页面的跳转

  ```
  history.go(-1);       // 后退一页
  history.go(2);        // 前进两页
  history.forward();     // 前进一页
  history.back();      // 后退一页
  ```

- HTML5新规范中，history新增了以下几个API

  ```
  history.pushState();         // 添加新的状态到历史状态栈
  history.replaceState();      // 用新的状态代替当前状态
  history.state                // 返回当前状态对象
  ```

- pushState()和replaceState()均接收三个参数(state,title,url)

  - state：合法的js对象，可以用在popstate事件中

    popstate事件：每当同一个文档的浏览历史(history对象)出现变化时就会触发

  - title：现在大多浏览器忽略这个参数，可以直接用null代替

  - url：任意有效的url，用于更新浏览器的地址栏

- pushState()和replaceState()区别在于：

  pushState()在保留现有历史记录的同时，将url加入到历史记录中

  replaceState()会将历史记录中的当前页面历史替换掉

```js
class HistoryRouter {
  constructor() {
    this.routes = {}
    // 初始化时监听popState事件
    this.bindPopState()
  }
  // 初始化路由
  init(path) {
    history.replaceState({ path }, null, path)
    this.routes[path] && this.routes[path]()
  }

  // 将路径和对应回调函数存储
  register(path, callback) {
    this.routes[path] = callback || function () { }
  }

  //触发路由对应回调函数
  go(path) {
    history.pushState({ path }, null, path)
    this.routes[path] && this.routes[path]()
  }

  // 监听propState事件
  bindPopState() {
    window.addEventListener("popstate", e => {
      const path = e.state && e.state.path
      this.routes[path] && this.routes[path]()
    }, false)
  }
}
```

