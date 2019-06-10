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
// object-oriented.ts
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
// object-oriented.ts
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
// object-oriented.ts
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
// console.log(Long.weight)  // 使用会报错
// console.log(Long.girl)  // 使用会报错
```

多态，同一接口的不同实现。简单来讲就是父类定义一个接口，子类实现不同的功能。保持子类的开放性和灵活性、面向接口编程(不用管子类如何实现，看父类有多少接口)
```js
// /object-oriented.ts
class People {
  name
  constructor(name) {
    this.name = name
  }
  sayHi() {

  }
}

class A extends People {
  constructor(name) {
    super(name)
  }
  sayHi() {
    alert(`Hi ${this.name}`)
  }

}

class B extends People {
  constructor(name) {
    super(name)
  }
  sayHi() {
    alert(`Hello ${this.name}`)
  }
}

// a、b使用父类People的sayHi()方法，展示不一样的结果，此为多态
let a = new A('a')
a.sayHi()

let b = new B('b')
b.sayHi()
```

#### 应用举例
以jQuery为例
```js
// /jQuery.ts
class jQuery {
  length
  selector
  constructor(selector) {
    let slice = Array.prototype.slice
    let dom = slice.call(document.querySelectorAll(selector))
    let len = dom ? dom.length : 0
    for(let i=0; i<len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append() {

  }
  addClass() {

  }
}

// fix: Property '$' does not exist on type '{}'
(window as any).$ = function(selector) {
  // 工场模式
  return new jQuery(selector)
}

var $p = $('p')
console.log($p)
console.log($p.addClass)


// fix: Cannot redeclare block-scoped variable 'jQuery'
export {}
```
#### 为什么使用面向对象
1、程序的执行离不开顺序、判断、循环操作，即结构化
2、面向对象 ——数据结构化
3、对于计算机而言，结构化的才是最简单的
4、编程应该是 简单&抽象

####  UML类图
Unified Modeling Language 统一建模语言

UML包含很多种图，主要分享类图，掌握泛化（类之间的继承）和关联（类之间的组合或者是引用）

在线工具： https://www.processon.com/


### 设计原则
####  何为设计
设计，按哪一种思路或者标准来实现功能。功能相同，可以有不同设计方案来实现。伴随着需求增加，设计的作用才能体现出来

设计准则：通过《LINUX/UNIX设计哲学》理解何为设计
1、小即是美（一个功能尽量做得小而精）
2、让每个程序只做好一件事（小功能组合起来就是一个大功能）
3、快速建立原型（先满足用户基本需求，再根据反馈，不断迭代与升级）
4、舍弃高效率而取可移植性（效率高不可复用和效率低可复用之间，会选择后者）
5、采用纯文本来存储数据，而非二进制
6、充分利用软件的杠杆效应（软件复用）
7、使用shell脚本来提高杠杆效应和可移植性
8、避免强制性的用户界面，系统和用户界面分开（比如linux的服务器界面就是命令行）
9、让每个程序都成为过滤器（把数据放大A程序里面处理，结果出来后再放到B程序里面处理，比如在文件夹里面查找文件）, 如 ls | grep .json | wc -l

小准则
1、允许用户定制环境（自己可以进行配置）
2、尽量使操作系统内核小而轻量化（内核是内核，工具是工具，拆分开）
3、使用小写字母并尽量简短（命名规范）
4、沉默是金（有结果就输出，没结果保持沉默，比如linux里面查找文件，没找到相对应的文件，就什么都不会显示）
5、各部分之和大于整体（以小的个体组成大的整体）
6、寻求90%的解决方案（不可能满足所有人，根据二八定律，花20%的成本解决80%的需求）

####  五大设计原则 SOLID
1、S（Single responsibility principle）——单一职责原则
一个程序只做好一件事
如果功能过于复杂就拆分开，每个部分保持独立

2、O（Open Closed Principle）——开放封闭原则
面向对象的核心
对扩展开放，对修改封闭
增加需求时，扩展新代码，而非修改已有代码

3、L（Liskov Substitution Principle, LSP）——李氏置换原则
子类能覆盖父类
父类能出现的地方子类就能出现
js中使用功能较少（弱类型 & 继承使用较少）

4、I (Interface Segregation Principle)——接口独立原则
保持接口的单一独立
js中没有接口概念（typescript例外）
类似单一职责原则，这里更关注接口

5、D（Dependence Inversion Principle ,DIP）——依赖倒置原则
面向接口编程，依赖于抽象而不依赖于具体
使用方只关注接口而不关注具体类的实现
js中使用较少（没有接口概念，弱类型）

####  从设计到模式
设计：设计原则（统一指导思想）
模式：通过概念总结出的一些模板，可以效仿的固定式的东西（根据指导思想结合开发经验，总结出固定的样式或模板）


### 设计模式
分类: 23种设计模式，分为创建型、结构型、行为型。
1、创建型（对象的创建及生成）
工厂模式（工场方法模式、抽象工场模式、建造者模式）、单例模式、原型模式

2、组合型（对象和类是怎样的组合形式，一个类不一定能满足需求，通过组合的形式完成）
单例模式、适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式

3、行为型（涵盖了开发中的一些常用的行为，如何设计才能满足需求）
观察者模式、迭代器模式、策略模式、模板方法模式、职责连模式、状态模式、命令模式、备忘录模式、中介者模式、访问者模式、解释器模式

#### 创建型
##### 工厂模式 Factory
工厂模式的作用就有一个，将生成对象的new 方法用一个函数封装起来。

举例: 去购买汉堡，直接点餐、取餐，不会自己亲手做，商店要 封装 做汉堡的工作，做好直接给消费者。

```js
// factory.js
class Product {
  constructor(name) {
    this.name = name
  }
  fn1() {
    console.log(`fn1`)
  }
  fn2() {
    console.log(`fn2`)
  }
}

class Creator {
  create(name) {
    return new Product(name)
  }
}

// test
let creator = new Creator()
let p = creator.create('p')
p.fn1()
p.fn2()
```
场景: 
 jQuery的$，其实就是返回的new jQuery.fn.init(selector, context)
 React.createElement
 vue 异步组件
```js
// React.createElement
class Vnode(tag, attrs, children) {
  // ...
}

React.createElement = function(tag, attrs, children)  {
  return new Vnode(tag, attrs, children)
}
```

##### 单例模式 Sigleton
单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。在js里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象

举例: jquery中的$是单例模式， jQuery只有一个$、 购物车、 登录框、 vuex和redux中的store
```js
// singleton.js
class SingleObject {
  // 在这里面定义的方法非静态，初始化实例时，都会有 saySth()这个方法
  saySth() {
    console.log('blabla')
  }

}

// 静态方法，将方法挂载到class上面,无论SingleObject被new多少个，getInstance的方法只有一个
SingleObject.getInstance = (function() {
  let instance
  return function() {
    // 如果没有则赋值，初始化
    if(!instance) {
      instance = new SingleObject()
    }
    // 有的话直接返回
    return instance
  }
}())


// test
// 这里只能使用静态函数getInstance,不能使用new SingleObject()
let obj1 = SingleObject.getInstance()
obj1.saySth()
let obj2 = SingleObject.getInstance()
obj2.saySth()

console.log(obj1===obj2) // 测试是否一个实例  true
```
场景:
 jquery中的$是单例模式， jQuery只有一个$
 模拟登录框
 vuex和redux中的store
```js
// jquery中的$是单例模式， jQuery只有一个$
if(window.jQuery!=null) {
  return window.jQuery
} else {
  // 初始化
}

// 模拟登录框
// 类似上面的SingleObject
```
##### 适配器模式 Adpate
将旧接口和使用者进行分离，使用一个类为不同类方法提供统一的适配转换接口，从而达到适配的目的，所以核心思想也就是为了解决接口不兼容问题。

举例:  新旧接口不兼容、封装旧接口、插头转换、兼容没有jquery的ajax方法、vue的computed
```js
// adpate.js
class Adpatee {
  specificRequest() {
    return '俄罗斯标准插头'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adpatee()
  }
  request() {
    let info = this.adaptee.specificRequest()
    return `${info} - 转换器 - 中国标准插头`
  }
}
// test
let target = new Target()
let res = target.request()
console.log(res)


// 注意，Target也可以写成
class Target1 {
  constructor(adaptee) {
    this.adaptee = adaptee
  }
  request() {
    let info = this.adaptee.specificRequest()
    return `${info} - 转换器 - 中国标准插头`
  }
}
// test
let res1 = new Target1(new Adpatee()).request()
console.log(res1)
```
适配器模式的出现，都是为了去解决一些不得不兼容的接口或者方法，其实这样的例子有很多：比如我们写一个兼容没有jquery的ajax方法
```js
var $ = {
  ajax: function(options) {
    return ajax(options) 
  }
}
```
##### 装饰器模式 Decorator
既能使用原有的功能，又能使用装饰后的功能。为对象添加新功能，不改变其原有的结构和功能。

举例，比如手机可以打电话、发短信，我们在原有的基础上装个保护壳，防止摔落时损坏
```js
// decorator.js
class Circle {
  draw() {
    console.log('draw sth')
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle
  }
  draw() {
    this.circle.draw()    
    this.setRedBorder(circle)
  }
  setRedBorder() {
    console.log('decorate with red border')
  }
}

// test
let circle = new Circle()
circle.draw()

let dec = new Decorator(circle)
dec.draw()

```

ES7装饰器，考虑到浏览器兼容问题，需要安装插件支持
```js
npm i @babel/plugin-proposal-decorators--save-dev

// package.json
"plugins": [
  ["@babel/plugin-proposal-decorators", {"legacy": true}],  // 要放在第一行
  ["@babel/plugin-proposal-class-properties", {"loose": true}]
]

// 对babel进行配置
// Experimental support for decorators is a feature that is subject to change in a future release
// fix: In VSCode, Add "javascript.implicitProjectConfig.experimentalDecorators": true to the file and it should fix it. 
// tsconfig.json
"compilerOptions": {
  "experimentalDecorators": true  // 启用实验性的ES装饰器
}


// 之后就可以使用装饰器了
@test
class Demo {}

function test(flag) {
  flag.val = true
}

alert(Demo.val)

// 还可以加参数
@test(true)
class Demo {}

function test(flag) {
  // 这里面返回一个函数,装饰器返回的都是一个函数
  return function(target) {
    target.val = flag
  }
}

alert(Demo.val)


// 装饰器的原理
@decorator  // @关键字使用装饰器
class A {}
// 等同于
class A {}
A = decorator(A) || A  // 将A定义成decorator函数执行一遍的返回值(相当于A在decorator执行了一遍)，没有的话返回A
```
装饰类 - mixin
```js
function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}

const Foo = {
  foo() {
    alert('foo')
  }
}

@mixins(Foo)
class MyClass {}

let obj = new MyClass()
obj.foo()
```
装饰方法 - 



























####  结合核心技术
####  结合框架运用























### 面试题
#### 第一题
打车时，可以打专车或者快车。任何车都有车牌号和名称。
不同车价格不同，快车每公里 1 元，专车每公里 2 元。
行程开始时，显示车辆信息
行程结束时，显示打车金额（假定行程就 5 公里）

UML 类图
![UML类图](/static/img/UML1.jpg)
```js
// /review1.js
class Car {
  constructor(name, number) {
    this.name = name
    this.number = number
  }
}

class FastCar extends Car {
  constructor(name, number) {
    super(name, number)
    this.price = 1
  }
}

class SpecialCar extends Car {
  constructor(name, number) {
    super(name, number)
    this.price = 2
  }
}

class Trip {
  constructor(car) {
    this.car = car
  }
  showCarInfo() {
    console.log(`THe car is ${this.car.name}, number is ${this.car.number}`)
  }
  showFare() {
    console.log(`THe price is ${this.car.price * 5}`)
  }
}

let car = new FastCar('wuling', 001)
let trip = new Trip(car)
trip.showCarInfo()
trip.showFare()
```
#### 第二题
某停车场，分 3 层，每层 100 车位
每个车位都能监控到车辆的驶入和离开
车辆进入前，显示每层的空余车位数量
车辆进入时，摄像头可识别车牌号和时间
车辆出来时，出口显示器显示车牌号和停车时长

UML 类图
![UML类图](/static/img/UML2.jpg)
```js
// /review2.js
class Park {
  constructor(floors) {
    this.floors = floors || []
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {}
  }
  in(car) {
    // 通过摄像头获取信息
    let info = this.camera.shot(car)
    // 停到某个停车位
    let i = parseInt(Math.random() * 100 % 100)
    let place = this.floors[0].places[i]
    place.in()
    info.place = place
    // 记录信息
    this.carList[car.number] = info
  }
  out(car) {
    // 获取信息
    let info = this.carList[car.number]
    // 将停车位清空
    let place = info.place
    place.out()
    // 显示时间
    this.screen.show(car, info.inTime)
    // 清空记录
    delete this.carList[car.number]
  }
  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index} 层, 还有 ${floor.emptyPlaceNum()} 个空余车位`
    }).join('\n')
  }
}

class Car {
  constructor(number) {
    this.number = number
  }
}

class Floor {
  constructor(index, places) {
    this.index = index
    this.places = places || []
  }
  emptyPlaceNum() {
    let num = 0
    this.places.forEach(p => {
      if(p.empty) {
        num++
      }
    })
    return num
  }
}

class Place {
  constructor(empty) {
    this.empty = true
  }
  in() {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}

class Camera {
  shot(car) {
    return {
      number: car.number,
      inTime: Date.now()
    }
  }
}

class Screen {
  show(car, inTime) {
    console.log(`车牌号 ${car.number}, 停车时间 ${Date.now() - inTime}`)
  }
}


// 测试
// 初始化停车场
let floors = []
for(let i=0;i<3;i++) {
  let places = []
  for(let j=0;j<100;j++) {
    places[j] = new Place()
  }
  floors[i] = new Floor(i+1, places)
}

let park = new Park(floors)

// 初始化车辆
let car1 = new Car(100)
let car2 = new Car(200)
let car3 = new Car(300)

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)
console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
park.out(car3)
```

### 综合示例
jQuery实现购物车
####  设计方案
####  代码演示
####  设计模式对应