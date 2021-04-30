class Promise {
  constructor(executor) {
    let that = this

    function resolve(value) {
      if (that.promiseStatus === 'PENDING') {
        that.promiseStatus = 'RESOLVE'
        that.promiseResult = value
        that.resolveCb.forEach((cb) => {
          try {
            cb()
          } catch (e) {

          }
        })
      }
    }

    function reject(err) {
      if (that.promiseStatus === 'PENDING') {
        that.promiseStatus = 'REJECT'
        that.promiseResult = err
        that.rejectCb.forEach((cb) => {
          cb()
        })
      }
    }

    this.promiseStatus = 'PENDING'
    this.promiseResult = undefined

    this.resolveCb = []
    this.rejectCb = []

    try {
      executor.call(this, resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(resolve, reject) {
    let that = this
    let child = new Promise((resolveThen, rejectThen) => {
      if (resolve && typeof resolve === 'function') {
        that.resolveCb.unshift(() => {
          try {
            let res = resolve.call(that, that.promiseResult)
            resolveThen(res)
          } catch (e) {
            let err = reject.call(that, that.promiseResult)
            rejectThen(err)
          }
        })
      }
      if (reject && typeof reject === 'function') {
        that.rejectCb.unshift(() => {
          try {
            let err = reject.call(that, that.promiseResult)
            rejectThen(err)
          } catch (e) {
            rejectThen(e)
          }
        })
      }
    })
    return child
  }

  catch(reject) {
    let that = this
    return new Promise((resolveThen, rejectThen) => {
      if (reject && typeof reject === 'function') {
        that.rejectCb.unshift(() => {
          try {
            let err = reject.call(that, that.promiseResult)
            rejectThen(err)
          } catch (e) {
            rejectThen(e)
          }
        })
      }
    })
  }

  finally() {

  }

  static all() {

  }

  static race() {

  }

  static resolve() {

  }

  static reject() {

  }
}

const a = new Promise((resolve) => {
  setTimeout(() => {
    resolve('111')
  }, 1000)
})

a.then(res => {
  console.log(res, 1)
  throw Error('error1')
  return 99
}).catch(err => {
  console.log(err, 'error')
})

// a.then(res => {
//   console.log(res, 2)
// })
