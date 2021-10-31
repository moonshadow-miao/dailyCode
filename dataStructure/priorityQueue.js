class PriorityQueue {
  constructor(list, compare = (a, b) => a - b) {
    this.heap = []
    this.compare = compare
    list.forEach(this.add.bind(this))
  }

  add(val) {
    // 从下往上调整
    this.heap.push(val)
    let childIndex = this.heap.length - 1
    let parentIndex = Math.floor((childIndex - 1) / 2)
    while (parentIndex >= 0) {
      if (this.compare(this.heap[parentIndex], this.heap[childIndex]) > 0) {
        this.swap(parentIndex, childIndex)
      }
      childIndex = parentIndex
      parentIndex = Math.floor((childIndex - 1) / 2)
    }
  }

  offer() {
    if (!this.heap.length) {
      return
    }
    this.swap(0, this.heap.length - 1)
    let val = this.heap.pop()
    this.heapFy()
    return val
  }

  heapFy(index = 0) {
    // 从上往下调整
    let parentIndex = index
    let childIndex = this.compare(this.heap[parentIndex * 2 + 1], this.heap[ parentIndex * 2 +  2]) < 0 ? parentIndex * 2 + 1 : parentIndex * 2 + 2
    while (parentIndex < this.heap.length) {
      if (this.compare(this.heap[parentIndex], this.heap[childIndex]) > 0) {
        this.swap(parentIndex, childIndex)
      }
      parentIndex = childIndex
      childIndex = this.compare(this.heap[parentIndex * 2 + 1], this.heap[ parentIndex * 2 +  2]) < 0 ? parentIndex * 2 + 1 : parentIndex * 2 + 2
    }
  }

  swap(index1, index2) {
    let temp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = temp
    temp = null
  }
}

const priorityQueue = new PriorityQueue((a, b) => b.a - a.a);

[{a: 11}, {a: 4}, {a: 13}, {a: 1}, {a: 5}].forEach(e => priorityQueue.offer(e))

console.log(priorityQueue)



