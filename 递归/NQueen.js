// N 皇后问题，在n * n的棋盘上摆n 个皇后，要求任意两个皇后不同行，不同列，也不在同一条斜线上，
// 给定一个整数n，返回n皇后的摆法有多少种

function getNQueen(n) {
  return process(n, 0, [])
}

function process (n, row, select) {
  if (row === n) {
    return 1
  }
  let time = 0
  for (let col = 0; col < n; col++) {
    if (isValid(select, row, col)) {
      select[row] = col
      time += process(n, row + 1, select)
    }
  }
  return time
}

function isValid(select, rowIndex, colIndex) {
  for (let i = 0; i < rowIndex; i++) {
    if (Math.abs(colIndex - select[i]) === Math.abs(rowIndex - i)) {
      return false
    }
    if (colIndex === select[i]) {
      return false
    }
  }
  return true
}

console.log(getNQueen(8))

