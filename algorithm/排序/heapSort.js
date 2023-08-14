// 堆排序
function heapSort(arr) {
  if (!arr.length) {
    return null
  }
  if (arr.length === 1) {
    return arr
  }
  for(let i = 1; i < arr.length;i++) {
    heapInsert(arr, i, i)
  }
  for(let i = arr.length - 1; i >= 1 ;i--) {
    swap(arr, 0, i)
    heapify(arr, 0, i)
  }
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

// 在一个相对有序（数组每项在调整成有序数组过程移动的次数不超过K次）数组，排序这个数组
function sortArray(arr, k) {
  const heap = new priorityQueue(arr.slice(0, k))
  let index = 0
  while (index < arr.length) {
    arr[index] = heap.poll();
    (index + k < arr.length) && heap.add(arr[index + k]);
    index++
  }
}
const arr = [1, 4, 6, 2, 3, 5, 7, 6, 5, 8]
sortArray(arr, 6)
console.log(arr)
