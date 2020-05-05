---
title: 'Node基础'
---

## http

``` js
// 1.引入http模块
const http = require('http')
// 2.用http模块创建服务
http.createServer(function(req, res){
    //req 获取URL信息   res 浏览器返回响应信息
    //设置http头部 
    res.writeHead(200,{
        'Content-Type': 'text/html;charset:utf-8'
    })
    res.write('<h1>hello node</h1>')
    res.end()
}).listen(8888)
```
## url

 - parse：通过query获取参数

``` js
console.log(url.parse("http://www.baidu.com/new?name=zhangsan"))
/**
 * Console：
  Url {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'www.baidu.com',
    port: null,
    hostname: 'www.baidu.com',
    hash: null,
    search: '?name=zhangsan',
    query: 'name=zhangsan',
    pathname: '/new',
    path: '/new?name=zhangsan',
    href: 'http://www.baidu.com/new?name=zhangsan' 
  }
 */
```
 - resolve: 追加或替换地址
 ``` js
 console.log(url.resolve("http://www.baidu.com/zs", "张三"))

// Console：
// http://www.baidu.com/张三
 ```
 - format: 逆向 parse，根据地址信息获取原 url 信息
 ``` js
 console.log(url.format({
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?name=zhangsan',
  query: 'name=zhangsan',
  pathname: '/new',
  path: '/new?name=zhangsan',
  href: 'http://www.baidu.com/new?name=zhangsan' 
}))

// Console：
// http://www.baidu.com/new?name=zhangsan
 ```
- 
``` js
// 1.引入url模块
const url = require('url')
// 2.引入http模块
const http = require('http')
// 3.创建服务
http.createServer(function(req, res){
    // 4.获取服务器请求
      /**
        * 访问地址是：http://localhost:8888/?userName=zs&userAge=23
        * 如果你执行 console.log(req.url)，它将执行两次，分别返回下面的信息：
        * /  ?userName=zs&userAge=23
        * /  /favicon.ico --浏览器收藏夹中的显示图标自动发出的请求地址
        * 这里为了防止重复执行，所以排除 req.url == /favicon.ico 的情况
        */
        if(req.url != "/favicon.ico"){
            // 5.url的parse方法
            /**
            * parse 方法需要两个参数：
            * 第一个参数是地址
            * 第二个参数是 true 的话表示把 get 传值转换成对象
            */ 
            let result = url.parse(req.url, true)
                console.log(result);
            /**
            * Url {
            *   protocol: null,
            *   slashes: null,
            *   auth: null,
            *   host: null,
            *   port: null,
            *   hostname: null,
            *   hash: null,
            *   search: '?userName=jsliang&userAge=23',
            *   query: { userName: 'jsliang', userAge: '23' },
            *   pathname: '/',
            *   path: '/?userName=jsliang&userAge=23',
            *   href: '/?userName=jsliang&userAge=23' }
            */
            res.writeHead(200,{
                'Content-Type': 'text/html;charset:utf-8'
            })
            res.write('<h1>hello node</h1>')
            res.end()
        }
}).listen(8888)
```

## path

- path.join() 路径结合、合并，路径最后不会带目录分隔符
- path.resolve() 获取绝对路径
- path.dirname() 返回文件所在路径名
- path.extname()  返回拓展名。按照出现的最后一个点来划分，如果没有.或者路径是以.开头的就返回一个空字符串，如果最后一个刚好是.就返回.

## fs

文件管理

- fs.stat 检测是文件还是目录
- fs.mkdir 创建目录
- fs.writeFile 创建写入文件  (存在即覆盖，不存在即创建)
- fs.appendFile 追加文件
- fs.readFile 读取文件
- fs.readdir 读取目录
- fs.rename 重命名
- fs.rmdir 删除目录
- fs.unlink 删除文件

流

``` js
//新建fs
const fs = require('fs')

//读取流

//流的方式读取文件
let fileReadStream = fs.createReadStream('test.txt')
//读取次数
let count = 0
//保存数据
let str = ''
//开始读取
fileReadStream.on('data',(chunk)=>{
    str += chunk;
    console.log(count,chunk)
})
//读取完成
fileReadStream.on('end',()=>{
    console.log(str);
})
// 读取失败
fileReadStream.on('error', (error) => {
  console.log(error);
})

//写入流

let data = 'console.log("Hello World! 我要存入数据！")';
// 创建一个可以写入的流，写入到文件test.txt中
let writeStream = fs.createWriteStream('test.txt');
// 开始写入
writeStream.write(data, 'utf8');
// 写入完成
writeStream.end();
writeStream.on('finish', () => {
  console.log('写入完成！');
  // Console：写入完成
});

管道流 pipe
```

## 发送请求

- 加载了 http 模块，并创建服务
- 设置跨域的处理方式，允许进行跨域
- 进行请求的判断处理
- 请求的结果返回给客户端
``` js
// 加载 http 模块
var http = require('http');

// 虚拟 SQL 读取出来的数据
var items = [];

// 创建 http 服务
http.createServer(function (req, res) {
  
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // 跨域允许的请求方式
  res.setHeader('Content-Type', 'application/json');

  // 判断请求
  switch (req.method) {
    // post 请求时，浏览器会先发一次 options 请求，如果请求通过，则继续发送正式的 post 请求
    case 'OPTIONS':
      res.statusCode = 200;
      res.end();
      break;
      // 如果是 get 请求，则直接返回 items 数组
    case 'GET':
      let data = JSON.stringify(items);
      res.write(data);
      res.end();
      break;    
    // 如果是 post 请求
    case 'POST':
      let item = '';
      // 读取每次发送的数据
      req.on('data', function (chunk) {
        item += chunk;
      });
      // 数据发送完成
      req.on('end', function () {
        // 存入
        item = JSON.parse(item);
        items.push(item.item);
        // 将数据返回到客户端
        let data = JSON.stringify(items);
        res.write(data);
        res.end();
      });
      break;
  }
}).listen(3000)

console.log('http server is start...');
```

## 连接MySQL

``` js
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '10021158',
  database: 'test'
});

connection.connect();

connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();
```
