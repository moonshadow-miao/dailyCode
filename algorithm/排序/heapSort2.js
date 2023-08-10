function heapSort(nums) {
  let heap = new Heap(nums)
  while (heap.size) {
    swap(heap.heap, 0, --heap.size)
    heap.heapfy(0, heap.size)
  }
}

function Heap(arr) {
  this.heap = arr
  this.size = 0
  arr.forEach(() => {
    this.heapInsert()
  })
}

Heap.prototype.heapInsert = function () {
  this.size++
  let cur = this.size - 1
  let parent = cur >> 1
  while (this.heap[cur] > this.heap[parent] && parent >= 0) {
    swap(this.heap, cur, parent)
    cur = parent
    parent = cur >> 1
  }
}

Heap.prototype.heapfy = function (index, size) {
  let left = (index << 1) + 1
  let min = left + 1 < size && this.heap[left + 1] > this.heap[left] ? left + 1 : left
  while (left < size && this.heap[min] > this.heap[index]) {
    swap(this.heap, min, index)
    index = min
    left = (index << 1) + 1
    min = left + 1 < size && this.heap[left + 1] > this.heap[left] ? left + 1 : left
  }
}

function swap (arr, index1, index2) {
  let temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

var nums = (function () {
  let length = Math.random() * 20 | 0
  return new Array(length).fill(0).map(() => Math.random() * 20 | 0)
})()

console.log(nums)

heapSort(nums)

console.log(nums);
