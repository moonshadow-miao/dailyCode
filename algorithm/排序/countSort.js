// 计数排序
// 特殊的数据状况（如：把员工年龄排序）
function countSort(arr) {
  console.log(arr)
  const bucket = Array(50).fill(0)
  for (let i = 0; i < arr.length;i++) {
    bucket[arr[i]]++
  }
  let index = 0
  for (let i = 0; i < bucket.length;i++) {
    if (bucket[i] > 0 ){
      for (let j = 0; j < bucket[i]; j++) {
        arr[index] = i
        index++
      }
    }
  }
  console.log(arr)
}

function generator () {
  const length = Math.floor(Math.random() * 50)
  return Array(length).fill('').map(() => Math.floor(Math.random() * 50))
}

countSort([17, 48, 35, 22, 21, 36, 0, 35, 46, 28, 7, 3, 1, 5, 11, 9, 27, 1, 26, 17, 30, 43, 11, 30, 21, 15, 30, 3, 49, 46, 37, 16, 15])
