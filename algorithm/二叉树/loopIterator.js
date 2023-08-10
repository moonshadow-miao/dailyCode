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
    this.size = 0
    if (arr.length) {
      this.head = new Node(arr[0])
      let newNode = null
      this.size++
      for(let i = 1; i < arr.length; i++) {
        newNode = new Node(arr[i])
        newNode.next = this.head
        this.head = newNode
        this.size++
      }
    }
  }

  push(node) {
    if (!node) {
      return
    }
    if (this.size === 0) {
      this.head = node
      this.size = 1
      return
    }
    node.next = this.head
    this.head = node
    this.size++
  }

  pop() {
    let head = this.head
    this.head = this.head.next
    head.next = null
    this.size--
    return head
  }

  peek() {
    return this.head
  }

  isEmpty() {
    return this.size === 0
  }
}

// 先序 头 => 左 => 右
function pre(head) {
  const stack = new Stack()
  stack.push(head)
  let node = null
  while(!stack.isEmpty()) {
     node = stack.pop()
    console.log(node.value)
    stack.push(node.right)
    stack.push(node.left)
  }
}

// 中序 左 => 头 => 右
function mid(head) {
  const stack = new Stack()
  stack.push(head)
  let node = head
  while(!stack.isEmpty()) {
    while (node && node.left) {
      stack.push(node.left)
      node = node.left
    }
    node = stack.pop()
    console.log(node.value)
    node = node.right
    stack.push(node)
  }
}

// 后序 左 右 头
function after2 (head) {
  debugger
  let stack = new Stack()
  stack.push(head)
  let cur = null
  let newHead = head
  while (!stack.isEmpty()) {
    cur = stack.peek()
    if (cur.left && newHead !== cur.left && newHead !== cur.right) {
      stack.push(cur.left)
    } else if(cur.right && newHead !== cur.right) {
      stack.push(cur.right)
    } else {
      console.log(stack.pop().value)
      newHead = cur
    }
  }
}

// 后序  头 右 左 的逆序  左 右 头
function after(head) {
  const stack = new Stack()
  stack.push(head)
  let node = head
  let newStack = new Stack()
  while(!stack.isEmpty()) {
    node = stack.pop()
    newStack.push(node)
    stack.push(node.left)
    stack.push(node.right)
  }
  console.log(newStack)
  while(!newStack.isEmpty()) {
    node = newStack.pop()
    console.log(node.value)
  }
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
// pre(head)
// console.log('************')
after2(head)
console.log('************')
// after(head)

