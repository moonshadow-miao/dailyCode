## es module
1. script标签的defer或async属性区别：
   * defer是渲染完再执行，async是下载完就执行
   * defer会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的
2. 浏览器对于带有type="module"的script，都是异步加载，且会按照在页面出现的顺序依次执行，**等同于defer**
3. ES6 模块与 CommonJS 模块差异
   * CommonJs module/require 是一个模块实例中包裹函数传入的对象/函数， ES6 中 import/export是语法关键字, import 被导入的变量是只读的
   * CommonJS 输出值： 模块输出的是**一个**值的拷贝(用module.export 接收导出的对象)，ES6 模块输出的是值的引用, 可以导出多个（无论基本类型和复杂类型都是引用传递，修改基本类型也会影响外界）。
   * CommonJS 依赖关系： 模块是运行时加载（动态加载，可以条件加载），ES6 模块是编译时输出接口（静态加载）。
   * CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
   * CommonJs的 this 是当前模块，ES6 Module的 this 是 undefined
## vite组成部分
1. 开发服务器： 基于esbuild
2. 构建指令: 用rollup，预置指令打包代码
