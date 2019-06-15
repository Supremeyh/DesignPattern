import $ from 'jquery'
import getCart from '../ShoppingCart/GetCat'
import StateMachine from 'javascript-state-machine'
import log from '../utils/log'

export default class Item {
  constructor(list, data) {
    this.list = list
    this.data = data
    this.$el = $('<div>')
    this.cart = getCart()
  }
  // 模板方法模式  通过一个方法将多个方法其封装合并，统一输出
  init() {
    this.initContent()
    this.initBtn()
    this.render()
  }
  initContent() {
    let $el = this.$el
    let data = this.data
    $el.append($(`<p>名称：${data.name}</p>`))
    $el.append($(`<p>价格：${data.price}</p>`))
  }
  initBtn() {
    let $el = this.$el
    let $btn = $(`<button>`)
    let _this = this

    // 状态模式
    let fsm = new StateMachine({
      init: '加入购物车',
      transitions: [
        {
          name: 'addToCart',
          from: '加入购物车',
          to: '从购物车删除'
        },
        {
          name: 'deleteFromCart',
          from: '从购物车删除',
          to: '加入购物车'
        }
      ],
      methods: {
        onAddToCart() {
          _this.addToCartHandle()
          updateText()
        },
        onDeleteFromCart() {
          _this.delFromCartHandle()
          updateText()
        }
      } 
    })

    function updateText() {
      $btn.text(fsm.state)
    }

    $btn.click(() => {
      // 添加到购物车、从购物车删除      
      if(fsm.is('加入购物车')) {
        fsm.addToCart()
      } else {
        fsm.deleteFromCart()
      }
    })

    updateText()
    $el.append($btn)
  }

  // 添加到购物车
  // 装饰器模式
  @log('add')
  addToCartHandle() {
    this.cart.add(this.data)
  }
  
  // 从购物车删除
  // 装饰器模式
  @log('del') 
  delFromCartHandle() {
    this.cart.del(this.data.id)
  }
  render() {
    this.list.$el.append(this.$el)
  }
}