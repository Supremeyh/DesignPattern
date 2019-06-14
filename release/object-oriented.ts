// 面向对象 概念
class People {
  name
  age
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  speak() {
    alert(`He is ${this.name}, ${this.age} years old.`)
  }
}

let Lee = new People('Lee', 23)
Lee.speak()



// 封装
class Person {
  name
  age
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  speak() {
    alert(`He is ${this.name}, ${this.age} years old.`)
  }
}

class Student extends Person {
  num
  constructor(name, age, num) {
    super(name, age)
    this.num = num
  }
  study() {
    alert(`${this.name} study number is ${this.num}`)
  }
}

let Bruce = new Student('Bruce', 19, 3)
Bruce.speak()
Bruce.study()