// 在数组上获取最小和, 归并排序，深度改写merge方法
function smallSum(arr) {
  if (!arr.length) {
    return null
  }
  if (arr.length === 1) {
    return arr[0]
  }
  console.log('排序前', arr)
  const sum = process(arr, 0, arr.length - 1)
  console.log('排序后', arr)
  console.log('最小和', sum)
}

function merge(arr, left, right, mid) {
  let leftIndex = left
  let rightIndex = mid + 1
  let newArr = []
  let sum = 0
  while (leftIndex <= mid && rightIndex <= right) {
    if (arr[leftIndex] < arr[rightIndex]) {
      sum += arr[leftIndex] * (right - rightIndex + 1) // 小和只在左右子树比较时产生
      newArr.push(arr[leftIndex])
      leftIndex++
    }else {
      newArr.push(arr[rightIndex])
      rightIndex++
    }
  }
  while (leftIndex <= mid) {
    newArr.push(arr[leftIndex])
    leftIndex++
  }
  while (rightIndex <= right) {
    newArr.push(arr[rightIndex])
    rightIndex++
  }
  let i = 0
  for (; i < newArr.length; i++) {
    arr[left + i] = newArr[i];
  }
  return sum
}

function process (arr, left, right) {
  if (left === right) {
    return 0
  }
  const mid = left + ((right - left) >> 1)
  const sum1 = process(arr, left, mid)
  const sum2 = process(arr, mid + 1, right)
  const sum3 = merge(arr, left, right, mid)
  return sum1 + sum2 + sum3
}

function generator () {
  const length = Math.ceil(Math.random() * 5)
  return Array(length).fill('').map(() => Math.ceil(Math.random() * 10))
}

console.log(smallSum([1,3,4,2,5]))

