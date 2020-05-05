---
title: 'JS基础-this'
---

## call

``` js
//手动实现call
Function.prototype.myCall = function(target) {
  //this指向的是调用此函数的方法，将此方法中的this指向target，即让target调用this，再将结果导出
  if (typeof this !== 'function') {
    return undefined // 用于防止 Function.prototype.myCall() 直接调用
  }
  target = target || window
  target.fn = this
  const args = [...arguments].slice(1)
  const result = target.fn(...args)
  delete target.fn
  return result
}
```

## apply

``` js
//手动实现apply
Function.prototype.myApply = function(target) {
  if (typeof this !== 'function') {
    return undefined // 用于防止 Function.prototype.myApply() 直接调用
  }
  target = target || window
  target.fn = this
  let result
  if (arguments[1] instanceof Array) {
    result = target.fn(...arguments[1])
  } else {
    result = target.fn()
  }
  delete target.fn
  return result
}
```

## bind

``` js
//手动实现bind
Function.prototype.myBind = function(target) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const fn = this
  const args = [...arguments].slice(1)
  return function F() {
    //因为支持柯里化形式传参我们需要再次获取存储参数
    let newArg = [...arguments]
    //new调用此函数时 this指向的是生成的实例
    if (this instanceof F) {
      return new fn(...args, ...newArg)
    }
    return fn.apply(target, args.concat(newArg))
  }
}
```



|  --   |     作用     |         参数          |     结果     |
| :---: | :----------: | :-------------------: | :----------: |
| call  | 改变this指向 |  `arg1.arg2.arg3...`  | 返回函数结果 |
| apply | 改变this指向 | `[arg1.arg2.arg3...]` | 返回函数结果 |
| bind  | 改变this指向 |  `arg1.arg2.arg3...`  |  返回新函数  |

