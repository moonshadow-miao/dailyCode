{
  // 直观的打印一棵树
  function printBinary(head) {
    const queue = new Queue()
    let cur = head
    queue.add(cur)
    cur.level = 1
    let level = 1
    while (!queue.isEmpty()) {
      cur = queue.poll()
      if (cur.left || cur.right) {
        cur.left && (cur.left.level = cur.level + 1)
        cur.right && (cur.right.level = cur.level + 1)
        queue.add(cur.left)
        queue.add(cur.right)
      }
      if (level !== cur.level) {
        console.log( '\n' )
        level = cur.level
      }
      console.log(cur.value)
    }
  }

  function generatorTree(arr) {
    let nodeList = arr.map(item => item || item === 0 ? new Node(item) : null)
    let head = nodeList[0]
    for(let i = 0; i < nodeList.length; i++) {
      let node = nodeList[i]
      if (node && nodeList[2 * i + 1]) {
        node.left = nodeList[2 * i + 1]
      }
      if (node && nodeList[2 * i + 2]) {
        node.right = nodeList[2 * i + 2]
      }
    }
    return head
  }

  class Node {
    constructor(value) {
      this.value = value
      this.left = null
      this.right = null
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
      return this.head
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

  const head = generatorTree([5, 3, 7, 2, null, 6, 8, 1, 11])

  printBinary(head)

}
