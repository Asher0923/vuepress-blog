## 自定义loader

- 一个有返回值的函数，不能是箭头函数，loader的很多内置API都是挂载在this上

- webpack配置中通过options参数传递，loader函数中用内置API接收

- 内置API

  - loaderUtils.getOptions：接收options传入的参数

    ```js
    // my-loader.js
    const loaderUtils = require("loader-utils");
    module.exports = function (source) {
      const options = loaderUtils.getOptions(this);
      console.log(options, "params");
      return source.replace("webpack", "tttt");
    };
    
    // webpack.config.js
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: path.resolve(__dirname, "loader/replace-loader.js"),
              options: {
                name: "asher",
              },
            },
          },
        ],
      }
    ```

  - this.callback：一个可以同步或者异步调用的可以返回多个结果的函数，如果这个函数被调用的话，则不需要再return

    ```js
    this.callback(
      err: Error | null, // 必须是 Error 或者 null
      content: string | Buffer, // 是一个 string 或者 Buffer
      sourceMap?: SourceMap, // 必须是一个可以被这个模块解析的 source map
      meta?: any // 会被 webpack 忽略，可以是任何东西
    );
    ```

    ```js
    module.exports = function (source) {
      const result = source.replace("webpack", "tttt");
      this.callback(null, result);
    };
    ```

  - this.async：告诉 [loader-runner](https://github.com/webpack/loader-runner) 这个 loader 将会异步地回调。返回 `this.callback`

    ```js
    module.exports = function (source) {
      const callback = this.async();
      setTimeout(() => {
        const result = source.replace("webpack", "tttt");
        callback(null, result);
      }, 2000);
    };
    ```

## resolveLoader

> 自定义loader的配置，用来配置路径

```
module.exports = {
  //...
  resolveLoader: {
    modules: ['node_modules','./loaders']
  },
};
```

## loader执行顺序自定义