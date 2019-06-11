function readonly(target, name, descriptor){
  descriptor.writable = false
  return descriptor
}

class A {
  @readonly
  name() {
    return 'z'
  }
}

new A().name = function(){} // Error