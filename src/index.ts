class People {
  name
  age
  protected weight
  constructor(name,age) {
    this.name = name
    this.age = age
    this.weight = 120
  }
  speak() {
    alert(`He is ${this.name}, ${this.age} years old`)
  }
  sayHi() {

  }
}

class Student extends People {
  num
  private girl
  constructor(name, age, num) {
    super(name, age)
    this.num = num
    this.girl = 'Lucy'
  }

  study() {
    alert(`${this.name} study number is ${this.num}`)
  }
  getWeight() {
    alert(`weight is ${this.weight}`)
  }

  sayHi() {
    alert(`Hi ${this.name}`)
  }

}

class WhiteCollar extends People {
  constructor(name, age) {
    super(name, age)
  }
  sayHi() {
    alert(`Hello ${this.name}`)
  }
}

let Long = new Student('Long', 21, 3)
Long.speak()
Long.sayHi()
// console.log(Long.girl)

let DuLala = new WhiteCollar('DuLala', 30)
DuLala.sayHi()