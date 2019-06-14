// 某停车场，分 3 层，每层 100 车位
// 每个车位都能监控到车辆的驶入和离开
// 车辆进入前，显示每层的空余车位数量
// 车辆进入时，摄像头可识别车牌号和时间
// 车辆出来时，出口显示器显示车牌号和停车时长


class Park {
  constructor(floors) {
    this.floors = floors || []
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {}
  }
  in(car) {
    // 通过摄像头获取信息
    let info = this.camera.shot(car)
    // 停到某个停车位
    let i = parseInt(Math.random() * 100 % 100)
    let place = this.floors[0].places[i]
    place.in()
    info.place = place
    // 记录信息
    this.carList[car.number] = info
  }
  out(car) {
    // 获取信息
    let info = this.carList[car.number]
    // 将停车位清空
    let place = info.place
    place.out()
    // 显示时间
    this.screen.show(car, info.inTime)
    // 清空记录
    delete this.carList[car.number]
  }
  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index} 层, 还有 ${floor.emptyPlaceNum()} 个空余车位`
    }).join('\n')
  }
}

class Car {
  constructor(number) {
    this.number = number
  }
}

class Floor {
  constructor(index, places) {
    this.index = index
    this.places = places || []
  }
  emptyPlaceNum() {
    let num = 0
    this.places.forEach(p => {
      if(p.empty) {
        num++
      }
    })
    return num
  }
}

class Place {
  constructor(empty) {
    this.empty = true
  }
  in() {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}

class Camera {
  shot(car) {
    return {
      number: car.number,
      inTime: Date.now()
    }
  }
}

class Screen {
  show(car, inTime) {
    console.log(`车牌号 ${car.number}, 停车时间 ${Date.now() - inTime}`)
  }
}


// 测试
// 初始化停车场
let floors = []
for(let i=0;i<3;i++) {
  let places = []
  for(let j=0;j<100;j++) {
    places[j] = new Place()
  }
  floors[i] = new Floor(i+1, places)
}

let park = new Park(floors)

// 初始化车辆
let car1 = new Car(100)
let car2 = new Car(200)
let car3 = new Car(300)

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)
console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
park.out(car3)