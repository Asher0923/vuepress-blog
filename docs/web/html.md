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

- Canvas

  ```
  <canvas id="myCanvas" width="200" height="100"></canvas>
  // canvas元素本身是没有绘图能力的，所有的绘制工作必须在JavaScript内部完成
  var c = document.getElementById('myCanvas')
  var ctx = c.getContext("2d")
  ctx.fillStyle('#FF0000')
  ctx.fillRect(0, 0, 150, 75)
  ```

- SVG

  可伸缩矢量图形，使用XML格式定义图形，在放大或改变尺寸的情况下图形质量不会有损失

| Canvas                                             | SVG                                                     |
| -------------------------------------------------- | ------------------------------------------------------- |
| 依赖分辨率                                         | 不依赖分辨率                                            |
| 不支持事件处理器                                   | 支持事件处理器                                          |
| 弱的文本渲染能力                                   | 最适合带有大型渲染区域的应用程序（比如谷歌地图）        |
| 能够以 .png 或 .jpg 格式保存结果图像               | 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快） |
| 最适合图像密集型的游戏，其中的许多对象会被频繁重绘 | 不适合游戏应用                                          |



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

## 回流重绘

- 浏览器渲染过程

  1. 浏览器使用流式布局模型
  2. 浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并产生了Render Tree
  3. 有了Render Tree，就知道所有节点的样式，然后计算节点在页面中的大小和位置，最后把节点绘制到页面上
  4. 由于浏览器使用流式布局，对Render Tree的计算通常只需要遍历一次就可以完成，但table及其内部元素除外，他们需要多次计算，通常要花3倍同等元素的时间，所以要避免使用table布局

- 回流

  当Render Tree中部分或全部元素的尺寸、结构或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流

  1. 页面首次渲染

  2. 浏览器窗口大小发生改变

  3. 元素尺寸或位置发生改变

  4. 元素内容变化（文字数量或图片大小等）

  5. 元素字体大小变化

  6. 添加或删除可见的DOM元素

  7. 激活CSS伪类

  8. 查询某些属性或调用某些方法

     ```
     clientWidth、clientHeight、clientTop、clientLeft
     offsetWidth、offsetHeight、offsetTop、offsetLeft
     scrollWidth、scrollHeight、scrollTop、scrollLeft
     scrollIntoView()、scrollIntoViewIfNeeded()
     getComputedStyle()
     getBoundingClientRect()
     scrollTo()
     ```

- 重绘

  当页面中元素样式的改变并不影响它在文档流中的位置时（比如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

- 性能影响

  回流必会引起重绘，重绘不一定回流，回流比重绘的代价高

  现代浏览器对频繁的回流或重绘操作进行优化：

  浏览器会维护一个队列，把所有引起回流和重绘的操作放到队列中，如果队列中的任务数量或者时间达到一个阈值，（至少一个浏览器刷新帧16ms，60赫兹刷新率的屏幕，1000ms/60）浏览器就会将队列清空，但是在获取布局尺寸等信息时，为保证准确性，当访问一下属性或方法时，浏览器也会立即清空队列

  ```
  clientWidth、clientHeight、clientTop、clientLeft
  offsetWidth、offsetHeight、offsetTop、offsetLeft
  scrollWidth、scrollHeight、scrollTop、scrollLeft
  width、height
  getComputedStyle()
  getBoundingClientRect()
  ```

- 如何避免

  避免使用table布局

  尽可能在DOM数的最末端改变class： 减小回流的范围

  将动画效果应用到`position`属性为`absolute`或`fixed`的元素上 ，避免影响其他元素的布局，这样只是一个重绘，而不是回流； 

   避免使用`CSS`表达式（例如：`calc()`）

   避免频繁操作样式，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性 

  避免频繁操作`DOM` 

  也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在`display`属性为`none`的元素上进行的`DOM`操作不会引发回流和重绘 

## 浏览器工作原理

- 加载

  1. 浏览器根据DNS服务器得到域名的IP地址
  2. 向这个IP的机器发送HTTP请求
  3. 服务器收到、处理并返回HTTP请求
  4. 浏览器得到并返回内容

- 渲染

  1. 根据HTML结构生成DOM树
  2. 根据CSS生成CSSOM
  3. 将DOM和CSSOM整合形成Render Tree
  4. 根据Render Tree开始渲染和展示
  5. 遇到`script`标签时，会执行并阻塞渲染

- Web安全

  1. SQL注入：

     输入时进行了恶意的SQL拼接，导致最后生成的SQL有问题

  2. XSS：

     通过某种方式（发布文章、评论）等将一段特定的JS代码隐蔽的输入进去，JS代码一旦执行，就可以获取服务端数据、cookie等

     预防：用正则替换

     ```
     < 替换为：&lt;
     > 替换为：&gt;
     & 替换为：&amp;
     ‘ 替换为：&#x27;
     ” 替换为：&quot;
     ```

  3. CSRF：

     借助了cookie的特性，劫持操作者的权限来完成某个操作，而不是拿到用户的信息

     预防： 加入各个层级的权限验证

## 图片懒加载和预加载

- 懒加载

  - 也叫延迟加载，指的是在长网页中延迟加载图片，用户滚动到它们之前，可视区域外的图像不会加载

  - 当访问一个页面的时候，先把img标签的src属性设为空字符串，而图片的真正路径则设置在data-original属性中，当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断懒加载的图片是否进入可视区域，如果在就将图片的src属性设置为data-original的值

    ```
    <img src="" class="image-item" lazyload="true"  data-original="images/1.png"/>
    ```

- 预加载

  -  预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源
  - 实现方式
    1.  用CSS和JavaScript实现预加载 
    2.  仅使用JavaScript实现预加载 
    3.  使用Ajax实现预加载 