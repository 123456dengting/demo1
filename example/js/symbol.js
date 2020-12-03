
let a = {
    [Symbol.for("a")]: "1111",
    [Symbol.for("b")]: "2222",
    b: "333",
    [Symbol("c")]: "3333"
  }
  
  let b = {
    "aaa": "aaa-v",
    "bbb": "bbb-v"
  }
  

  //只能获取symbol类型属性
  Object.getOwnPropertySymbols(a).forEach(item => {
    console.log("1111111-o", item, typeof item);
    
  })
  
  //能获取所有类型的属性
  Reflect.ownKeys(a).forEach(item => {
    console.log("1111111-r", item, typeof item);
  })

  console.log("111111", JSON.stringify(a), a[Symbol.for("a")], a[Symbol.for("b")], a[Symbol.for("c")]   );
  