---
title: 'JS基础-DOM BOM'
---

## DOM常用方法

- 获取节点

  ``` js
  //返回带有指定 ID 的元素
  document.getElementById(idName)
  
  //返回包含带有指定标签名称的所有元素的节点列表（类数组）
  //getElementsByTagName方法定义在Document.prototype和Element.prototype上
  document.getElementsByTagName()
  element.getElementsByTagName()
  
  //返回包含带有指定类名的所有元素的节点列表
  document.getElementsByClassName()
  
  //返回匹配指定css选择器的第一个元素(静态的，非实时)
  document.querySelector("#demo")
  
  //返回匹配指定css选择器的所有元素(静态的，非实时)
  document.querySelectorAll('*')
  
  //获取head元素对象
  document.head
  
  //获取body元素对象
  document.body
  
  //获取html元素对象
  document.documentElement
  	//需求：获取浏览器屏幕的宽度和高度（兼容所有的浏览器）
      document.documentElement.clientWidth || document.body.clientWidth
      document.documentElement.clientHeight || document.body.clientHeight
  ```

- 获取/设置/删除元素属性

  ``` js
  //获取元素属性值
  element.getAttribute(attributeName)
  
  //设置元素属性值
  element.setAttribute(attributeName, attributeValue)
  
  //删除元素属性
  element.removeAttribute(attributeName)
  ```

- 创建节点

  ``` js
  //创建节点
  document.createElement('h1')
  
  //创建文本节点
  document.createTextNode(String)
  
  //创建属性节点
  document.createAttribute('class')
  
  //克隆节点  传true为深度克隆,不传为浅克隆
  document.cloneNode(Boolean)
  ```

- 插入节点

  ``` js
  //向parent的子节点列表的末尾添加新的子节点(若节点在parent中已存在，则是剪切功能)
  parent.appendChild(node)
  
  //在parent的子节点(existingnode)前插入newNode
  parent.insertBefore(newNode, existingnode)
  ```

- 删除节点

  ``` js
  //从子节点列表中删除某个节点，删除成功返回该被删除的节点，否则返回null
  parent.removeChild(node)
  
  //删除自身
  child.remove()
  ```

- 替换节点

  ``` js
  //使用一个节点替换另一个节点
  parent.replaceChild(newChild, oldChild)
  ```
  
- 修改样式

  ```js
  // 读写行间样式
  dom.style.prop
  
  // 查询计算样式，当前元素的所有css显示值（只读 ）
  window.getComputedStyle(dom).prop
  
  // IE独有计算样式
  dom.currentStyle.prop
  ```

  

## DOM常用属性

- 获取当前元素的父节点

  ``` js
  //返回当前元素的父节点，如果没有父节点则返回null 
  element.parentNode
  
  //返回当前元素的父元素节点
  element.parentElement
  ```

- 获取当前元素的子节点

  ``` js
  //返回元素的子元素的集合，只返回元素节点
  element.children
  
  //返回包含被选节点的子节点的NodeList，包括文本节点、注释节点
  element.childNodes
  
  //返回当前元素的第一个子节点（文本节点、元素节点都包含）
  element.firstChild
  
  //返回当前元素的最后一个子节点（文本节点、元素节点都包含）
  element.lastChild
  
  //返回当前元素的第一个元素子节点
  element.firstElementChild
  
  //返回当前元素的最后一个元素子节点
  element.lastElementChild
  ```

- 获取当前元素的同级元素

  ``` js
  //返回当前元素之后紧跟的节点，没有就返回null （文本节点、元素节点都包含）
  element.nextSibling
  
  //返回当前元素之前紧跟的节点，没有就返回null （文本节点、元素节点都包含）
  element.previousSibling
  
  //返回当前元素之后紧跟的元素节点，没有就返回null
  element.nextElementSibling
  
  //返回当前元素之前紧跟的元素节点，没有就返回null
  element.previousElementSibling
  ```

- 获取/设置当前元素的文本

  ``` js
  // 设置或返回元素的开始和结束标签之间的的全部内容,包括Html标签
  element.innerHTML
  
  //设置或返回元素的开始和结束标签之间的的全部内容,去除Html标签
  element.innerText
  ```

- 获取元素节点类型

  ``` js
  //元素节点--1  属性节点--2  文本节点--3  Document--9
  element.nodeType
  ```
  
- 节点的属性

  ```js
  //元素的标签名，只读
  element.nodeName ---> "DIV" "#text"
  
  //文本节点或注释节点的文本内容，可读写
  element.nodeValue
  
  //节点类型 元素节点:1,属性节点:2,文本节点:3,注释节点:8,document:9,DocumentFragment:11
  element.nodeType
  
  //Element节点的属性集合
  element.attributes
  
  // 每个节点都有一个方法，返回布尔值（文本节点、元素节点都算）
  element.hasChildNodes()
  ```

## DOM事件

- 绑定事件

  - ele.onxxx = function(e){}

    兼容性很好，但是一个元素的同一个事件只能绑定一个处理函数，this指向dom本身

    ```js
    ele.onclick = function(e){console.log(e)}
    ```

  - ele.addEventListener(type,fn,false)

    可为一个事件绑定多个处理函数，this指向dom本身

    ```js
    ele.addEventListener("click",function(e){console.log(e)},false)
    ```

  - ele.attachEvent('on'+type, fn)

    IE独有，一个事件同样可以绑定多个处理函数，this指向window

    ```js
    ele.attachEvent('onclick',function(e){console.log(e)})
    ```

- 解除事件绑定

  ```js
  ele.onclick = null
  ```

  ```js
  // 一定要和绑定的函数引用一致
  ele.removeEventListener('click',fn,false)
  ```

  ```js
  // 一定要和绑定的函数引用一致
  ele.detachEvent('on'+type,fn)
  ```

- 事件处理模型

  - 冒泡

    结构上(非视觉上)嵌套关系的元素，会存在事件冒泡的功能，即同一个事件，自子元素冒泡向父元素(自底向上)

  - 捕获

    结构上(非视觉上)嵌套关系的元素，会存在事件捕获的功能，即同一个事件，自父元素捕获至子元素(自顶向下)

    ```js
    ele.addEventListener("click",function(e){console.log(e)},true)
    ```

  - 触发顺序为先捕获后冒泡，focus、blur、change、submit、reset、select等事件不冒泡

  - 阻止冒泡

    - W3C标准：event.stopPropagation()  不支持IE9以下版本
    - event.cancelBubble = true 兼容IE

  - 阻止默认事件(表单提交、a标签跳转、右键菜单等)

    - return false 以对象属性方式注册的事件才生效
    - event.preventDefault() W3C标注，IE9以下不兼容
    - event.returnValue = false 兼容IE

- 事件委托

  - 事件源对象：event.target || event.srcElement
  - 事件委托是利用事件冒泡和事件源对象进行处理，不需要循环所有的元素一个个绑定事件，直接绑定在父元素上

- 事件分类

  - click、mousedown、mousemove、mouseup、contextmenu、mouseover、mouseout、mouseenter、mouseleave

    click = mousedown + mouseup

  - 区分鼠标左右键

    mousedown和mouseup中的e.button属性为2时是右键，为0时是左键

  - ketdown、keyup、keypress

  - keydown和keypress区别

    keydown可以监测到所有按键，keypress只能监测到ASC码中的字符按键，可区分大小写

  - scroll、load

    ```js
    window.onscroll = function(){  }
    window.onload = function(){  }
    ```

## BOM常见对象

window：window对象是js中的顶级对象，所有定义在全局作用域中的变量/函数都会变成window对象的属性和方法，在调用的时候可以省略window，以下列出常用方法和属性

- setTimeout() / clearTimeout()
- setInterval() / clearInterval()
- open() / close()
- moveTo() // 移动当前窗口
- resizeTo() // 调整当前窗口尺寸
- scrollTo() // 内容滚动到指定的坐标 
- scrollBy() //  内容滚动指定的像素数 (  window 滚动条的可见属性必须设置为true ,从原先的位置而言) 
-  innerWidth  // 浏览器窗口可视区宽度 
- innerHeight //  浏览器窗口可视区高度 
- pageXOffset // X轴滚动条滚动距离
- pageYOffset // Y轴滚动条滚动距离

document：是window对象的属性，是唯一一个既属于BOM又属于BOM的对象

- document.write()
- document.documentElement.clientWidth //浏览器窗口可视区宽度（ 低版本IE的innerWidth、innerHeight的代替方案 ）

location：表示载入窗口的URL

- location.href // 当前载入页面的完整url
- location.portocol // url中使用的协议，如http
- location.host // 域名
- location.port // 端口
- location.pathname // url中主机名后的部分，如/home/index.htm
- location.search // url中问好后的部分
- location.hash // 如果是hash模式路由，#后面的内容
- location.assign('www.baidu.com') // 同location.href，新地址都会被加到浏览器的历史栈中
- location.replace('www.baidu.com') // 同assign，但新地址不会被加到浏览器的历史栈中
- location.reload(boolean) // 重新载入当前页面，为false时从浏览器缓存中重载，为true时从服务器端重载，默认为false

navigator：包含大量有关web浏览器的信息，在检测浏览器及操作系统上非常有用

- navigator.appCodeName //浏览器代码名的字符串表示
- navigator.appName //官方浏览器名的字符串表示
- navigator.appVersion //浏览器版本信息的字符串表示 
- navigator.cookieEnabled //如果启用cookie返回true，否则返回false
-  navigator.javaEnabled //如果启用java返回true，否则返回false
- navigator.platform //浏览器所在计算机平台的字符串表示 
- navigator.plugins //安装在浏览器中的插件数组
- navigator.taintEnabled //如果启用了数据污点返回true，否则返回false  
- navigator.userAgent //用户代理头的字符串表示

screen：用于获取某些关于用户屏幕的信息

- screen.width/height //屏幕的宽度与高度，以像素计  
- screen.availWidth/availHeight //窗口可以使用的屏幕的宽度和高度，以像素计 
- screen.colorDepth //用户表示颜色的位数，大多数系统采用32位  

history：可以实现刷新、上一步、下一步

- history.forward()  // 下一步
- history.back()  // 上一步
- history.go(0);  //0表示刷新当前页面，正数表示向前进几个页面，负数向后退几个页面

## offset/client/scroll

- 元素视图属性
  - offsetWidth：盒子的宽度 width+padding+border
  - offsetHeight：盒子的高度 height+padding+border
  - offsetTop：当前元素到定位父节点top方向的距离
  - offsetLeft：当前元素到定位父节点left方向的距离
  -  offsetParent：当前元素的上层元素
  - clientWidth：width+padding
  - clientHeight：height+padding
  - scrollWidth：元素内容真实的宽度，内容宽度不超过盒子时等于clientWidth
  - scrollHeight：元素内容真实的高度，内容高度不超过盒子时等于clientHeight
  - scrollLeft：当前元素最左边到其在当前窗口显示范围内的左边距离，即横向滚动条滚动的距离
  - scrollTop：当前元素顶部到其在当前窗口显示范围内的顶距离，即纵向滚动条滚动的距离
- window视图属性
  - innerWidth：浏览器窗口可视区宽度
  - innerHeight：浏览器窗口可视区高度