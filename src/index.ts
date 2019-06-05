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
}

class Students extends People {
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

}

let Long = new Students('Long', 21, 3)
Long.speak()
// console.log(Long.girl)