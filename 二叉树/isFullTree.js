// 是否是满二叉树  一棵深度为k且有 2^k -1 个结点的二叉树称为完全二叉树

function isFullTree(head) {
  const {height, nodes} = process(head)
  console.log(height, nodes)
  return Math.pow(2, height) - 1 === nodes
}

function process(head) {
  if (!head) {
    return {height: 0, nodes: 0}
  }
  const leftHeight = process(head.left)
  const rightHeight = process(head.right)
  const height = Math.max(leftHeight.height, rightHeight.height) + 1
  return {height, nodes: leftHeight.nodes + rightHeight.nodes + 1}
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

const head = generatorTree([5, 3, 7, 2, 4, 6, 8, 1, 2, 3, 4, 5, 6, 7, 8])

console.log(isFullTree(head))
