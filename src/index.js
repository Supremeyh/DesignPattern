// 单例模式



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
