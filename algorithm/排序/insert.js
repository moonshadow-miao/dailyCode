// 选择排序

function selectionSort(arr) {
  // 边界条件
  if (arr.length <= 1) {
    return arr
  }
  for (let j = 1; j < arr.length; j++) {
    for (let i = j - 1; i >= 0; i--) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
      }
    }
  }
  return arr
}

// 普通的交换
function swap (arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

console.log(selectionSort([2,5,6,1,3,8,9,11,4,14,1,2,3,4,32,4]))
