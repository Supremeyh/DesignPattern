// 装饰器 打印日志
export default function(type) {
  return function(target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = function() {
      // 再次统一打印日志
      console.log(`日志上报 ${type}`)
      // 执行原有方法
      return oldValue.apply(this, arguments)
    }
    return descriptor
 }
}