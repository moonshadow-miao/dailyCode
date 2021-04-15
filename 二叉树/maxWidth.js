// 直观的打印一棵树
function getMaxWidth(head) {
  const queue = new Queue()
  let cur = head
  queue.add(cur)
  cur.level = 1
  let level = 1
  let max = 1
  let curLevelWith = 1
  while (!queue.isEmpty()) {
    cur = queue.poll()
    if (cur.left || cur.right) {
      cur.left && (cur.left.level = cur.level + 1)
      cur.right && (cur.right.level = cur.level + 1)
      queue.add(cur.left)
      queue.add(cur.right)
    }
    curLevelWith++
    if (level !== cur.level) {
      level = cur.level
      max = Math.max(curLevelWith - 1, max)
      curLevelWith = 1
    }
  }
  console.log(max)
}

function getMaxWidth2(head) {
  const queue = new Queue()
  let cur = head
  queue.add(cur)
  let max = 1
  let curLevelWith = 0
  let curEndNode = head
  let nextEndNode = null
  while (!queue.isEmpty()) {
    cur = queue.poll()
    if (cur.left || cur.right) {
      queue.add(cur.left)
      if (cur.left) {
        nextEndNode = cur.left
      }
      queue.add(cur.right)
      if (cur.right) {
        nextEndNode = cur.right
      }
    }
    curLevelWith++
    if (cur === curEndNode) {
      max = Math.max(curLevelWith, max)
      curLevelWith = 0
      curEndNode = nextEndNode
    }
  }
  console.log(max)
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

const head = generatorTree([1, 2, 3, 4, 5, 6, 7, 8, null, 10, null, null, null, null, 15])

getMaxWidth2(head)
