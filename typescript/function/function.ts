function add(x: number, y: number): number {
    return x + y;
}

let myAdd1 = function(x: number, y: number): number { return x+y; };
//我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。



//书写完整函数类型
let myAdd2: (x:number, y:number)=>number =
    function(x: number, y: number): number { return x+y; };



console.log(myAdd2(1,2))

//剩余参数
//在TypeScript里，你可以把所有参数收集到一个变量里：  剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个

function buildName(firstName: string, ...restOfName: string[]) {
  console.log('restOfName', restOfName);
  return firstName + " " + restOfName.join(" ");
}
console.log( buildName('a','b','c','d','e') );

class Handler {
    info: string;
    onClickGood = (msg) => { this.info = msg; }
}
let h1 =  new Handler();
h1.onClickGood("aaa");

let h2 =  new Handler();
h2.onClickGood("bbb");

console.log(h1.info)
console.log(h2.info)


//一般使用any类型来定义函数，传任何类型的值，返回任何类型的值
function identity1(arg: any): any {
    return arg;
}




