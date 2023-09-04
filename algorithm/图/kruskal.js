// 求最小生成树 贪心 (克鲁斯卡尔算法 kruskal)
// 将所有边按照权值的大小进行升序排序，然后从小到大一一选择，选择的过程中不能形成环（并查集）
// 最后返回最小生成树，边<List>
function kruskal(graph) {
  //todo 用堆结构来优化
  const unionFind = new UnionFind(graph.nodes.values()) // 把点集变成并查集
  let queue = [...graph.edges].sort((a, b) => a.weight - b.weight)
  let result = []
  let minWeightEdge = null
  while (queue.length) {
    minWeightEdge = queue.shift()
    if (!unionFind.isSameSet(minWeightEdge.from, minWeightEdge.to)) {
      unionFind.union(minWeightEdge.from, minWeightEdge.to)
      result.push(minWeightEdge)
    }
  }
  console.log(result)
  return result
}


// 实现简单版本的并查集
class UnionFind {
  constructor(nodes) {
    this.nodeMap = new Map()
    for(let node of nodes) {
      this.nodeMap.set(node, [node])
    }
  }

  isSameSet(from, to) {
    return this.nodeMap.get(from) === this.nodeMap.get(to)
  }

  union(from, to) {
    const toList = this.nodeMap.get(to)
    const fromList = this.nodeMap.get(from)
    for(let node of toList) {
      fromList.push(node)
      this.nodeMap.set(node, fromList)
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

const graph = new GraphGenerator([{weight: 2, from: 'A', to: 'C'}, {weight: 7, from: 'A', to: 'B'}, {weight: 100, from: 'A', to: 'D'}, {weight: 4, from: 'C', to: 'D'}, {weight: 1000, from: 'B', to: 'D'}, {weight: 100000, from: 'B', to: 'E'}])

kruskal(graph)

