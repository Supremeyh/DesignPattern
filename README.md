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
适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式

3、行为型（涵盖了开发中的一些常用的行为，如何设计才能满足需求）
观察者模式、迭代器模式、策略模式、模板方法模式、职责连模式、状态模式、命令模式、备忘录模式、中介者模式、访问者模式、解释器模式

4、其他设计模式(从上面三类中不常用的抽取出而来)
原型模式、桥接模式、组合模式、享元模式、策略模式、模板方法模式、职责链模式、命令模式、备忘录模式、中介者模式、访问者模式

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

#### 组合型
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
class A {}

function test(flag) {
  flag.val = true
}

alert(A.val)

// 还可以加参数
@test(true)
class B {}

function test(flag) {
  // 这里面返回一个函数,装饰器返回的都是一个函数
  return function(target) {
    target.val = flag
  }
}

alert(B.val)


// 装饰器的原理 - 装饰类
@decorator  // @关键字使用装饰器
class C {}
// 等同于
class C {}
C = decorator(C) || C  // 将A定义成decorator函数执行一遍的返回值(相当于A在decorator执行了一遍)，没有的话返回A

// 装饰器的原理 - 装饰方法
class C{
  @decorator
  props(){}
}
props = decorator(C.prototype, 'props', {
  value: props,
  enumerable: false,
  configurable: true,
  writable: true
})
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
class D {}

let obj = new D()
obj.foo()
```
装饰方法 - 增加打印日志
```js
// log
class Math {
  @log
  add(a, b) {
    return a+b
  }
}

// 修饰器第一个参数是类的原型对象，修饰器的本意是要“修饰”类的实例，但是这个时候实例还没生成，所以只能去修饰原型（这不同于类的修饰，那种情况时target参数指的是类本身）；第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象
function log(target, name, descriptor) {
  let oldVal = descriptor.value
  descriptor.value = function () {
    console.log('the result is ')
    return oldVal.apply(this, arguments)
  }
  return descriptor
}

let math = new Math()
let res_log = math.add(2, 3)
console.log(res_log)
```
推荐使用 core-decorators 库，有诸如 readonly、deprecate 等装饰类和方法
```js
npm i core-decorators --save


// core-decorators
import { readonly } from 'core-decorators'
class CoreDecorators {
  @readonly
  show() {
    return 'it is read only'
  }
}

let cd = new CoreDecorators()
console.log(cd.show())
cd.show = function() {}  // Cannot assign to read only property 'name' of object '#<CoreDecorators>'
```

##### 代理模式 Proxy
使用者无法直接访问目标对象，中间加代理，通过代理做授权和控制。要注意的是，提供的方法一定要和服务端默认的方法名字是一样的。

举例: 科学上网(无论开不开代理，要访问的网址一直没有变，唯一的区别是，没有开代理的情况，无法直接访问到。如果开了代理，会通过代理去访问数据，再返回)、明星经纪人、nginx的正向代理和反向代理

使用场景: 网页事件代理、this的指向、$.proxy、ES6 Proxy
```js
// 代理模式
class RealSite {
  constructor(fileName) {
    this.fileName = fileName
    this.loadFromDisk()
  }
  loadFromDisk() {
    console.log(`loading... ${this.fileName}`)
  }
  display() {
    console.log(`display... ${this.fileName}`)
  }
}

class ProxySite {
  constructor(fileName) {
    this.realFile = new RealSite(fileName)
  }
  display() {
    this.realFile.display()
  }
}

// test
let proxyFile = new ProxySite('1.txt')
proxyFile.display()
```
jquery 的 $.proxy 
```js
// 使用 $.proxy 
$('#div').click(function() {
  setTimeout($.proxy(function() {
    $(this).addClass('blue')
  }, this), 1000);
})
// 等同于
$('#div').click(function() {
  let _this = this
  setTimeout(() => {
    $(_this).addClass('blue')
  }, 1000);
})
```
ES6 Proxy 实现 明星经纪人
```js
// 明星
let star = {
  name: 'Justin Bieber',
  age: 24,
  phone: 666
}

// 经纪人
let agent = new Proxy(star, {
  get: function(target, key) {
    if(key==='phone') {
      return 888
    }
    if(key==='price') {
      return 12000
    }
    return target[key]
  },
  set: function(target, key, value) {
    if(key==='customPrice') {
      if(value<10000) {
        throw Error('too low price')
      } else {
        target[key] = value
      }
    }
  }
})

// test
console.log(agent.name, agent.phone, agent.price)
agent.customPrice = 20001
console.log(agent.customPrice)
```
代理模式、适配模式、装饰器模式三者的区别
适配器：提供一个不同的接口（进行格式的转换）
代理模式：提供一模一样的接口（无权使用目标类，所以进行代理）

装饰器模式：扩展功能，原有功能不变且可直接使用
代理模式：显示原有功能，但是经过限制或阉割之后的

##### 外观模式 Facade
为子系统中的一组接口提供了一个高层接口，使用者使用了这个高层接口

不符合单一职责和开放封闭原则，因此谨慎使用，不可滥用（不要为了设计而设计，而是为了使用而设计）
```js
// facade.js
function facade(ele, type, selector, fn) {
  if(fn==null) {
    fn = selector
    selector = null
  }
  // ...
}

// 调用
facade(ele, 'click', '#div1', fn)
facade(ele, 'click', fn)
```

#### 行为型
##### 观察者模式 / 订阅发布模式
一堆观察者或者订阅者去观察或者订阅一个主题，当这个主题变化时，就会通知所监听或者观察它的订阅者

发布、订阅（订好咖啡，会有人上门送），一对 N（可以同时订购牛奶，报纸等，之间无冲突）
```js
// 主题，保存状态，接收状态变化，状态变化后触发所有观察者对象
class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notifyAllObservsers()
  }
  // 循环所有的观察者
  notifyAllObservsers() {
    this.observers.forEach(observer => {
      // 遍历的每个元素执行update方法
      observer.update()
    })
  }
  // 添加一个新的观察者
  attach(observer) {
    this.observers.push(observer)
  }
}

// 观察者/订阅者, 等待被触发
class Observer {
  constructor(name, subject) {
    this.name = name
    this.subject = subject
    // 将自己添加进去，把观察者添加到主题当中
    this.subject.attach(this)
  }
  update() {
    console.log(`name: ${this.name} - state: ${this.subject.getState()}`)
  }
}

// test
let sub = new Subject()
let obs1 = new Observer('obs1', sub)
let obs2 = new Observer('obs2', sub)
sub.setState(2)
sub.setState(3)
```
场景
1、网页事件绑定，所有的事件监听都是观察者模式，所有事件写好(订阅)之后，等待被执行
```js
<button id="bth">btn</button>
$('#btn').click(() => {}) // 当按钮点击触发
```
2、Promise then, promise 状态变化resolve reject pending
3、$.Callbacks() 
4、一切生命周期或者hook之类的函数都是观察者
5、nodejs 中应用广泛，如 自定义事件 event、stream、readline、处理http请求、vue和react组件声明周期触发、watch
```js
// EventEmitter
const EventEmitter = require('events').EventEmitter

class Poodle extends EventEmitter {
  constructor(name) {
    super()
    this.name = name
  }
}

let poodle = new Poodle('poodle')
poodle.on('bark', function() {
  console.log(`${this.name} bark`)
})
poodle.on('bark', function() {
  console.log(`${this.name} bark again`)
})

poodle.emit('bark')
```
##### 迭代器模式 Iterator
和平时所用的for循环类似，遍历具有一组特殊接口的对象或者是特殊函数，顺序访问一个集合（有序列表，数组，对象是个无序列表），使用者无需知道集合的内部结构
```js
// iterator.js
class Interator {
  constructor(container) {
    this.list = container.list
    this.index = 0
  }
  next() {
    if(this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }
  hasNext() {
    if(this.index >= this.list.length) {
      return false
    }
    return true
  }
}

class Container {
  constructor(list) {
    this.list = list
  }
  getIterator() {
    return new Interator(this)
  }
}

// test
let arr = [2 ,3 ,5, 7]
let container = new Container(arr)
let iterator = container.getIterator()
while(iterator.hasNext()) {
  console.log(iterator.next()) 
}
```
场景: 
jq 的 each()、 ES6 Itearator、 Generator 函数返回结果
```js
function each(data) {
  // 转换成 jq 对象， 生成迭代器
  var $data = $(data)
  $data.each(function(key, val) {
    console.log(key, val)
  })
}

// 之后即统一了多种不同数据接口的遍历方式
each([2, 3, 5])
each($('a'))
each(nodeList)
```
ES6 Iterator
原生具备 Iterator 接口的数据结构: Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象。 
以上，都部署了 Symbol.iterator 属性的数据结构，就称为部署了遍历器接口
```js
// 传入的data可以是任意的
function each_es6(data) {
  // 生成遍历器
  let iterator = data[Symbol.iterator]()
  let item = {done: false}
  while(!item.done) {
    item = iterator.next()
    if(!item.done) {
      console.log(item.value)
    }
  }
}

let arr2 = [2, 3]
each_es6(arr2)


// for of 
function each_forof(data) {
  // 有 Symbol.iterator 属性的数据结构
  for(let val of data) {
    console.log(val)
  }
}

each_forof(arr2)
```
##### 状态模式 State
一个对象有多个状态变化，每次状态变化都会触发相应的操作, 不能总是用if...else来控制。当我们把这些固定套路的代码抽象出来的时候，就叫做状态模式，有的程序把状态也叫做状态机。

将状态对象和主题对象分离，状态的变化逻辑单独处理

示例，交通信号灯不同颜色的变化
```js
// state.js
// 把状态抽象出来  状态（红绿灯）
class State {
  constructor(color) {
    this.color = color
  }
  handle(context) {
    console.log(`turn to light ${this.color}`)
    // 设置状态
    context.setState(this)
  }
}

// 主体 实例
class Context {
  constructor() {
    this.state = null
  }
  // 获取状态
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
  }
}


// test
let context = new Context()
let green = new State('green')
let red = new State('red')
let yellow = new State('yellow')

// green
green.handle(context)
console.log(context.getState())

red.handle(context)
console.log(context.getState())

yellow.handle(context)
console.log(context.getState())
```

场景:
1、有限状态机。有限个状态、以及在这些状态之间的变化
第三方库，npm i javascript-state-machine --save-dev

2、实现简单的 Promise
promise 是个 class; 在初始化的时候传进去一个函数，函数有2个参数resolve、reject; 要实现then的方法，then接收2个参数成功和失败
```js
import StateMachine from 'javascript-state-machine';

// 状态机模型
let fsm = new StateMachine({
  init: 'pending',
  transitions: [
    {
      name: 'resolve',  // 事件名称
      from: 'pending',
      to: 'fullfilled'
    },
    {
      name: 'reject',   // 事件名称
      from: 'pending',
      to: 'rejected'
    }
  ],
  methods: {
    onResolve(state, data) {
      // state 当前状态机实例;  data fsm.resolve(param) 传递的参数
      data.successList.forEach(fn => fn())
    },
    onRejeact(state, data) {
      // state 当前状态机实例;  data fsm.reject(param) 传递的参数
      data.failList.forEach(fn => fn())
    }
  }
})


// 定义 Promise
class MyPromise {
  constructor(fn) {
    this.successList = []
    this.failList = []

    fn(() => {  // 箭头函数绑定this指向, 普通函数需做缓存
      // resolve
      fsm.resolve(this) 
    }, () => {
      // reject
      fsm.reject(this)
    })
  }
  then(successFn, failFn) {
    this.successList.push(successFn)
    this.failList.push(failFn)
  }
}

// test
function loadImg(src) {
  let promise = new MyPromise(function(resolve, reject) {
    let img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject()
    }
    img.src = src
  })
  return promise
}

let src= 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/01142236/Poodle-Care1.jpg'
let result = loadImg(src)
result.then(function() {
  console.log('ok1')
}, function() {
  console.log('fail1')  
})

result.then(function() {
    console.log('ok2')
  }, function() {
    console.log('fail2')  
})
```

#### 其他设计模式
创建型(原型模式)
组合型(桥接模式、组合模式、享元模式) 
行为型(策略模式、模板方法模式、职责链模式、命令模式、备忘录模式、中介者模式、访问者模式、 解释器模式)
##### 原型模式
clone自己，生成一个新对象（重新new一个对象，开销相对较大）
Object.create(proto)
```js
const prototype = {
  getName() {
    return this.first + this.last
  },
  sayHi() {
    console.log('hello')
  }
}

// 基于原型创建aa
let aa = Object.create(prototype)
aa.first = 'a'
aa.last = 'a'
let name = aa.getName()
console.log(name)

// 基于原型创建bb
let bb = Object.create(prototype)
bb.first = 'b'
bb.last = 'b'
bb.sayHi()
```

##### 桥接模式
用于把抽象化和实现化解耦, 使得二者可以独立变化。 
如画红色/黄色的圆形/三角形，把颜色和形状分开
```js
// 普通实现
class ColorShape {
  yellowCircle() {
    console.log('yellow circle')
  }
  redCircle() {
    console.log('red circle')
  }
  yellowTriangle() {
    console.log('yellow triangle')
  }
  redTriangle() {
    console.log('red triangle')
  }
}
// 使用桥接模式
class Color {
  constructor(name) {
    this.name = name
  }
}

class Shape {
  constructor(name, color) {
    this.name = name
    this.color = color
  }
  draw() {
    console.log(`${this.color.name} ${this.name}`)
  }
}

// test
let red = new Color('red')
let yellow = new Color('yellow')
let circle = new Shape('circle', red)
circle.draw()

let triangle = new Shape('triangle', yellow)
triangle.draw()
```
##### 组合模式
生成树形结构，表示"整体—部分"关系, 让整体和部分都具有一致的操作方式和数据结构
举例，文件夹的文件、DOM Node

##### 享元模式
共享内存（主要考虑内存，而非效率），相同数据，共享使用
举例，事件代理到父级(子数据要相同、数量很多)

##### 策略模式
不同策略（执行方式）分开处理，避免出现大量 if...else
```js
class User {
  constructor(type) {
    this.type = type
  }
  buy() {
    if(this.type==='ordinary') {
      console.log('ordinary')
    } else if(this.type==='member') {
      console.log('member')
    } if(this.type==='vip') {
      console.log('vip')
    }
  }
}

// test
let user1 = new User('ordinary')
user1.buy()
let user2 = new User('member')
user2.buy()
let user3 = new User('vip')
user3.buy()

// 使用策略模式
class OrdinaryUser {
  buy() {
    console.log('ordinary')
  }
}
class MemberUser {
  buy() {
    console.log('member')
  }
}
class VipUser {
  buy() {
    console.log('vip')
  }
}

let user4 = new OrdinaryUser()
user4.buy()
let user5 = new MemberUser()
user5.buy()
let user6 = new VipUser()
user6.buy()
```
##### 模板方法模式
通过一个方法将多个方法其封装合并，统一输出，调用时使用该方法即可
```js
class Template {
  handle() {
    this.handle1()
    this.handle2()
    this.handle3()
  }

  handle1() {}
  handle2() {}
  handle3() {}
}
```
##### 职责链模式
一步操作可能分为多个职责角色来完成，把这些角色都分开，然后用一个链式串起来，将发起者和各个处理者进行隔离

场景: jq 链式操作、 promise.then() 链式操作
```js
// 文件审批，依次市长、州长、总统
class ResponsibilityChain {
  constructor(name) {
    this.name = name
    this.nextChain = null
  }
  setNextChain(chain) {
    this.nextChain = chain
  }
  handle() {
    console.log(`${this.name} 审批`)
    if(this.nextChain != null) {
      this.nextChain.handle()
    }
  }
}

// test
let resp1 = new ResponsibilityChain('mayor')
let resp2 = new ResponsibilityChain('governor')
let resp3 = new ResponsibilityChain('president')
resp1.setNextChain(resp2)
resp2.setNextChain(resp3)
resp1.handle()
```
##### 命令模式
执行命令时，发布者和执行者分开，中间加入命令对象，作为中转站

场景: 网页富文本编辑器操作，浏览器封装了一个命令对象，如 document.execCommand('bold')
```js
// 接收者
class Receiver {
  exec() {
    console.log('执行命令')
  }
}

// 传达者
class Command {
  constructor(receiver) {
    this.receiver = receiver
  }
  cmd() {
    console.log('传达命令')
    this.receiver.exec()
  }
}

// 触发者
class Invoker {
  constructor(commamd) {
    this.commamd = commamd
  }
  invoke() {
    console.log(`决策命令`)
    this.commamd.cmd()
  }
}

// test
let soldier = new Receiver()
let trumpeter = new Command(soldier)
let general = new Invoker(trumpeter)
general.invoke()
```
##### 备忘录模式
随时记录一个对象的状态变化，随时可以恢复之前的某个状态（如备份、撤销、保存副本功能）

类似富文本编辑器的获取和保存内容
```js
class Memento {
  constructor(content) {
    this.content = content
  }
  getContent() {
    return this.content
  }
}

// 备忘列表 内容是Memento类的实例
class CareTaker {
  constructor() {
    this.list = []
  }
  add(memento) {
    this.list.push(memento)
  }
  get(index) {
    return this.list[index]
  }
}

// 编辑器
class Editor {
  constructor() {
    this.content = null
  }
  setContent(content) {
    this.content = content
  }
  getContent() {
    return this.content
  }
  // 保存、备份
  saveContentToMemento() {
    return new Memento(this.content)
  }
  // 恢复、撤销
  getContentFromMemento(memento) {
    this.content = memento.getContent()
  }
}

// test
let editor = new Editor()
let careTaker = new CareTaker()
editor.setContent('aaa')
editor.setContent('bbb')
careTaker.add(editor.saveContentToMemento())
editor.setContent('ccc')
careTaker.add(editor.saveContentToMemento())
editor.setContent('ddd')

console.log(editor.getContent()) // ddd
editor.getContentFromMemento(careTaker.get(1))
console.log(editor.getContent()) // ccc
editor.getContentFromMemento(careTaker.get(0))
console.log(editor.getContent()) // bbb
```
##### 中介者模式
将各关联对象，通过中介者隔离
类似出租、租房，通过中介
```js
// 中介
class Mediator {
  constructor(owner, renter) {
    this.owner = owner
    this.renter = renter
  }
  setOwner() {
    let price = this.renter.price
    this.owner.setPrice(price * 10)
  }
  setRenter() {
    let price = this.owner.price
    this.renter.setPrice(price / 10)
  }
}

// 业主
class Owner {
  constructor() {
    this.price = 0
  }
  setPrice(price, mediator) {
    this.price = price
    if(mediator) {
      mediator.setRenter()
    }
  }
}

// 租客
class Renter {
  constructor() {
    this.price = 0
  }
  setPrice(price, mediator) {
    this.price = price
    if(mediator) {
      mediator.setOwner()
    }
  }
}

let owner = new Owner()
let renter = new Renter()
let mediator = new Mediator(owner, renter)
owner.setPrice(100, mediator)
console.log(owner.price, renter.price)
renter.setPrice(100, mediator)
console.log(owner.price, renter.price)
```
##### 访问者模式
将数据操作和数据结构进行分离

##### 解释器模式
描述语言语法如何定义，如何解释和编译，用于专业场景


### 综合应用
#### 介绍和演示
使用 jQuery 做一个模拟购物车的示例
要点：显示购物车列表、加入购物车、从购物车删除
模式：工厂、单例； 装饰器、观察者； 状态、模板方法、代理

####  设计方案
UML 类图
![UML类图](/static/img/design-pattern-UML1.jpg)

####  代码基础环境
























### 面试题
#### 第一题
打车时，可以打专车或者快车。任何车都有车牌号和名称。
不同车价格不同，快车每公里 1 元，专车每公里 2 元。
行程开始时，显示车辆信息
行程结束时，显示打车金额（假定行程就 5 公里）

UML 类图
![UML类图](/static/img/design-pattern-UML2.jpg)
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
![UML类图](/static/img/design-pattern-UML3.jpg)
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


