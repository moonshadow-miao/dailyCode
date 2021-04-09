// 局部最小值， （数组是无序的，数组是相邻位置一定不相等）
// 如： arr, arr[0] < arr[arr.length -1] || arr[arr.length - 1] > arr[arr.length - 2] || arr[i] < arr[i+1] && arr[i] < arr[i-1]
function getLessIndex(arr) {
  if (arr.length <= 1) {
    return null
  }
  if (arr[0] < arr[1]) {
    return 0
  }
  if (arr[arr.length - 1] < arr[arr.length - 2]) {
    return arr.length - 1
  }
  let left = 1
  let right = arr.length - 2
  let mid = 0
  while (left < right) {
    mid = left + ((right - left) >> 1)
    if (arr[mid] < arr[mid-1] && arr[mid] < arr[mid + 1]) {
      return mid
    }
    if (arr[mid] > arr[mid - 1]) {
      right = mid - 1
      continue
    }
    if (arr[mid] > arr[mid + 1]) {
      left = mid + 1
    }
  }
  return left
}

console.log(getLessIndex([11, 9, 8, 7, 6, 6, 5, 4, 4, 3, 2, 1, 33, 45, 52, 63, 79, 98, 100]))
