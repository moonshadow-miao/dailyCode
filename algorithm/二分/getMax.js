// 在数组上获取最大值
let time = 0
function getMax(arr) {
  if (!arr.length) {
    return null
  }
  if (arr.length === 1) {
    return arr[0]
  }
  return process(arr, 0, arr.length - 1)
}

function process (arr, left, right) {
  time++
  if (left === right) {
    return arr[left]
  }
  if (left === right -1) {
    return Math.max(arr[left], arr[right])
  }
  const mid = left + ((right - left) >> 1)
  const val1 = process(arr, left, mid)
  const val2 = process(arr, mid + 1, right)
  return Math.max(val1, val2)
}

function generator () {
  const length = Math.floor(Math.random()) * 20 + 1000
  return Array(length).fill('').map(() => Math.floor(Math.random() * 4000))
}
console.log(getMax(generator()))
console.log(time)
