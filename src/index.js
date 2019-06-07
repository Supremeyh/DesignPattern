class Car {
  constructor(name, number) {
    this.name = name
    this.number = number
  }
}

class FastCar extends Car {
  constructor(name, number) {
    super(name, number)
    this.price = 1
  }
}

class SpecialCar extends Car {
  constructor(name, number) {
    super(name, number)
    this.price = 2
  }
}

class Trip {
  constructor(car) {
    this.car = car
  }
  showCarInfo() {
    console.log(`THe car is ${this.car.name}, number is ${this.car.number}`)
  }
  showFare() {
    console.log(`THe price is ${this.car.price * 5}`)
  }
}

let car = new FastCar('wuling', 001)
let trip = new Trip(car)
trip.showCarInfo()
trip.showFare()