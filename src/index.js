// 装饰器模式
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




// ---------- 装饰器 ----------
@decorator
class A {

}

function decorator(flag) {
  flag.val = true
}

console.log(A.val)


// ---------- 还可以加参数 ----------
function decorator2(flag) {
  return function(target) {
    target.val = flag
  }
}

@decorator2(true)
class B {}

console.log(B.val)


// ---------- mixins ----------
function mixins(...list) {
  // return一个函数，装饰器都是一个函数
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}

const Foo = {
  foo() {
    console.log('foo')
  }
}

// 通过@关键字使用装饰器，将Foo里面的属性和并到target.prototype上
@mixins(Foo)
class C {}

let obj = new C()
obj.foo()




// readonly descriptor
function readonly(target, name, descriptor) {  
  descriptor.writable = false
  return descriptor
}

class D {
  constructor() {
    this.a = 'a'
    this.b = 'b'
  }

  @readonly
  name() {
    return `${this.a} - ${this.b}`
  }
}


let p = new D()
console.log(p.name())
p.name = function() {
  // 
}


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
