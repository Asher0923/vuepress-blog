## 构建过程

1. 初始化参数：从配置文件和shell语句中读取与合并配置参数，得到最终的参数
2. 开始编译：用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的run方法开始执行编译
3. 确定入口：根据配置中的entry找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的Loader对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. 完成模板编译：在经过上一步使用Loader翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含很多个模块的chunk，再把每个chunk转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## 相关概念

- Runtime

  在浏览器运行时，`webpack` 用来连接模块化应用程序的所有代码；runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑；包括浏览器中的已加载模块的链接，以及懒加载模块的执行逻辑

- Manifest

  当编译器（compiler）开始执行。解析和映射应用程序时，他会保留所有模块的详细要点，这个数据集合成为`manifest`，当完成打包并发送到浏览器时，会在运行时通过 manifest 来解析和加载模块，无论你选择哪种模块语法，那些 import 或者 require 语句现在都已经转换为 `webpack_require` 方法，这个方法指向模块标识符（module identifier）。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块

- publicPath

  - 生产环境是在静态文件路径前面添加 `publicPath` 的值。比如图片引入的是相对路径，可以配置 `publicPath` 成为正确的路径。它是指定资源文件引用的目录(相对于服务器的根目录来讲)。

  - 开发环境是将打包的文件放到 `publicPath` 指定的目录下面，若没有配置，则放到根目录下。(打包到的地方是计算机的内存，在硬盘中看不到，无法感知)

  - 在使用 `html-webpack-plugin` 生成 `index.html` 时，`publicPath` 是可以不用配置的，因为生产环境下，`index.html` 会和其他静态资源打包到同一个文件下，开发环境默认打包到根目录下。

    ```js
    output:{
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/'
    }
    ```

## 多页面打包通用方案

1. 将多个页面源文件按照统一规则存放

   ```js
   - src
   	- detail
   		- index.js
   		- index.html
   	- home
   		- index.js
   		- index.html
   	- other
   		- index.js
   		- index.html
   ```

2. 利用第三方插件glob来生成entry及生成htmlWebpackPlugin

   ```js
   npm install glob -D // 安装
   
   const glob = require('glob') // 引入
   
   const entry = {}
   const htmlWebpackPlugins = []
   
   const entryFiles = glob.sync(path.join(__dirname,"./src/*/index.js"))
   
   entryFiles.map(entryFile=>{
   	const match = entryFile.match(/src\/(.*)\/index\.js$/)
   	const pageName = match[1]
     entry[pageName] = entryFile
     
     htmlWebpackPlugins.push(
         new HtmlWebpackPlugin({
         template: path.join(__dirname,`./src/${pageName}/index.html`),
           filename:`${pageName}.html`,
           chunks:[pageName], // 匹配对应的bundle文件
       })
     )
   })
   ```


## 热更新实现原理

1. 在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中
2. webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中
3. webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念
4. 是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换
5. webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了
6. HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码
7. HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用
8. 当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码
