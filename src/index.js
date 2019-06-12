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
