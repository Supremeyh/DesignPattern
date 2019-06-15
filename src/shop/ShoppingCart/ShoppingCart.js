import $ from './node_modules/jquery'
import GetCat from './GetCat'

export default  class ShoppingCart {
  constructor(app) {
    this.app = app
    this.cart = GetCat()
    this.$el = $('<div>').css({'padding-bottom': '10px', 'border-bottom': '2px solid #ccc'})

  }
  init() {
    this.initBtn()
    this.render()
  }
  initBtn() {
    let $btn = $('<button>购物车</button>')
    $btn.click(() => {
      this.showCart()
    })
    this.$el.append($btn)
  }
  showCart() {
    alert(this.cart.getList())
  }
  render() {
    this.app.$el.append(this.$el)
  }
}