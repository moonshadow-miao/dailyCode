// 给定一个字符串型的数组，找到一种拼接方式，使得把所有字符串拼接起来的字符串有最小的字典序

function lowest(str) {
  return str.sort((a, b) => a - b).reduce((pre, cur) => splicing(pre, cur))
}

function splicing(str1, str2) {
  return str1 + str2 > str2 + str1 ? str2 + str1 : str1 + str2
}

console.log(lowest(['ab', 'b', 'a']))
