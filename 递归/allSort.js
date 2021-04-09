function process(str, i, arr) {
  if(i === str.length) {
    arr.push(str)
  }
  const visit= {}
  for(let index = i; index < str.length; index++){
    if (!visit[str[index]]) {
      visit[str[index]] = 1
      i !== index && (str = swap(str, i, index))
      process(str, i+ 1, arr)
      i !== index && (str = swap(str, i, index))
    }
  }
}

// 普通的交换
function swap (str, i, j) {
  let arr = str.split('')
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  return arr.join('')
}

function handle(str) {
  const arr = []
  process(str, 0, arr)
  console.log(arr)
}

handle('aabc')
