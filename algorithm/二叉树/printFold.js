// 折纸问题
function printFold(times) {
  process(times, true)
}

function process(times, show) {
  if (times === 0) {
    return
  }
  process(times -1, true)
  console.log(show ? 0 : 1)
  process(times -1, false)
}

printFold(3)
