/*

1.类型批注，可选
	function area(shape: string, width: number, height: number) {
	    var area = width * height;
	    return "I'm a " + shape + " with an area of " + area + " cm squared.";
	}
 * */
function area1(shape: string, width: number, height: number) {
	    var area = width * height;
	    return "I'm a " + shape + " with an area of " + area + " cm squared.";
	}

console.log( area1('content',30,90));





/*
 2.接口
 */

interface Shape {
    name: string;
    width: number;
    height: number;
    color?: string;  //可传可不传
}
 
function area2(shape : Shape) {
	console.log(shape.color)
    var area = shape.width * shape.height;
    return "I'm " + shape.name + " with area " + area + " cm squared " + shape.color;
    //少传color编译不会报错，少传name编译会报错
    
}
 
console.log( area2( {name: "rectangle", width: 30, height: 15} ) );
console.log( area2( {name: "square", width: 30, height: 30, color: "blue"} ) );


/*
 3.箭头函数
*/

var shape3 = {
    name: "rectangle",
    popup: function() {
 
        console.log('This inside popup(): ' + this.name);
 		
 		//这里不用箭头函数的话  this.name 的值会是undefined
        setTimeout( () => {
            console.log('This inside setTimeout(): ' + this.name);
            console.log("I'm a " + this.name + "!");
        }, 3000);
 
    }
};
 
shape3.popup();


