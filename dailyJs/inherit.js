// ES 5

{
  function Father(name, age) {
    this.name = name
    this.age = age
  }

  Father.prototype.show = function () {
    console.log(this.name)
  }

  function Child(name, age, sex) {
    Father.call(this, name, age)
    this.sex = sex
  }

  Child.prototype = Object.create(Father.prototype)
  Child.prototype.constructor = Child

  let a = new Child('思聪', 18, 'mele')
  let b = new Father('丹阳', 20)

}

// ES 6
{
  class Father {
    constructor(name, age) {
      this.name = name
      this.age= age
    }

    show() {
      console.log(this.name)
    }
  }

  class Child extends Father {
    constructor(name, age, sex) {
      super(name, age)
      this.sex = sex
    }
  }

  let a = new Child('思聪', 18, 'mele')
  console.log(a)
  let b = new Father('丹阳', 20)
  console.log(b)
}

// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
// 在子类的构造函数中，只有调用super之后，才可以使用this关键字
