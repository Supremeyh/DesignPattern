// 工厂模式
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




// React.createElement
class Vnode {
  // ...
}

React.createElement = function(tag, attrs, children)  {
  return new Vnode(tag, attrs, children)
}

