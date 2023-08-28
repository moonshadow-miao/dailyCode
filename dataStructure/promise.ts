const promisesAplusTests = require("promises-aplus-tests")
export {}

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function resolvePromise<T>(promise2: Promise, x: T, resolve: Resolve<T>, reject: Reject) {
    if (promise2 === x) {
        throw TypeError('circular reference')
    }
    if (x instanceof Promise) {
        x.then(res => {
            resolvePromise(promise2, res, resolve, reject)
        }, err => {
            reject(err)
        })
        return
    }
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        let hasCall = false
        try {
            const then = (x as any).then
            if (then && typeof then === 'function') {
                try {
                    then.call(x, (value: T) => {
                        if (!hasCall) {
                            resolvePromise(promise2, value, resolve, reject)
                            hasCall = true
                        }
                    }, (err: any) => {
                        if (!hasCall) {
                            reject(err)
                            hasCall = true
                        }
                    })
                } catch (e) {
                    if (!hasCall) {
                        reject(e)
                        hasCall = true
                    }
                }
            } else {
                resolve(x)
            }
        } catch (e) {
            reject(e)
        }
    } else {
        resolve(x)
    }
}

type Resolve<T> = (value: T) => any
type Reject = (err: any) => any

class Promise<T = any> {
    private states: typeof PENDING | typeof FULFILLED | typeof REJECTED = PENDING
    private value: T
    private reason: any
    private fulFilledCallbackList: Function[] = []
    private rejectedCallbackList: Function[] = []

    constructor(executor: (resolve: Resolve<T>, reject: Reject) => void) {
        const resolve = (value: T) => {
            if (this.states === PENDING) {
                this.value = value
                this.states = FULFILLED
                queueMicrotask(() => {
                    this.fulFilledCallbackList.forEach(callback => callback())
                })
            }
        }

        const reject = (error: any) => {
            if (this.states === PENDING) {
                this.reason = error
                this.states = REJECTED
                queueMicrotask(() => {
                    this.rejectedCallbackList.forEach(callback => callback())
                })
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then = (onFulfilled?: Resolve<T>, onRejected?: Reject) => {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        }
        if (this.states === FULFILLED) {
            return this.handleFulFilled(onFulfilled)
        }
        if (this.states === REJECTED) {
            return this.handleReject(onRejected)
        }
        let p: Promise
        return p = new Promise((resolve, reject) => {
            this.fulFilledCallbackList.push(() => {
                try {
                    resolvePromise(p, onFulfilled(this.value), resolve, reject)
                } catch (e) {
                    reject(e)
                }

            })
            this.rejectedCallbackList.push(() => {
                try {
                    resolvePromise(p, onRejected(this.reason), resolve, reject)
                } catch (e) {
                    reject(e)
                }

            })
        })
    }

    catch = (onRejected?: (err: any) => any) => {
        return this.then(undefined, onRejected)
    }

    finally = (callback: () => any) => {
        return this.then(res => {
            return Promise.resolve(callback()).then(() => res)
        }, err => {
            return Promise.reject(callback()).catch(() => err)
        })
    }

    private handleFulFilled(onFulfilled: Resolve<T>): Promise {
        let p: Promise
        return p = new Promise((resolve, reject) => {
            queueMicrotask(() => {
                try {
                    const x = onFulfilled(this.value)
                    resolvePromise(p, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    private handleReject(onRejected: Reject) {
        let p: Promise
        return p = new Promise((resolve, reject) => {
            queueMicrotask(() => {
                try {
                    const x = onRejected(this.reason)
                    resolvePromise(p, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    static resolve(value: any) {
        if (value instanceof Promise) return value
        return new Promise(resolve => resolve(value))
    }

    static reject(err: any) {
        if (err instanceof Promise) return err
        return new Promise((_, reject) => reject(err))
    }

    static all(list: any[]) {
        return new Promise((resolve, reject) => {
            const resolveList = []
            let count = 0
            const done = (res: any, index: number) => {
                count++
                resolveList[index] = res
                if (count === list.length) {
                    resolve(resolveList)
                }
            }
            list.forEach((item, index) => {
                Promise.resolve(item).then(res => done(res, index)).catch(reject)
            })
        })
    }

    static race(list: any[]) {
        return new Promise((resolve, reject) => {
            list.forEach((item, index) => {
                Promise.resolve(item).then(resolve).catch(reject)
            })
        })
    }

    static allSettled(list: any[]) {
        return new Promise((resolve, reject) => {
            let count = 0
            const done = () => {
                count++
                if (count === list.length) {
                    resolve(res)
                }
            }
            const res = list.map(item => {
                return Promise.resolve(item).finally(done)
            })
        })
    }

    static any(list: any[]) {
        return new Promise((resolve, reject) => {
            const rejectList = []
            let count = 0
            const rejectHandle = (err: any, index: number) => {
                count++
                rejectList[index] = err
                if (count === list.length) {
                    reject(rejectList)
                }
            }
            list.forEach((item, index) => {
                Promise.resolve(item).then(resolve).catch(err => {
                    rejectHandle(err, index)
                })
            })
        })
    }

    static deferred() {
        var result: any = {};
        result.promise = new Promise(function (resolve, reject) {
            result.resolve = resolve;
            result.reject = reject;
        });
        return result;
    }
}

promisesAplusTests(Promise, function (err) {
    // All done; output is in the console. Or check `err` for number of failures.
    console.log(err)
});
