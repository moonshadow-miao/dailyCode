// 快速排序
function quickSort(arr) {
  console.log(arr)
  if(arr.length <= 1) {
    return arr
  }
  process(arr, 0, arr.length -1)
  console.log(arr)
}

function process(arr, left, right) {
  if (left >= right) {
    return
  }
  const randomIndex = Math.floor(Math.random() * (right - left + 1) + left)
  swap(arr, randomIndex, right)
  const [small, large] = partition(arr, left, right)
  process(arr, left, small -1)
  process(arr, large + 1, right)
}

function partition (arr, left, right) {
  let smallIndex = left
  let largeIndex = right
  const random = arr[right]
  for (let i = left; i <= largeIndex; i++) {
    if (arr[i] < random) {
      swap(arr, smallIndex, i)
      smallIndex++
    }
    if (arr[i] > random) {
      swap(arr, largeIndex, i)
      largeIndex--
      i--
    }
  }
  return [smallIndex, largeIndex]
}

function swap(arr, index1, index2) {
  if (index1 === index2) {
    return
  }
  arr[index1] = arr[index1] ^ arr[index2]
  arr[index2] = arr[index1] ^ arr[index2]
  arr[index1] = arr[index1] ^ arr[index2]
}

function generator () {
  const length = Math.ceil(Math.random() * 10) + 10
  return Array(length).fill('').map(() => Math.ceil(Math.random() * 10))
}

console.log(quickSort(generator()))

// partition([6,3], 0 , 1, 3)
