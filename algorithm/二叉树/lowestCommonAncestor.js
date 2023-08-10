// 给定两个二叉树上的两个结点，找到这两个结点最近的公共祖先结点

function lowestCommonAncestor(head, head1Value, head2Value) {
  console.log(process(head, head1Value, head2Value))
}

function process(head, head1Value, head2Value) {
  if (head === null || head.value === head1Value || head.value === head2Value) {
    return head
  }
  const left = process(head.left, head1Value, head2Value)
  const right = process(head.right, head1Value, head2Value)
  if (left && right) {
    return head
  }
  if (left || right) {
    return left ? left : right
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
  for (let i = 0; i < nodeList.length; i++) {
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

const head = generatorTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

console.log(lowestCommonAncestor(head, 14, 10))
