// 给定一个整形数组，代表数值不同的纸牌排成一条线，玩家A和玩家B依次拿走每张纸，规定玩家A先拿，玩家B后拿
// 每个玩家只能拿走最左或者最右的纸牌，玩家A和玩家B都决定聪明，返回最后的胜者的分数

function cardsInLine(arr) {
  if (arr.length === 1) {
    return arr[0]
  }
  if (arr.length === 2) {
    return Math.max(arr[0], arr[1])
  }


  // B 拿先手 (返回 A 得到值)
  function processB(left, right) {
    if (right - left === 0) {
      return 0
    }
    return Math.min(processA(left + 1, right), processA(left, right - 1))
  }


  // A 拿先手 （返回A 得到的值）
  function processA(left, right) {
    if (right - left === 0) {
      return arr[left]
    }
    return Math.max(arr[left] + processB(left + 1, right), arr[right] + processB(left, right - 1))
  }

  return Math.max(processA(0, arr.length -1), processB(0, arr.length - 1))

}

console.log(cardsInLine([1, 2, 100, 4]))
