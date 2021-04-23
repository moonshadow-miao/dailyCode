// 一些项目要用一个会议室宣讲，会议室不能同时容纳两个项目的宣讲
// 给定每个项目的开始时间和结束的时间（一个数组），求如何安排，这个会议室进行的宣讲次数最多
function bestArrange(ArrangeList) {
  const priority = new PriorityQueue((a, b) => a.end - b.end)
  ArrangeList.forEach(arrange => priority.offer(arrange))
  let curArrange = priority.poll()
  let result = [curArrange]
  let newArrange = null
  while (priority.size) {
    newArrange = priority.poll()
    if (newArrange.start >= curArrange.end) {
      curArrange = newArrange
      result.push(curArrange)
    }
  }
  console.log(result)
  return result
}

class PriorityQueue {
  constructor(comparator) {
    if (comparator && typeof comparator !== 'function') {
      throw Error
    }
    this.heap = []
    const defaultComparator = (a, b) => (a - b)
    this.comparator = comparator || defaultComparator
    this.size = this.heap.length
  }

  _heapFy() {
    const size = this.heap.length
    if (size < 2) {
      return
    }
    let parentIndex = 0
    let left = parentIndex * 2 + 1
    let right = parentIndex * 2 + 2
    let min = right < size ? this.comparator(this.heap[left], this.heap[right]) < 0 ? left : right : left
    while (left < size && this.comparator(this.heap[parentIndex], this.heap[min]) > 0) {
      this.swap(parentIndex, min)
      parentIndex = min
      left = parentIndex * 2 + 1
      right = parentIndex * 2 + 2
      min = right < size ? this.comparator(this.heap[left], this.heap[right]) < 0 ? left : right : left
    }
  }

  poll() {
    if (this.heap.length) {
      const value = this.heap.shift()
      this.size = this.heap.length
      this._heapFy()
      return value
    }
    return null
  }

  offer(item) {
    this.heap.unshift(item)
    this.size = this.heap.length
    this._heapFy()
  }

  swap(index1, index2) {
    let temp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = temp
  }

  peek() {
    if (this.heap.length) {
      return this.heap[0]
    }
  }
}

bestArrange([{start: 6, end: 8}, {start: 7, end: 10}, {start: 8, end: 11}, {start: 9, end: 10}, {start: 10, end: 14}, {start: 12, end: 16}, {start: 13, end: 16}, {start: 14, end: 18}])

