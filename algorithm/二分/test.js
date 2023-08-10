let time = 0
function getMax( arr) {
  return process(arr, 0, arr.length - 1);
}

function process(arr, L, R) {
  time++
  if (L === R) {
    return arr[L];
  }
  let mid = L + ((R - L) >> 1);
  let leftMax = process(arr, L, mid);
  let rightMax = process(arr, mid + 1, R);
  return Math.max(leftMax, rightMax);
}



function generator () {
  const length = Math.floor(Math.random()) * 20 + 20
  return Array(length).fill('').map(() => Math.floor(Math.random() * 40))
}

console.log(getMax(generator()))
console.log(time)
