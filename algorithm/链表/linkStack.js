class Node {
  constructor(data) {
    this.data = data  // 节点的数据域
    this.prev = null  // 节点的指针域
    this.next = null  // 节点的指针域
  }
}

// 用单链表实现栈
class singleLinkStack {
  constructor() {
    this.last = null
    this.head = null
  }

  pop() {
    if (!this.last) return null
    let cur = this.head
    let prevNode = null
    while (cur.next) {
      prevNode = cur
      cur = cur.next
    }
    if (prevNode) {prevNode.next = null}
    if (!prevNode) {this.head = null}
    this.last = prevNode
    return cur
  }

  push(value) {
    const node = new Node(value)
    if (!this.last) this.head = node
    if (this.last) {
      this.last.next = node
    }
    this.last = node
    return node
  }

  view() {
    const data = []
    let cur = this.head
    while (cur) {
      data.push(cur.data)
      cur = cur.next
    }
    return data
  }
}

// 用双链表实现栈
class doubleLinkStack {
  last = null
  head = null

  pop() {
    if (!this.last) return null
    const popNode = this.last
    this.last = popNode.prev
    popNode.next = popNode.prev = null
    if (!this.last) this.head = null
    if (this.last) this.last.next = null
    return popNode
  }

  push(data) {
    const newNode = new Node(data)
    if (!this.head) {
      this.head = this.last = newNode
      return
    }
    this.last.next = newNode
    newNode.prev = this.last
    this.last = newNode
  }

  view() {
    const data = []
    let cur = this.head
    while (cur) {
      data.push(cur.data)
      cur = cur.next
    }
    return data
  }
}

// 用栈实现队列
class stackQueue {
  stack = []
  queue = []

  shift() {
    if (!this.stack.length && !this.queue.length) return null
    if (!this.queue.length) {
      while (this.stack.length) {
        this.queue.push(this.stack.pop())
      }
    }
    return this.queue.pop()
  }

  push(data) {
    this.stack.push(data)
  }
}

