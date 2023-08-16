console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;

// 运行结果 running sum.js, running index.js, 3

// import命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。

// 这是CommonJS中require（）和import之间的区别。使用require()，您可以在运行代码时根据需要加载依赖项。如果我们使用require而不是import，running index.js，running sum.js，3会被依次打印。

/**
 * **************************************************************/


const settings = `{
  username: lydiahallie,
  level: 19,
  health: 90
}`;

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

/**
 * **************************************************************/

const name = "Lydia";
age = 21;

// console.log(delete name);
// console.log(delete age);

// 1. 如果你试图删除的属性不存在，那么delete将不会起任何作用，但仍会返回true

// 2. 如果对象的原型链上有一个与待删除属性同名的属性，那么删除属性之后，对象会使用原型链上的那个属性（也就是说，delete操作只会在自身的属性上起作用）

// 3. 任何使用 var 声明的属性不能从全局作用域或函数的作用域中删除。(会被自动设置为Non-configurable)
//       这样的话，delete操作不能删除任何在全局作用域中的函数（无论这个函数是来自于函数声明或函数表达式）
//       除了在全局作用域中的函数不能被删除，在对象(object)中的函数是能够用delete操作删除的。

// 4. 任何用let或const声明的属性不能够从它被声明的作用域中删除。

// 5. 不可设置的(Non-configurable)属性不能被移除。这意味着像Math, Array, Object内置对象的属性以及使用Object.defineProperty()方法设置为不可设置的属性不能被删除。

/**
 * **************************************************************/

// counter.js
let counter = 10;
export default counter;


// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);
// 引入的模块是   只读 的: 你不能修改引入的模块。只有导出他们的模块才能修改其值。

/**
 * **************************************************************/

const obj = { 1: 'a', 2: 'b', 3: 'c' }
const set = new Set([1, 2, 3, 4, 5])

obj.hasOwnProperty('1') // true
obj.hasOwnProperty(1) // true

/**
 * **************************************************************/
