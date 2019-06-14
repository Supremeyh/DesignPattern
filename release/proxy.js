// 代理模式
class RealSite {
  constructor(fileName) {
    this.fileName = fileName
    this.loadFromDisk()
  }
  loadFromDisk() {
    console.log(`loading... ${this.fileName}`)
  }
  display() {
    console.log(`display... ${this.fileName}`)
  }
}


class ProxySite {
  constructor(fileName) {
    this.realFile = new RealSite(fileName)
  }
  display() {
    this.realFile.display()
  }
}

// test
let proxyFile = new ProxySite('1.txt')
proxyFile.display()



// --------- $.proxy ---------
$('#div').click(function() {
  setTimeout($.proxy(function() {
    $(this).addClass('blue')
  }, this), 1000);
})
// 等同于
$('#div').click(function() {
  let _this = this
  setTimeout(() => {
    $(_this).addClass('blue')
  }, 1000);
})


// --------- ES6 Proxy ---------
// 明星
let star = {
  name: 'Justin Bieber',
  age: 24,
  phone: 666
}

// 经纪人
let agent = new Proxy(star, {
  get: function(target, key) {
    if(key==='phone') {
      return 888
    }
    if(key==='price') {
      return 12000
    }
    return target[key]
  },
  set: function(target, key, value) {
    if(key==='customPrice') {
      if(value<10000) {
        throw Error('too low price')
      } else {
        target[key] = value
      }
    }
  }
})

// test
console.log(agent.name, agent.phone, agent.price)
agent.customPrice = 20001
console.log(agent.customPrice)

