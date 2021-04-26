// 答应一个字符串的全部子序列，包括空字符串
// function printAllSubString(str) {
//   const res = []
//   process(str.split(''), res, 0, '')
//   console.log(res)
// }
//
// function process(strList, res, index, selectStr) {
//   if (index === strList.length) {
//     res.push(selectStr)
//     return
//   }
//   process(strList, res, index + 1, selectStr)
//   process(strList, res, index + 1, selectStr + strList[index])
// }

function printAllSubString(str) {
  const res = []
  process(str.split(''), res, 0)
  console.log(res)
}

function process(strList, res, index) {
  if (index === strList.length) {
    res.push(strList.join(''))
    return
  }
  const temp = strList[index]
  strList[index] = ''
  process(strList, res, index + 1)
  strList[index] = temp
  process(strList, res, index + 1)
}

printAllSubString('abc')
