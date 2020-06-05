---
title: 'ES6'
---

## `let/const`

> 用于声明变量，替代`var`，与`var`不同的是，`let/const` 会创建一个块级作用域

- 暂时性死区(`TDZ`)
  使用 `let/const` 声明的变量，从一开始就形成了封闭作用域，在声明变量之前是无法使用这个变量的，这个特点也是为了弥补 `var`的缺陷（`var` 声明的变量有变量提升）

- `const`
  `const` 声明变量的时候必须赋值，否则会报错，同时不能修改，如果声明的是引用类型，则不能改变它的内存地址。
  
  > 注：`let/const` 声明的变量在`script`作用域下，不会污染`window`下面的变量

## 函数

- 基本用法

  > 允许为函数的参数设置默认值，即直接写在参数定义的后面。

  ``` js
    function log(x, y = 'World') {
      console.log(x, y);
    }

    log('Hello') // Hello World
    log('Hello', 'China') // Hello China
    log('Hello', '') // Hello
  ```

- rest 参数

  > `ES6` 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
  > `arguments`对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用`Array.prototype.slice.call`先将其转为数组。`rest` 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。

  ``` js
    // arguments变量的写法
    function sortNumbers() {
      return Array.prototype.slice.call(arguments).sort();
    }

    // rest参数的写法
    const sortNumbers = (...numbers) => numbers.sort();
  ```

- 箭头函数

  > 1.函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象 2.不可以当做构造函数，无`prototype`属性 3.无 arguments 对象，如果要用，可以用 rest 参数代替 4.不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数

  ``` js
    // ES6
    function foo() {
      setTimeout(() => {
        console.log('id:', this.id);
      }, 100);
    }

    // ES5
    function foo() {
      var _this = this;

      setTimeout(function () {
        console.log('id:', _this.id);
      }, 100);
    }
  ```

## iterator 迭代器

> 默认部署`iterator`接口的数据结构有 `Array`、`Map`、`Set`、`String`、`TypedArray`（类数组）、函数的 arguments 对象、`NodeList` 对象，注意普通对象默认是没有 `iterator` 接口的（可以自己创建 `iterator` 接口让普通对象也可以迭代）

``` js
  let arr = [1,2,3]
  let iterator = arr[Symbol.iterator]()

  iterator.next() //{value: 1, done: false}
  iterator.next() //{value: 2, done: false}
  iterator.next() //{value: 3, done: false}
  iterator.next() //{value: undefined, done: true}
```

1. 可迭代的数据结构会有一个`[Symbol.iterator]`方法
2. `[Symbol.iterator]`执行后返回一个 iterator 对象
3. iterator 对象有一个 next 方法
4. next 方法执行后返回一个有 value,done 属性的对象(当value为undefined时，done为true表示循环终止)

## 解构赋值

> `ES6` 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构，允许设置默认值 (严格等于 undefined 时生效)

- 数组的解构
  ``` js
   let [a, b, c] = [1, 2, 3];
  ```
- 对象的解构

  ``` js
    let { foo, bar } = { foo: "aaa", bar: "bbb" };

    //若变量名与属性名不一致需写成
    let { foo: f} = {foo: "aaa"}
    console.log(f)  //'aaa'
  ```

  > 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

## 剩余/扩展运算符

- 扩展运算符

  ``` js
    let arr = [1,2,3,4,5]
    le arr2 = [...arr,6,7] // [1,2,3,4,5,6,7]

    //使用扩展运算符可以快速的将类数组转为一个真正的数组
    let nodeList = document.querySeletorAll('div')
    let arr = [...nodeList]
  ```

- 剩余运算符
  ``` js
    function fun(...rest){
      console.log(rest)
    }
    fun(1,2,3)
  ```

## Set / Map

- set 类似于数组，但是成员都是唯一的，判断标准类似于'==='(`NaN`在set中为相等)，不会做类型转换，可接受数组或者具有`iterator`接口的数据结构作为参数

  ``` js
  const arr = [1,2,3,4,5,5,5]
  const set = new Set(arr)
  //[1,2,3,4,5]  
  [...new Set(arr)] // 去重
  //size() 查看长度
  //操作方法  add() delete() has() clear() 
  //Set没有键名，只有键值(或者说键名和键值是同一个值)
  //遍历操作 keys() values() entries()  
  ```

- map类似于对象，但是键的范围不限于字符串，可以是各种类型的值。

  ``` js
  const obj = {a: 1}
  const map = new Map()
  map.set(obj, 'test')
  map.get(obj) //test
  map.has(obj) //true
  map.delete(obj) 
  ```

## Promise

- 有三种状态 pending(进行中)、fulfilled(成功)和rejected(失败)，状态改变只有从pending->fulfilled和pending->rejected两种情况，一旦状态改变了，就不会再改变，这时候称为resolved。

``` js
const promise = new Promise(function (reslove, reject) {
  setTimeout(() => {
    console.log(1)
    reslove(2)
    reject(5)
  })
})
const p1 = promise.then((res) => {
  console.log(res, 3)
})
const p2 = promise.then((res) => {
  console.log(res, 4)
})

// 1 ; 2 3 ; 2 4;Promise构造函数只执行一次，promise.then可以调用多次，但是每次拿的值都是一样，且Promise状态一旦改变，无法再次变更，所以reject(5)不会执行
```

- promise.all

## Generator

- Generator函数的定义跟普通函数差不多，只是在function关键字后面加了一个星号，执行Generator函数会返回一个遍历器对象，需要用next()将指针移向下一个状态，直到遇到yield表达式(或return语句)。

``` js
function* test() {
  yield 10;
  yield 20;
  return 30;
}

const a = test()
a.next() //{value: 10, done: false}
a.next() //{value: 20, done: false}
a.next() //{value: 30, done: true}
a.next() //{value: undefined, done: true}
```

- 可用for of 解构赋值  剩余运算符来遍历

``` js
for (let val of a ){
  console.log(val)
}

let [aa, ab] = test()
console.log(aa, ab)

console.log(...test())
```

- 异步使用

``` js
function* test(params) {
  yield fn(params) //调接口
}

const a = test(1).next()
```

## async/await

- async await是用来解决异步的，async函数是Generator函数的语法糖
- 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句
- 和Generator函数比较
  - 内置执行器。Generator函数的执行必须依靠执行器，而Async函数自带执行器，调用方式和普通函数一样
  - 更好的语义化
  - 更广的适用性。yield命令后面只能是Thunk函数或Promise对象，async函数的await后面可以是Promise也可以是原始类型的值
  - 返回值是Promise。async函数返回的是Promise对象，比Generator函数返回的Iterator对象方便，可以直接使用then()方法进行调用