// 将一个数组按照某个数字划分两部分， <n 和 >n 的两部分
function partition2 (arr, num) {
  let index = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= num) {
      swap(arr, index, i)
      index++
    }
  }
  console.log(arr, num,index)
}


// 将一个数组按照某个数字划分三部分， <n 和 =n, >n 的两部分
function partition3 (arr, num) {
  let smallIndex = 0
  let largeIndex = arr.length -1
  for (let i = 0; i <= largeIndex; i++) {
    if (arr[i] < num) {
      swap(arr, smallIndex, i)
      smallIndex++
    }
    if (arr[i] > num) {
      swap(arr, largeIndex, i)
      largeIndex--
      i--
    }
  }
  console.log(arr, smallIndex, largeIndex)
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
  const length = Math.floor(Math.random()) * 10 + 10
  return Array(length).fill('').map(() => Math.floor(Math.random() * 20))
}

partition3([1, 10, 13, 8, 7, 3, 16, 15, 12, 4, 1, 1, 10, 10, 10], 10)
