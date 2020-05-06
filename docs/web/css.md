---
title: 'Web基础-CSS'
---

## 权重

| !important        | Infinity |
| ----------------- | -------- |
| 行间样式          | 1000     |
| id                | 100      |
| class\|属性\|伪类 | 10       |
| 标签\|伪元素      | 1        |
| 通配符            | 0        |

## 选择器

- 通配符选择器

- 元素选择器

- 类选择器

- ID选择器

- 属性选择器

  ```
  [att=val]
  [att*=val]  如果元素用att表示的属性的属性值中包含用val指定的字符，则使用该样式
  [att^=val]  以val开头
  [att$=val]  以val结尾
  ```

- 派生选择器

  1. 后代选择器： div span (浏览器遍历父子选择器时自右向左顺序)
  2. 子元素选择器：div > span
  3. 相邻兄弟选择器：h1 + p

- 并列选择器 div.class

- 分组选择器 div, span

- 伪元素选择器

  1. link 表示元素未被点击时的状态
  2. hover 表示鼠标悬停时的状态
  3. active 表示元素被点击时的状态
  4. visited 表示元素被点击后的状态

- 序选择器

  1. `:first-child` 选中同级别中的第一个标签

     ``` html
     <style type="text/css">
     	ul li:first-child{
     		color:red;
     	}
     </style>
     ```

  2. `:last-child` 选中同级别中的最后一个标签
  
  3. `:nth-child(n)` 选中同级别中第n个标签
  
  4. `:nth-last-child(n)` 选中同级别中倒数第n个标签
  
  5. `:only-child` 选中父元素中唯一的元素
  
  6. `:nth-child(odd)` 选中同级别中所有奇数
  
  7. `:nth-child(even)` 选中同级别中所有偶数
  
  8. `:nth-child(xn+y)`：x和y自定义，n从0开始递增
  
  9. `:first-of-type` 选中同级别中同类型的第一个标签
  
     ``` html
     <style type="text/css">
     	p:first-of-type{
     		background:#ff0000;
     	}
     </style>
     ```
  
  10. `:last-of-type` 选中同级别中同类型的最后一个标签
  
  11. `:nth-of-type(n)` 选中同级别中同类型的第n个标签
  
  12. `:nth-last-of-type(n)` 选中同级别中同类型倒数第n个标签
  
  13. `:only-of-type` 选中父元素某一类型的标签
  
  14. `:nth-of-type(odd)`选中同级别中同类型所有奇数
  
  15. `:nth-of-type(even)`选中同级别中同类型所有偶数

## 盒模型

- 标准盒子模型

  width和height指的是content的宽度和高度

  标准盒模型下盒子的大小：content + border + padding + margin

  box-sizing: content-box

- IE盒子模型

  width和height指的是content + border + padding的宽度和高度

  怪异盒模型下盒子的大小： width（content + border + padding） + margin

  box-sizing: border-box

## BFC

> 块级格式化上下文，脱离文档流

```
float： left / right
overflow: hidden / auto / scroll
display: inline-block / flex / table
position: absolute / fiexd
父元素与正常文件流的子元素（非浮动子元素）自动形成一个BFC（垂直方向margin重叠问题）
```

## Flex布局

- 容器默认存在两根轴，水平的主轴(main axis) 垂直的交叉轴(cross axis)。主轴的开始位置叫做main start ，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end

- 容器属性

  1. flex-direction：决定主轴的方向

     ```
     row（默认值）：主轴为水平方向，起点在左端。
     row-reverse：主轴为水平方向，起点在右端。
     column：主轴为垂直方向，起点在上沿。
     column-reverse：主轴为垂直方向，起点在下沿。
     ```

  2. flex-wrap：如果一条轴线排不下，如何换行

     ```
     nowrap（默认）：不换行
     wrap：换行，第一行在上方
     wrap-reverse：换行，第一行在下方
     ```

  3. flex-flow：`flex-direction`属性和`flex-wrap`属性的简写形式，默认值是 `row nowrap`
  
  4. justify-content：项目在主轴上的对齐方式
  
     ```
     flex-start（默认值）：左对齐
     flex-end：右对齐
     center： 居中
     space-between：两端对齐，项目之间的间隔都相等。
     space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
     ```
  
  5. align-items：项目在交叉轴上的对齐方式
  
     ```
     flex-start：交叉轴的起点对齐
     flex-end：交叉轴的终点对齐
     center：交叉轴的中点对齐
     baseline: 项目的第一行文字的基线对齐
     stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度
     ```
  
  6. align-content：定义多根轴线的对齐方式，若项目只有一根轴线，该属性不起作用
  
     ```
     flex-start：与交叉轴的起点对齐
     flex-end：与交叉轴的终点对齐
     center：与交叉轴的中点对齐
     space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
     space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
     stretch（默认值）：轴线占满整个交叉轴
     ```
  
- 项目属性

  1. order：定义项目的排列顺序，数值越小，排列越靠前，默认为0
  2. flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
  3. flex-shrink：定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
  4. flex-basis：定义分配多余空间之前，项目占据的主轴空间，默认为auto，即项目的本来大小
  5. flex：是flex-grow、flex-shrink和flex-basis的简写，默认值是0 1 auto，后两个属性可选，该属性有两个快捷值：auto(1 1 auto) 和none (0 0 auto)
  6. align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性，默认值是auto，表示继承父元素的align-items属性

##  渐变

- 线性渐变

  ```
  background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
  // 从上到下
  #grad {
    background-image: linear-gradient(red, yellow, green);
  }
  // 标准的语法
  #grad {
    background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);
  }
  // 重复的线性渐变
  #grad {
    background-image: repeating-linear-gradient(red, yellow 10%, green 20%);
  }
  ```

- 径向渐变

  ```
  background-image: radial-gradient(shape size at position, start-color, ..., last-color);
  // 颜色结点均匀分布的径向渐变
  #grad {
    background-image: radial-gradient(red, yellow, green);
  }
  // 颜色结点不均匀分布的径向渐变
  #grad {
    background-image: radial-gradient(red 5%, yellow 15%, green 60%);
  }
  // 设置形状,shape 参数定义了形状。它可以是值 circle 或 ellipse。其中，circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse。
  #grad {
    background-image: radial-gradient(circle, red, yellow, green);
  }
  ```

## 动画

- transform 

  1. 2D转换

     ```
     // translate()：根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动
     transform: translate(50px,100px);
     // rotate()：在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转
     transform: rotate(30deg);
     // scale()：该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数
     transform: scale(2,3)
     // skew()：包含两个参数值，分别表示X轴和Y轴倾斜的角度，如果第二个参数为空，则默认为0，参数为负表示向相反方向倾斜
     transform: skew(30deg,20deg)
     // matrix()：matrix 方法有六个参数，包含旋转，缩放，移动（平移）和倾斜功能
     transform:matrix(0.866,0.5,-0.5,0.866,0,0);
     ```

  2. 3D转换

     ```
     // rotateX()：围绕其在一个给定度数X轴旋转的元素
     transform: rotateX(120deg)
     // rotateY()：围绕其在一个给定度数Y轴旋转的元素
     transform: rotateY(130deg)
     ```

-  transition

  >  过渡是元素从一种样式逐渐改变为另一种的效果 要实现这一点，必须规定两项内容：
  >
  > 1. 指定要添加效果的CSS属性
  > 2. 指定效果的持续时间 

  ```
  div {
      transition: width 2s, height 2s, transform 2s;
  }
  div:hover {
      width: 200px;
      height: 200px;
      transform: rotate(180deg);
  }
  ```

-  animation

  >  @keyframes ： 创建动画
  >
  >  animation ： 将动画捆绑到元素，并设置时间 

  ```
  @keyframes myfirst {
      from {background: red;}
      to {background: yellow;}
  }
  // 百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%
  @keyframes myfirst
  {
      0%   {background: red;}
      25%  {background: yellow;}
      50%  {background: blue;}
      100% {background: green;}
  }
  div {
  	animation: myfirst 5s;
  }
  ```

## margin问题

- margin塌陷

  > 以下代码中子元素并没有出现在父元素的左下方，看起来像子元素设置的margin-top无效，但是渐渐增大子元素的margin-top，当子元素的margin-top大于父元素的margin-top值，会带着父元素一起移动，感觉是父元素的上方没有顶，这就是margin塌陷，解决方法是触发父元素的BFC

  ``` html
  <div id="div1">
  	<div id="div2"></div>
  </div>
  <style>
      #div1{
          width: 300px;
          height: 300px;
          background: pink;
          margin-top: 300px;
      }
      #div2{
          width: 150px;
          height: 150px;
          background: rebeccapurple;
          margin-top: 150px;
      }
  </style>
  ```

- margin合并

  > 标准文档流中，两个块级元素，在设置上下排版时发生元素间距取两者margin-top或margin-bottom最大值的现象，两个div之间的距离取的是div2的margin-top的值，这个就是margin合并现象

  ``` html
  <div id="div1"></div>
  <div id="div2"></div>
  <style>
      #div1{
          width: 50px;
          height: 50px;
          background-color: red;
          margin-bottom: 40px;
      }
      #div2{
          width: 50px;
          height: 50px;
          background-color: red;
          margin-top: 60px;
      }
  </style>
  ```

  