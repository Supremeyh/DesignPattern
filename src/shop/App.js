import $ from 'jquery'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import List from './List/List'

class App {
  constructor(id) {
    this.$el = $('#'+id)
  }
  init() {
    this.initShoppingCart()
    this.initList()
  }
  // 初始化购物车
  initShoppingCart() {
    let shoppingCart = new ShoppingCart(this)
    shoppingCart.init()
  }
  // 初始化购列表
  initList() {
    let list = new List(this)
    list.init()
  }
}

export default App