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

let Trump = new Person('Trump', 23)
Trump.speak()

export {}