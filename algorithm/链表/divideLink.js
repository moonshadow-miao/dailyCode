// 将单向链表按某个值，划分左边小，中间相等，右边大的形式
function divide(link, divideNum) {
  if (link.size < 2) {
    return link
  }
  let head = link.head
  let smallerLow = null
  let smallerHigh = null
  let equalLow = null
  let equalHigh = null
  let biggerLow = null
  let biggerHigh = null
  while (head) {
    if (head.data < divideNum) {
      if (smallerHigh) {
        smallerHigh.next = smallerHigh = head
      } else {
        smallerLow = smallerHigh = head
      }
    } else if (head.data === divideNum) {
      if (equalHigh) {
        equalHigh.next = equalHigh = head
      } else {
        equalLow = equalHigh = head
      }
    } else {
      if (biggerHigh) {
        biggerHigh.next = biggerHigh = head
      } else {
        biggerLow = biggerHigh = head
      }
    }
    head = head.next
  }
  let newHead = smallerLow ? smallerLow : equalLow ? equalLow : biggerLow
  if (smallerLow) {
    smallerHigh.next = equalLow ? equalLow : biggerLow ? biggerLow : null
  }
  if (equalLow) {
    equalHigh.next = biggerLow ? biggerLow : null
  }
  link.head = newHead
  return link
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

const arr1 = [1, 2, 5, 4, 6, 9, 7, 8, 3, 4, 0, 10, 12]

const link1 = new SingleList(arr1[0])

for (let i = 1; i < arr1.length; i++) {
  link1.append(arr1[i])
}

console.log(divide(link1, 4))
console.log(link1.display())

