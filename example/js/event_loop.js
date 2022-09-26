

// setTimeout(() => {
//     console.log("setTimeout1")
//     Promise.resolve().then(() => {
//         console.log("Promise1");
//     })
// })



// setTimeout(() => {
//     console.log("setTimeout2")
//     Promise.resolve().then(() => {
//         console.log("Promise2");
//     })
// })

console.log("1111111");
console.log("11112221");
setTimeout(() => {
    console.log("setTimeout0")
}, 0)
setImmediate(() => {
    console.log("setImmediate0")
}, 0)
