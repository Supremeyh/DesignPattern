// 单例模式

class SingleObject {
  // 在这里面定义的方法非静态，初始化实例时，都会有 saySth()这个方法
  saySth() {
    console.log('blabla')
  }

}

// 静态方法，将方法挂载到class上面,无论SingleObject被new多少个，getInstance的方法只有一个
// 自执行函数，避免变量污染
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

console.log(obj1===obj2) // 测试是否一个实例




// ---------场景--------
//  jquery中的$是单例模式
if(window.jQuery!=null) {
  return window.jQuery
} else {
  // 初始化
}


// 模拟登录框
class LoginForm {
  constructor() {
    this.state = 'hide'
  }
  show() {
    if(this.state==='show') {
      alert('already showed')
      return
    }
    this.state = 'show'
    console.log('showed successfuly')
  }
  hide() {
    if(this.state==='hide') {
      alert('already hidden')
      return
    }
    this.state = 'hide'
    console.log('hidden successfuly')
  }

}

LoginForm.getInstance = (function() {
  let instance
  return function() {
    if(!instance) {
      instance = new LoginForm()
    }
    return instance
  }
}())

// test
let login1 = LoginForm.getInstance()
login1.show()

let login2 = LoginForm.getInstance()
login2.show()

console.log(login1===login2)