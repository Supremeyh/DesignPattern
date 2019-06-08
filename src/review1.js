// 打车时，可以打专车或者快车。任何车都有车牌号和名称。
// 不同车价格不同，快车每公里 1 元，专车每公里 2 元。
// 行程开始时，显示车辆信息
// 行程结束时，显示打车金额（假定行程就 5 公里）


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