// 逆序一个栈，不能申请额外的数据结果，递归实现
function reverseStack(stack) {
  console.log(process(stack))
}

function process(stack) {
  if (stack.isEmpty()) {
    return stack
  }
  let last = getLastOne(stack)
  let newStack = process(stack)
  newStack.push(last)
  return newStack
}

// 移除栈底元素，并返回这个元素
function getLastOne(stack) {
  let prev = stack.pop()
  if (stack.isEmpty()) {
    return prev
  }
  let last = getLastOne(stack)
  stack.push(prev)
  return last
}

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

reverseStack(new Stack([1, 2, 3, 4]))
