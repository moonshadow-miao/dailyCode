// 是否是平衡二叉树  任意一个节点左子树高度和右子树高度之差的绝对值不超过1；

function isBalanceTree(head) {
  return process(head)
}

function process(head) {
  if (!head) {
    return {isBst: true, height: 0}
  }
  const leftHeight = process(head.left)
  const rightHeight = process(head.right)
  if(!(leftHeight.isBst && rightHeight.isBst && Math.abs(leftHeight.height - rightHeight.height) <= 1)) {
    debugger
  }
  return {isBst: leftHeight.isBst && rightHeight.isBst && Math.abs(leftHeight.height - rightHeight.height) <= 1, height: Math.max(leftHeight.height, rightHeight.height) + 1 }
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

const head = generatorTree([5, 3, 7, 2, 4, 6, 8, 1, 11])

console.log(isBalanceTree(head))
