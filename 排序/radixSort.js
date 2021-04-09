// 桶排序

function radixSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let help = []
  let bucket = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const maxBase = getMaxBase(arr)
  for (let i = 1; i <= maxBase; i++) {
    bucket = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    inBucket(arr, bucket, i)
    outBucket(arr, bucket, i, help)
    arr = help
    help = []
  }
  console.log(arr)
}

function getMaxBase(arr) {
  let max = -1
  for (let i = 0; i < arr.length; i++) {
    max = max > arr[i] ? max : arr[i]
  }
  return Math.ceil(Math.log(max) / Math.log(10))
}

function inBucket(arr, bucket, base) {
  for (let i = 0; i < arr.length; i++) {
    let bucketIndex = Math.floor(arr[i] / Math.pow(10, base - 1)) % 10
    bucket[bucketIndex]++
  }
  for (let i = 0; i < bucket.length; i++ ) {
    bucket[i] += (bucket[ i- 1] || 0)
  }
}

function outBucket(arr, bucket, base, help) {
  let index = 0
  for (let i = arr.length - 1; i >= 0; i--) {
    let bucketIndex = Math.floor(arr[i] / Math.pow(10, base - 1)) % 10
    index = bucket[bucketIndex]
    bucket[bucketIndex]--
    help[index - 1] = arr[i]
  }
}

function generator() {
  const length = Math.floor(Math.random()) * 20 + 10
  return Array(length).fill('').map(() => Math.floor(Math.random() * 40))
}

radixSort([13, 2, 10 ,1, 12, 3, 21, 24, 6, 4, 5 , 16, 33, 34, 45, 56])
