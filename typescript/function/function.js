var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function add(x, y) {
    return x + y;
}
var myAdd1 = function (x, y) { return x + y; };
//我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。
//书写完整函数类型
var myAdd2 = function (x, y) { return x + y; };
console.log(myAdd2(1, 2));
//剩余参数
//在TypeScript里，你可以把所有参数收集到一个变量里：  剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个
function buildName(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    console.log('restOfName', restOfName);
    return firstName + " " + restOfName.join(" ");
}
console.log(buildName('a', 'b', 'c', 'd', 'e'));
var Handler = /** @class */ (function () {
    function Handler() {
        var _this = this;
        this.onClickGood = function (msg) { _this.info = msg; };
    }
    return Handler;
}());
var h1 = new Handler();
h1.onClickGood("aaa");
var h2 = new Handler();
h2.onClickGood("bbb");
console.log(h1.info);
console.log(h2.info);
//一般使用any类型来定义函数，传任何类型的值，返回任何类型的值
function identity1(arg) {
    return arg;
}
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
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
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
var BeeKeeper = /** @class */ (function () {
    function BeeKeeper() {
    }
    return BeeKeeper;
}());
var ZooKeeper = /** @class */ (function () {
    function ZooKeeper() {
    }
    return ZooKeeper;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bee;
}(Animal));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Lion;
}(Animal));
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
    throw new Error("Expected string or number, got '" + padding + "'.");
}
console.log(padLeft("Hello world", 4)); // returns "    Hello world"
var cc = new Array(5);
console.log(cc);
