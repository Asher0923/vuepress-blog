---
title: 'webpack入门'
---

## 作用

> 模块打包器，按照文件间的依赖关系对其进行静态分析，按照指定规则打包成静态资源
> 1、多个文件打包成一个文件，减少服务器压力和带宽
> 2、预编译语言转换成浏览器可识别语言
> 3、性能优化

## 安装

```js
  // 局部安装  推荐
  npm install webpack webpack-cli -D 
  // 全局安装 不推荐 不同项目版本号可能不同
  npm install webpack webpack-cli -g
```

## 启动

```js
1.npx webpack // 使用npx可以在命令行直接执行本地已安装的依赖，不用在scripts脚本写入命令
2.npm run dev // 需要package.json文件配置scripts脚本命令"dev":"webpack"，默认去找webpack.config.js，若配置文件是其他名称，可配置为"dev":""webpack --config ./webpack.xx.js""
```

## 工作步骤

- 从入口文件开始递归地建立一个依赖关系图
- 把所有文件都转化成模块函数
- 根据依赖关系，按照配置文件把模块函数分组打包成若干个 bundle
- 通过 script 标签把打包的 bundle 注入到 `html` 中，通过 manifest 文件来管理 bundle 文件的运行和加载

## entry 

> 告诉`webpack`从哪个文件开始构建，这个文件作为`webpack`依赖关系图的起点

- 单入口

  ```js
    module.exports = {
      entry: './src/index.js',
    }
  ```

- 多入口

  ```js
    module.exports = {
      entry:{
        app: './src/app.js',
        vendors: './src/vendors.js'
      },
    }
  ```

##  output

> output：告诉 `webpack` 在哪里输出构建后的包、包的名称等

- 单出口
  ``` js
    const path = require('path');
    //单出口
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      }
    }
  ```
  
- 多出口

  ``` js
    const path = require('path');
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
  ```
  

## mode

> 告诉`webpack`使用相应模式的内置优化，可选值为'production'、'development'、'none'

|    选项     | 描述                                                         |
| :---------: | :----------------------------------------------------------- |
| development | 会将 `process.env.NODE_ENV` 的值设为 development。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin` |
| production  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 production。启用 `FlagDependencyUsagePlugin`,  `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `TerserPlugin`。 |
|    node     | 不开启任何默认plugin                                         |

## loader

> 模块转换器，`webpack` 只能理解 `js`和 `json`文件，`loader`可以将所有类型的文件转换为`webpack`能够处理的有效模块

- 使用方式

  ``` js
    npm install --save-dev style-loader css-loader url-loader
  ```
  
  ```js
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
              limit: 1024*8 // 8kb
            }
          }
        ]
      }
    }
  ```
- 常用 loader
  - style-loader ：将 css 代码通过`<style>`标签插入 html 文档中
  - css-loader ：解析 css 源文件并获取其引用的资源
  - babel-loader ： js 代码进行兼容性编译，.babelrc 文件中配置
  - url-loader：依赖于file-loader，所以使用url-loader，必须安装file-loader，将较小的图片打包成base64字符串存放在打包后的js中，不需要再单独发送http请求加载图片，可以设置图片超过多少字节时使用file-loader
  - file-loader ：图片较大的时候需要使用 file-loader 加载本地图片
  - less-loader ：less与webpack之间沟通的桥梁，对于less语法的处理由less依赖处理
  - sass-loader
  - postcss-loader

## plugin

> 可以处理各种任务，从打包优化和压缩，一直到重新定义环境中的变量，具有`apply`方法的`js`对象，apply方法会被`webpack compiler`调用，并且`compiler`对象可在整个编译生命周期访问

- 常用插件
  1. `ExtractTextWebpackPlugin`：webpack3.x版本适用
  
     它会将所有的入口 chunk(entry chunks)中引用的 `*.css`，移动到独立分离的 `CSS` 文件。因此，你的样式将不再内嵌到 `JS` bundle 中，而是会放到一个单独的 `CSS` 文件（即 `styles.css`）当中。 如果你的样式文件大小较大，这会做更快提前加载，因为 `CSS` bundle 会跟 `JS` bundle 并行加载
  
     ```js
     //webpack4以上的版本安装时注意版本 npm install extract-text-webpack-plugin@next --save-dev
     new ExtractTextPlugin("styles.css")
     ```
  
  2. `MiniCssExtractPlugin`：为每个包含`css`的`js`文件创键一个`css`文件，webpack版本4.x适用
  
     ```js
     npm install mini-css-extract-plugin -D // 安装
     
     const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 引入
     //使用  loader中style-loader需改为MiniCssExtractPlugin.loader
       module: {
         rules: [
           {
             test: /\.css$/,
             use: [MiniCssExtractPlugin.loader, "css-loader"],
           }
         ],
       },
       plugins: [
         new MiniCssExtractPlugin({
           filename: "[name]-[contenthash:6].css", // 打包后输出的文件名
           chunkFilename: "[id]-[contenthash:6].css", // 未在entry中却又需要被打包出来的文件的名称
         })
       ]
     ```
  
  3. `HtmlWebpackPlugin`：以template对应的文件作为模板重构入口 `html`
  
     ```js
     npm install html-webpack-plugin-D // 安装
     
     const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入
     // 使用
     new HtmlWebpackPlugin({
         template: './src/index.html'
       })
     ```
  
  4. `CleanWebpackPlugin`：每次打包前删除之前打包的目录文件
  
     ``` js
     npm install clean-webpack-plugin-D // 安装
     
     const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入
     
     new CleanWebpackPlugin() // 使用
     ```
     
  5. `optimization.splitChunks`：替代`CommonsChunkPlugin`插件提取第三方插件和公共代码
  
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
  
  6. `DllPlugin`和`DllReferencePlugin`：减少构建时间，进行分离打包（用某种方法实现了拆分 bundles）
  
     `DllPlugin`是在一个额外的独立的 `webpack` 设置中创建一个只有`dll`的bundle，会生成一个名为`manifest.json`的文件，这个文件是用来让`DllReferencePlugin`映射到相关的依赖上去的
  
     `DllReferencePlugin`是在 `webpack` 主配置文件中设置的，这个插件把只有`dll`的`bundle`引用到需要的预编译的依赖
  
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
  
  7. `HappyPack`
  
     多线程打包(不支持`vue`)
  
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
  
  8. `UglifyJsPlugin`：压缩js
  
     ```js
     const uglifyjs = require('uglifyjs-webpack-plugin');
     
     new uglifyjs(), //压缩js
     ```
  

## devserver

``` js
npm i -D webapck-dev-server
// package.json 中添加"dev : webpack-dev-server"
devServer{
	host: 'blog.zasher.com'
	port: 8888
}
```

- `contentBase`

  该配置项指定了服务器资源的根目录，如果不配置 `contentBase` 的话，那么 `contentBase` 默认是当前执行的目录，一般是项目的根目录。（通常不配置）

- port

  指定开启服务器的端口号

- host

  配置 `devServer` 的服务器的监听地址，默认值为 127.0.0.1，可以在本地 host 文件中替换展示的域名

- hot

  模块热替换功能，不刷新整个页面实现实时刷新

- open

  第一次构建完之后自动打开网页

- proxy

  实现跨域

  ```js
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

## resolve

- alias
  
  配置项通过别名来把原导入路径映射成一个新的导入路径
  
  ```js
    resolve:{
      alias:{
        '@components': './src/components/'
      }
    }
  ```

- extensions
  
  在导入语句没带文件后缀时，`webpack`会自动带上后缀后去尝试访问文件是否存在。
  
  ```js
    extensions: ['.js', '.json']
  ```

## devtool

> 控制是否生成及如何生成source map

- eval：将每一个module执行eval，执行后不生成sourcemap文件，仅仅在每个模块后，增加sourceURL来关联模块处理前后对应的关系
- Source-map：为每一个打包后的模块生成独立的sourcemap文件

## hash

> 为了最大程度的利用浏览器缓存，通常会给output的filename上添加hash值，webpack中有hash、chunkhash和contenthash

- hash：跟整个项目的构建有关，只要项目里有文件修改，整个项目的hash值都会更改，并且全部文件都共用相同的hash值
- chunkhash：多个入口文件时，会生成不同的bundle文件，如果只修改了其中一个文件，hash值改变，会导致其他bundle也要重新生成，chunkhash则会根据不同的入口文件进行依赖分析，构建对应的bundle，生成对应的chunkhash
- contenthash：如果js文件中引入了css文件，这时候如果改变了js内容，打包后css文件的hash值也会跟着改变，这对于css文件来说是一种浪费，contenthash则是根据资源内容创建出唯一hash，也就是说文件内容不变，hash就不会变

```js
  let path = require('path');
  //多出口
  module.exports = {
    entry:{
      app: './src/app.js',
      vendors: './src/vendors.js'
    },
    output:{
      filename: '[name]-[hash:6].js',
      path: path.resolve(__dirname, 'dist')
    }
  }
```

