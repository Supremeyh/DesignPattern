// class Circle {
//   draw() {
//     console.log('draw sth')
//   }
// }

// class Decorator {
//   constructor(circle) {
//     this.circle = circle
//   }
//   draw() {
//     this.circle.draw()    
//     this.setRedBorder(circle)
//   }
//   setRedBorder() {
//     console.log('decorate with red border')
//   }
// }

// // test
// let circle = new Circle()
// circle.draw()

// let dec = new Decorator(circle)
// dec.draw()



// ---------- 装饰器 ----------
// @test
// class Demo {

// }

// function test(flag) {
//   flag.val = true
// }

// alert(Demo.val)


// ---------- 还可以加参数 ----------
// function test(flag) {
//   return function(target) {
//     target.val = flag
//   }
// }

// @test(true)
// class Demo {}

// alert(Demo.val)


// ---------- mixins ----------
function mixins(...list) {
  // return一个函数，装饰器都是一个函数
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}

const Foo = {
  foo() {
    alert('foo')
  }
}


// 通过@关键字使用装饰器，将Foo里面的属性和并到target.prototype上
@mixins(Foo)
class MyClass {}

let obj = new MyClass()
obj.foo()