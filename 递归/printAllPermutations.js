// 打印一个字符串的全排列
function printAllSubString(str) {
  let res = []
  // process(str.split(''), [], res)
  process2(str.split(''), 0, res)
  console.log(res)
}

function process (strList, preSelectList, res) {
  if (preSelectList.length === strList.length) {
    res.push(preSelectList.join(''))
    return
  }
  let strSet = new Set()
  for (let i = preSelectList.length; i < strList.length; i++) {
    if (!strSet.has(strList[i])) {
      strSet.add(strList[i])
      swap(strList, preSelectList.length, i)
      preSelectList.push(strList[preSelectList.length])
      process(strList, preSelectList, res)
      preSelectList.pop()
      swap(strList, preSelectList.length, i)
    }
  }
}

function process2 (strList, lockIndex, res) {
  if (lockIndex === strList.length - 1) {
    res.push(strList.join(''))
    return
  }
  let strSet = new Set()
  for (let i = lockIndex; i < strList.length; i++) {
    if (!strSet.has(strList[i])) {
      strSet.add(strList[i])
      swap(strList, lockIndex, i)
      process2(strList, lockIndex + 1, res)
      swap(strList, lockIndex, i)
    }
  }
}

function swap (strList, index1, index2) {
  if (index2 === index1) {
    return
  }
  let temp = strList[index1]
  strList[index1] = strList[index2]
  strList[index2] = temp
}

printAllSubString('abc')
