// 选择排序

function selectionSort (arr) {
  // 边界条件
  if (arr.length <= 1) {
    return arr
  }
  for(let i = 1; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j ++) {
      if (arr[j -1] > arr[j]) {
        swap(arr, j - 1, j)
      }
    }
  }
  return arr
}

// 数字的位运算交换
function swap(arr, i, j) {
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}

console.log(selectionSort([2,5,6,1,3,8,9,11,4,14,1,2,3,4,32,4]))
