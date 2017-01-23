#ES6特性  class、static、super、extends

###类class： JavaScript 现有的原型继承的语法糖，用更简洁明了的语法创建对象及处理相关的继承。

**ES5**定义类的方式

    function Person(name, age) {
      this.name = name,
      this.age = age
    }
    person.prototype.msg = function() {
      return this.name + ' ' + this.age;
    }
    
    var tom = new Person('Tom', 22);
    console.log(tom.msg()) //Tom 22

###类定义有两种方式，类声明和类表达式

用类声明方式实现上面**ES5**方式的类定义

    class Person {
      constructor(name, age) {
        this.name = name
        this.age = age
      }
      msg () {
        return `name:${this.name},age:${this.age}`
      }
    }
    let json = new Person('Json',12)
    console.log(json.msg()) //name:Json,age:12

用类表达式实现上面**ES5**方式的类定义

    let Person = class {
      constructor(name, age) {
        this.name = name
        this.age = age
      }
      msg () {
        return `name:${this.name},age:${this.age}`
      }
    }
    let mike = new Person('Mike',12)
    console.log(mike.msg()) //name:Mike,age:12



###static关键字：定义一个类中的静态方法

静态方法可以在类还没有实例化时被调用，但不可以在类实例化后调用。静态方法经常作为程序的工具函数使用。

    class Number {
      static num (n) {
        console.log(n)
      }
    }
    class test extends number {
      static num (n) {
        console.log(n*2)
      }
    }
    var test1 = new Number();
    console.log(Number.num(3)); //3
    console.log(test.num(3)); //6
    //在实例test1中调用num()会抛出异常
    console.log(test1.num()); //Uncaught TypeError: test1.num is not a function



###super关键字&&extends关键字

**super** 关键字用于访问父对象上的函数。**extends**关键词被用在类声明和类表达式上，以创建一个类的子类。

    class Cat { 
      constructor(name) {
        this.name = name;
      }
      
      speak() {
        console.log(this.name + ' makes a noise.');
      }
    }
    
    class Lion extends Cat {
      speak() {
        super.speak();
        console.log(this.name + ' roars.');
      }
    }
    var candy = new Lion('candy')
    candy.speak(); //candy makes a noise.
                   //candy roars.

