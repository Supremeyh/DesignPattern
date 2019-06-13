// 状态模式

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




// --------- 场景 ---------
// 实现简单的Promise 
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