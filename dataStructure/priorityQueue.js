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

const priorityQueue = new PriorityQueue((a, b) => b.a - a.a);

[{a: 11}, {a: 4}, {a: 13}, {a: 1}, {a: 5}].forEach(e => priorityQueue.offer(e))

console.log(priorityQueue)



