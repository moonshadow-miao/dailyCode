class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

let tree = new TreeNode(4)
tree.left = new TreeNode(2)
tree.left.left = new TreeNode(1)
tree.left.right = new TreeNode(3)
tree.right = new TreeNode(6)
tree.right.left = new TreeNode(5)
tree.right.right = new TreeNode(7)

function morris(head) {
  let cur = head
  let mostRightChild = null
  while (cur) {
    if (cur.left) {
      mostRightChild = getMostRightChild(cur)
      if (mostRightChild.right === cur) {
        mostRightChild.right = null
        cur = cur.right
      } else {
        mostRightChild.right = cur
        cur = cur.left
      }
    } else {
      cur = cur.right
    }
  }
}

function getMostRightChild(head) {
  let root = head
  head = head.left
  while (head.right && head.right !== root) {
    head = head.right
  }
  return head
}

// morris 先序遍历
function morrisHead(head) {
  let cur = head
  let mostRightChild = null
  while (cur) {
    if (cur.left) {
      mostRightChild = getMostRightChild(cur)
      if (mostRightChild.right === cur) {
        mostRightChild.right = null
        cur = cur.right
      } else {
        mostRightChild.right = cur
        console.log(cur)
        cur = cur.left
      }
    } else {
      console.log(cur)
      cur = cur.right
    }
  }
}

// morris 中序遍历
function morrisMiddle(head) {
  let cur = head
  let mostRightChild = null
  while (cur) {
    if (cur.left) {
      mostRightChild = getMostRightChild(cur)
      if (mostRightChild.right === cur) {
        mostRightChild.right = null
        console.log(cur)
        cur = cur.right
      } else {
        mostRightChild.right = cur
        cur = cur.left
      }
    } else {
      console.log(cur)
      cur = cur.right
    }
  }
}

// morris 后序遍历
function morrisLast(head) {
  let cur = head
  let mostRightChild = null
  while (cur) {
    if (cur.left) {
      mostRightChild = getMostRightChild(cur)
      if (mostRightChild.right === cur) {
        mostRightChild.right = null
        let last = handleLeftChild(cur.left)
        handleLeftChild(last, true)
        cur = cur.right
      } else {
        mostRightChild.right = cur
        cur = cur.left
      }
    } else {
      cur = cur.right
    }
  }
  let last = handleLeftChild(head)
  handleLeftChild(last, true)
}

function handleLeftChild(head, isConSole) {
  if (!head) {
    return
  }
  let parent = null
  let next = head
  while (head) {
    isConSole && console.log(head)
    next = head.right
    head.right = parent
    parent = head
    head = next
  }
  return parent
}

morrisLast(tree)

