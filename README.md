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
npm i @babel/core @babel/preset-env @babel/polyfill babel-loader ts-loader --save-dev


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
},
"babel": {
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": []
}
  

// webpack.dev.config.js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './release'),
    filename: 'bundle.js'
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
#### 配置 typescript 环境
npm i  typescript  ts-loader  @babel/plugin-proposal-class-properties  --save-dev

```javascript
// package.json
{
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"
  },
  "devDependencies": {
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/polyfill": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "babel-loader": "^8.0.6",
    "html-webpack-plugin": "^3.2.0",
    "ts-loader": "^6.0.2",
    "typescript": "^3.5.1",
    "webpack": "^4.33.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.5.1"
  },
  "babel": {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ]
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": false,  // 在表达式和声明上有隐含的 any类型时报错
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "files": [
    "src/index.ts"
  ],
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}

// webpack.dev.config.js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + 'release',
    filename: 'bundle.js'
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
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  }
}
```

#### 概念
类，即模板，通过模板实例化很多对象，和es5的构造函数原理相同,里面放属性和方法
对象（实例），通过类可以赋值给很多对象
```JavaScript
// src/index.js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  speak() {
    alert(`He is ${this.name}, ${this.age} years old.`)
  }
}

let Lee = new Person('Lee', 23)
Lee.speak()
```
####  三要素
继承、封装、多态

继承，子类继承父类。继承可将公共方法抽离出来，提高复用，减少冗余，这是软件设计最基础和最高效的方式
```JavaScript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  speak() {
    alert(`He is ${this.name}, ${this.age} years old.`)
  }
}

class Student extends Person {
  constructor(name, age, num) {
    super(name, age)
    this.num = num
  }
  study() {
    alert(`${this.name} study number is ${this.num}`)
  }
}

let Lee = new Student('Lee', 19, 3)
Lee.speak()
Lee.study()
```
封装，数据的权限和保密。简单来说，将对象里面的某些属性和方法不想让别人看见，有一些是可以开放出去。减少耦合，不该外露的不外露、利于数据、接口的权限管理。

typescript是js的超集具有明显的特征，如public、private、protexted关键字。
public 完全开放，默认关键字
protectted 受保护的，自己和子类使用
private 私有的，不对外开放
```JavaScript
// src/index.ts
class People {
  name 
  age
  protected weight
  constructor(name,age) {
    this.name = name
    this.age = age
    this.weight = 120
  }
  speak() {
    alert(`He is ${this.name}, ${this.age} years old`)
  }
}

class Students extends People {
  num
  private girl
  constructor(name, age, num) {
    super(name, age)
    this.num = num
    this.girl = 'Lucy'
  }

  study() {
    alert(`${this.name} study number is ${this.num}`)
  }
  getWeight() {
    alert(`weight is ${this.weight}`)
  }

}

let Long = new Students('Long', 21, 3)
Long.speak()
// console.log(Long.girl)
```

多态，同一接口的不同实现。简单来讲就是父类定义一个接口，子类实现不同的功能。保持子类的开放性和灵活性、面向接口编程(不用管子类如何实现，就看父类有多少接口)

#### 为什么使用面向对象
1、程序的执行离不开顺序、判断、循环操作，也就是将其结构化
2、面向对象就是将零散的数据结构化
3、对于计算机而言，结构化的才是最简单的
4、编程应该是 简单&抽象，简单的前提是抽象，抽象后才简单


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