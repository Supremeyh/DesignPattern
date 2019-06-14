// ------------ 原型模式  ------------
const prototype = {
  getName() {
    return this.first + this.last
  },
  sayHi() {
    console.log('hello')
  }
}

let aa = Object.create(prototype)
aa.first = 'a'
aa.last = 'a'
let name = aa.getName()
console.log(name)

let bb = Object.create(prototype)
bb.first = 'b'
bb.last = 'b'
bb.sayHi()



// ------------ 桥接模式 ------------
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


// ------------ 组合模式 ------------
// 生成树形结构，表示"整体—部分"关系, 让整体和部分都具有一致的操作方式和数据结构
// 举例，文件夹的文件、DOM Node


// ------------ 享元模式 ------------
// 共享内存（主要考虑内存，而非效率），相同数据，共享使用
// 举例，事件代理到父级(子数据要相同、数量很多)


// ------------ 策略模式 ------------
// 普通实现
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


// ------------ 模板方法模式 ------------
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


// ------------ 职责链模式 ------------
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



// ------------  命令模式 ------------
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


// ------------ 备忘录模式  ------------
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
