// 递归，归并排序
function mergeSort(arr) {
  if (!arr.length) {
    return null
  }
  if (arr.length === 1) {
    return arr[0]
  }
  process(arr, 0, arr.length - 1)
  return arr
}

function merge(arr, left, right, mid) {
  if (mid >= arr.length - 1) return
  right = right >= arr.length - 1 ? arr.length - 1 : right
  let arr1Index = left
  let arr2Index = mid + 1
  let newArr = []
  while (arr1Index <= mid && arr2Index <= right) {
    if (arr[arr1Index] <= arr[arr2Index]) {
      newArr.push(arr[arr1Index])
      arr1Index++
    }else {
      newArr.push(arr[arr2Index])
      arr2Index++
    }
  }
  while (arr1Index <= mid) {
    newArr.push(arr[arr1Index])
    arr1Index++
  }
  while (arr2Index <= right) {
    newArr.push(arr[arr2Index])
    arr2Index++
  }
  let i = 0
  for (; i < newArr.length; i++) {
    arr[left + i] = newArr[i];
  }
}

function process (arr, left, right) {
  if (left === right) {
    return
  }
  const mid = left + ((right - left) >> 1)
  process(arr, left, mid)
  process(arr, mid + 1, right)
  merge(arr, left, right, mid)
}

function generator () {
  const length = Math.floor(Math.random()) * 20 + 10
  return Array(length).fill('').map(() => Math.floor(Math.random() * 40))
}

// 归并排序的非递归
function mergeSortWithoutRecursion(arr) {
  if (!arr.length) return []
  let step = 1
  let left = 0
  let mid = left + step - 1
  mid = mid > arr.length - 1 ? arr.length - 1 : mid
  while (step < arr.length) {
    merge(arr, left, mid + step, mid)
    left = mid + step + 1
    if (left > arr.length - 1) {
      step = step << 1
      left = 0
    }
    mid = left + step - 1
    mid = mid > arr.length - 1 ? arr.length - 1 : mid
  }
}

// const arr = generator()
// console.log('排序前', arr)
// mergeSortWithoutRecursion(arr)
// console.log('排序后', arr, `结果：${arr.toString() === arr.sort((a, b) => a - b).toString()}`)


// 逆序对问题
// 在一个数组中，其中存在一项，大于右边的某项，数组中这两项称一组逆序对，求数组中有多少个逆序对
// 如 [1, 3, 2, 6, 5] 存在[3, 2] [6, 5]两个逆序对
function revertedSort(arr) {
  function merge(arr, left, mid, right) {
    let nums = 0
    let leftIndex = mid
    let rightIndex = right
    const sortArr = []
    while (leftIndex >= left && rightIndex > mid) {
      arr[leftIndex] > arr[rightIndex] && (nums += rightIndex - mid)
      sortArr.push(arr[leftIndex] > arr[rightIndex] ? arr[leftIndex--] : arr[rightIndex--])
    }
    while (leftIndex >= left) {
      sortArr.push(arr[leftIndex--])
    }
    while (rightIndex > mid) {
      sortArr.push(arr[rightIndex--])
    }
    let originIndex = left
    for(let index = sortArr.length - 1; index >= 0; index--, originIndex++) {
      arr[originIndex] = sortArr[index]
    }
    return nums
  }
  function process (arr, left, right) {
    if (left === right) {
      return 0
    }
    const mid = (left + right) >> 1
    const leftNums = process(arr, left, mid)
    const rightNums = process(arr, mid + 1, right)
    return leftNums + rightNums + merge(arr, left, mid, right)
  }
  return process(arr, 0, arr.length - 1)
}


