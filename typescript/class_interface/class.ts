/*
1. 类变量修饰符
 * */

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



console.log('********************************************************************')



class Shape2 {
 
    area: number;   //类里面的变量和属性默认属于public类型
   	color: string;
 
    constructor ( public name: string,  public width: number, public height: number ) {  //构造器中的参数默认是private局部变量，只有在类里才能访问
        this.area = width * height;
        this.color = "pink";
    };
 
    shoutout() {
        return "I'm " + this.color + " " + this.name +  " with an area of " + this.area + " cm squared.";
    }
}
 
var square2 = new Shape2("square", 30, 30);
 
console.log( square2.shoutout() );
//console.log('Area of Shape: ' + square2.area); //900
//console.log('Name of Shape: ' + square2.name); //square
//console.log('Color of Shape: ' + square2.color); //'pink'  编译时color会报错
//console.log('Width of Shape: ' + square2.width); //30
//console.log('Height of Shape: ' + square2.height); //30





console.log('********************************************************************************')




/*
 2.继承
 * 
 * */

class Shape3D extends Shape2 {
 
     volume: number;
 	
 	
 	//子类的修饰符默认继承父类的。可以写为跟父类一样的。手动书写和父类不一样会报错
    constructor ( public name: string, width: number, height: number, length: number ) {
        super( name, width, height );
        this.volume = length * this.area;
    };
 
    shoutout() {    
        return "I'm " + this.name +  " with a volume of " + this.volume + " cm cube.";
    }
 
    superShout() {
        return super.shoutout();   //调用父类的方法
    }
}
 
var cube = new Shape3D("cube", 30, 30, 30);
console.log( cube.shoutout() );
console.log( cube.superShout() );