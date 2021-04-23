// 求最小生成树  (prim)
//
//
function prim(graph) {
  const nodeSet = new Set()
  const result = new Set()
  let minEdges = []
  for (let node of graph.nodes.values()) {
    if (!nodeSet.has(node)) {
      nodeSet.add(node)
      minEdges = setMinEdges(node.edges, minEdges)
      let min = null
      while (minEdges.length) {
        min = minEdges.shift()
        if (!nodeSet.has(min.to)) {
          nodeSet.add(min.to)
          result.add(min)
          minEdges = setMinEdges(min.to.edges, minEdges)
        }
        if (!nodeSet.has(min.from)) {
          nodeSet.add(min.from)
          result.add(min)
          minEdges = setMinEdges(min.from.edges, minEdges)
        }
      }
    }
  }
  console.log(result)
  return result
}

function setMinEdges(edge, minEdges) {
  let edges = new Set(minEdges.concat([...edge]));
  return [...edges].sort((a, b) => a.weight - b.weight)
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
      toNode.nexts.add(fromNode)
      fromNode.out++
      toNode.in++
      fromNode.edges.add(newEdge)
      toNode.edges.add(newEdge)
      graph.edges.add(newEdge)
    }
    return graph
  }
}

const graph = new GraphGenerator([{weight: 6, from: 'A', to: 'B'}, {weight: 1, from: 'A', to: 'C'}, {weight: 5, from: 'A', to: 'D'}, {weight: 5, from: 'B', to: 'C'}, {weight: 5, from: 'C', to: 'D'}, {weight: 3, from: 'B', to: 'E'}, {weight: 6, from: 'C', to: 'E'}, {weight: 4, from: 'C', to: 'F'}, {weight: 2, from: 'D', to: 'F'}, {weight: 6, from: 'E', to: 'F'}])

prim(graph)

