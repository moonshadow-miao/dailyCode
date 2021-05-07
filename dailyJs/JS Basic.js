// js 精度问题


// 函数柯里化
// sum(2)(3)(4) => 9
//
// function sum(...rest) {
//   console.log(rest)
// }
//
// function curry() {
//   var args = Array.prototype.slice.call(arguments)
//   var fn = function () {
//     var newArgs = args.concat(Array.prototype.slice.call(arguments))
//     return curry.apply(this, newArgs)
//   }
//   fn.toString = function () {
//     return args.reduce(function (a, b) {
//       return a * b
//     })
//   }
//   return fn
// }
//
//
//
// console.log(curry(1, 2, 3)) // 6
// console.log(curry(1, 2)(3)) // 6
// console.log(curry(1)(2, 3)) // 6
// console.log(curry(1)(2)(3)) // 6

function curry (fn, currArgs) {
  return function() {
    let args = [].slice.call(arguments);

    // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
    if (currArgs !== undefined) {
      args = args.concat(currArgs);
    }

    // 递归调用
    if (args.length < fn.length) {
      return curry(fn, args);
    }

    // 递归出口
    return fn.apply(null, args);
  }
}

function sum(a, b, c) {
  console.log(a + b + c);
}

const fn = curry(sum);

console.log(fn(1)(2)(3)) // 6


// requestAnimationFrame
