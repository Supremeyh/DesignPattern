import $ from 'jquery'
import { GET_LIST } from '../config/config'
import createItem from './CreateItem'

export default class List {
  constructor(app) {
    this.app = app
    this.$el = $('<div>')

  }
  init() {
    this.loadData().then(data => {
      this.initItemList(data)
    }).then(() => {
      this.render()
    })
  }
  // 获取数据
  loadData() {
    // 返回 Promise 实例
    // 观察者模式
    return fetch(GET_LIST).then(result => {
      return result.json()
    })
  }
  // 生成列表
  initItemList(data) {
    data.map(itemData => {
      // 创建一个 item 然后 init
      let item = createItem(this, itemData)
      item.init()
      return item
    })
  }
  // 渲染
  render() {
    this.app.$el.append(this.$el)
  }
}