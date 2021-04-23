// 一块金条切成两半，是需要花费和长度值一样的铜板，比如长度为20的金条，不管切割成长度多大的两半，都需要花费20个铜板
// 一群人想分割金条，求解如何分最省钱
// 输入一个数组，返回分割的最小代价

function lessMoneySplitGold(widthList) {
  const heap = new PriorityQueue()
  widthList.forEach(item => heap.offer(item))
  let sum = 0
  let min1 = null
  let min2 = null
  while (heap.heap.length > 1) {
    min1 = heap.poll()
    min2 = heap.poll()
    sum = sum + min1 + min2
    heap.offer(min1 + min2)
  }
  return sum
}

class PriorityQueue {
  constructor(comparator) {
    if (comparator && typeof comparator !== 'function') {
      throw Error
    }
    this.heap = []
    const defaultComparator = (a, b) => (a - b)
    this.comparator = comparator || defaultComparator
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
      this._heapFy()
      return value
    }
    return null
  }

  offer(item) {
    this.heap.unshift(item)
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

console.log(lessMoneySplitGold([20, 30, 40, 50]))
