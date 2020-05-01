## 什么是Konva？

Konva是一个基于Canvas的JavaScript框架，可实现web应用和移动端应用中的图形交互效果

Konva可以高效的实现动画，过渡，节点嵌套，局部操作，过滤，缓存，事件处理等 

可以在stage上绘图，然后对它们进行事件监听，移动或缩放，独立旋转以及高效的动画，即使应用中含有数千个图形也是可以轻松实现

## 安装Konva

```
npm install konva
```

```
<script src="https://unpkg.com/konva@4.0.0/konva.min.js"></script>
```

## 如何工作？

所有的图形都始于Konva.Stage，Konva.Stage中又包含多个Konva.Layer

每个layer都有两个canvas渲染器：前台渲染器和后台渲染器。前台渲染器是可以看得见的部分，后台渲染器是一个隐藏的canvas，为了提高效率实现事件监听的工作

每个layer可以包含形状( Shape ), 形状的组( Group )或其他组，stage, layers, groups, 和shapes都是虚拟节点，类似HTML页面中的DOM节点

![01]()

可以对所有节点进行样式设置和转换，尽管Konva具有可用的预建形状，例如矩形、圆形、图片、子图形(sprites)、文本、线、多边形、正多边形、路径和星星等，但是开发者依旧可以通过实例化Shape类来创建绘制函数来创建自定义图形

只要拥有了Stage，并且上面设置了Layer和Shape，那么就可以为他添加事件监听、变换节点等等

```
import Konva from 'konva'

// 创建stage
const stage = new Konva.Stage({
  container: "container",
  width: window.innerWidth,
  height: window.innerHeight
})
// 创建layer
const layer = new Konva.Layer()
// 创建形状
const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70, // 圆形的半径
  fill: 'green', // 填充颜色
  stroke: 'black', // 描边颜色
  strokeWidth: 3, // 描边宽度 
})
// 将形状添加到layer
layer.add(circle)
// 将layer添加到stage
stage.add(layer)

layer.draw();
```

![02]()

## 基本形状

Konva.js支持以下形状：矩形( Rect ), 圆形( Circle ), 椭圆( Rllipse ), 线段( Line ), 图像( Image ), 文本( Text ), 文本路径( TextPath ), 星星( Start ), 标签( Label ), SVG 路径( SVG Path ), 正多边形( RegularPolygon ). 同时也可以自定义形状.

自定义形状需使用Shape构造函数创建，需提供自定义的绘图方法 sceneFunc

```
import Konva from 'konva'

// 创建stage
const stage = new Konva.Stage({
  container: "container",
  width: window.innerWidth,
  height: window.innerHeight
})
// 创建layer
const layer = new Konva.Layer()
// 创建形状
const triangle = new Konva.Shape({
  sceneFunc: function(ctx){
    ctx.moveTo(window.innerWidth / 2, window.innerWidth /4)
    ctx.lineTo(window.innerWidth / 2 - window.innerHeight / (2 * 1.732), window.innerHeight * 3 / 4)
    ctx.lineTo(window.innerWidth / 2 + window.innerHeight / (2 * 1.732), window.innerHeight * 3 /4)
    ctx.closePath
    // Konva的独有方法
    ctx.fillStrokeShape(this)
  },
  fill: 'green',
  stroke:'black' 
})

layer.add(triangle)

// 将layer添加到stage
stage.add(layer)

layer.draw();
```

![03]()

## 样式

- fill：单色、渐变或图像

- stroke：(color, width)

- shadow：(color,offset,opacity,blur)

- opacity

  ```
  const pentagon = new Konva.RegularPolygon({
      x: stage.width() / 2,
      y: stage.height() / 2,
      sides: 5,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      shadowOffsetX : 20,
      shadowOffsetY : 25,
      shadowBlur : 40,
      opacity : 0.5
  });
  ```

![04]()

## 事件

使用Konva可以轻松实现监听用户添加的事件，例如 click, dblclick, mouseover, tap, dbltap, touchstart 等. 

属性值变化事件. 例如 scaleXChange, fillChange 等. 以及拖拽事件. 例如 dragstart, dragmove, dragend.

```
circle.on('mouseout touchend', function() {
    console.log('user input');
});

circle.on('xChange', function() {
    console.log('position change');
});

circle.on('dragend', function() {
    console.log('drag stopped');
});

// 创建后设置属性
circle.draggable( true );
// 也可以在创建的时候设置属性
//draggabled: true
// 解除绑定事件
 rect.off('click'); 
 // 触发事件
 rect.fire('click');
```

