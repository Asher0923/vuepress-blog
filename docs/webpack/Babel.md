---
title: 'Babel基础'
---

## 概念

> Babel是一个工具链，主要将ES2015+版本的代码转换为向后兼容的js代码，以便能够运行在当前和旧版本浏览器或其他环境中

- 工作流程
  1. 解析：将代码解析成抽象语法树(AST)，每个js引擎都有自己的AST解析器，而Babel是通过Babylon实现的，在解析过程中有两个阶段：词法分析和语法分析，词法分析阶段把字符串形式的代码转换成令牌流，令牌类似于AST中节点；而语法分析阶段则会把一个令牌流转换成AST的形式，同时这个阶段会把令牌中的信息转换成AST的表述结构
  2. 转换：Babel接受得到的AST并通过babel-traverse对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作
  3. 生成：将经过转换的AST通过babel-generator再转换成js代码，过程就是深度优先遍历整个AST，然后构建可以表示转换后代码的字符串

## 核心库@babel/core

> Babel的核心功能包含在@babel/core模块中，不安装@babel/core，无法使用babel进行编译

## CLI命令行工具@babel/cli

> babel提供的命令行工具，主要是提供babel这个命令，适合安装在项目里

- 安装

  ```
  npm install --save-dev @babel/core @babel/cli
  ```

- 执行

  ```
  // package.json
  "scripts": {
      "compiler": "babel src --out-dir lib --watch"
  }
  ```

## 插件

> Babel构建在插件之上，使用现有的或者自己编写的插件可以组成一个转换通道，babel的插件分为两种：语法插件和转换插件

- 语法插件

  这些插件只允许babel解析(parse)特性类型的语法（不是转换），可以在AST转换时使用，以支持解析新语法

  ```js
  import * as babel from "@babel/core";
  const code = babel.transformFromAstSync(ast, {
      //支持可选链    
      plugins: ["@babel/plugin-proposal-optional-chaining"], 
      babelrc: false
  }).code
  ```

- 转换插件

  转换插件会启用相应的语法插件

- 插件的使用

  如果插件插件发布在npm上，可以直接填写插件的名称

  ```js
  //.babelrc
  {
      "plugins": ["@babel/plugin-transform-arrow-functions"]
  }
  ```

  也可以指定插件的相对/绝对路径

  ```js
  // 箭头函数插件
  {
      "plugins": ["./node_modules/@babel/plugin-transform-arrow-functions"]
  }
  ```

## 预设preset

> 如果每一种js特性都一个个配置plugin会非常麻烦，可以通过使用或创建一个preset就可以使用一组插件

- **@babel/preset-env**

  主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载polyfill，在不进行任何配置的情况下，@babel/preset-env所包含的插件将支持所有最新的js特性，将其转换成ES5代码

  ```js
  //.babelrc
  {
      "presets": ["@babel/preset-env"]
  }
  ```

## Polyfill

> 语法转换只是将高版本的语法转换成低版本的，但是新的内置函数、实例方法无法转换，比如Promise等；这时就需要使用polyfill了，polyfill中文意思是垫片，就是垫平不同浏览器或者不同环境下的差异，让新的内置函数、实例方法等在低版本浏览器中也可以使用

- @babel/polyfill

  @babel/polyfill模块包含core-js和一个自定义的regenerate runtime模块，可以模拟完整的ES2015+环境(不包含第4阶段)，为了实现新的内置函数等功能，需要将polyfill添加到全局范围中

  ```js
  npm install --save @babel/polyfill
  ```

  需要将完整的polyfill在代码之前加载

  ```js
  import '@babel/polyfill';
  
  const isHas = [1,2,3].includes(2);
  const p = new Promise((resolve, reject) => {
      resolve(100);
  });
  ```

  也可以在webpack中进行配置

  ```js
  entry: [
      require.resolve('./polyfills'),
      path.resolve('./index')
  ]
  ```

  ```js
  // polyfill.js
  import '@babel/polyfill';
  ```

- 很多时候，我们未必需要完整的 `@babel/polyfill`，这会导致我们最终构建出的包的体积增大，`@babel/polyfill`的包大小为89K

  `@babel/preset-env` 提供了一个 `useBuiltIns` 参数，设置值为 `usage` 时，就只会包含代码需要的 `polyfill` ，有一点需要注意的是如果配置此参数的值为 `usage` ，必须要同时设置 `corejs`

  ```
  npm install --save core-js@3
  ```

  ```js
  //.babelrc
  const presets = [
    [
      "@babel/env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
  ```

## @babel/plugin-transform-runtime

> 使用 `@babel/plugin-transform-runtime` 插件，所有帮助程序都将引用模块 `@babel/runtime`，这样就可以避免编译后的代码中出现重复的帮助程序，有效减少包体积，另外，`@babel/plugin-transform-runtime` 需要和 `@babel/runtime` 配合使用

- 安装依赖

  ```
  npm install --save-dev @babel/plugin-transform-runtime
  npm install --save @babel/runtime
  ```

- `@babel/plugin-transform-runtime` 除了可以减少编译后代码的体积外，还可以为代码创建一个沙盒环境，如果使用 `@babel/polyfill` 及其提供的内置程序（例如 `Promise` ，`Set` 和 `Map` ），则它们将污染全局范围。虽然这对于应用程序或命令行工具可能是可以的，但是如果你的代码是要发布供他人使用的库，或者无法完全控制代码运行的环境，则将成为一个问题，`@babel/plugin-transform-runtime` 会将这些内置别名作为 `core-js` 的别名，因此可以无缝使用它们，而无需 `polyfill`

  ```js
  //.babelrc
  {
    "presets": [
      ["@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 3
        }
      ]
    ],
      "plugins": [
        [
          "@babel/plugin-transform-runtime"
        ]
      ]
  }
  ```

- 如果我们希望 `@babel/plugin-transform-runtime` 不仅仅处理帮助函数，同时也能加载 `polyfill` 的话，我们需要给 `@babel/plugin-transform-runtime` 增加配置信息

  ```
  npm install @babel/runtime-corejs3 --save
  ```

  ```js
  //.babelrc
  {
    "presets": [
      [
        "@babel/preset-env"
      ]
    ],
    "plugins": [
      ["@babel/plugin-transform-runtime",
        { "corejs": 3 }
      ]
    ]
  }
  ```

## 插件/预设

- 如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 `preset` 的排列顺序依次执行
  1. 插件在 Preset前运行
  2. 插件顺序从前往后排列
  3. Preset 顺序是颠倒的（从后往前）