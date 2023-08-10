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

console.log(mergeSort(generator()))

