
function includes(str, child) {
  const nextList = getNextList(child)
  let index = 0
  let indexChild = 0
  while (index < str.length && indexChild < child.length) {
    if(str[index] === child[indexChild]) {
      index++
      indexChild++
    } else if (nextList[indexChild] === - 1) {
      index++
      indexChild = 0
    } else {
      indexChild = nextList[indexChild]
    }
  }
  return indexChild === child.length ? index - indexChild : - 1
}

function getNextList(str) {
  let list = [-1, 0]
  if (str.length <= 2) {
    return list.slice(0, str.length)
  }
  let index = 2
  let pos = 0
  while (index < str.length) {
    if (str[index - 1] === str[pos]) {
      list[index++] = ++pos
    } else if(list[pos] === -1) {
      list[index++] = 0
    } else {
      pos = list[pos]
    }
  }
  return list
}
