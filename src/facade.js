// 外观模式
function facade(ele, type, selector, fn) {
  if(fn==null) {
    fn = selector
    selector = null
  }
  // ...
}

// 调用
facade(ele, 'click', '#div1', fn)
facade(ele, 'click', fn)