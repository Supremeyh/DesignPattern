function loadImg(src) {
  return new Promise((resolove, reject) => {
    let img = document.createElement('img')
    img.onload = function() {
      resolove(img)
    }
    img.onerror = function() {
      reject('failure')
    }
    img.src = src
  })
}

let src = 'http://www.laverocks.co.uk/gilslandmag/desktops/tup_800.jpg'
let result = loadImg(src)
result.then(img => {
  console.log((img as any).width)
  return img
}).then(img => {
  console.log((img as any).height)
}).catch(err => {
  console.error(err)
})

