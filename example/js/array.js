


//数组去重简便方法
function delRepeat(arr){
    var arr2 = arr.filter(  (x, index,self) => self.indexOf(x) === index)  
    return arr2;
}


//entries()、keys()、values() 
//用于遍历数组，可以用for…of循环进行遍历。区别是keys()是对键名的遍历、values是对键值的遍历、entries()是对键值对的遍历
arr = ["aaa","bbb","ccc"];

for (const index of arr) {
    console.log("index",index);
}



var brr = arr.entries();

console.log("arr",arr);



var obj = {name:"张三",age:"李四"}
for (const iterator in obj) {
    console.log("iterator",iterator);
}



Object.keys(obj).forEach((key)=>{
    console.log("key",key);
})





