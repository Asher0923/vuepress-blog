---
title: 'Vue入门'
---

## 概述

- MVVM

  是Model-View-ViewModel的简写，即模型-视图-视图模型。模型指的是后端传递的数据，视图指的是所看见的页面，视图模型是mvvm的核心，是连接view和model的桥梁，有两个方向；一个是将模型转化成视图，实现的方式是数据绑定；另一个是将视图转化成模型，实现的方式是DOM事件监听，这两个方向都实现的就是数据的双向绑定。

  MVVM的框架下视图和模型是不能直接通信的，它们通过ViewModel来通信，ViewModel通常要实现一个observe观察者，当数据发生变化，ViewModel能够监听到数据的各种变化，然后通知对应的视图做自动更新，而当用户操作视图，ViewModel也能够监听到，然后通知数据做改动

- MVC

  是Model-View- Controller的简写，即模型-视图-控制器。C即Controller指的是页面业务逻辑，使用MVC的目的就是将M和V的代码分离，MVC是单向通信，也就是View和Model，必须通过Controller来承上启下，MVC和MVVM的区别并不是VM完全取代了C，ViewModel存在的目的在于抽离Controller中展示的业务逻辑，而不是替代Controller，(只是C的存在感降低了)其它视图操作业务等还是应该放在Controller中实现。也就是说MVVM实现的是业务逻辑组件的重用。由于mvc出现的时间比较早，前端并不那么成熟，很多业务逻辑也是在后端实现，所以前端并没有真正意义上的MVC模式。

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

  ```bash
  npm install -g @vue/cli // 全局安装
  vue create my-project // 创建项目
  vue --version // 查看版本
  默认目录：
    ├── node_modules            //  依赖文件            
    ├── public                  // 这个是webpack的配置的静态目录
    │   ├── favicon.ico
    │   ├── index.html          // 默认是单页面应用，这个是最终的html的基础模板      
    ├── src
    │   ├── assets              // 资源文件夹，存放图片之类的资源
    │   ├── components          // 组件文件夹                
    │   ├── router              // 路由文件夹，决定了页面的跳转规则
    │   ├── store               // vuex状态管理文件
    │   ├── views               // 我们所写的页面都放在这里
    │   ├── App.vue             // 应用组件，所有自己写的组件都是在这个组件之上运行
    │   └── main.js             // webpack入口文件
    └── package.json            // 项目描述文件
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
  
- $event：vue的普通方法中默认带有event DOM事件，通过$event获取，如果需要传其他自定义参数，则将$event传入即可

  ```vue
  <button @click="click">++</button>
  <button @click="click(2, @event)">++</button>
  ```

## 指令

- v-bind

  动态的绑定一个或多个attribute，或一个组件prop到表达式，可简写为 :

  ```vue
  <h2 v-bind:title="title">v-bind</h2>
  <h2 :title="title">v-bind</h2>
  ```

- v-html

  更新元素的innerHTML，内容按照普通HTML插入，不会作为Vue模板进行编译，会有XSS风险

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

  在表单控件或者组件上创建双向绑定

  ```vue
  <input type="text" v-model="value">
  <select v-model="value">
  	<option value="1">aaa</option>
  </select>
  <input type="textarea" v-model="value">
  ```

  修饰符

  - .lazy - 取代input监听change事件
  - .number  - 输入字符串转为有效的数字(调用parseFloat)
  - .trim - 输入首尾空格过滤

- ref

  用来给元素或子组件注册引用信息，引用信息将会注册在父组件的$refs对象上，若果在普通的DOM元素上使用，引用指向的就是DOM元素；如果用在子组件上，引用就指向组件实例

  因为ref本身是作为渲染结果被创建的，在初始渲染的时候不能访问他们，$refs也不是响应式的，因此不能用它在模板中做数据绑定

  ```vue
  <p ref="p">hello</p>
  <child-component ref="child"></child-component>
  ```

- v-if / v-else-if / v-else

  根据表达式的值来有条件的渲染元素，在切换时元素及它的数据绑定/组件被销毁并重建

  ```vue
  <div v-if="type === 'A'"> A </div>
  <div v-else-if="type === 'B'"> B </div>
  <div v-else-if="type === 'C'"> C </div>
  <div v-else> Not A/B/C </div>
  ```

- v-show

  根据表达式真假值，切换元素的display属性

  ```vue
  <div v-show="type === 'A'"> A </div>
  ```

- v-for

  基于源数据多次渲染元素或模板块，可遍历对象、数组、数字、字符串

  ```vue
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  v-for的默认行为会尝试原地修改元素而不是移动它们，要强制其重新排序元素，需要加key来提供一个排序提示

  ```vue
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  <div v-for="(val, key) in object">{{ key }}--{{ val }}</div>
  ```

- v-slot

  提供具名插槽或需要接收 prop 的插槽，限用于`<template></template>`

  ```vue
  <!-- 具名插槽 -->
  <base-layout>
    <template v-slot:header>
      Header content
    </template>
  
    Default slot content
  
    <template v-slot:footer>
      Footer content
    </template>
  </base-layout>
  
  <!-- 接收 prop 的具名插槽 -->
  <infinite-scroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </infinite-scroll>
  
  <!-- 接收 prop 的默认插槽，使用了解构 -->
  <mouse-position v-slot="{ x, y }">
      Mouse position: {{ x }}, {{ y }}
  </mouse-position>
  
  ```

## watch

- 一个对象，键是需要观察的表达式，值是对应回调函数，值也可以是方法名或者包含选项的对象。Vue实例将会在实例化时调用$watch()，遍历watch对象的每一个属性

  ```js
  watch: {
      value(val, oldVal) {
          console.log(val, oldVal)
      }
  }
  ```
  
- 监听复杂数据类型

  ```js
  watch: {
      value: function (val, oldVal) {
          console.log(val, oldVal)
      },
      deep: true
  }
  ```

## computed

- 计算属性将被混入到Vue实例中，所有getter和setter的this上下文自动绑定为Vue实例

- 计算属性的结果会被缓存，除非依赖的响应式property变化才会重新计算

- get/set 默认情况下只有get

  get方法是取，相当于在get中给这个计算属性中的变量赋值

  set方法是计算属性中定义的值发生改变时触发

  ```js
  computed: {
      newNum() {
          return this.number * 2
      },
      fullName: {
          get() {//回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
              return this.firstName + ' ' + this.lastName
          },
          set(val) {//监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
              //val就是fullName的最新属性值
          	const names = val.split(' ');
          	this.firstName = names[0];
          	this.lastName = names[1];
          }
      }
  }
  ```

- 动态改变样式

  ```js
  // 1、:class
  <div :class="{'color1': isStyle, 'color2': !isStyle}">test</div>
  // 2、计算属性
  computed: {
      getColor() {
          return { 'color1': this.isStyle, 'color2': !this.isStyle }
      }
  }
  ```

## prop

- 大小写

  HTML中的属性名是大小写不敏感的，所以浏览器会把所有的大写字符解释为小写字符，这意味着当你使用DOM模板时，camelCase (驼峰命名法) 的 prop 名需要使用kebab-case (短横线分隔命名) 命名

  ```js
  Vue.component('blog-post', {
    // 在 JavaScript 中是 camelCase 的
    props: ['postTitle'],
    template: '<h3>{{ postTitle }}</h3>'
  })
  ```

  ```html
  <!-- 在 HTML 中是 kebab-case 的 -->
  <blog-post post-title="hello!"></blog-post>
  ```

- 类型

  1. 字符串数组形式

     ```
     props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
     ```

  2. 指定值类型，对象形式列出prop，这些property的名称和值分别是prop各自的名称和类型

     ```
     props: {
       title: String,
       likes: Number,
       isPublished: Boolean,
       commentIds: Array,
       author: Object,
       callback: Function,
       contactsPromise: Promise
     }
     ```

- 单向数据流

  所有的prop都使得其父子prop之间形成了一个单向下行绑定，父级prop的更新会向下流动到子组件中，但是反过来不行

  1. prop用来传递一个初始值，这个子组件接下来希望将其作为一个本地的prop数据使用

     ```js
     props: ['initialCounter'],
     data () {
       return {
         counter: this.initialCounter
       }
     }
     ```

  2. prop以一种原始的值传入且需要进行转换，这种情况下使用这个prop的值来定义一个计算属性

     ```js
     props: ['size'],
     computed: {
       normalizedSize () {
         return this.size.trim().toLowerCase()
       }
     }
     ```

- 验证

  定制prop的验证方式

  ```js
  props: {
      // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
      propA: Number,
      // 多个可能的类型
      propB: [String, Number],
      // 必填的字符串
      propC: {
        type: String,
        required: true
      },
      // 带有默认值的数字
      propD: {
        type: Number,
        default: 100
      },
      // 带有默认值的对象
      propE: {
        type: Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
          return { message: 'hello' }
        }
      },
      // 自定义验证函数
      propF: {
        validator: function (value) {
          // 这个值必须匹配下列字符串中的一个
          return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
      }
    }
  ```

## component

- 全局注册

  使用Vue.component来创建组件，在根组件中全局注册，根组件中所有的子组件都可以使用

  ```js
  Vue.component('my-component-name', {
    // ... 选项 ...
  })
  ```

- 局部注册

  ```js
  import ComponentA from './ComponentA.vue'
  export default {
    components: {
      ComponentA
    },
    // ...
  }
  ```

- 基础组件的自动化全局注册

  可能你的许多组件只是包裹了一个输入框或按钮之类的元素，是相对通用的。我们有时候会把它们称为基础组件，它们在各个组件中被频繁的用到

  ```js
  import BaseButton from './BaseButton.vue'
  import BaseIcon from './BaseIcon.vue'
  import BaseInput from './BaseInput.vue'
  
  export default {
    components: {
      BaseButton,
      BaseIcon,
      BaseInput
    }
  }
  ```

  ```html
  <BaseInput
    v-model="searchText"
    @keydown.enter="search"
  />
  <BaseButton @click="search">
    <BaseIcon name="search"/>
  </BaseButton>
  ```

  如果使用了webpack或用cli3+搭建的项目，可以使用require.context只全局注册这些非常通用的基础组件

  ```js
  // main.js
  import Vue from 'vue'
  import upperFirst from 'lodash/upperFirst'
  import camelCase from 'lodash/camelCase'
  
  const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /Base[A-Z]\w+\.(vue|js)$/
  )
  
  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
  
    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
      camelCase(
        // 获取和目录深度无关的文件名
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
  
    // 全局注册组件
    Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    )
  })
  ```

## 组件传值

- 父 -> 子

  一般会在子组件里面定义props来接收

  ```vue
  // 父组件
  <template>
    <div>
      <p>父组件</p>
      <Child :msg="msg"></Child>
    </div>
  </template>
  
  <script>
  import Child from "./Child";
  export default {
    components: {
      Child
    },
    data() {
      return {
        msg: "我是父组件，给子组件发消息"
      };
    }
  };
  </script>
  ```

  ```vue
  // 子组件
  <template>
    <div>
      <p>子组件</p>
      <p>{{msg}}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      msg: String
    }
  };
  </script>
  ```

- 子 -> 父

  利用$emit将想要传递的值通过函数的形式传出

  ```vue
  // 父组件
  <template>
    <div>
      <p>父组件</p>
      {{msg}}
      <Child @toParent="getChild"></Child>
    </div>
  </template>
  
  <script>
  import Child from "./Child";
  export default {
    components: {
      Child
    },
    data() {
      return {
        msg: "父组件初始数据"
      };
    },
    methods: {
      getChild(msg) {
        this.msg = msg;
      }
    }
  };
  </script>
  ```

  ```vue
  // 子组件
  <template>
    <div>
      <p>子组件</p>
      <button @click="toParent">传递数据到父组件</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      toParent() {
        this.$emit("toParent", "子组件传到父组件的数据");
      }
    }
  };
  </script>
  ```

- $parent / $children

  - $parent当前组件的父实例，如果没有，此实例将会是其自己。只读属性，子组件可以调用this.$parent来调用父组件的属性或方法来进行操作
  -  $children当前实例的直接子组件集合，$children不保证顺序，也不是响应式的。只读属性。

- 兄弟组件

  可通过EventBus或Vuex实现，以下只描述如何使用Event Bus实现

  1. 初始化

     ```js
     // 局部，新建event-bus.js
     import Vue from 'vue'
     export const EventBus = new Vue()
     // 全局 main.js
     Vue.prototype.$EventBus = new Vue()
     ```

  2. 发送事件

     ```vue
     <!-- A.vue -->
     <template>
         <button @click="sendMsg()">-</button>
     </template>
     
     <script> 
     import { EventBus } from "../event-bus.js";
     export default {
       methods: {
         sendMsg() {
           EventBus.$emit("aMsg", '来自A页面的消息');
         }
       }
     }; 
     </script>
     ```

  3. 接收事件

     ```vue
     <!-- B.vue -->
     <template>
       <p>{{msg}}</p>
     </template>
     
     <script> 
     import { EventBus } from "../event-bus.js";
     export default {
       data(){
         return {
           msg: ''
         }
       },
       mounted() {
         EventBus.$on("aMsg", (msg) => {
           // A发送来的消息
           this.msg = msg;
         });
       }
     };
     </script>
     ```

  4. 移除事件监听者

     ```js
     // beforeDestroy钩子函数中
     EventBus.$off('aMsg')
     ```
  
- 祖先->后代

  provide / inject：主要在开发高阶插件/组件库时使用

  - provide应返回一个对象或返回一个对象的函数

  - inject一个字符串数组或一个对象

    ```js
    // 父级组件提供 'foo'
    var Provider = {
      provide: {
        foo: 'bar'
      },
      // ...
    }
    
    // 子组件注入 'foo'
    var Child = {
      inject: ['foo'],
      created () {
        console.log(this.foo) // => "bar"
      }
      // ...
    }
    ```

## 生命周期

- beforeCreate：实例初始化之后，this指向创建的实例，不能访问data、computed、watch、methods上的方法和数据

- created：实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问$el属性，$ref属性内容为空数组

- beforeMount：在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数（该钩子在服务器端渲染期间不被调用）

- mounted：实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问

- beforeUpdate：响应式数据更新时调用，发生在虚拟DOM打补丁之前

- updated：虚拟DOM重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作

- beforeDestroy：实例销毁之前调用，这一步this仍然能获取到实例，常用于销毁定时器、DOM事件等

- destroyed：实例销毁后调用，调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

- 父子组件

  ```js
  // 第一次渲染
  parent-beforeCreate -> parent-created -> parent-beforeMount -> child-beforeCreate -> child-created -> child-beforeMount -> child-mounted -> parent-mounted
  // 父组件更新
  parent-beforeUpdate -> parent-updated
  // 子组件更新(若父子组件中单独更新各自的数据相互不会影响，若有影响则是按照下面顺序执行钩子函数)
  parent-beforeUpdate -> child-beforeUpdate -> child-updated -> parent-updated
  // 销毁过程
  parent-beforeDestroy -> child-beforeDestroy -> child-destroyed -> parent-destroyed
  ```

## 自定义组件的v-model

> 一个组件的v-model默认会利用名为value的prop和名为input的事件，但是像单选框、复选框这种输入控件可能会将value属性作为不同的目的，model选项可以避免这样的冲突

- 定义

  ```vue
  Vue.component('base-checkbox', {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    template: `
      <input
        type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('change', $event.target.checked)"
      >
    `
  })
  ```

- 使用

  ```vue
  <base-checkbox v-model="lovingVue"></base-checkbox>
  ```

  这里的lovingVue的值将会传入这个名为checked的prop，同时当`<base-checkbox>`触发一个change事件并附带一个新的值的时候，这个lovingVue的property将会被更新

## 插槽

> 插槽就是子组件中的提供给父组件使用的占位符，用`<slot></slot>`表示，父组件可以在这个占位符中填充任何模板代码，填充的内容会替换子组件的`<slot></slot>`标签

- 具名插槽

  ```vue
  // 父组件
  <template>
    <div>
      <p>父组件</p>
      <Child>
        <p>父组件插入子组件的内容</p>
        <template v-slot:header>
          <p>插入子组件header插槽的内容</p>
        </template>
        <template v-slot:footer>
          <p>插入子组件footer插槽的内容</p>
        </template>
      </Child>
    </div>
  </template>
  
  <script>
  import Child from "./Child";
  export default {
    components: {
      Child
    }
  };
  </script>
  ```

  ```vue
  // 子组件
  <template>
    <div>
      <span>子组件</span>
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "Child"
  };
  </script>
  ```

- 默认插槽

  ```vue
  // 父组件
  <template>
    <div>
      <p>父组件</p>
      <Child>
        <p>父组件插入子组件的内容</p>
      </Child>
    </div>
  </template>
  
  <script>
  import Child from "./Child";
  export default {
    components: {
      Child
    }
  };
  </script>
  ```

  ```vue
  // 子组件
  <template>
    <div>
      <span>子组件</span>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "Child"
  };
  </script>
  ```

- 作用域插槽

  让父组件中的插槽内容可以访问到子组件中才有的数据

  ```vue
  // 父组件
  <template>
    <div>
      <p>父组件</p>
      <Child>
        <p>父组件插入子组件的内容</p>
        <template v-slot="data">{{data.myName}}</template>
        <template v-slot:header="data">
          <p>插入子组件header插槽的内容{{data.myName}}</p>
        </template>
      </Child>
    </div>
  </template>
  
  <script>
  import Child from "./Child";
  export default {
    components: {
      Child
    }
  };
  </script>
  ```

  ```vue
  // 子组件
  <template>
    <div>
      <span>子组件</span>
      <slot name="header" :myName="myName"></slot>
      <slot :myName="myName"></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "Child",
    data() {
      return {
        myName: "Asher"
      };
    }
  };
  </script>
  ```

## mixins

- 局部混入

  对于两个功能差不多，但是又有一些区别的组件时可以使用局部混入

  ```js
  // mixin.js
  export default {
    data() {
      return {
        name: "m-mixin-asher"
      };
    },
    created() {
      console.log("m-mixin-created");
    }
  };
  ```

  ```vue
  // 组件中使用
  <script>
  import myMixin from "./mixin";
  export default {
    mixins: [myMixin],
    created() {
      console.log("my-created");
    }
  };
  </script>
  ```

- 全局混入

  一旦使用全局混入，将影响每一个之后创建的Vue实例
  
  ```js
  // 新建mixin.js
  export default {
    data() {
      return {
        name: "mixin-asher"
      };
    },
    created() {
      console.log("mixin-created");
    },
    methods: {
      show() {
        console.log("mixin-show");
      }
    }
  };
  ```
  
  ```js
  // main.js
  import mixins from './components/mixins/index'
  Vue.mixin(mixins)
  ```
  
- 全局混入中的钩子函数会在局部混入之前执行，最后才是组件自身的钩子函数

## nextTick

- Vue在更新DOM时是异步执行的，只要侦听到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中一次。

- 当修改组件的某一个属性时，组件不会立即重新渲染，当刷新队列时，组件会在下一个事件循环"tick"中更新，如果需要在数据变化之后立即调用就要使用Vue.nextTick(callback)

- 组件中使用vm.$nextTick()实例方法非常方便，不需要全局Vue，并且回调函数中的this将自动绑定到当前的Vue实例

  ```js
  Vue.component('example', {
    template: '<span>{{ message }}</span>',
    data: function () {
      return {
        message: '未更新'
      }
    },
    methods: {
      updateMessage: function () {
        this.message = '已更新'
        console.log(this.$el.textContent) // => '未更新'
        this.$nextTick(function () {
          console.log(this.$el.textContent) // => '已更新'
        })
      }
    }
  })
  ```

  因为$nextTick()返回一个Promise对象，所以可以用async/await语法完成相同的事

  ```js
  methods: {
    updateMessage: async function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      await this.$nextTick()
      console.log(this.$el.textContent) // => '已更新'
    }
  }
  ```

## 动态组件

> 通过使用保留的component标签，动态的绑定is属性，可以让多个组件使用同一个挂载点，并动态切换，根据v-bind:is="组件名"中的组件名去自动匹配组件，匹配不到则不显示

```vue
<template>
  <p id="app">
   <component :is="currentView"></component>
   <button @click="changeView('A')">切换到A</button>
   <button @click="changeView('B')">切换到B</button>
   <button @click="changeView('C')">切换到C</button>
  </p>
</template>

<script>
var app = new Vue({
 el: '#app',
 data: {
  currentView: 'comA'
 },
 methods: {
  changeView: function(data){
   this.currentView = 'com'+ data　　//动态地改变currentView的值就可以动态挂载组件了。
  }
 },
 components: {
  comA: {
   template: '<p>组件A</p>'
  },
  comB: {
   template: '<p>组件B</p>'
  },
  comC: {
   template: '<p>组件C</p>'
  }
 }
});
</script>
```

## keep-alive

- keep-alive是一个抽象组件，自身不会渲染一个DOM元素，也不会出现在父组件链中，使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

- 属性

  1. include  - 字符串或正则表达式。只有名称匹配的组件会被缓存
  2. exclude  - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
  3. max   - 数字。最多可以缓存多少组件实例

- 钩子函数

  1. activated  keep-alive组件激活时调用
  2. deactivated keep-alive组件停用时调用

- 使用

  1. 动态组件中使用

     ```vue
     <!-- 基本 -->
     <keep-alive>
       <component :is="view"></component>
     </keep-alive>
     <!-- 多个条件判断的子组件 -->
     <keep-alive>
       <comp-a v-if="a > 1"></comp-a>
       <comp-b v-else></comp-b>
     </keep-alive>
     <!-- 逗号分隔字符串 -->
     <keep-alive include="a,b">
       <component :is="view"></component>
     </keep-alive>
     <!-- 正则表达式 (使用 `v-bind`) -->
     <keep-alive :include="/a|b/">
       <component :is="view"></component>
     </keep-alive>
     <!-- 数组 (使用 `v-bind`) -->
     <keep-alive :include="['a', 'b']">
       <component :is="view"></component>
     </keep-alive>
     ```

     匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称 (父组件 `components` 选项的键值)。匿名组件不能被匹配。

  2. vue-router中使用

     ```vue
     <template>
       <div id="app">
         <!--缓存想要缓存的页面，实现后退不刷新-->
         <!--加上v-if的判断，可以自定义想要缓存的组件，自定义在router里面-->
         <keep-alive>
           <router-view v-if="$route.meta.keepAlive"></router-view>
         </keep-alive>
         <router-view v-if="!$route.meta.keepAlive"></router-view>
         
         <!--这里是其他的代码-->
       </div>
     </template>
     ```

## 自定义指令

- 全局注册

  ```js
  Vue.directive('xxx',{
  	inserted: function(el){
          //指令属性
      }
  })
  ```

- 局部注册

  ```js
  var app = new Vue({
      el: "#app",
      directives: {
          xxx: {
              //指令属性
          }
      }
  })
  ```

- 钩子函数

  - bind：只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置
  - inserted：被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入到文档中)
  - update：所在组件的VNode更新时调用，但是可能发生在其子VNode更新之前，指令的值可能发生了改变，也可能没有
  - componentUpdated：指令所在组件的VNode及其子VNode全部更新后调用
  - unbind：只调用一次，指令与元素解绑时调用

- 钩子函数参数

  - el：指令所绑定的元素，可以用啦直接操作DOM
  - binding：一个对象，包括以下属性
    1. name：指令名，不包括v-
    2. value：指令的绑定值
    3. oldValue：指令绑定的前一个值，仅在update和componentUpdated钩子中可用。无论值是否改变都可用
    4. expression：字符串形式的指令表达式
    5. arg：传给指令的参数
    6. modifiers：一个包含修饰符的对象
  - vnode：Vue编译生成的虚拟节点
  - oldVnode：上一个虚拟节点，仅在update和componentUpdated钩子中可用
  
- 简单的按钮节流

  ```js
  export default {
    asyncClick: {
      inserted: function (el) {
        let timer = null
        el.addEventListener('click', () => {
          if (!timer) {
            el.disabled = true
            timer = setTimeout(() => {
              clearTimeout(timer)
              timer = null
              el.removeAttribute('disabled')
            }, 1000)
          }
        })
      }
    }
  }
  ```

  ```js
  // main.js
  import directive from "./components/directive"
  
  Object.keys(directive).forEach((fnName) => {
    Vue.directive(fnName, directive[fnName])
  })
  ```

## 原理部分

- v-for优先级比v-if高，意味着v-if将重复运行在每一个v-for循环中，所以不推荐一起使用

- Vue响应式原理

  Object.defineProperty劫持对象的属性，通过递归对象进行深度监听，但是如果是数组的话需要重写数组原型上的方法，在调用数组方法前添加视图更新的方法

[参考](https://segmentfault.com/a/1190000021763211 "参考")

  Object.defineProperty缺点：深度监听需要递归到底，一次性计算量大；无法监听新增/删除属性，所以会需要(Vue.set/Vue.delete)；无法原生监听数组，需要特殊处理

  ```js
  Object.defineProperty(obj, key, {
      enumerable: true, // 可枚举
      configurable: true, // 可写
      get: function() {
          console.log('get');
          return obj[key];
      },
      set: function(newVal) {
          // 设置时，可以添加相应的操作
          console.log('set:', obj[key]);
          obj[key] += newVal;
      }
  });
  ```

- 虚拟DOM和diff算法

  使用js对象来表示DOM结构

  ```js
  let element={
      tagName:'ul',//节点标签名
      props:{//dom的属性，用一个对象存储键值对
          id:'list'
      },
      children:[//该节点的子节点
          {tagName:'li',props:{class:'item'},children:['aa']}，
          {tagName:'li',props:{class:'item'},children:['bb']},
          {tagName:'li',props:{class:'item'},children:['cc']}
      ]
  }
  ```

  vue通过以下措施来提升diff的性能

  - 只比较同一层级，不跨级比较
  - tag不相同，则删除直接重建，不再深度比较 
  - tag和key都相同，则认为是相同节点，不再深度比较

  当数据发生改变时，set方法会调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图

  ![](https://s1.ax1x.com/2020/06/13/tvGPVP.png)

  后面再执行updateChildren方法

- 初次渲染过程

  - 解析模板为render函数（vue-loader）
  - 触发响应式，监听data属性
  - 执行render函数，生成vnode，patch(elem, vnode)

- 更新过程

  - 修改data，触发setter
  - 重新执行render函数，生成newVnode
  - patch(vnode, newVnode)

- 异步渲染

  汇总data的修改，一次性更新视图，减少DOM操作次数，提高性能

## 面试题

- v-for为什么要用key，且不能用index

  diff算法中会通过key来判断是否是sameNode 

- watch和computed使用场景

  watch：一个数据影响多个数据

  computed：一个数据受多个数据影响

- v-model实现原理

  vue在遍历虚拟dom的每一个节点时，如果遇到v-model，会为这个节点绑定一个input事件，当监听从页面输入值的时候，来更新vue实例中的data相对应的属性值

  其核心就是一方面model层通过defineProperty劫持每个属性，一旦监听到属性变化就更新页面元素，另一方面是通过编译模板文件，为控件的v-model绑定input事件，从而页面输入能实时更新相关data属性值

- 常见性能优化方式

  - 合理使用v-show和v-if
  - 合理使用computed
  - v-for时加key，以及避免和v-if同时使用
  - 自定义事件、DOM事件及时销毁
  - 合理使用异步组件
  - 合理使用keep-alive
  - data层级不要太深

  