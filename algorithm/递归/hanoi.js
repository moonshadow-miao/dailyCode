// 汉诺塔问题
// 打印n层汉诺塔从最左边移动到最右边的全过程

function hanoi(n) {

  process(n, 'left', 'right', 'mid')
}

function process(rest, from, to, help) {
  if (rest === 1) {
    console.log(`1 from ${from} to ${to}`)
    return
  }
  process(rest - 1, from, help, to)
  console.log(`${rest} from ${from} to ${to}`)
  process(rest -1, help, to, from)
}

hanoi(3)
