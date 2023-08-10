// 是否是完全二叉树  二叉树的深度为h，除第 h 层外，其它各层 (1～h-1) 的结点数都达到最大个数(即1~h-1层为一个满二叉树)，第 h 层所有的结点都连续集中在最左边，这就是完全二叉树。
// 不能树形DP解决

function isCompleteTree(head) {
  let isLeaf = false
  const queue = new Queue()
  queue.add(head)
  while (!queue.isEmpty()) {
    head = queue.poll()
    if (isLeaf && head.left && !head.right) {
      return false
    }
    if (!head.left && head.right) {
      return false
    }
    queue.add(head.left)
    if (head.left && !head.right) {
      isLeaf = true
    }
    queue.add(head.right)
  }
  return true
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

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
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

const head = generatorTree([5, 3, 7, 2, 4, 6, 8, 1, 2, null, 4, 5, 6, 7])

console.log(isCompleteTree(head))
