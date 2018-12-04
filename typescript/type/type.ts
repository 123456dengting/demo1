// 1. 布尔值
let isCheck : boolean = false;
console.log(isCheck)
//2. 数字
let age : number = 18;
console.log(age)
//3. 字符串
let name1: string = "bob";
console.log(name1)
////4. 数组

let list1: number[] =  [1,2,3];
let list2: Array<number> = [1, 2, 3];
console.log(list1)
console.log(list2)

////5. 元组Tuple  元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
let tuple1 : [number,string];
tuple1 =  [1,"李四"];  //true、
// tuple1 = ['哭诉',2] ; //err
console.log(tuple1)
//6. 枚举enum
enum Color{Red ,Green ,Blue};
let c:Color = Color.Green;
console.log(c)   //1

//7. 任意值
let any1:any = 4;
any1 = "dadas";
any1 = true;



//8. 空值  void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是void：
//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：  let unusable: void = undefined;
//情况下null和undefined是所有类型的子类型。 就是说你可以把null和undefined赋值给number类型的变量。

//类型断言  // 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。   
//当你在TypeScript里使用JSX时，只有as语法断言是被允许的。

//第一种形式 
let someValue1: any = "this is a string";
let strLength1: number = (<string>someValue1).length;
console.log(someValue1)
console.log(strLength1)

//第二种形式
let someValue2: any = "this is a string11111";
let isNull2: boolean = !!(someValue2 as string);
let strLength2: number = (someValue2 as string).length;
console.log(someValue2)
console.log(isNull2)
console.log(strLength2)



//使用泛型，传入某种类型的值，返回某种类型的值
function identity2<T>(arg: T): T {
    return arg;
}
//调用
let output = identity2<string>("myString"); 

//泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

//泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

// alert(stringNumeric.add(stringNumeric.zeroValue, "test"));



//泛型约束

//我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错了。
function loggingIdentity<T>(arg: T): T {
    //console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

// 为此，我们需要列出对于T的约束要求。

//为此，我们定义一个接口来描述约束条件。 创建一个包含.length属性的接口，使用这个接口

interface Lengthwise {
    length: number;
}

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

//loggingIdentity2("123") success 
//loggingIdentity2(123)   error
//loggingIdentity2({a:1,length:2})  success



//在泛型里使用类类型

function create<T>(c: {new(): T; }): T {
    return new c();
}
//一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function findKeeper<A extends Animal, K> (a: {new(): A;
    prototype: {keeper: K}}): K {

    return a.prototype.keeper;
}

//findKeeper(Lion).nametag;  // typechecks!

function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log( padLeft("Hello world", 4)); // returns "    Hello world"



//字符串字面量类型

type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
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

let button = new UIElement();
button.animate(0, 0, "ease-in");
//button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here







