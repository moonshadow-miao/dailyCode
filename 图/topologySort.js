// 拓扑排序
// 要求有向图，且有入度为0的结点，且没有环

function topologySort(graph) {
  // inMap 存储图中每个节点的 node => node.in （节点 ：入度）
  const inMap = new Map()
  const zeroList = []
  for (let node of graph.nodes.values()) {
    node.in !== 0 && inMap.set(node, node.in)
    node.in === 0 && zeroList.push(node)
  }
  let zeroNode = null
  while (zeroList.length) {
    zeroNode = zeroList.shift()
    console.log(zeroNode.value)
    for(let node of zeroNode.nexts) {
      let inValue = inMap.get(node)
      inMap.set(node, inValue - 1)
      if (inValue - 1 === 0) {
        zeroList.push(node)
      }
    }
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

const graph = new GraphGenerator([{from: 'A', to: 'C'}, {from: 'B', to: 'C'}, {from: 'C', to: 'D'}, {from: 'A', to: 'B'}, {from: 'B', to: 'D'}])

topologySort(graph)
