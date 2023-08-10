// 判断一个数字是否在有序数组里面
function beExist(arr, num) {
  if (arr.length === 0) {
    return false
  }
  if (arr.length === 1) {
    return arr[0] === num
  }
  let leftIndex = 0
  let rightIndex = arr.length - 1
  let midIndex = -1
  while (midIndex !== leftIndex) {
    midIndex = leftIndex + (rightIndex - leftIndex) >> 1
    if (arr[midIndex] === num) {
      return true
    }
    arr[midIndex] > num ? (rightIndex = midIndex) : (leftIndex = midIndex)
  }
  return arr[leftIndex] === num || arr[rightIndex] === num
}

function beExist2(arr, num) {
  if (arr.length === 0) {
    return false
  }
  let leftIndex = 0
  let rightIndex = arr.length - 1
  let midIndex = -1
  while (leftIndex < rightIndex) {
    midIndex = leftIndex + ((rightIndex - leftIndex) >> 1)
    if (arr[midIndex] === num) {
      return true
    }
    arr[midIndex] > num ? (rightIndex = midIndex -1 ) : (leftIndex = midIndex + 1)
  }
  return arr[leftIndex] === num
}

console.log(beExist2([1, 3, 4, 5, 6, 7, 8, 9, 12, 13, 22, 33, 45, 52, 63, 79, 98, 100], 6))
