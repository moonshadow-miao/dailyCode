// 规定 1， 2， 3， 4， 5， 6， ···· 26 对应 A，B，C, D , F， .... Z
// 给定一个只有数字字符的字符串，返回有多少种转化结果
// 0 没有对应字符对应，遇到0，可以直接返回0种转化

function convertToLetterString(str) {
  const res = []
  console.log(process(str.split(''), res, 0, ''))
  console.log(res)
}

function process (strList, resList, index, res) {
  if (index === strList.length ) {
    resList.push(res)
    return 1
  }
  if (strList[index] === '0') {
    return 0
  }
  let times = 0
  times += process(strList, resList, index + 1, res + String.fromCharCode(+strList[index] + 64))
  if (+strList[index]  === 2 && +strList[index + 1] < 7 || +strList[index] === 1) {
    res += String.fromCharCode(+(strList[index] + strList[index + 1]) + 64)
    times += process(strList, resList, index + 2, res)
  }
  return times
}

convertToLetterString('1224')
