
function dijkstra(source) {
  const distanceMap = new Map()
  distanceMap.set(source, 0)
  const selectNodes = new Set()
  let minNode = getMinDistanceAndUnselectedNode(distanceMap, selectNodes)
  while (minNode) {
    let distance = distanceMap.get(minNode)
    for (let edge of minNode.edges) {
      let toNode = edge.to
      if (!distanceMap.has(toNode)) {
        distanceMap.set(toNode, distance + edge.weight)
      } else {
        distanceMap.set(edge.to, Math.min(distanceMap.get(toNode), distance + edge.weight))
      }
    }
    selectNodes.add(minNode)
    minNode = getMinDistanceAndUnselectedNode(distanceMap, selectNodes)
  }
  return distanceMap
}

function getMinDistanceAndUnselectedNode(distanceMap, touchedNodes) {
  let minNode = null
  let minDistance = Number.MAX_SAFE_INTEGER
  for (let [node, distance] of distanceMap) {
    if (!touchedNodes.has(node) && distance < minDistance) {
      minNode = node
      minDistance = distance
    }
  }
  return minNode
}


// function dijkstra(source, graph) {
//   let lockedNode = new Set()
//   let curNode = source
//   let minDistanceMap = new Map()
//   for (let node of graph.nodes.values()) {
//     minDistanceMap.set(node, null)
//   }
//   minDistanceMap.set(source, 0)
//   while (lockedNode.size !== graph.nodes.size) {
//     for (let edge of curNode.edges) {
//       if (!lockedNode.has(edge.to)) {
//         if (!minDistanceMap.get(edge.to)) {
//           if(curNode === 'B') {
//             debugger
//           }
//           minDistanceMap.set(edge.to, minDistanceMap.get(curNode) + edge.weight)
//         } else {
//           if(edge.to.value === 'E') {
//             debugger
//           }
//           minDistanceMap.set(edge.to, Math.min(minDistanceMap.get(edge.to), minDistanceMap.get(curNode) + edge.weight))
//         }
//       }
//     }
//     lockedNode.add(curNode)
//     curNode = getMinDistance(minDistanceMap, lockedNode)
//   }
//   console.log(minDistanceMap)
// }
//
// function getMinDistance(minDistanceMap, lockedNode) {
//   let minNode = null
//   for (let node  of minDistanceMap.keys()) {
//     if (!lockedNode.has(node) && minDistanceMap.get(node) !== 0) {
//       minNode = minDistanceMap.get(minNode) && minDistanceMap.get(minNode) < (minDistanceMap.get(node) !== null ? minDistanceMap.get(node) : 10000) ? minNode : node
//     }
//   }
//   return minNode
// }

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

const graph = new GraphGenerator([{weight: 15, from: 'A', to: 'C'}, {weight: 3, from: 'A', to: 'B'}, {weight: 9, from: 'A', to: 'D'}, {weight: 7, from: 'D', to: 'C'}, {weight: 2, from: 'B', to: 'C'}, {weight: 14, from: 'C', to: 'E'}, {weight: 16, from: 'D', to: 'E'}, {weight: 200, from: 'B', to: 'E'}])

const source = graph.nodes.get('A')

console.log(dijkstra(source))

