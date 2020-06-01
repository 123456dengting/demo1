/*
1. 类变量修饰符
 * */
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
//class Shape {
// 
//  area: number;   //类里面的变量和属性默认属于public类型
//  color: string;
// 
//  constructor ( name: string, width: number, height: number ) {  //构造器中的参数默认是private局部变量，只有在类里才能访问
//      this.area = width * height;
//      this.color = "pink";
//  };
// 
//  shoutout() {
//      return "I'm " + this.color + " " + this.name +  " with an area of " + this.area + " cm squared.";
//  }
//}
// 
//var square = new Shape("square", 30, 30);
// 
//console.log( square.shoutout() );
//console.log( 'Area of Shape: ' + square.area );    		//900
//console.log( 'Name of Shape: ' + square.name );			//undefined
//console.log( 'Color of Shape: ' + square.color );		//'pink'
//console.log( 'Width of Shape: ' + square.width );		//undefined
//console.log( 'Height of Shape: ' + square.height );		//undefined
console.log('********************************************************************');
var Shape2 = /** @class */ (function () {
    function Shape2(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.area = width * height;
        this.color = "pink";
    }
    ;
    Shape2.prototype.shoutout = function () {
        return "I'm " + this.color + " " + this.name + " with an area of " + this.area + " cm squared.";
    };
    return Shape2;
}());
var square2 = new Shape2("square", 30, 30);
console.log(square2.shoutout());
//console.log('Area of Shape: ' + square2.area); //900
//console.log('Name of Shape: ' + square2.name); //square
//console.log('Color of Shape: ' + square2.color); //'pink'  编译时color会报错
//console.log('Width of Shape: ' + square2.width); //30
//console.log('Height of Shape: ' + square2.height); //30
console.log('********************************************************************************');
/*
 2.继承
 *
 * */
var Shape3D = /** @class */ (function (_super) {
    __extends(Shape3D, _super);
    //子类的修饰符默认继承父类的。可以写为跟父类一样的。手动书写和父类不一样会报错
    function Shape3D(name, width, height, length) {
        var _this = _super.call(this, name, width, height) || this;
        _this.name = name;
        _this.volume = length * _this.area;
        return _this;
    }
    ;
    Shape3D.prototype.shoutout = function () {
        return "I'm " + this.name + " with a volume of " + this.volume + " cm cube.";
    };
    Shape3D.prototype.superShout = function () {
        return _super.prototype.shoutout.call(this); //调用父类的方法
    };
    return Shape3D;
}(Shape2));
var cube = new Shape3D("cube", 30, 30, 30);
console.log(cube.shoutout());
console.log(cube.superShout());
