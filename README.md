## 设计模式
设计模式是解决问题的方案，学习现有的设计模式可以做到经验复用。拥有设计模式词汇，在沟通时就能用更少的词汇来讨论，并且不需要了解底层细节。

### 概述
#### 重要性
论工程师的设计能力
3年工作经验，面试必考设计能力
成为项目负责人，设计能力是必要基础
从写好代码，到做好设计，设计模式是必经之路

之前：操作DOM / 绑定事件 / 发送请求 -->  之后：面向对象 / 设计模式 / 合理性和扩展性

#### 搭建开发环境
初始化npm环境，使用 webpack 和 babel 搭建 ES6 编译环境。安装webpack、webpack-dev-server、babel

```JavaScript
// 初始化，安装依赖
npm init
npm i webpack webpack-cli --save-dev
npm i webpack-dev-server html-webpack-plugin --save-dev
npm i @babel/core @babel/preset-env @babel/polyfill babel-loader --save-dev


// package.json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"
},
"devDependencies": {
  "@babel/core": "^7.4.5",
  "@babel/polyfill": "^7.4.4",
  "@babel/preset-env": "^7.4.5",
  "babel-loader": "^8.0.6",
  "html-webpack-plugin": "^3.2.0",
  "webpack": "^4.33.0",
  "webpack-cli": "^3.3.2",
  "webpack-dev-server": "^3.5.1"
}
  

// .babelrc
{
  "presets": ["@babel/preset-env"],
  "plugins": []
}


// webpack.dev.config.js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './release'), // 根目录
    open: true,  // 自动打开浏览器
    port: 8001
  }
}
```

### 面向对象
####  ES6 Class
基本语法
####  三要素
继承、封装、多态
####  UML类图


### 设计原则
####  何为设计
通过《LINUX/UNIX设计哲学》理解何为设计
####  五大设计原则
####  从设计到模式


### 设计模式
创建型、结构型、行为型，一共23种
####  分优先级讲解
工厂模式、单例模式、装饰器模式、代理模式、观察者模式、状态模式、模版方法模式、职责链模式

####  结合核心技术
####  结合框架运用


### 综合示例
jQuery实现购物车
####  设计方案
####  代码演示
####  设计模式对应