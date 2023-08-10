
// 先序
function pre(head) {
  if (head === null) {
    return
  }
  console.log(head.value)
  pre(head.left)
  pre(head.right)
}

// 中序
function mid(head) {
  if (head === null) {
    return
  }
  mid(head.left)
  console.log(head.value)
  mid(head.right)
}

// 后序
function after(head) {
  if (head === null) {
    return
  }
  after(head.left)
  after(head.right)
  console.log(head.value)
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
