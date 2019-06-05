class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  speak() {
    alert(`He is ${this.name}, ${this.age} years old.`)
  }
}

class Student extends Person {
  constructor(name, age, num) {
    super(name, age)
    this.num = num
  }

  study() {
    alert(`${this.name} study number is ${this.num}`)
  }
}


let Lee = new Student('Lee', 19, 3)
Lee.speak()
Lee.study()