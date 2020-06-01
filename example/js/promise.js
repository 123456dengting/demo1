

/**
 Promise的三种状态：pending、fulfilled、rejected(未决定，履行，拒绝)，同一时间只能存在一种状态,且状态一旦改变就不能再变
  1.初始化，状态：pending
  2.当调用resolve(成功)，状态：pengding=>fulfilled
  3.当调用reject(失败)，状态：pending=>rejected
 class Promise{
   constructor(exector){
       function resolve(){
           
       }
       function reject(){
           
       }
       exector(resolve,reject)    
  }
  then(){
       
  }
}
 */


let getData100 = () => {
  return new Promise( (reoslve, reject) => {
    setTimeout(() => {
      reject('100ms')
    }, 100)
  })
}


let getData200 =  () => {
  return new Promise( (reoslve, reject) => {
    setTimeout(() => {
      reoslve('200ms')
    }, 200)
  })
}


let getData300 = () => {
  return new Promise( (reoslve, reject) => {
    setTimeout(() => {
      reject('reject300')
    }, 300)
  })
}



/**
 catch 
 当前面的promise中有失败的时候, 或者成功的回调函数中有语法错误的时候执行catch语句
 */
getData100().then(s => {
  console.log('s', s)
  return getData200()
}).then(k => {
  console.log('k', k)
  return getData300()
}).then(n => {
  console.log('n', n)
}).catch(err => {
  console.log('err', err)
})


var p1 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 1000, 'one'); 
}); 
var p2 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 2000, 'two'); 
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three');
});
var p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'four');
});

var p5 = new Promise((resolve, reject) => {
  setTimeout(reject, 3000, 'fail');
});


//如果有失败, 等失败就执行 fail, 如果没有失败, 等所有都成功才执行success  最后都执行 finally
Promise.all([p1, p2, p3, p4, p5]).then(values => { 
  console.log('all1', values);  
}, reason => {
  console.log('all2', reason)
}).finally(() => {
  console.log('finally')
})


//只要有一个返回解决就执行, 成功=success 失败 fail  最后都执行 finally
Promise.race([p1, p2, p3, p4, p5]).then(values => { 
  console.log('succerr3', values); //成功
}, reason => {
  console.log('fail3', reason) //失败
}).finally(() => {
  console.log('finally3')
})










