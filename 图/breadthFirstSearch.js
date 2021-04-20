// 图的宽度优先遍历 利用队列实现，从源节点开始依次按照宽度进队，然后弹出，弹出一个点的时候把该节点的所有相邻节点入队，直到队列为空
function breadthFirstSearch(source) {
  const queue = new Queue()
  const nodeSet = new Set()
  queue.add(source)
  nodeSet.add(source)
  while (!queue.isEmpty()) {
    source = queue.poll()
    console.log(source.value)
    for (let node of source.nexts) {
      if (!nodeSet.has(node)) {
        queue.add(node)
        nodeSet.add(node)
      }
    }
  }
}



class NodeStack {
  constructor(data) {
    this.data = data;  // 节点的数据域
    this.prev = null;  // 节点的指针域
    this.next = null;  // 节点的指针域
  }
}

class Queue {
  constructor(arr = []) {
    this.head = null
    this.size = 0
    this.last = null
    if (arr.length) {
      this.head = new NodeStack(arr[0])
      let newNode = null
      let cur = this.head
      this.size++
      for(let i = 1; i < arr.length; i++) {
        newNode = new NodeStack(arr[i])
        cur.next = newNode
        this.last = newNode
        cur = newNode
        this.size++
      }
    }
  }

  add(node) {
    if (!node) {
      return
    }
    if (this.size === 0) {
      this.head = this.last = node
      this.size = 1
      return
    }
    this.last.next = node
    this.last = node
    this.size++
  }

  poll() {
    if (this.size >= 1) {
      let head = this.head
      this.head = head.next
      head.next = null
      this.size--
      return head
    }
  }

  peek() {
    return this.last
  }

  isEmpty() {
    return this.size === 0
  }

  display() {
    if (!this.size) {
      return []
    }
    let cur = this.head
    let arr = []
    while (cur) {
      arr.push(cur.data)
      cur = cur.next
    }
    return arr
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.in = 0 // 入度
    this.out = 0 // 出度
    this.nexts = new Set() // 相邻点的集合
    this.edges = new Set() // 边的集合
  }
}

class Edge {
  weight = 0 // 边的值
  constructor(weight, from , to) {
    this.weight = weight
    this.from = from // 起点
    this.to = to // 终点
  }
}

class Graph {
  constructor() {
    this.nodes = new Map()
    this.edges = new Set()
  }
}

class GraphGenerator {
  // matrix 原始数据矩阵
  constructor(matrix) {
    const graph = new Graph()
    for (let i = 0; i < matrix.length; i++) {
      let weight = matrix[i].weight
      let from = matrix[i].from
      let to = matrix[i].to
      if (!graph.nodes.has(from)) {
        graph.nodes.set(from, new Node(from))
      }
      if (!graph.nodes.has(to)) {
        graph.nodes.set(to, new Node(to))
      }
      let fromNode = graph.nodes.get(from)
      let toNode = graph.nodes.get(to)
      let newEdge = new Edge(weight, fromNode, toNode)
      fromNode.nexts.add(toNode)
      fromNode.out++
      toNode.in++
      fromNode.edges.add(newEdge)
      graph.edges.add(newEdge)
    }
    return graph
  }
}

const graph = new GraphGenerator([{from: 'A', to: 'B'}, {from: 'A', to: 'C'}, {from: 'A', to: 'D'}, {from: 'A', to: 'D'}, {from: 'B', to: 'C'}, {from: 'C', to: 'D'}, {from: 'B', to: 'E'}, {from: 'D', to: 'E'}])

const source = graph.nodes.get('A')

breadthFirstSearch(source)

