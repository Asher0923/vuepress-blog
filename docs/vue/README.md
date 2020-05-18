---
title: 'Vue入门'
---

## 概述

> 用于构建用户界面的渐进式框架，主要用于快速的构建前端页面的MVVM框架

- MVVM

  是Model-View-ViewModel的简写，即模型-视图-视图模型。模型指的是后端传递的数据，视图指的是所看见的页面，视图模型是mvvm的核心，是连接view和model的桥梁，有两个方向；一个是将模型转化成视图，实现的方式是数据绑定；另一个是将视图转化成模型，实现的方式是DOM事件监听，这两个方向都实现的就是数据的双向绑定。

  MVVM的框架下视图和模型是不能直接通信的，它们通过ViewModel来通信，ViewModel通常要实现一个observe观察者，当数据发生变化，ViewModel能够监听到数据的各种变化，然后通知对应的视图做自动更新，而当用户操作视图，ViewModel也能够监听到，然后通知数据做改动

- MVC

  是Model-View- Controller的简写，即模型-视图-控制器。C即Controller指的是页面业务逻辑，使用MVC的目的就是将M和V的代码分离，MVC是单向通信，也就是View和Model，必须通过Controller来承上启下，MVC和MVVM的区别并不是VM完全取代了C，ViewModel存在的目的在于抽离Controller中展示的业务逻辑，而不是替代Controller，其它视图操作业务等还是应该放在Controller中实现。也就是说MVVM实现的是业务逻辑组件的重用。由于mvc出现的时间比较早，前端并不那么成熟，很多业务逻辑也是在后端实现，所以前端并没有真正意义上的MVC模式。

## 安装

- CDN

  ```html
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  ```

  ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  
  <body>
    <div id='app'>
      <h1>{{name}}</h1>
    </div>
  </body>
  <script src="./app.js"></script>
  
  </html>
  ```

  ```js
  // 实例化vue对象
  new Vue({
    el: '#app',
    data() {
      return {
        name: "asher"
      }
    }
  })
  ```

- 脚手架

  ```
  
  ```

## data

- Vue实例的数据对象，Vue会递归的将data的property转换为getter/setter，从而让data的property能够响应数据变化

- 组件的data必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例，如果data是一个纯粹的对象，则所有的实例将共享引用同一个数据对象，函数的话，每创建一个实例，都能通过data函数返回一个全新的数据对象

## methods

- methods将被混入到Vue实例中，可以直接通过VM实例访问这些方法，或者在指令表达式中使用，方法中的this自动绑定为Vue实例

- 不能使用箭头函数来定义method函数，因为箭头函数绑定了父级作用域的上下文，所以this不会按照期望指向Vue实例

  ```js
  methods:{
      show: function(){
          return 'my name is ' + this.name
      }
  }
  // 推荐
  methods:{
      show(){
          return `my name is ${this.name} `
      }
  }
  ```

## 指令

- v-bind

  动态的绑定一个或多个attribute，或一个组件prop到表达式，可简写为 :

  ```vue
  <h2 v-bind:title="title">v-bind</h2>
  <h2 :title="title">v-bind</h2>
  ```

- v-html

  更新元素的innerHTML，内容按照普通HTML插入，不会作为Vue模板进行编译

  ```vue
  <p v-html="html"></p>
  
  data() {
      return {
      	html:'<h1>test</h1>'
      }
  }
  ```

- v-on

  绑定事件监听器，事件类型由参数指定，可简写为 @

  用在普通元素上，只能监听原生DOM事件，用在自定义元素组件上时，可以监听子组件触发的自定义事件

  ```vue
  <button v-on:click="doThis"></button>
  <button @click="doThis"></button>
  <button v-on:click="doThat('hello', $event)"></button>
  ```

  修饰符

  - .stop -调用event.stopPropagation()

  - .prevent -调用event.preventDefault()

  - .native - 监听组件根元素的原生事件

  - .once - 只触发一次回调

  - .left - (2.2.0) 只当点击鼠标左键时触发

  - .right - (2.2.0) 只当点击鼠标右键时触发

    ```vue
    <!-- 停止冒泡 -->
    <button @click.stop="doThis"></button>
    <!-- 阻止默认行为 -->
    <button @click.prevent="doThis"></button>
    <!--  串联修饰符 -->
    <button @click.stop.prevent="doThis"></button>
    <!-- 点击回调只会触发一次 -->
    <button v-on:click.once="doThis"></button>
    <!-- 键修饰符，键别名 -->
    <input @keyup.enter="onEnter">
    <!-- 键修饰符，键代码 -->
    <input @keyup.13="onEnter">
    ```

- v-model

## test