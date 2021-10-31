const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';

const resolveX = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    return reject(new Error('error'))
  }
  if (x instanceof TPromise) {
    return x.status === PENDING ? x.then(res => {
      resolveX(res, promise2, resolve, reject)
    }) : x.then(resolve, reject)
  }
  let thenHasCalled = false
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then()
      if (typeof then === 'function') {
        then.call(x, function (resolveRes) {
          if (thenHasCalled) {
            return
          }
          thenHasCalled = true
          resolveX(resolveRes, promise2, resolve, reject)
        }, function (rejectRes) {
          if (thenHasCalled) {
            return
          }
          thenHasCalled = true
          reject(rejectRes)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenHasCalled) {
        return
      }
      thenHasCalled = true
      reject(e)
    }
    return
  }
  resolve(x)
}

class TPromise {
  status = PENDING;
  resolveCallBackList = [];
  rejectCallBackList = [];
  value;

  constructor(executor) {
    const resolve = (value) => {
      this.status = RESOLVE;
      this.value = value;
      setTimeout(() => {
        this.resolveCallBackList.forEach(fn => {
          fn(this.value);
        });
      })
    };

    const reject = (reason) => {
      this.status = REJECT;
      this.value = reason;
      setTimeout(() => {
        this.rejectCallBackList.forEach(fn => {
          fn(this.value);
        });
      })
    };

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : x => x
    onRejected = typeof onRejected === 'function' ? onRejected : x => x
    let newPromise
    if (this.status === RESOLVE) {
      return newPromise = new TPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onResolved(this.value)
            resolveX(x, newPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    if (this.status === REJECT) {
      return newPromise = new TPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.value)
            resolveX(x, newPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    if (this.status === PENDING) {
      return newPromise = new TPromise((resolve, reject) => {
        this.resolveCallBackList.push((value) => {
          try {
            const x = onResolved(value)
            resolveX(x, newPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }

        })
        this.rejectCallBackList.push((value) => {
          try {
            const x = onRejected(value)
            resolveX(x, newPromise, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  }

  catch(reject) {
    this.then(undefined, reject)
  }

  finally(cb) {
    this.then(res => {
      return TPromise.resolve(cb()).then(() => res)
    }, err => {
      return TPromise.resolve(cb()).then(() => {
        throw err
      })
    })
  }

  static all(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      throw Error('error')
    }
    return new TPromise((resolve, reject) => {
      let index = 0
      let hasError = false
      let resultList = []
      for (let i = 0; i < arr.length; i++) {
        if (hasError) {
          break
        }
        TPromise.resolve(arr[i]).then(res => {
          resultList[i] = res
          index++
          if (index === arr.length) {
            resolve(resultList)
          }
        }).catch(err => {
          hasError = true
          reject(err)
        })
      }
    })
  }

  static resolve(value) {
    return new TPromise(resolve => resolve(value))
  }

  static reject(err) {
    return new TPromise(undefined, reject => reject(err))
  }

  static race(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      throw Error('error')
    }
    return new TPromise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        TPromise.resolve(arr[i]).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
}
