class Node {
  constructor(data) {
    this.data = data;  // 节点的数据域
    this.prev = null;  // 节点的指针域
    this.next = null;  // 节点的指针域
  }
}

class Stack {
  constructor(arr = []) {
    this.head = null
    this.last = null
    this.size = 0
    if (arr.length) {
      this.head = this.last = new Node(arr[0])
      let newNode = null
      let head = this.head
      this.size++
      for(let i = 1; i < arr.length; i++) {
        newNode = new Node(arr[i])
        head.next = newNode
        this.last = head = newNode
        this.size++
      }
    }
  }

  push(value) {
    const newNode = new Node(value)
    if (this.size === 0) {
      this.head = this.last = newNode
      this.size = 1
      return
    }
    this.last.next = newNode
    this.last = newNode
    this.size++
  }

  pop() {
    let head = this.head
    this.head = this.head.next
    head.next = null
    this.size--
    return head
  }

  isEmpty() {
    return this.size === 0
  }
}

// 先序
function pre(head) {

}

// 中序
function mid(head) {

}

// 后序
function after(head) {

}

function generatorTree(arr) {
  class Node {
    constructor(value) {
      this.value = value
      this.left = null
      this.right = null
    }
  }
  let nodeList = arr.map(item => new Node(item))
  let head = nodeList[0]
  for(let i = 0; i < nodeList.length; i++) {
    let node = nodeList[i]
    if (nodeList[2 * i + 1]) {
      node.left = nodeList[2 * i + 1]
    }
    if (nodeList[2 * i + 2]) {
      node.right = nodeList[2 * i + 2]
    }
  }
  return head
}

const head = generatorTree([1, 2, 3, 4, 5, 6, 7])
pre(head)
console.log('************')
mid(head)
console.log('************')
after(head)
