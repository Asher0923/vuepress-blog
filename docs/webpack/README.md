---
title: 'webpack'
---

## 作用

> 模块打包器，按照文件间的依赖关系对其进行静态分析，按照指定规则打包成静态资源
> 1、多个文件打包成一个文件，减少服务器压力和带宽
> 2、预编译语言转换成浏览器可识别语言
> 3、性能优化

## 概念

- 工作步骤

  - 从入口文件开始递归地建立一个依赖关系图。
  - 把所有文件都转化成模块函数。
  - 根据依赖关系，按照配置文件把模块函数分组打包成若干个 bundle。
  - 通过 script 标签把打包的 bundle 注入到 `html` 中，通过 manifest 文件来管理 bundle 文件的运行和加载。

- runtime

  - runtime 以及伴随的 manifest 数据，主要指：在浏览器运行时，`webpack` 用来连接模块化应用程序的所有代码；runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑；包括浏览器中的已加载模块的链接，以及懒加载模块的执行逻辑；

- manifest

  - 当编译器（compiler）开始执行。解析和映射应用程序时，他会保留所有模块的详细要点，这个数据集合成为`manifest`，当完成打包并发送到浏览器时，会在运行时通过 manifest 来解析和加载模块，无论你选择哪种模块语法，那些 import 或者 require 语句现在都已经转换为 `webpack_require` 方法，这个方法指向模块标识符（module identifier）。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块；

## 入口 && 出口

- 作用

  > entry：告诉`webpack`从哪个文件开始构建，这个文件作为`webpack`依赖关系图的起点
  > output：告诉 `webpack` 在哪里输出 构建后的包、包的名称 等

- 配置单入口
  ``` js
    let path = require('path');
    //单出口
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      }
    }
  ```
- 配置多入口

  ``` js
    let path = require('path');
    //多出口
    module.exports = {
      entry:{
        app: './src/app.js',
        vendors: './src/vendors.js'
      },
      output:{
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
      }
    }
    //单出口
    module.exports = {
      entry: ['./src/app.js', './src/vendors.js'],
      output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,  'dist')
      }
    }
  ```

- `publicPath`
  
  - 生产环境是在静态文件路径前面添加 `publicPath` 的值。比如图片引入的是相对路径，可以配置 `publicPath` 成为正确的路径。它是指定资源文件引用的目录(相对于服务器的根目录来讲)。
  - 开发环境是将打包的文件放到 `publicPath` 指定的目录下面，若没有配置，则放到根目录下。(打包到的地方是计算机的内存，在硬盘中看不到，无法感知)
  - 在使用 `html-webpack-plugin` 生成 `index.html` 时，`publicPath` 是可以不用配置的，因为生产环境下，`index.html` 会和其他静态资源打包到同一个文件下，开发环境默认打包到根目录下。
    
    > 参考资料: https://www.cnblogs.com/SamWeb/p/8353367.html
  ``` js
    ...
    output:{
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/'
    }
  ```

## loader

- 作用

  > `webpack` 只能理解 `js`和 `json`文件,`loader`让`webpack`能够处理其他类型 文件，可以将所有类型的文件转换为`webpack`能够处理的有效模块

- 使用方式

  ``` js
    npm install --save-dev style-loader css-loader url-loader
  ```
  
``` js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader','css-loader'] //从右至左执行
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    }
```

- 常用 loader
  - style-loader // 将 css 代码通过`<style>`标签插入 html 文档中
  - css-loader //解析 css 源文件并获取其引用的资源
  - postcss-loader
  - babel-loader // js 代码进行兼容性编译，.babelrc 文件中配置
  - file-loader // url-loader 可以将图片转为 base64 字符串，能更快的加载图片，一旦图片过大，就需要使用 file-loader 的加载本地图片，故 url-loader 可以设置图片超过多少字节时，使用 file-loader 加载图片
  - url-loader

## babel

> JavaScript 语法编译器，babel 执行编译的过程中，会从项目根目录下的.babelrc 文件中读取配置，.babelrc 文件中，主要对预设(presets)和插件(plugins)进行设置
> 参考：https://www.cnblogs.com/tugenhua0707/p/9452471.html

``` js
  {
    "sourceMaps": true,
    "presets": ["env"],
    "plugins": []
  }
```

## plugin

- 作用
  
  > 可以处理各种任务，从打包优化和压缩，一直到重新定义环境中的变量
  
- 剖析

  > 具有`apply`方法的`js`对象，apply方法会被`webpack compiler`调用，并且`compiler`对象可在整个编译生命周期访问。

- 使用

``` js
  npm install html-webpack-plugin --save-dev
```

``` js
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports = {
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
  }
```

- 常用插件 ( https://www.jianshu.com/p/3d9bc817f1db )
  1. `ExtractTextWebpackPlugin`
  
     > 它会将所有的入口 chunk(entry chunks)中引用的 `*.css`，移动到独立分离的 `CSS` 文件。因此，你的样式将不再内嵌到 `JS` bundle 中，而是会放到一个单独的 `CSS` 文件（即 `styles.css`）当中。 如果你的样式文件大小较大，这会做更快提前加载，因为 `CSS` bundle 会跟 `JS` bundle 并行加载。
  
     ```
     //webpack4以上的版本安装时注意版本 npm install extract-text-webpack-plugin@next --save-dev
     new ExtractTextPlugin("styles.css")
     ```
  
  2. `MiniCssExtractPlugin`
  
     > 为每个包含`css`的`js`文件创键一个`css`文件
  
     ```
     new MiniCssExtractPlugin({
           filename: "[name].css",
           chunkFilename: "[id].css"
         })
      //如果当前项目是webpack3.x版本，使用extract-text-webpack-plugin
      //如果当前项目是webpack4.x版本且是新项目，使用mini-css-extract-plugin
     ```
  
  3. `HtmlWebpackPlugin`
  
     > 重构入口 `html`
  
     ```
       new HtmlWebpackPlugin({
         template: './src/index.html'
       })
     ```
  
  4. `optimization.splitChunks`
  
     > 替代`CommonsChunkPlugin`插件提取第三方插件和公共代码
  
     ``` js
     optimization: {
         splitChunks: {
           cacheGroups: {
             // 首先: 打包node_modules中的文件
             vendor: {
               name: "vendor",
               test: /[\\/]node_modules[\\/]/,
               chunks: "all",
               priority: 10  //优先级
             },
             // 其次: 打包业务中公共代码
             common: {
               name: "common",
               chunks: "all",
               minSize: 1,
               priority: 0  //优先级
             }
           }
         }
     ```
  
     
  
  5. `DllPlugin`和`DllReferencePlugin`
  
     > 减少构建时间，进行分离打包（用某种方法实现了拆分 bundles）
     >
     > `DllPlugin`是在一个额外的独立的 `webpack` 设置中创建一个只有`dll`的bundle，会生成一个名为`manifest.json`的文件，这个文件是用来让`DllReferencePlugin`映射到相关的依赖上去的
     >
     > `DllReferencePlugin`是在 `webpack` 主配置文件中设置的，这个插件把只有`dll`的`bundle`引用到需要的预编译的依赖
  
     ``` js
     //webpack.vendor.config.js
     new webpack.DllPlugin({
       context: __dirname,
       name: '[name]_[hash]',
       path: path.join(__dirname, 'manifest.json'),
     })
     //主配置文件中
     new webpack.DllReferencePlugin({
       context: __dirname,
       manifest: require('./manifest.json'),
       name: './my-dll.js',
       scope: 'xyz',
       sourceType: 'commonjs2'
     });
     ```
  
     
  
  6. `HappyPack`
  
     > 多线程打包(不支持`vue`)
  
     ``` js
       module: {
         rules: [
           {
             test: /\.js$/,
             exclude: /node_modules/,
             include: path.resolve("src"),
             use: 'happy/loader?id=js'   //此处将之前配置的babel的一些预设什么的替换为happy/loader，并使用 id 指定创建的 HappyPack 插件
           }
         ]
       },
       plugins: [
         new HappyPack({
           id: 'js', //id 标识符，要和 rules 中指定的 id 对应起来
           use: [{     // 将js的具体规则放置在此处
             loader: 'babel-loader',
             options: {
               presets: [
                 '@babel/preset-env',
                 '@babel/preset-react'
               ]
             }
           }]
         })
       ]
     ```
  
     
  
  7. `CleanWebpackPlugin`
  
     > 删除之前打包的目录
  
     ``` js
     new CleanWebpackPlugin()
     ```
  
     

## mode

- 作用
  
  > 告诉`webpack`使用相应模式的内置优化
- 使用

``` js
    module.exports = {
      mode: 'production'
    }
```

- 两种模式区别
  选项|描述
  ---|:---:
  development|会将 `process.env.NODE_ENV` 的值设为 development。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`
  production|会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 production。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `TerserPlugin`。
  node|退出任何默认优化选项

## devserver

``` js
npm i -D webapck-dev-server
// package.json 中添加"dev : webpack-dev-server"
devServer{
	host: 'wz.cnsuning.com'
	port: 8888
}
```

- `contentBase`

> 该配置项指定了服务器资源的根目录，如果不配置 `contentBase` 的话，那么 `contentBase` 默认是当前执行的目录,一般是项目的根目录。（通常不配置）

- port

  > 指定开启服务器的端口号

- host

  > 配置 `devServer` 的服务器的监听地址，默认值为 127.0.0.1，可以在本地 host 文件中替换展示的域名

- hot

  > 模块热替换功能，不刷新整个页面实现实时刷新

- open

  > 第一次构建完之后自动打开网页

- proxy

  > 实现跨域

  ``` js
    proxy: {
      '/api': {
        target: 'http://news.baidu.com', // 目标接口的域名
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api' : ''  // 重写路径
        }
      }
    }
  ```


## postcss

> `postcss`本身只有解析能力，其他属性依赖于插件

- 常用插件
- `postcss-import(atImport)` 模块合并
- `autoprefixier` 自动添加前缀
- `cssnano` 压缩代码
- `cssnext` 使用新的 `css` 特性
- `precss` 变量、`mixin`、循环（类似预处理器 sass）

``` js
  {
  test: /\.styl/,
    use: ['style-loader',
    'css-loader',
    {
    loader:'postcss-loader',
    options:{
    sourceMap:true,
    }
    },
    'stylus-loader'
    ]
  }

```

## resolve

- alias
  
  > 配置项通过别名来把原导入路径映射成一个新的导入路径

``` js
  resolve:{
    alias:{
      '@components': './src/components/'
    }
  }
```

- extensions
  
  > 在导入语句没带文件后缀时，`webpack`会自动带上后缀后去尝试访问文件是否存在。

``` js
  extensions: ['.js', '.json']
```

## devtool

``` js
  devtool: 'eval',
```

## devDependencies 与 dependencies

> `webpack`打包时只看`node_modules`中是否有依赖，和这两个没有直接关系，只在特定环境下这两个目录才有区别，比如node端打包 `npm install --productio`n就只会打`dependencies`下面的依赖

## 构建过程

> https://segmentfault.com/a/1190000015088834

1. 读取与合并配置参数，加载`Plugin`，实例化Compiler
2. 从Entry发出，调用配置的Loader对模块进行编译，再找到该模块依赖的模块，递归编译
3. 对编译后的Module组合成Chunk，把Chunk转换成文件，输出到文件系统

## import()

> 动态加载模块，调用import()之处，作为分离的模块起点，意思是被请求的模块和它引用的所有子模块，会分离到一个单独的chunk中