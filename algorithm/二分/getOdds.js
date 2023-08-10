// 寻找数组中出现奇数的数字，唯二
function getOdd(arr) {
  console.log(arr)
  if (arr.length < 3) {
    return null
  }
  let value = 0
  for (let i = 0; i < arr.length; i++) {
    value ^= arr[i]
  }
  // value = x ^ y
  let last1 = value & (~value + 1)// x ^ y 最右边的1
  let otherValue = 0
  for (let i = 0; i < arr.length; i++) {
    if ((last1 & arr[i] )!== 0) {
      otherValue ^= arr[i]
    }
  }
  return [otherValue, value ^ otherValue]
}

function generator() {
  let arr = Array(10).fill('').map(() => Math.ceil(Math.random() * 10))
  let odd = Math.ceil(Math.random() * 10) + 10
  let odd2 = Math.ceil(Math.random() * 10) + 20
  return arr.concat(arr).concat(odd2).concat(odd)
}

console.log(getOdd(generator()))

