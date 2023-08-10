// 取数字的二进制最右边的1
const getMostRightPos = (num) => num & (-num) // -num === (~num + 1)

// 在一个数组中，有两个出现奇数次的数字 a , b，其他数字出现偶数次，找出两个奇数次的数字 a , b
const array = [1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5]
function getEvenNums(array) {
  const res = array.reduce((pre, cur) => pre ^ cur, 0) //  a ^ b
  const mostRight = getMostRightPos(res) // 获取 a ^ b 中的最后一个 1 位置，用来分割数组
  const halfWith1 = array.filter(item => item & mostRight !== 0)
  const a = halfWith1.reduce((pre, cur) => pre ^ cur, mostRight)
  const b = res ^ a
  return [a, b]
}

console.log(getEvenNums(array));
