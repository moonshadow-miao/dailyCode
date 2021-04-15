// 是否是搜索二叉树， 对于任何一个子树来说， 左结点 < 头结点 < 右结点，满足条件的二叉树成为搜索二叉树

function isBalanceTree(head) {
  return process(head)
}

function process(head) {
  if (!head) {
    return true
  }
  const left = process(head.left)
  const right = process(head.right)
  let leftValue = head.left ? head.left.value :  -1
  let rightValue = head.right ? head.right.value : 10000
  return left && right && leftValue < head.value && head.value < rightValue
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

const head = generatorTree([5, 3, 7, 2, null, 6, 8, 1])

console.log(isBalanceTree(head))
