// 寻找数组中出现奇数的数字，唯一
function getOdd(arr) {
  if (arr.length < 3) {
    return null
  }
  let value = 0
  for (let i = 0; i < arr.length; i++) {
    value ^= arr[i]
  }
  return value
}

function generator() {
  let arr = Array(10).fill('').map(() => Math.ceil(Math.random() * 10))
  let odd = Math.ceil(Math.random() * 10) + 10
  return arr.concat(odd).concat(arr)
}

console.log(getOdd(generator()))

