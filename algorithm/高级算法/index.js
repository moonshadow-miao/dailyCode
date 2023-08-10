class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

let tree = new TreeNode(4)
let b = tree.left = new TreeNode(2)
tree.left.left = new TreeNode(1)
let a = tree.left.right = new TreeNode(3)
tree.right = new TreeNode(6)
tree.right.left = new TreeNode(5)
tree.right.right = new TreeNode(7)
// tree.left.left.left = new TreeNode(8)
// tree.left.left.right = new TreeNode(9)
// tree.left.right.left = new TreeNode(10)

let tree2 = new TreeNode(-2)
// tree2.left = new TreeNode(4)
tree2.right = new TreeNode(-3)
// tree2.right.left = new TreeNode(3)
// tree2.right.right = new TreeNode(7)


class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

let head = new Node(5)
// head.next = new Node(9)
// head.next.next = new Node(1)
// let four = head.next.next.next = new Node(9)
// let five = head.next.next.next.next = new Node(9)
// let six = head.next.next.next.next.next = new Node(9)
// let seven = head.next.next.next.next.next.next = new Node(9)

let head2 = new Node(5)
// head2.next = new Node(9)
// head2.next.next = new Node(9)
// head2.next.next.next = new Node(9)


let head3 = new Node(1)
head3.next = new Node(2)
// head3.next.next = new Node(3)
// head3.next.next.next = new Node(4)
// head3.next.next.next.next = new Node(5)
// head3.next.next.next.next.next = new Node(6)
// head3.next.next.next.next.next.next = new Node(7)


class NNode {
  constructor(val, children) {
    this.val = val
    this.children = children
  }
}

let nNode = new NNode(1)
nNode.children = [new NNode(3, [new NNode(5), new NNode(6)]), new NNode(2), new NNode(4)]

class PriorityQueue {
  constructor(list, compare = (a, b) => a - b) {
    this.heap = []
    this.size = 0
    this.compare = compare
    list.forEach(this.add.bind(this))
    this.size = list.length
  }

  add(val) {
    // 从下往上调整
    this.heap.push(val)
    this.size++
    let childIndex = this.heap.length - 1
    let parentIndex = Math.floor((childIndex - 1) / 2)
    while (parentIndex >= 0 && parentIndex < this.heap.length) {
      if (this.compare(this.heap[parentIndex], this.heap[childIndex]) > 0) {
        this.swap(parentIndex, childIndex)
      }
      childIndex = parentIndex
      parentIndex = Math.floor((childIndex - 1) / 2)
    }
  }

  offer() {
    if (!this.heap.length) {
      return
    }
    if (this.size === 1) {
      this.size--
      return this.heap.pop()
    }
    this.swap(0, this.heap.length - 1)
    let val = this.heap.pop()
    this.heapFy()
    this.size--
    return val
  }

  heapFy(index = 0) {
    // 从上往下调整
    let parentIndex = index
    let leftChildIndex = parentIndex * 2 + 1
    let rightChildIndex = parentIndex * 2 + 2
    if (leftChildIndex > this.heap.length - 1) {
      return
    }
    let childIndex = rightChildIndex > this.heap.length ? this.compare(this.heap[leftChildIndex], this.heap[rightChildIndex]) < 0 ? leftChildIndex : rightChildIndex : leftChildIndex
    while (parentIndex < this.heap.length) {
      if (this.compare(this.heap[parentIndex], this.heap[childIndex]) > 0) {
        this.swap(parentIndex, childIndex)
      }
      parentIndex = childIndex
      leftChildIndex = parentIndex * 2 + 1
      rightChildIndex = parentIndex * 2 + 2
      if (leftChildIndex > this.heap.length - 1) {
        return
      }
      childIndex = rightChildIndex < this.heap.length ? this.compare(this.heap[leftChildIndex], this.heap[rightChildIndex]) < 0 ? leftChildIndex : rightChildIndex : leftChildIndex
    }
  }

  swap(index1, index2) {
    let temp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = temp
    temp = null
  }

  peek() {
    return this.heap[0]
  }
}

let level = 3

let step = 1

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let linkHead = head
  let fast = linkHead
  let slow = linkHead
  if (!linkHead) {
    return head
  }
  let length = 1
  while (fast && fast.next) {
    if (!fast.next.next) {
      length += 1
      break
    } else {
      fast = fast.next.next
      length += 2
    }
    slow = slow.next
  }
  if (length < n) {
    return head
  }
  let prev = null
  let dest = 0
  if (n >= (length / 2 | 0)) {
    slow = head
    dest = length - n
  } else {
    dest = (length / 2 | 0) - n + 1
  }
  while (dest) {
    prev = slow
    slow = slow.next
    dest--
  }
  if (prev) {
    prev.next = slow.next
  } else {
    return head.next
  }
  return head
};


// [-1, 0, 0, 0, 1, 2, 3]
// console.log(includes('abcabcabcd', 'abcab'))

let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

class Trie {
  constructor({id, name, pid}) {
    this.id = id
    this.name = name
    this.pid = pid
    this.children = []
  }
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {

};

console.log(search([4, 5, 6, 7, 0, 1, 2], 0))
