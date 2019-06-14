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

let res1 = new Target1(new Adpatee()).request()
console.log(res1)




// ---------- 场景 ----------
// 做一层适配器，写一个兼容没有jquery的ajax方法
var $ = {
  ajax: function(options) {
    return ajax(options) 
  }
}
