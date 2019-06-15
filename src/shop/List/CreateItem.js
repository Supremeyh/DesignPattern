import Item from './Item';

// 工厂模式
export default function(list, itemData) {
  if(itemData.discount) {
    itemData = createDiscount(itemData)
  }
  return new Item(list, itemData)
}

// 代理模式 做折扣显示
function createDiscount(itemData) {
  return new Proxy(itemData, {
    get(target, key, receiver) {
      if(key === 'name') {
        return `${target[key]} 【折扣】`
      }
      if(key === 'price') {
        return target[key] * 0.8
      }
      return target[key]
    }
  })
}