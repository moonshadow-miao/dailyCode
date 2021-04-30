function throttle(fn, time) {
  let that = this
  let timeOut
  return function (e) {
    if (timeOut) {
      return
    }
    let args = arguments
    timeOut = setTimeout(function () {
      fn.apply(that, Array.from(args))
      clearTimeout(timeOut)
      timeOut = null
    }, time)
  }
}

window.onresize = debounce(function (e) {
  console.log(e)
}, 500)

function debounce(fn, time) {
  let that = this
  let timeOut
  return function (e) {
    clearTimeout(timeOut)
    let args = arguments
    timeOut = setTimeout(function () {
      fn.apply(that, Array.from(args))
      clearTimeout(timeOut)
      timeOut = null
    }, time)
  }
}
