// 求一个结点的后继结点，(中序遍历的条件下, 该数结构多了每个结点多了一个父指针，指向它的父结点)
function successorNode(head, value) {
  console.log(process(head, value))
}

function process(head, value) {
  if (head === null) {
    return null
  }
  if (head.value === value) {
    if (head.right) {
      return getMostLeft(head.right)
    }
    return getLeftNodeMostRight(head)
  }
  const left = process(head.left, value)
  const right = process(head.right, value)
  if (left || right) {
    return left ? left : right
  }
}

// 右结点的最左结点
function getMostLeft(head) {
  let left = head
  while (left.left) {
    left = left.left
  }
  return left
}

// 该结点是祖先结点的 左结点的最右结点
function getLeftNodeMostRight(head) {
  let cur = head
  while (cur) {
    if (!cur.parent) {
      return cur
    }
    if (cur.parent.left === cur) {
      return cur.parent
    }
    cur = cur.parent
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
  head.parent = null
  for (let i = 0; i < nodeList.length; i++) {
    let node = nodeList[i]
    if (node && nodeList[2 * i + 1]) {
      node.left = nodeList[2 * i + 1]
      node.left.parent = node
    }
    if (node && nodeList[2 * i + 2]) {
      node.right = nodeList[2 * i + 2]
      node.right.parent = node
    }
  }
  return head
}

const head = generatorTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

console.log(successorNode(head, 1))

let str = ''
function mid(head) {
  if (head === null) {
    return
  }
  mid(head.left)
  str += `${head.value} `
  mid(head.right)
}

mid(head)
console.log(str)
