---
title: 'JS基础-Date'
---

## Date对象

> 用于处理日期和时间

```js
var date = new Date() // Sat Jun 06 2020 16:20:17 GMT+0800 (中国标准时间) 返回的是object类型
var date = Date() // "Sat Jun 06 2020 16:20:51 GMT+0800 (中国标准时间)" 返回的是string类型
var date = Date.now() // 1591431700981  返回毫秒数
```

## Date对象的方法

```js
var date = new Date()
```

- getDate()： 从 Date 对象返回一个月中的某一天 (1 ~ 31) 

  ```js
  date.getDate() // 6
  ```

-  getDay()： 从 Date 对象返回一周中的某一天 (0 ~ 6) 

  ```js
  date.getDay() // 6  从0开始，礼拜天是0
  ```

- getFullYear()： 从 Date 对象以四位数字返回年份 

  ```js
  date.getFullYear() // 2020
  ```

- getMonth()： 从 Date 对象返回月份 (0 ~ 11) 

  ```js
  date.getMonth() // 5 比当前月小1
  ```

- getHours()： 返回 Date 对象的小时 (0 ~ 23) 

  ```js
  date.getHours() // 16
  ```

- getMinutes()： 返回 Date 对象的分钟 (0 ~ 59) 

  ```js
  date.getMinutes() // 44
  ```

- getSeconds()： 返回 Date 对象的秒数 (0 ~ 59) 

  ```js
  date.getSeconds() // 6
  ```

- getTime()： 返回 1970 年 1 月 1 日至今的毫秒数 (计算机的纪元时间)

  ```js
  date.getTime() // 1591433046080
  ```

  