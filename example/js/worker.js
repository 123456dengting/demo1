// 1.js的异步是模仿多线程,并不是真正的多线程,因为js的异步任务会开启一个多线程,但是结束之后会回到主线程调用
//如下:

//睡眠五秒,阻断主进程n秒
function sleep(n){
    let time1 = new Date().getTime();
    while (new Date().getTime() - time1 < n * 1000) {}
}

//异步开的线程,如果出现死循环, 永远不会执行alert(111)
// setTimeout(() => {
//     alert(1111)
// }, 1000)
// sleep(5)



//子进程会一直执行, 不会受主进程死循环影响
// let a = 1;
// var worker = new Worker('./js/worker-td.js', {name: "cc"});
// //    worker.terminate(); 关闭子进程
// console.log("11111111", worker);
// worker.postMessage("begin");
// worker.onmessage = function(event) {
//     console.log("接受子进程的消息", event.data);
//     worker.postMessage("begin1" + a++);
// };
// // sleep(5)

