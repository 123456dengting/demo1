// const fs = require('fs');

const getData = function(fileName){
    return new Promise(function(resolve, reject){
        // fs.readFile(fileName, {encoding: 'utf8'}, function(err, data){
        //     if(err) throw Error('fail');
        //     resolve(data);
        // })
        setTimeout(()=>{
          resolve(1)
        },1000)
    });
}

const g = function* (){
    try{
        let dataA = yield getData('a.txt');  // yield 在暂停时刻并没有赋值，dataA 的值是在重新执行时刻由 next 方法的参数传入的
        console.log('dataA is %d', dataA);  
        let dataB = yield getData('b.txt');  
        console.log('dataB is %d', dataB); 
        let dataC = yield getData('c.txt');
        console.log('dataC is %d', dataC);

        console.log('sum is %d', parseInt(dataA) + parseInt(dataB) + parseInt(dataC));
    }catch(err){
        console.log(err);
    }
};

// 驱动 Generator 执行
function run (generator) {
    let it = generator();

    function go(result) {
        // 判断是否遍历完成，标志位 result.done 为 true 表示遍历完成
        if (result.done) return result.value;
        // result.value 即为返回的 promise 对象
        return result.value.then(function (value) {
            return go(it.next(value));
        }, function (error) {
            return go(it.throw(error));
        });
    }

    go(it.next());
}

run(g);

// $ node index.js
// dataA is 1
// dataB is 2
// dataC is 3
// sum is 6



//async await generator迭代器的语法糖,同样的功能,
// const fs = require('fs');

// // 封装成 await 语句期望的 promise 对象
// const readFile = function(){
//     let args = arguments;
//     return new Promise(function(resolve, reject){
//         fs.readFile(...args, function(err, data){
//             // await 会吸收 resolve 传入的值作为返回值赋给变量
//             resolve(data);
//         })
//     })
// };

const asyncReadFile = async function(){
    let dataA = await getData('a.txt', {encoding: 'utf8'});
    console.log('await dataA is %d', dataA);
    let dataB = await getData('b.txt', {encoding: 'utf8'});
    console.log('await dataB is %d', dataB);
    let dataC = await getData('c.txt', {encoding: 'utf8'});
    console.log('await dataC is %d', dataC);
    console.log('sum is %d', parseInt(dataA) + parseInt(dataB) + parseInt(dataC));
};

asyncReadFile();
// console.log('异步执行');



const getData1 = (data) => {
  return new Promise((s, f) => {
    setTimeout(() => {
      console.log('请求1,1000ms--', data)
      s('请求1,1000ms')
    }, 1000)
  })
}

  const getData2 = (data) => {
  return new Promise((s, f) => {
    setTimeout(() => {
      console.log('请求2,1000ms--', data)
      f('请求2,1000ms')
    }, 1000)
  })
}


//顺序执行异步函数
const aaa = async () => {
  let c = await getData1()
  let d = await getData2().catch(e => {console.log(e)})
}

// aaa()

let arr = [1,2,3]
//并发执行1
const bbb = async () => {
  arr.forEach( async(k) => {
    await getData1(k)
  })
  
}
// bbb()


//并发执行2
const ccc = async () => {
  let arrs = [1,2,3,4]
  let promises = arrs.map(d => getData1(d))  //这句代码已经请求数据
  let results = await Promise.all(promises)  //这句代码接受结果
  console.log('results', results)
}
// ccc()


//顺序执行
const ddd = async () => {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    await getData1(element)
  }
}
// ddd()


