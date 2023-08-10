// 复制特殊链表（部分节点有特殊指针）
function getCommonPart(link) {
  if (link.size < 2) {
    return null
  }
  let head = link.head
  let next = null
  while (head) {
    next = head.next
    head.next = new Node(head.data)
    head.next.next = next
    head = next
  }

  let newHead = link.head.next

  let cur = newHead
  head = link.head
  while (head.next.next) {
    head.random && (cur.random = head.random.next)
    head.next = cur.next
    head = cur.next
    cur.next = head.next
    cur = head.next
  }
  return newHead
}

class Node {
  constructor(data) {
    this.data = data;  // 节点的数据域
    this.prev = null;  // 节点的指针域
    this.next = null;  // 节点的指针域
    this.random = null
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

const arr1 = [1, 2, 3, 4, 6]

const link = new SingleList(arr1[0])


for (let i = 1; i < arr1.length; i++) {
  link.append(arr1[i])
}

link.head.random = link.head.next.next
link.head.next.random = link.head.next.next.next

console.log(link.head)
console.log(getCommonPart(link))
