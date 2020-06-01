//闭包的运用




//防抖 触发事件N秒之后再执行函数
function throttle(fn, delay) {
  var canRun = true
  return function() {
    if (!canRun) {
      return false
    }
    canRun = false
    fn()
    setTimeout(() => {
      canRun = true
    }, delay)
  }
}


//函数防抖(一般情况)
var times = null
function _deBounce(fn, timeLong){
  if (times) {
    clearTimeout(times)
    times = null
  }

  setTimeout(() => {
    if (fn) {
      fn()
    }
  }, timeLong)
}


//函数防抖(闭包)
function deBounce(fn, timeLong){
  var time = null

  return function (){
    console.log('throttle-time', time)
    if (time) {
      clearTimeout(time)
      time = null
    }
    time = setTimeout(() => {
      if (fn) {
        fn()
      }
    }, timeLong) 
  }
}

    // document.getElementsByClassName('div1')[0].onclick = deBounce(()=>{
    //     console.log('123')
    //   }, 2000)
    // document.getElementsByClassName('div1')[0].onclick = throttle(()=>{
    //   console.log('1234---')
    // }, 2000)






