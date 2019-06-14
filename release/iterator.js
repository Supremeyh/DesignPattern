// 迭代器模式

class Interator {
  constructor(container) {
    this.list = container.list
    this.index = 0
  }
  next() {
    if(this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }
  hasNext() {
    if(this.index >= this.list.length) {
      return false
    }
    return true
  }
}

class Container {
  constructor(list) {
    this.list = list
  }
  getIterator() {
    return new Interator(this)
  }
}

// test
let arr = [2 ,3 ,5, 7]
let container = new Container(arr)
let iterator = container.getIterator()
while(iterator.hasNext()) {
  console.log(iterator.next()) 
}





// ------------- 场景 -------------
// jq 的 each()
function each_jq(data) {
  // 转换成 jq 对象， 生成迭代器
  var $data = $(data)
  $data.each(function(key, val) {
    console.log(key, val)
  })
}

// 之后即统一了多种不同数据接口的遍历方式
each_jq([2, 3, 5])
each_jq($('a'))
each_jq(nodeList)




// ES6 Iterator
// 传入的data可以是任意的
function each_es6(data) {
  // 生成遍历器
  let iterator = data[Symbol.iterator]()
  let item = {done: false}
  while(!item.done) {
    item = iterator.next()
    if(!item.done) {
      console.log(item.value)
    }
  }
}

let arr2 = [2, 3]
each_es6(arr2)


// for of
function each_forof(data) {
  // 有 Symbol.iterator 属性的数据结构
  for(let val of data) {
    console.log(val)
  }
}

each_forof(arr2)