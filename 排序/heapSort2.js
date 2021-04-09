// 堆排序
function heapSort(arr) {
  if (!arr.length) {
    return null
  }
  if (arr.length === 1) {
    return arr
  }
  // 倒序
  for(let i = arr.length;i >= 0; i--){
    heapify(arr, i, arr.length)
  }
  console.log(arr)
  for(let i = arr.length - 1; i >= 1 ;i--) {
    swap(arr, 0, i)
    heapify(arr, 0, i)
  }
  console.log(arr)
}



// 某个位置，由上向下调整，使之堆化 大顶堆
function heapify(heap, index, size) {
  if (size < 2) {
    return
  }
  let parentIndex = index
  let left = parentIndex * 2 + 1
  let right = parentIndex * 2 + 2
  let min = right < size ? heap[left] < heap[right] ? left : right : left
  while (left < size && heap[parentIndex] > heap[min]) {
    swap(heap, parentIndex, min)
    parentIndex = min
    left = parentIndex * 2 + 1
    right = parentIndex * 2 + 2
    min = right < size ? heap[left] < heap[right] ? left : right : left
  }
}

// 某个位置插入，从下向上调整，堆化 大顶堆
function heapInsert(heap, index, size) {
  let childIndex = index
  let parentIndex = childIndex >> 1
  while ((heap[parentIndex] > heap[childIndex]) && (parentIndex < childIndex)) {
    swap(heap, parentIndex, childIndex)
    childIndex = parentIndex
    parentIndex = childIndex >> 1
  }
}

function swap(arr, index1, index2) {
  arr[index1] = arr[index1] ^ arr[index2]
  arr[index2] = arr[index1] ^ arr[index2]
  arr[index1] = arr[index1] ^ arr[index2]
}

function generator () {
  const length = Math.floor(Math.random()) * 20 + 10
  return Array(length).fill('').map(() => Math.floor(Math.random() * 40))
}


heapSort([22, 7, 18, 0, 15, 9, 14, 5, 37, 12])
