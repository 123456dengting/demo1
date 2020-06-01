//1. 原型链继承

function Parent(){
  this.pro = true
}

SuperType.prototype.Parent = function(){
  return this.pro
}

function Child(){
  this.childPro = false
}

Child.prototype = new Parent()


//2. 计生组合方式继承(es6 使用的就是这种继承)
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType
  subType.prototype = prototype
}

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};


// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance2.colors.push("3"); // ["red", "blue", "green", "3"]

console.log(instance1)
console.log(instance2)
