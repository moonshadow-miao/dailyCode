// 是否是搜索二叉树， 对于任何一个子树来说， 左子树最大值 < 头结点 < 右结点最小值，满足条件的二叉树成为搜索二叉树


// 二叉树递归判断
function isSearchTree(head) {
  return process(head)
}

function process(head) {
  if (!head) {
    return true
  }
  const leftRes = process(head.left)
  const rightRes = process(head.right)
  let isSearch = false
  let max = head.value
  let min = head.value
  if (leftRes) {
    max = Math.max(max, leftRes.max)
    min = Math.min(min, leftRes.min)
  }
  if (rightRes) {
    max = Math.max(max, rightRes.max)
    min = Math.min(min, rightRes.min)
  }
  if (leftRes && rightRes) {
    if (rightRes.min > head.value && head.value > leftRes.max && leftRes.isSearch && rightRes.isSearch) {
      isSearch = true
    }
  }
  if (leftRes || rightRes) {
    isSearch = leftRes ? head.value > leftRes.max && leftRes.isSearch : head.value < rightRes.min && rightRes.isSearch
  }
  if (!leftRes && !rightRes) {
    isSearch = true
  }

  return {isSearch}
}


// 借助递归中序遍历
let preMaxValue = Number.MIN_VALUE
let isSearch = true
function isSearchTree2(head) {
  process2(head)
}

function process2(head) {
  if (!head) {
    return null
  }
  process2(head.left)
  if (preMaxValue > head.value) {
    isSearch = false
    return null
  }
  preMaxValue = head.value
  process2(head.right)
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

const head = generatorTree([5, 3, 7, 2, null, 6, 8, 1, 11])

console.log(head)


console.log(isSearchTree(head))

