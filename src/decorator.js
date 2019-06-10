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

@test
class Demo {

}

function test(flag) {
  flag.val = true
}

alert(Demo.val)