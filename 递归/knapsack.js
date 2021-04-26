// 给定两个长度为N的数组weights, values, weights[i] 和 values[i]分别代表i号物品和价值。给定一个正数bag，表示一个载重bag的袋子，装的物品不能超过这个重量，不能重复装同一个物品
// 返回能装下的最多的价值是多少

function knapsack(weights, values, maxWeight) {
  console.log(process(0,  0))

  function process( weight, index) {
    if (index >= weights.length) {
      return 0
    }
    if (weight + weights[index] > maxWeight) {
      return 0
    }
    return Math.max(process(weight, index + 1), values[index] + process(weight + weights[index], index + 1))
  }

}
knapsack([2, 4, 1, 3, 5], [1, 3, 2, 4, 3], 8)
