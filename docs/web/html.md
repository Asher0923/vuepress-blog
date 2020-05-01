---
title: 'Web基础-HTML'
---

## 主流浏览器

| 浏览器  |           内核            |
| :-----: | :-----------------------: |
|   IE    |          Trident          |
| Chrome  |      Webkit -> Blink      |
| FireFox |           Gecko           |
| Safari  |          Webkit           |
|  Opera  | Presto -> Webkit -> Blink |

## `DOCTYPE`声明

- 声明位于HTML文档的第一行，处于标签之前，用来告知浏览器用什么文档标准解析这个文档，不存在或格式不正确会导致文档以兼容模式呈现

- 标准模式：排版和`js`运作方式都是以该浏览器支持的最高标准执行

- 兼容模式：页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防站点无法运行

- `HTML4`是基于`SGML`这个标记语言的集合，`DTD`是指出当前`HTML`文件使用哪个`SGML`规则，`HTML5`则不需要

  ```
  // html5
  <!DOCTYPE HTML>
  // html4
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  ```

## `meta`标签

> 共有两个属性，分别是`http-equiv`属性和`name`属性

1. `http-equiv`属性

   ```
   <meta http-equiv="参数" content="具体的描述">
   ```

   - `content-type`

     用于设定网页字符集，便于浏览器解析与渲染页面

     ```
     <meta http-equiv="content-Type" content="text/html; charset=utf-8"> // 旧HTML
     <meta charset="utf-8"/>  //HTML5
     ```

   - `X-UA-Compatible`

     告知浏览器以何种版本来渲染页面

     ```
     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> //指定IE和Chrome使用最新版本渲染当前页面
     ```

   - `cache-control`

     指定请求和响应遵循的缓存机制

     ```
     <meta http-equiv="cache-control" content="no-cache">
     ```

     - no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
     - no-store: 不允许缓存，每次都要去服务器下载完整的响应。（安全措施）

2. `name`属性

   ```
   <meta name="参数" content="具体的描述">
   ```

   - `keywords`

     告诉搜索引擎，网页的关键字

     ```
     <meta name="keywords" content="前端">
     ```

   - `description`

     告诉搜索引擎，网站的主要内容

     ```
     <meta name="description" content="前端编程">
     ```

   - `viewport`

     控制页面缩放，常用于移动端网页

     ```
     <meta name="viewport" content="width=device-width, initial-scale=1">
     ```

## `link`标签

- link

  ```
   <link rel="stylesheet" href="x.css">
  ```

- import

  ```
  @import url(x.css)
  ```

- 区别

  1. link属于`XHTML`标签，而`@import`是`CSS`提供的
  2. 页面加载的时候，`link`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载
  3. import是`CSS2.1` 提出的，只在`IE5`以上才能被识别，而`link`是`XHTML`标签，无兼容问题
  4. `link`方式的样式权重高于`@import`的权重

## `async` / `defer`

- 普通的`script`标签

  浏览器会停止解析`dom`，加载和执行`js`文件后，再继续解析

  ```
  <script src="a.js"></script>
  ```

- `async`

  `HTML5`中定义，不阻塞`dom`的解析，`js`一旦加载好立马执行，执行顺序未知

  ```
  <script src="b.js" async></script>
  <script src="c.js" async></script>
  ```

- `defer`

  `HTML4`中定义，不阻塞`dom`的解析，加载好之后不会立马执行，等页面解析完，依次执行 

  ```
  <script src="d.js" defer></script>
  <script src="e.js" defer></script>
  ```

- 如果`script`标签无`src`属性，则`defer`和`async`都被忽略，动态添加的`script`标签隐含`async`属性

## `Canvas` / `SVG`

## 本地存储

|              |                           `Cookie`                           |       `localStorage`       |              `sessionStorage`              |
| ------------ | :----------------------------------------------------------: | :------------------------: | :----------------------------------------: |
| 有效期       | 一般由服务端生成，可设置失效时间，如果在浏览器端生成，默认是关闭浏览器后失效 | 除非手动清除，否则永久保存 | 仅当前会话下有效，关闭页面或浏览器后被清除 |
| 存储大小     |                           `4K`左右                           |          `5M`左右          |                  `5M`左右                  |
| 与服务端通信 |                 每次都会携带`http`的请求头中                 |           不参与           |                   不参与                   |



- `Cookie`

  ```
  document.cookie // 通常由服务端生成
  ```

- `localStorage`

  ```
  localStorage.setItem("key", "value")
  localStorage.getItem("key")
  localStorage.removeItem("key")
  localStorage.clear() //清空所有信息
  ```

- `sessionStorage`

  ```
  // api和localStorage一样
  ```

## 离线存储

## 回流重绘

## 浏览器工作原理

## 图片懒加载和预加载

## `webSocket`

## `webWorker`

