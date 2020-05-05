---
title: 'JS基础-DOM BOM'
---

## DOM常用方法

- 获取节点

  ``` js
  //返回带有指定 ID 的元素
  document.getElementById(idName)
  
  //返回包含带有指定标签名称的所有元素的节点列表（类数组）
  document.getElementsByTagName()
  
  //返回包含带有指定类名的所有元素的节点列表
  document.getElementsByClassName()
  
  //返回匹配指定css选择器的第一个元素
  document.querySelector("#demo")
  
  //返回匹配指定css选择器的所有元素
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

- 增加节点

  ``` js
  //向element的子节点列表的末尾添加新的子节点
  element.appendChild(node)
  
  //在element的子节点(existingnode)前插入newNode
  element.insertBefore(newNode, existingnode)
  ```

- 删除节点

  ``` js
  //从子节点列表中删除某个节点，删除成功返回该被删除的节点，否则返回null
  element.removeChild(node)
  ```

- 替换节点

  ``` js
  //使用一个节点替换另一个节点
  element.replaceChild(newChild, oldChild)
  ```

## DOM常用属性

- 获取当前元素的父节点

  ``` js
  //返回某节点的父节点，如果指定的节点没有父节点则返回null 
  element.parentNode
  ```

- 获取当前元素的子节点

  ``` js
  //返回元素的子元素的集合，只返回元素节点
  element.children
  
  //返回包含被选节点的子节点的NodeList，包括文本节点、注释节点
  element.childNodes
  
  //返回文档的第一个子节点（文本节点、元素节点都包含）
  element.firstChild
  
  //返回文档的最后一个子节点
  element.lastChild
  ```

- 获取当前元素的同级元素

  ``` js
  //返回当前元素之后紧跟的节点（处于同一树层级），没有就返回null 
  element.nextSibling
  
  //返回当前元素之前紧跟的节点（处于同一树层级），没有就返回null 
  element.previousSibling
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

## DOM事件

## BOM常见对象