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

function generateLinkedList(arr) {
  if (!arr.length) {
    return
  }
  const LinkedList = new SingleList(arr[0])
  for (let i = 1; i < arr.length; i++) {
    LinkedList.append(arr[i])
  }
  return LinkedList
}

// // 翻转链表
// function reverse(linkedList) {
//   let oldHead = linkedList.head
//   let newHead = null
//   let pre = null
//   while (oldHead) {
//     pre = newHead
//     newHead = oldHead
//     oldHead = oldHead.next
//     newHead.next = pre
//   }
//   linkedList.head = newHead
//   return linkedList
// }

// 翻转链表
function reverseSingle(linkedList) {
  let head = linkedList.head
  let pre = null
  let next = null
  while (head) {
    next = head.next
    head.next = pre
    pre = head
    head = next
  }
  linkedList.head = pre
  return linkedList
}

// const LinkedList = generateLinkedList([0,1, 2, 3])
// console.log(LinkedList.display())
// reverseSingle(LinkedList)
// console.log(LinkedList.display())

