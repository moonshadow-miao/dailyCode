// js 精度问题


// requestAnimationFrame 优雅降级
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
            nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
}());

// instanceof

function instanceOf (obj, constructor) {
    if (typeof obj !== 'object') {
        return false
    }
    if (typeof constructor !== 'function') {
        return false
    }
    while (Object.getPrototypeOf(obj)) {
        if (Object.getPrototypeOf(obj) === constructor.prototype) {
            return true
        }
        obj = Object.getPrototypeOf(obj)
    }
    return false
}

// map
Array.prototype.map = function(callbackFn, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackFn) !== "[object Function]") {
        throw new TypeError(callbackFn + ' is not a function')
    }
    // 草案中提到要先转换为对象
    let O = Object(this);
    let T = thisArg;


    let len = O.length >>> 0;
    let A = new Array(len);
    for(let k = 0; k < len; k++) {
        // 还记得原型链那一节提到的 in 吗？in 表示在原型链查找
        // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
        if (k in O) {
            let kValue = O[k];
            // 依次传入this, 当前项，当前索引，整个数组
            A[k] = callbackFn.call(T, kValue, k, O);
        }
    }
    return A;
}



// 对象深度拷贝

const getType = obj => Object.prototype.toString.call(obj);

const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const canTraverse = {
    '[object Map]': true,
    '[object Set]': true,
    '[object Array]': true,
    '[object Object]': true,
    '[object Arguments]': true,
};
const mapTag = '[object Map]';
const setTag = '[object Set]';
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const handleRegExp = (target) => {
    const { source, flags } = target;
    return new target.constructor(source, flags);
}

const handleFunc = (func) => {
    // 箭头函数直接返回自身
    if(!func.prototype) return func;
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    // 分别匹配 函数参数 和 函数体
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if(!body) return null;
    if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
    } else {
        return new Function(body[0]);
    }
}

const handleNotTraverse = (target, tag) => {
    const Ctor = target.constructor;
    switch(tag) {
        case boolTag:
            return new Object(Boolean.prototype.valueOf.call(target));
        case numberTag:
            return new Object(Number.prototype.valueOf.call(target));
        case stringTag:
            return new Object(String.prototype.valueOf.call(target));
        case symbolTag:
            return new Object(Symbol.prototype.valueOf.call(target));
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag:
            return handleRegExp(target);
        case funcTag:
            return handleFunc(target);
        default:
            return new Ctor(target);
    }
}

const deepClone = (target, map = new WeakMap()) => {
    if(!isObject(target))
        return target;
    let type = getType(target);
    let cloneTarget;
    if(!canTraverse[type]) {
        // 处理不能遍历的对象
        return handleNotTraverse(target, type);
    }else {
        // 这波操作相当关键，可以保证对象的原型不丢失！
        let ctor = target.constructor;
        cloneTarget = new ctor();
    }

    if(map.get(target))
        return target;
    map.set(target, true);

    if(type === mapTag) {
        //处理Map
        target.forEach((item, key) => {
            cloneTarget.set(deepClone(key, map), deepClone(item, map));
        })
    }

    if(type === setTag) {
        //处理Set
        target.forEach(item => {
            cloneTarget.add(deepClone(item, map));
        })
    }

    // 处理数组和对象
    for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop], map);
        }
    }
    return cloneTarget;
}

class A {
    constructor(name, age) {
        this.name = name
        this.age = age
        this.self  = this
        this.date = new Date()
        this.reg = new RegExp('\d')
        this.symbol = Symbol('miao')
        this.newShow = function () {
            console.log(this)
        }
        this.arrowFn = () => {
            console.log(1111)
        }
    }

    show() {
        console.log(this.name)
    }
}

var a = new A('dy', 18)

// todo 待修改
function deepClone(a, weekMap = new WeakMap()) {
    if (typeof a === 'symbol') {
        return Symbol(a.description)
    }
    if (typeof a !== 'object') {
        return a
    }

    if (Object.prototype.toString.call(a) === '[object Object]') {
        if (weekMap.has(a)) {
            return a
        }
        weekMap.set(a, true)
        let o = Object.create(Object.getPrototypeOf(a))
        Object.keys(a).forEach(key => {
            o[key] = deepClone(a[key], weekMap)
        })
        return o
    }

    if (Object.prototype.toString.call(a) === '[object Function]') {
        return eval(a.toString())
    }

    if (Object.prototype.toString.call(a) === '[object Array]') {
        let o = []
        a.forEach((item, index) => {
            o[index] = deepClone(item)
        })
        return o
    }

    return new a.constructor(a)
}

var b = deepClone(a)


// CommonJS
// 对于基本数据类型，属于复制。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。
// 对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
// 当使用require命令加载某个模块时，就会运行整个模块的代码。
// 当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
// 循环加载时，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

// ES6模块
// ES6模块中的值属于【动态只读引用】。
// 对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
// 对于动态来说，原始值发生变化，import加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。
// 循环加载时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。

// Babel 7 和之前版本的区别

// 输出题
function f() {
    // 题目一：  'a'++ //输出？

    // 题目二
    const obj = {'2': 3, '3': 4, 'length': 2, 'splice': Array.prototype.splice, 'push': Array.prototype.push};
    obj.push(1);
    obj.push(2);
    console.log(obj);
}

