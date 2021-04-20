// 深度优先遍历
// 利用栈实现，从源节点开始按照深度放入栈，然后弹出，弹出一个结点的时候，把结点的下一个相邻节点入栈，直到栈空

function depthFirstSearch(source) {
  const stack = new Stack()
  stack.push(source)
  const nodeSet = new Set([source])
  console.log(source.value)
  while (!stack.isEmpty()) {
    source = stack.pop()
    for (let node of source.nexts) {
      if (!nodeSet.has(node)) {
        nodeSet.add(node)
        stack.push(source)
        stack.push(node)
        console.log(node.value)
        break
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

class Stack {
  constructor(arr = []) {
    this.head = null
    this.size = 0
    if (arr.length) {
      this.head = new NodeStack(arr[0])
      let newNode = null
      this.size++
      for(let i = 1; i < arr.length; i++) {
        newNode = new NodeStack(arr[i])
        newNode.next = this.head
        this.head = newNode
        this.size++
      }
    }
  }

  push(node) {
    if (!node) {
      return
    }
    if (this.size === 0) {
      this.head = node
      this.size = 1
      return
    }
    node.next = this.head
    this.head = node
    this.size++
  }

  pop() {
    let head = this.head
    this.head = this.head.next
    head.next = null
    this.size--
    return head
  }

  peek() {
    return this.head
  }

  isEmpty() {
    return this.size === 0
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

const graph = new GraphGenerator([{from: 'A', to: 'B'}, {from: 'A', to: 'C'}, {from: 'A', to: 'E'}, {from: 'C', to: 'D'}, {from: 'E', to: 'D'}, {from: 'B', to: 'C'}, {from: 'C', to: 'E'}])

const source = graph.nodes.get('A')

depthFirstSearch(source)

