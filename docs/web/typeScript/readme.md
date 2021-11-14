---
title: "Web基础-TypeScript"
---

## 强类型与弱类型

从类型安全角度来说，变成语言分为强类型和弱类型，强类型语言实参类型与形参类型完全一致，且有更强的类型约束，而弱类型几乎没有什么约束，强类型语言中不允许任意的隐式类型转换，而弱类型则允许任意的隐式类型转换，从语法层面就限制了数据类型，而不是在运行时通过逻辑来限制，**注意 TS 是弱类型语言**

## 静态类型与动态类型

从类型检查角度来说，编程语言分为静态类型和动态类型，静态类型是变量声明时，它的类型就是明确的，声明过后，类型不再允许修改；动态类型则是在运行阶段才能明确变量类型，而且数据类型也可以随意改变

## 安装执行

```bash
npm install typescript -g
# 第一种方式 ts-node
npm install -g ts-node  # 安装
ts-node hello.ts        # 生成js并执行
# 第二种方式 tsc
tsc hello.ts -w         #生成js
# 项目中通常是配置tsconfig.json文件，再去执行tsc，可以编辑所有的文件无需指定文件
```

## 类型

| 类型           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| number         | 任意数字                                                     |
| string         | 任意字符串                                                   |
| boolean        | 布尔值 true 或 false                                         |
| void           | 空值，可以用来表示没有任何返回值的函数                       |
| undefined/null | 是所有类型的子类型，也就是说 undefined 类型的变量可以赋值给 number 类型的变量 |
| any            | 任意类型                                                     |
| unknown        | 类型安全的 any                                               |
| 字面量         | 限制变量的值就是该字面量的值                                 |
| never          | 不能是任何值                                                 |
| object         | 通常不直接使用 object，而是使用{属性名：属性值}方式；<br />属性固定： let obj: { name: string; age?: number }; <br />属性不固定：let obj: { name: string; [propName: string]: any }; |
| Function       | 通常不直接使用 Function，使用 let fn: (a: number, b: number) **=>** number; |
| Array          | 类型:[] let arr: number[]<br />Array<类型>                   |
| 元祖           | 固定长度的数组 let strs: [string, string];                   |
| 枚举 enum      | 值在一定范围内；enum Types { type1 = "one", type2 = "two" }，默认从 0 开始赋值 |

## 类型注解

为变量添加类型约束的方式

```typescript
let age: number = 18;
```

## 类型推断

如果变量的声明和赋值是同时进行的，TS 可以自动对变量进行类型检测

```typescript
let c = false; // c为boolean类型
```

## 类型断言

告诉解析器变量的实际类型

- 变量 as 类型 ：res as number
- <类型>变量： 注意 jsx 中不能使用

## 类型别名

type ：用来给一个类型起一个新的名字，通常用于联合类型

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

// 类型较多时用别名替代
type S = 1 | 2 | 3;
let s: S = 3;
```

## 配置文件

```bash
tsc --init  #自动生成tsconfig.json
```

- include：用来指定哪些 ts 文件需要被编译
- exclude：不需要被编译的文件目录，默认值：["node_modules","bower_components","jspm_packages"]
- extends：定义被继承的配置文件
- files：指定被编译文件的列表，只有需要编辑的文件较少时才会使用
- compilerOptions：编译器的选项
  - target：指定 ts 被编译成 ES 的哪个版本
  - module：指定使用哪一种模块化规范
  - lib：指定要包含在编译中的库文件。如果未设置，则默认为： `target` 为 `es5` 时: `["dom", "es5", "scripthost"]` `target` 为 `es6` 时: `["dom", "es6", "dom.iterable", "scripthost"]`
  - outDir：指定编译后文件所在的目录
  - outFile：将代码合并为一个文件
  - allowJs：是否对 js 文件进行编译，默认为 false
  - checkJs：检查 js 代码是否符合语法规则，默认为 false
  - removeComments：是否移除注释
  - noEmit：不生成编译后的文件，默认为 false
  - noEmitOnError：报错的情况下不生成编译后的文件，默认为 false
  - alwaysStrict：设置编译后的文件是否使用严格模式，默认为 false
  - noImplicitAny：不允许隐式的 any 类型，默认为 false
  - noImplicitThis：不允许不明确类型的 this，默认为 false
  - strictNullChecks：严格的空值检查，默认为 false
  - strict：所有严格检查的总开关

## Class

- public：修饰的属性可以在任意位置访问
- private：私有属性，只能在类内部进行访问
- protected：受保护的属性，只能在当前类和子类中访问
- static：静态属性，直接通过类访问
- readonly：只读属性，无法修改
- abstract 抽象类：不能用来实例化，专门用来被继承

## Interface

定义一个类结构，用来定义一个类中应该包含哪些属性和方法，同时接口也可以当成类型声明去使用

```typescript
interface MyInterface {
  name: string;
  age: number;
}
// 接口可以重复定义
```

implements：用类实现一个接口

```typescript
class MyClass implements MyInterface {
  name: string;
  age: number;
}
```

## 泛型

在定义函数或类时，如果遇到类型不明确时就可以使用泛型

```typescript
function fn<T>(params: T): T {
  return params;
}

fn(10); // 不指定泛型，ts可以自动对类型进行推断
fn<string>("10"); // 指定泛型
```

```typescript
function fn2<T, K>(a: T, b: K): T {
  console.log(b);
  return a;
}

fn2(123, "123");
```
