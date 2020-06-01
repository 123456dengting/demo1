function Too () {

}

Too.prototype.getName = () => {

}

function Foo  (){

}

Foo.prototype = new Too();

Foo.prototype = Too.prototype


Foo.prototype.addName = () => {

}

Foo.prototype.getAge = () => {

}

Foo.age = 18

let f1 = new Foo()

f1.name = 'aaaa'

let f2 = new Foo()

/**
1.我们需要牢记两点：①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的，
  因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。
2.__proto__(原型链)属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，
  那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，然后返回undefined，通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
3.prototype(原型)属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。
4.constructor(构造器)属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。 

Foo未继承
f1.__proto__ === Foo.prototype
Foo.prototype.constructor === Foo
f1.constructor = f2.constructor = f1.__proto__.constructor = f2.__proto__.constructor = Foo


如果Foo 继承 Too
Foo.prototype === f1.__proto__
Foo.prototype.constructor === f1.__proto__.constructor === Too 
f1.constructor = f2.constructor = f1.__proto__.constructor = f2.__proto__.constructor = Too



 */



function Dog(name) {
  this.name = name
  this.say = function () {
  console.log('name = ' + this.name)
  }
  }
function Cat(name) {
  this.name = name
  this.say = function () {
  console.log('name = ' + this.name)
  }
}

let dog = new Dog('狗')
console.log('dog', dog)

// function _new(fn, ...args) {
//   console.log(fn.prototype)
//   let obj = {}
//   obj.__proto__ = fn.prototype
//   const result = fn.apply(obj, args);
//   console.log('obj', obj, fn)
//   return result instanceof Object ? result : obj;
  
// }

function _new(fn, ...args) {
	const obj = {};
	Object.setPrototypeOf(obj, fn.prototype);
	const result = fn.apply(obj, args);
	// 根据规范，返回 null 和 undefined 不处理，依然返回obj
	return result instanceof Object ? result : obj;
}

let b = '1111'
let a = {c: 0}
let {c = b} = a
console.log( 'ccc', c)


var obj = {
  toString:function(){
      console.log('-----toString')
      return Object.prototype.toString.call(this)
  },
  valueOf:function(){
      console.log('----------valueOf')
      return Object.prototype.valueOf.call(this)
  }
}
console.log(obj);
// console.log(+obj);    //valueOf toString
// console.log(obj=={});    //两个方法都不执行
// console.log(obj==={})       //两个方法都不执行
// console.log(obj=='test')      //valueOf toString
console.log(obj==='test')     //两个方法都不执行
