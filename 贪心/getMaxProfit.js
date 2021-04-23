// 输入 正数数组 cost 正数数组 profit，costs是每个项目的花费，profit是每个项目的利润
// 输入 正数K，M，K 表示串行最多做K个项目， M 表示启动资金
// 输出 最后获得的最大利润

function getMaxProfit(costs, profits, k, m) {
  const projects = costs.map((cost, index) => ({cost, profit: profits[index]}))
  console.log(projects)
  const priorityForCost = new PriorityQueue((a, b) => a.cost - b.cost)
  projects.forEach(item => priorityForCost.offer(item))
  if (priorityForCost.size === 0) {
    return 0
  }
  const priorityForProfit = new PriorityQueue((a, b) => b.profit - a.profit)
  let rest = k
  let maxProfit = m
  let project = null
  let result = []
  while (rest !== 0) {
    addProfitPriority(maxProfit, priorityForCost, priorityForProfit)
    project = priorityForProfit.poll()
    if (maxProfit < project.cost) {
      return maxProfit
    }
    result.push(project)
    maxProfit += project.profit
    rest--
  }
  console.log(result)
  return maxProfit
}

function addProfitPriority(maxProfit, priorityForCost, priorityForProfit) {
  let project = priorityForCost.poll()
  while (priorityForCost.size && project.cost <= maxProfit) {
    priorityForProfit.offer(project)
    project = priorityForCost.poll()
  }
}

class PriorityQueue {
  constructor(comparator) {
    if (comparator && typeof comparator !== 'function') {
      throw Error
    }
    this.heap = []
    const defaultComparator = (a, b) => (a - b)
    this.comparator = comparator || defaultComparator
    this.size = this.heap.length
  }

  _heapFy() {
    const size = this.heap.length
    if (size < 2) {
      return
    }
    let parentIndex = 0
    let left = parentIndex * 2 + 1
    let right = parentIndex * 2 + 2
    let min = right < size ? this.comparator(this.heap[left], this.heap[right]) < 0 ? left : right : left
    while (left < size && this.comparator(this.heap[parentIndex], this.heap[min]) > 0) {
      this.swap(parentIndex, min)
      parentIndex = min
      left = parentIndex * 2 + 1
      right = parentIndex * 2 + 2
      min = right < size ? this.comparator(this.heap[left], this.heap[right]) < 0 ? left : right : left
    }
  }

  poll() {
    if (this.heap.length) {
      const value = this.heap.shift()
      this.size = this.heap.length
      this._heapFy()
      return value
    }
    return null
  }

  offer(item) {
    this.heap.unshift(item)
    this.size = this.heap.length
    this._heapFy()
  }

  swap(index1, index2) {
    let temp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = temp
  }

  peek() {
    if (this.heap.length) {
      return this.heap[0]
    }
  }
}

const costs = [4, 1, 3, 2, 5, 1, 11, 4]
const profits = [1, 2, 4, 2, 3, 6, 5, 3]

console.log(getMaxProfit(costs, profits, 4, 1))
