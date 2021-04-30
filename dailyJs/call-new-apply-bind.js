function myCall(hostObj) {
  if (hostObj === null) {
    hostObj = Object.create(null)
  }
  const args = Array.from(arguments).slice(1).map(item => JSON.stringify(item))
  let fu = this
  let originFn = hostObj.myCall
  hostObj.myCall = fu
  let fuStr = `hostObj.myCall(${args.join()})`
  eval(fuStr)
  originFn === undefined ? delete hostObj.myCall : hostObj.myCall = originFn
}

function myApply(hostObj, params) {
  if (!Array.isArray(params) && !params.iterator) {
    throw Error('请正确传参')
  }
  if (hostObj === null) {
    hostObj = Object.create(null)
  }
  const args = Array.from(params).map(item => JSON.stringify(item))
  let fu = this
  let originFn = hostObj.myApply
  hostObj.myApply = fu
  let fuStr = `hostObj.myApply(${args.join()})`
  eval(fuStr)
  originFn === undefined ? delete hostObj.myApply : hostObj.myApply = originFn
}

function myBind (hostObj) {
  if (hostObj === null) {
    hostObj = Object.create(null)
  }
  const args = Array.from(arguments).slice(1).map(item => JSON.stringify(item))
  let fu = this
  let originFn = hostObj.myBind
  hostObj.myBind = fu
  return function () {
    const args2 = Array.from(arguments).map(item => JSON.stringify(item))
    eval(`hostObj.myBind(${args.concat(args2).join()})`)
    originFn === undefined ? delete hostObj.myBind : hostObj.myBind = originFn
  }
}

function myNew(classFn) {
  const args = Array.from(arguments).slice(1).map(item => JSON.stringify(item))
  let newObj = Object.create(classFn.prototype)
  newObj.fn = classFn
  const res = eval(`newObj.fn(${args.join()})`)
  delete newObj.fn
  return res === undefined ? newObj : res
}

Function.prototype.myCall = myCall
Function.prototype.myApply = myApply
Function.prototype.myBind = myBind

function Test(name, age) {
  this.name = name
  this.age = age
}

Test.prototype.show = function() {
  console.log(this.age, this.name)
}

let obj = {
  name: '周杰伦'
}

let obj2 = {
  name: '大木老师'
}

const bindFn = Test.myBind(obj, [{a: 1}, {b: 2}])
bindFn('1')

console.log(myNew(Test, '丹阳', '18'))
console.log(new Test('杰伦', '22'))


