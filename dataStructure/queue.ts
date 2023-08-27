class LinkNode<T> {
  data: any;
  prev: null;
  next: null;
  constructor(data: T) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

class Queue<T> {
  private head: LinkNode<T> | null
  private size: number
  private last: LinkNode<T> | null
  constructor(arr = []) {
    this.head = null
    this.size = 0
    this.last = null
    if (arr.length) {
      this.head = new LinkNode<T>(arr[0])
      let newNode = null
      let cur = this.head
      this.size++
      for(let i = 1; i < arr.length; i++) {
        newNode = new LinkNode<T>(arr[i])
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

export default Queue
