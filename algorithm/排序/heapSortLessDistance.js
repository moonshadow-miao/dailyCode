// 堆排序
// 数组几乎有序（指：如果把数组完全排好序，每个元素移动的距离可以不超过K，K相对于数组的长度来说比较小）
function heapSort(arr, k) {
  if (!arr.length) {
    return null
  }
  if (arr.length === 1) {
    return arr
  }
  let heap = []
  for(let i = 0; i < k;i++) {
    heap.push(arr[i])
    heapInsert(heap, 0, i)
  }
  for(let i = 0; i < arr.length; i++) {
    arr[i] = heap.shift()
    if (i < (arr.length - k)) {
      heap.push(arr[k + i])
      heapify(heap, 0, k)
    } else {
      heapify(heap, 0, heap.length)
    }

  }
  console.log(arr)
}

// 某个位置，由上向下调整，使之堆化 小顶堆
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

// 某个位置插入，从下向上调整，堆化 小顶堆
function heapInsert(heap, index, size) {
  if (size < 2) {
    return
  }
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

heapSort([1, 3, 2, 4, 6, 5, 9, 7, 8, 12, 11, 14, 13], 4)
