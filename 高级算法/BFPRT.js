function BFPRT(arr, index) {
  // console.log([...arr].sort((a, b) => a - b)[index])
  return getBFPRTByRange(arr, 0, arr.length - 1, index)
}

function getBFPRTByRange(arr, start, end, index) {
  if (end - start < 5) {
    return arr.slice(start, end + 1).sort((a, b) => a - b)[index - start]
  }
  let newArr = getMedian(arr, start, end)
  let middleValue = getBFPRTByRange(newArr, 0, newArr.length - 1,(newArr.length / 2) | 0)
  let {left, right} = partition(arr, start, end, middleValue)
  if (index >= left && index <= right) {
    return middleValue
  }
  let value = null
  if (index < left) {
    value = getBFPRTByRange(arr, start, left, index)
  } else {
    value = getBFPRTByRange(arr, right, end, index)
  }
  return value
}

function getMedian(arr, start, end) {
  let i = start
  let newArr = []
  for(;i <= end; i += 5) {
    if (i + 5 <= end) {
      newArr.push(arr[i + 2])
    } else {
      newArr.push(arr[i + ((end - i) / 2 | 0)])
    }
  }
  return newArr
}

function partition(arr, start, end, middleValue) {
  let left = start - 1
  let right = end + 1
  let i = start
  while (i < right) {
    if (arr[i] < middleValue) {
      swap(arr, ++left, i++)
    } else if (arr[i] > middleValue) {
      swap(arr, --right, i)
    } else {
      i++
    }
  }
  left++
  right--
  return {left, right}
}

function swap(arr, index1, index2) {
  if (index2 === index1) {
    return
  }
  let temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

const arr = [33, 40, 16, 9, 13, 44, 23, 11, 47, 5, 27, 45, 17, 48, 25, 2, 50, 40, 9, 33, 34, 36, 16, 36, 32, 7, 23, 10, 29, 47, 44, 12, 42, 19, 21, 33, 49, 31, 50, 50, 15, 24, 21, 41, 18, 29, 18, 16, 6, 40]

const sortArr = [...arr].sort((a, b) => a -b)

console.log(sortArr)
//
for (let index = 0; index < 49; index ++) {
  if (BFPRT([...arr], index) !== sortArr[index]) {
    console.log(BFPRT([...arr], index), index)
  }
}

// console.log(BFPRT([...arr], 8));
