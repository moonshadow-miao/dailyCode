// 两个链表若相交，返回第一个节点，不相交返回null，两个链表是单链表，但是可能是有环链表

function getCommonIntersectPoint(head1, head2) {
  const link1RingNode = returnRingNode(head1)
  const link2RingNode = returnRingNode(head2)
  if (!link1RingNode && !link2RingNode) {
    return returnIntersectNodeRing(head1, head2)
  }
  if (link2RingNode && link1RingNode) {
    return link1RingNode === link2RingNode ? returnIntersectNodeRing(head1, head2, link1RingNode, link2RingNode) : link1RingNode
  }
  return null
}

function returnIntersectNodeRing(head1, head2, link1RingNode = null, link2RingNode = null) {
  let diff = 0
  let cur1 = head1
  while (cur1.next !== link1RingNode) {
    cur1 = cur1.next
    diff++
  }
  let cur2 = head2
  while (cur2.next !== link2RingNode) {
    cur2 = cur2.next
    diff--
  }
  if (cur1 !== cur2) {
    return null
  }
  let preIterator = diff > 0 ? head1 : head2
  let pre = Math.abs(diff)
  while (pre > 0) {
    preIterator = preIterator.next
    pre--
  }
  let afterIterator = diff > 0 ? head2 : head1
  while (afterIterator) {
    if (afterIterator === preIterator) {
      return preIterator
    }
    afterIterator = afterIterator.next
    preIterator = preIterator.next
  }
}

// 返回有环链表的入环节点
function returnRingNode(head) {
  if (!head.next) {
    return null
  }
  if (!head.next.next) {
    return null
  }
  let slowPoint = head
  let fastPoint = head
  while (fastPoint) {
    if (!fastPoint.next) {
      return null
    }
    if (!fastPoint.next.next) {
      return null
    }
    slowPoint = slowPoint.next
    fastPoint = fastPoint.next.next
    if (slowPoint === fastPoint) {
      break
    }
  }
  slowPoint = head
  while (fastPoint !== slowPoint) {
    fastPoint = fastPoint.next
    slowPoint = slowPoint.next
  }
  return slowPoint
}

class Node {
  constructor(data) {
    this.data = data;  // 节点的数据域
    this.prev = null;  // 节点的指针域
    this.next = null;  // 节点的指针域
  }
}

// 单向链表
class SingleList {
  constructor(head) {
    this.size = 1;  // 单链表的长度
    this.head = new Node(head);  // 表头节点
    this.curNode = this.head;  // 当前节点的指向
  }

  // 在单链表中寻找item元素
  find(item) {
    let node = this.head
    while (node) {
      if (node.data === item) {
        return node
      }
      node = node.next
    }
    return null
  }

  // 向单链表中插入元素
  insert(item, element) {
    const pre = this.find(item)
    if (pre) {
      const next = pre.next
      pre.next = new Node(element)
      pre.next.next = next
      this.size++
    }
  }

  // 在单链表中删除一个节点
  remove(item) {
    let node = this.head
    if (this.head.data === item) {
      this.head = this.size === 1 ? null : node.next
      this.size--
      this.curNode = this.head
      node = null
      return
    }
    let pre = null
    while (node.next) {
      if (node.next.data === item) {
        pre = node
        break
      }
      node = node.next
    }
    if (pre) {
      let cur = pre.next
      pre.next = cur.next
      cur = null
      this.size--
    }
  }

  // 在单链表的尾部添加元素
  append(element) {
    const last = this.findLast()
    if (last) {
      last.next = new Node(element)
      this.size++
    }
  }

  // 获取单链表的最后一个节点
  findLast() {
    if (this.size === 0) {
      return null
    }
    let node = this.head
    while (node.next) {
      node = node.next
    }
    return node
  }

  // 判断单链表是否为空
  isEmpty() {
    return this.size === 0
  }

  // 显示当前节点
  show() {
    return this.curNode
  }

  // 获取单链表的长度
  getLength() {
    return this.size
  }

  // 从当前节点向前移动n个位置
  advance(n, currNode) {
    if (n > this.size || n <= 0) {
      return null
    }
    let node = this.find(currNode)
    while (n > 0 && node) {
      node = node.next
      n--
    }
    return node
  }


  // 单链表的遍历显示
  display() {
    const nodeList = []
    let node = this.head
    while (node) {
      nodeList.push(node)
      node = node.next
    }
    return nodeList
  }

  // 清空单链表
  clear() {
    let node = this.head
    let next = node.next
    while (next) {
      next = node.next
      node = null
    }
    node = next = this.curNode = null
    this.size = 0
  }
}

const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const arr2 = [11, 12, 13]

const link1 = new SingleList(arr1[0])

const link2 = new SingleList(arr2[0])

for (let i = 1; i < arr1.length; i++) {
  link1.append(arr1[i])
}

for (let j = 1; j < arr2.length; j++) {
  link2.append(arr2[j])
}

// console.log(link1.display(), link2.display())

link2.findLast().next = link1.find(6)

link1.findLast().next = link1.find(5)
// link2.findLast().next = link2.find(5)

// console.log(link1.head)

console.log(getCommonIntersectPoint(link1.head, link2.head))
