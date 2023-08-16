// 堆排序
function heapSort(arr) {
  if (!arr.length) {
    return null
  }
  if (arr.length === 1) {
    return arr
  }
  for (let i = 1; i < arr.length; i++) {
    heapInsert(arr, i, i)
  }
  for (let i = arr.length - 1; i >= 1; i--) {
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

function generator() {
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

// 最大线段重合问题，给定很多线段，每个线段都有两个数字表示起始[start, end]，规定 1 线段的开始和结束位置一定的都是整数值 2 线段重合区域的长度必须 >= 1，求：返回线段中重合最多的区域中，包含了几条线段
// 例：[3, 5] [2, 7] [6, 9] [4,7] [3, 6] [4, 6]

function getMaxCoincide(arrList) {
  const queue = new priorityQueue()
  let max = 0
  let index = 0
  arrList = arrList.sort((a, b) => a[0] - b[0]) // important：先要按照线段的起始位置对线段排序
  while (index < arrList.length) {
    const [start, end] = arrList[index]
    queue.add(end) // 把线段的尾节点加入小顶堆
    while (queue.peek() <= start) {  // 依次弹出尾节点 (线段尾节点 <= 当前线段的起始位置）
      queue.poll()
    }
    max = Math.max(max, queue.size)
    index++
  }
  return max
}

const arr = [[3, 5], [2, 3], [6, 9], [4, 7], [3, 6], [4, 6]]
console.log(getMaxCoincide(arr))
