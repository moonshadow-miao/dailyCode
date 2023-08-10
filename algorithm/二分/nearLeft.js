// 在arr上，找满足>=value的最左位置

function nearLef(arr, num) {
  if (arr.length === 0) {
    return null
  }
  if (arr.length === 1) {
    return arr[0] >= num ? 0 : null
  }
  let leftIndex = 0
  let rightIndex = arr.length - 1
  let midIndex = 0
  while (leftIndex < rightIndex) {
    midIndex = leftIndex + ((rightIndex - leftIndex) >> 1)
    if (arr[midIndex] < num && arr[midIndex + 1] >= num) {
      return midIndex
    }
    arr[midIndex] >= num ? (rightIndex = midIndex - 1) : (leftIndex = midIndex + 1)
  }
  return arr[leftIndex] < num && arr[leftIndex + 1] >= num ? leftIndex : null
}

console.log(nearLef([1, 3, 4, 5, 6, 6, 6, 9, 12, 13, 22, 33, 45, 52, 63, 79, 98, 100], 100))
