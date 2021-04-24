// 打印一个字符串的全部子序列，包括空字符串
function printAllSubString(str) {
  let res = []
  process(str)
  console.log(res)
}

function process (str, res) {
  if (str) {
    res.push(str)
    return
  }

  process()
}

printAllSubString('abc')
