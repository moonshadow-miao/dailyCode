// N 皇后问题，在n * n的棋盘上摆n 个皇后，要求任意两个皇后不同行，不同列，也不在同一条斜线上，
// 给定一个整数n，返回n皇后的摆法有多少种

function getNQueen(n) {
  if(n <= 3) {
    return 0
  }
  if (n > 31) {
    return null
  }
  debugger
  return process(n, 0)
}

function process (n, select) {
  if (select === ((1 << n) - 1)) {
    return 1
  }
  let time = 0
  for (let col = 0; col < n; col++) {
    if (isValid(n, col, select)) {
      time += process(n, select| (1 << col))
    }
  }
  return time
}

function isValid(n, colIndex, select) {
  let limit = select | (select << 1) | (select >> 1) & ((1 << n) - 1)
  let res = (limit & (1 << colIndex)) === 0
  return res
}

console.log(getNQueen(4))

