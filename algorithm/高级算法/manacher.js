
function manacher(str) {
  if (!str) {
    return 0
  }
  let strList = str.split('')
  if (!strList.length) {
    return ''
  }
  let string = '#' + strList.join('#') + '#'
  let index = 0
  let right = -1
  let center = -1
  let radiusList = []
  let symmetricPos = 0
  let max = -1
  let maxRadiusIndex = -1
  for (; index < string.length; index++) {
    symmetricPos = 2 * index - center
    let radius = right > index ? Math.min(right - index, radiusList[symmetricPos] || 1)  : 1
    while (string[index + radius] === string[index - radius] && index + radius < string.length && index - radius >= 0) {
      radius++
    }
    if (index + radius > right) {
      right = index + radius
      center = index
    }
    radiusList[index] = radius
    if (radius > max) {
      max = radius
      maxRadiusIndex = index
    }
  }
  return string.slice(maxRadiusIndex - max + 1, maxRadiusIndex + max).replace(/#/g, '')
}

console.log(manacher('ac'));
console.log(manacher('a'));
