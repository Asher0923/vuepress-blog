---
title: "Web基础-HTML"
---

## DOCTYPE 声明

- 声明位于 HTML 文档的第一行，处于标签之前，用来告知浏览器用什么文档标准解析这个文档，不存在或格式不正确会导致文档以兼容模式呈现

- 标准模式：排版和`js`运作方式都是以该浏览器支持的最高标准执行

- 兼容模式：页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防站点无法运行

- `HTML4`是基于`SGML`这个标记语言的集合，`DTD`是指出当前`HTML`文件使用哪个`SGML`规则，`HTML5`则不需要

  ```html
  <!-- html5 -->
  <!DOCTYPE html>
  <!-- html4 -->
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  ```

## meta 标签

> 共有两个属性，分别是`http-equiv`属性和`name`属性

1. `http-equiv`属性

   ```html
   <meta http-equiv="参数" content="具体的描述" />
   ```

   - `content-type`

     用于设定网页字符集，便于浏览器解析与渲染页面

     ```html
     <!-- 旧html -->
     <meta http-equiv="content-type" content="text/html; charset=utf-8" />
     <!-- html5 -->
     <meta charset="utf-8" />
     ```

   - `set-cookie`

     设置 cookie 的一种方式，也可以指定过期时间

     ```html
     <meta
       http-equiv="set-cookie"
       content="name=value expires=Fri, 12 Jan 2001 18:18:18 GMT,path=/"
     />
     ```

   - `X-UA-Compatible`

     告知浏览器以何种版本来渲染页面

     ```html
     <!-- 指定IE和Chrome使用最新版本渲染当前页面 -->
     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
     ```

   - `cache-control`

     指定请求和响应遵循的缓存机制

     ```html
     <meta http-equiv="cache-control" content="no-cache" />
     ```

     - no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
     - no-store: 不允许缓存，每次都要去服务器下载完整的响应。（安全措施）

2. `name`属性

   ```html
   <meta name="参数" content="具体的描述" />
   ```

   - `keywords`

     告诉搜索引擎，网页的关键字

     ```html
     <meta name="keywords" content="前端" />
     ```

   - `description`

     告诉搜索引擎，网站的主要内容

     ```html
     <meta name="description" content="前端编程" />
     ```

   - `viewport`

     控制页面缩放，常用于移动端网页

     ```html
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <!-- 
       viewport参数详解：
       width：宽度（数值 / device-width）（默认为980 像素）
       height：高度（数值 / device-height）
       initial-scale：初始的缩放比例 （范围从>0 到10）
       minimum-scale：允许用户缩放到的最小比例
       maximum-scale：允许用户缩放到的最大比例
       user-scalable：用户是否可以手动缩 (no,yes)
      -->
     ```

## link 标签

- link

  ```html
  <link rel="stylesheet" href="x.css" />
  ```

- import

  ```html
  <style>
    @import url(x.css);
  </style>
  ```

- 区别

  1. link 属于`XHTML`标签，而`@import`是`CSS`提供的
  2. 页面加载的时候，`link`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载
  3. import 是`CSS2.1` 提出的，只在`IE5`以上才能被识别，而`link`是`XHTML`标签，无兼容问题
  4. `link`方式的样式权重高于`@import`的权重

## async / defer

- 普通的`script`标签

  浏览器会停止解析`dom`，加载和执行`js`文件后，再继续解析

  ```html
  <script src="a.js"></script>
  ```

- `async`

  `HTML5`中定义，不阻塞`dom`的解析，`js`一旦加载好立马执行，执行顺序未知

  ```html
  <script src="b.js" async></script>
  <script src="c.js" async></script>
  ```

- `defer`

  `HTML4`中定义，不阻塞`dom`的解析，加载好之后不会立马执行，等页面解析完，依次执行

  ```html
  <script src="d.js" defer></script>
  <script src="e.js" defer></script>
  ```

- 如果`script`标签无`src`属性，则`defer`和`async`都被忽略，动态添加的`script`标签隐含`async`属性

## Canvas / SVG

- Canvas

  ```html
  <canvas id="myCanvas" width="200" height="100"></canvas>
  <!-- canvas元素本身是没有绘图能力的，所有的绘制工作必须在JavaScript内部完成 -->
  <script>
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle("#FF0000");
    ctx.fillRect(0, 0, 150, 75);
  </script>
  ```

- SVG

  可伸缩矢量图形，使用 XML 格式定义图形，在放大或改变尺寸的情况下图形质量不会有损失

| Canvas                                             | SVG                                                     |
| -------------------------------------------------- | ------------------------------------------------------- |
| 依赖分辨率                                         | 不依赖分辨率                                            |
| 一整副画布，不支持事件处理器                       | 每一个图形都是独立的 DOM 节点，支持事件处理器           |
| 弱的文本渲染能力                                   | 最适合带有大型渲染区域的应用程序（比如谷歌地图）        |
| 能够以 .png 或 .jpg 格式保存结果图像               | 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快） |
| 最适合图像密集型的游戏，其中的许多对象会被频繁重绘 | 不适合游戏应用                                          |

## 本地存储

|              |                                   `Cookie`                                   |       `localStorage`       |              `sessionStorage`              |
| ------------ | :--------------------------------------------------------------------------: | :------------------------: | :----------------------------------------: |
| 有效期       | 一般由服务端生成，可设置失效时间，如果在浏览器端生成，默认是关闭浏览器后失效 | 除非手动清除，否则永久保存 | 仅当前会话下有效，关闭页面或浏览器后被清除 |
| 存储大小     |                                   `4K`左右                                   |          `5M`左右          |                  `5M`左右                  |
| 与服务端通信 |                         每次都会携带`http`的请求头中                         |           不参与           |                   不参与                   |

- `Cookie`

  ```js
  document.cookie; // 通常由服务端生成
  ```

- `localStorage`

  ```js
  localStorage.setItem("key", "value");
  localStorage.getItem("key");
  localStorage.removeItem("key");
  localStorage.clear(); //清空所有信息
  // localStorage只支持string类型的存储，存对象时使用JSON.stringify
  window.localStorage.setItem("名称", JSON.stringify(对象数据)); // 存
  let content = JSON.parse(localStorage.getItem("名称")); // 取
  ```

- `sessionStorage`

  ```js
  sessionStorage.setItem("key", "value");
  sessionStorage.getItem("key");
  sessionStorage.removeItem("key");
  sessionStorage.clear(); //清空所有信息
  ```

## 回流重绘

- 浏览器渲染过程

  1. 浏览器使用流式布局模型
  2. 浏览器会把 HTML 解析成 DOM，把 CSS 解析成 CSSOM，DOM 和 CSSOM 合并产生了 Render Tree
  3. 有了 Render Tree，就知道所有节点的样式，然后计算节点在页面中的大小和位置，最后把节点绘制到页面上
  4. 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们需要多次计算，通常要花 3 倍同等元素的时间，所以要避免使用 table 布局

- 回流

  当 Render Tree 中部分或全部元素的尺寸、结构或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流

  1. 页面首次渲染

  2. 浏览器窗口大小发生改变

  3. 元素尺寸或位置发生改变

  4. 元素内容变化（文字数量或图片大小等）

  5. 元素字体大小变化

  6. 添加或删除可见的 DOM 元素

  7. 激活 CSS 伪类

  8. 查询某些属性或调用某些方法

     ```js
     clientWidth、clientHeight、clientTop、clientLeft
     offsetWidth、offsetHeight、offsetTop、offsetLeft
     scrollWidth、scrollHeight、scrollTop、scrollLeft
     scrollIntoView()、scrollIntoViewIfNeeded()
     getComputedStyle()
     getBoundingClientRect()
     scrollTo()
     ```

- 重绘

  当页面中元素样式的改变并不影响它在文档流中的位置时（比如：color、background-color、visibility 等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

- 性能影响

  回流必会引起重绘，重绘不一定回流，回流比重绘的代价高

  现代浏览器对频繁的回流或重绘操作进行优化：

  浏览器会维护一个队列，把所有引起回流和重绘的操作放到队列中，如果队列中的任务数量或者时间达到一个阈值，（至少一个浏览器刷新帧 16ms，60 赫兹刷新率的屏幕，1000ms/60）浏览器就会将队列清空，但是在获取布局尺寸等信息时，为保证准确性，当访问一下属性或方法时，浏览器也会立即清空队列

  ```js
  clientWidth、clientHeight、clientTop、clientLeft
  offsetWidth、offsetHeight、offsetTop、offsetLeft
  scrollWidth、scrollHeight、scrollTop、scrollLeft
  width、height
  getComputedStyle()
  getBoundingClientRect()
  ```

- 如何避免

  避免使用 table 布局

  尽可能在 DOM 树的最末端改变 class： 减小回流的范围

  将动画效果应用到`position`属性为`absolute`或`fixed`的元素上 ，避免影响其他元素的布局，这样只是一个重绘，而不是回流；

  避免使用`CSS`表达式（例如：`calc()`）

  避免频繁操作样式，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性

  避免频繁操作`DOM`

  也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在`display`属性为`none`的元素上进行的`DOM`操作不会引发回流和重绘

## 图片懒加载和预加载

- 懒加载

  - 也叫延迟加载，指的是在长网页中延迟加载图片，用户滚动到它们之前，可视区域外的图像不会加载

  - 当访问一个页面的时候，先把 img 标签的 src 属性设为空字符串，而图片的真正路径则设置在 data-src 属性中，当页面滚动的时候需要去监听 scroll 事件，在 scroll 事件的回调中，判断懒加载的图片是否进入可视区域，如果在就将图片的 src 属性设置为 data-src 的值

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
        <style>
          img {
            display: block;
            /* width: 100%; */
            height: 300px;
          }
        </style>
      </head>
      <body>
        <img src="" data-src="./web.png" />
        <img src="" data-src="./web1.png" />
        <img src="" data-src="./web2.png" />
        <img src="" data-src="./web3.png" />
        <img src="" data-src="./web4.png" />
        <img src="" data-src="./web5.png" />
        <img src="" data-src="./web6.png" />
        <img src="" data-src="./web7.png" />
        <img src="" data-src="./web8.png" />
        <img src="" data-src="./web9.png" />
        <img src="" data-src="./web10.png" />
        <img src="" data-src="./web11.png" />
        <img src="" data-src="./web12.png" />
        <img src="" data-src="./web13.png" />
        <img src="" data-src="./web14.png" />
      </body>
      <script>
        var imgs = document.querySelectorAll("img");
        function getTop(e) {
          return e.offsetTop;
        }
  
        function lazyLoad(imgs) {
          var h = window.innerHeight;// 窗口显示区的高度
          var s = document.documentElement.scrollTop;// 纵向滚动条的位置
          for (let i = 0; i < imgs.length; i++) {
            if (h + s > getTop(imgs[i])) {
              imgs[i].src = imgs[i].getAttribute("data-src");
            }
          }
        }
  
        window.onload = window.onscroll = function() {
          lazyLoad(imgs);
        };
      </script>
    </html>
    ```

- 预加载

  - 预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源
  - 实现方式
    1.  用 CSS 和 JavaScript 实现预加载
    2.  仅使用 JavaScript 实现预加载
    3.  使用 Ajax 实现预加载

## data-\* 属性

> data-\* 属性用于存储页面或应用程序的私有自定义数据
>
> data-\* 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力

```html
<element data-*="somevalue"></element>
```

## 面试题

1. 在 css/js 代码上线之后开发人员经常会优化性能，从用户刷新网页开始，一次 js 请求一般情况下有哪些地方会有缓存处理

   答案：dns 缓存，cdn 缓存，浏览器缓存，服务器缓存

2. 二级域名如何共享 cookie

   Cookie 实际上是一小段文本(上限为 4k)，客户端请求服务器，服务器需要记录该用户状态，就使用 response 向客户端浏览器颁发一个 cookie，客户端浏览器将 cookie 保存起来，当浏览器再请求该网站时，浏览器将请求的网址连同 cookie 一同提交给服务器

   cookie 的 domain 属性：可以访问该 Cookie 的域名。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该 Cookie。注意第一个字符必须为“.”

3. GET 和 POST 的区别

   GET 的 url 一般都具有长度限制，但是这个限制并非是 http 协议中规定的，而是浏览器和 web 服务器决定的，GET 只会产生一个 TCP 数据包，浏览器会把请求头和请求数据一并发送出去

   POST 是将请求信息放在请求数据中的，（并没有比 GET 安全，可以通过抓包获取），请求信息是没有长度限制的，POST 会产生两个 TCP 数据包，浏览器会先将请求头发送给服务器，待服务器响应 100 continue，浏览器再发送请求数据，服务器响应 200 ok（返回数据）

   本质上 GET 和 POST 是一样的，都是 TCP 连接，但是由于 HTTP 的规定以及浏览器/服务器的限制，导致它们在应用过程中可能会有所不同，

4. HTTP 和 HTTPS 的区别

   HTTP 是超文本传输协议，信息是明文传输，HTTPS 是更具安全性的 SSL 加密传输协议

   HTTP 默认端口是 80，HTTPS 默认端口是 443

   HTTPS 有 CA 证书，HTTP 一般没有（SSL 证书是 CA 证书的一种）
