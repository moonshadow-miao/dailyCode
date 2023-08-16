class Node {
  constructor(data) {
    this.data = data;  // 节点的数据域
    this.prev = null;  // 节点的指针域
    this.next = null;  // 节点的指针域
  }
}

class Queue {
  constructor(arr = []) {
    this.head = null
    this.size = 0
    this.last = null
    if (arr.length) {
      this.head = new Node(arr[0])
      let newNode = null
      let cur = this.head
      this.size++
      for(let i = 1; i < arr.length; i++) {
        newNode = new Node(arr[i])
        cur.next = newNode
        this.last = newNode
        cur = newNode
        this.size++
      }
    }
  }

  add(node) {
    if (!node) {
      return
    }
    if (this.size === 0) {
      this.head = this.last = node
      this.size = 1
      return
    }
    this.last.next = node
    this.last = node
    this.size++
  }

  poll() {
    if (this.size >= 1) {
      let head = this.head
      this.head = head.next
      head.next = null
      this.size--
      return head
    }
  }

  peek() {
    return this.last
  }

  isEmpty() {
    return this.size === 0
  }

  display() {
    if (!this.size) {
      return []
    }
    let cur = this.head
    let arr = []
    while (cur) {
      arr.push(cur.data)
      cur = cur.next
    }
    return arr
  }
}

console.log(new Queue([1, 2, 3]))
