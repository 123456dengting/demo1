// 1. 布尔值
var isCheck = false;
console.log(isCheck);
//2. 数字
var age = 18;
console.log(age);
//3. 字符串
var name1 = "bob";
console.log(name1);
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
//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：  let unusable: void = undefined;
//情况下null和undefined是所有类型的子类型。 就是说你可以把null和undefined赋值给number类型的变量。
//类型断言  // 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
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
