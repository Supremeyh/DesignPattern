class jQuery {
  length
  selector
  constructor(selector) {
    let slice = Array.prototype.slice
    let dom = slice.call(document.querySelectorAll(selector))
    let len = dom ? dom.length : 0
    for(let i=0; i<len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append() {

  }
  addClass() {

  }
}

// fix: Property '$' does not exist on type '{}'
(window as any).$ = function(selector) {
  // 工场模式
  return new jQuery(selector)
}

var $p = $('p')
console.log($p)
console.log($p.addClass)


// fix: Cannot redeclare block-scoped variable 'jQuery'
export {}