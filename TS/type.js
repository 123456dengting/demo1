"use strict";
// 1. 布尔值
var isCheck = false;
console.log(isCheck);
//2. 数字
var age = 18;
console.log(age);
//3. 字符串
var name1 = "bob";
console.log(name1);
const AA = "AAAAA";
////4. 数组
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
console.log(list1);
console.log(list2);
////5. 元组Tuple  元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
var tuple1;
tuple1 = [1, "李四"]; //true、
// tuple1 = ['哭诉',2] ; //err
console.log(tuple1);
//6. 枚举enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
console.log(c); //1
//7. 任意值
var any1 = 4;
any1 = "dadas";
any1 = true;
//8. 空值  void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是void：
//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：  var unusable: void = undefined;
//情况下null和undefined是所有类型的子类型。 就是说你可以把null和undefined赋值给number类型的变量。
//类型断言  // 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。   
//当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
//第一种形式 
var someValue1 = "this is a string";
var strLength1 = someValue1.length;
console.log(someValue1);
console.log(strLength1);
//第二种形式
var someValue2 = "this is a string11111";
var isNull2 = !!someValue2;
var strLength2 = someValue2.length;
console.log(someValue2);
console.log(isNull2);
console.log(strLength2);
//使用泛型，传入某种类型的值，返回某种类型的值
function identity2(arg) {
    return arg;
}
//调用
var output = identity2("myString");
function identity(arg) {
    return arg;
}
var myIdentity = identity;
//泛型类
class GenericNumber {
}
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
var stringNumeric = new GenericNumber();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) { return x + y; };
// alert(stringNumeric.add(stringNumeric.zeroValue, "test"));
//泛型约束
//我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错了。
function loggingIdentity(arg) {
    //console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
function loggingIdentity2(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
//loggingIdentity2("123") success 
//loggingIdentity2(123)   error
//loggingIdentity2({a:1,length:2})  success
//在泛型里使用类类型
function create(c) {
    return new c();
}
//一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。
class BeeKeeper {
}
class ZooKeeper {
}
class Animal {
}
class Bee extends Animal {
}
class Lion extends Animal {
}
function findKeeper(a) {
    return a.prototype.keeper;
}
//findKeeper(Lion).nametag;  // typechecks!
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
console.log(padLeft("Hello world", 4)); // returns "    Hello world"
class UIElement {
    animate(dx, dy, easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}
var button = new UIElement();
button.animate(0, 0, "ease-in");
//button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
