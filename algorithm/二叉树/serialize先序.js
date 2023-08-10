let str = ''
function serialize(head) {
  pre(head, str)
  return str
}

// 先序
function pre(head) {
  if (head === null) {
    str += '#,'
    return
  }
  str += head.value
  str += ','
  pre(head.left)
  pre(head.right)
}

function deserialization(string) {
  const strList = str.split(',')
  let head = generator(strList)
  console.log(string)
  console.log(head)
  str= ''
  console.log(serialize(head))
}

function generator(strList) {
  let headStr = strList.shift()
  if (headStr === '#') {
    return null
  }
  let head = new Node(headStr)
  head.left = generator(strList)
  head.right = generator(strList)
  return head
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

const head = generatorTree([1, 2, 3, null, 5, 6, null, null, null, 10, 11, null, 13])

deserialization(serialize(head))
