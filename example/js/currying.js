
//函数柯里化:  函数接收第一个参数, 并且返回一个函数, 这个函数处理剩余参数
//参数收集过程,到最里层梳理参数
// 简单实现，参数只能从右到左传递
function createCurry(func, args) {

  var arity = func.length;
  console.log('arity', arity)
  var args = args || [];

  return function() {
      var _args = [].slice.call(arguments);
      [].push.apply(_args, args);

      // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
      if (_args.length < arity) {
          return createCurry.call(this, func, _args);
      }

      // 参数收集完毕，则执行func
      return func.apply(this, _args);
  }
}



function add(a){
  let sum = a
  return function(){
    for (let index = 0; index < arguments.length; index++) {
      sum += arguments[index]
    }
    return sum
  }
}


let c = add(1)

let b = c(2)
let d = c(3)

console.log('b', b)
console.log('d', d)




//example 1
//验证手机号
function checkPhone(phoneNumber){
  return /^1[34578]\d{9}$/.test(phoneNumber);
}

//验证邮箱
function checkEmail(email){
  return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email);
}

//验证身份证号..
//....

//一般封装为一个函数, 每次调用都需要传两个参数
//check(/^1[34578]\d{9}$/, '14900000088');
//check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@163.com');
//效率低下
function check(targetString, reg) {
  return reg.test(targetString);
}
//借助柯里化,在check基础之上再封装一层

var _check = createCurry(check)
var checkPhone = _check(/^1[34578]\d{9}$/);
var checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

console.log('phobe', checkPhone('183888888')) 
console.log('email', checkEmail('xxxxx@test.com')) 




// function _map(func, array) {
//   return array.map(func);
// }

// var _getNewArray = createCurry(_map);

// var getNewArray = _getNewArray(function(item) {
//   return item * 100 + '%'
// })

// getNewArray([1, 2, 3, 0.12]);   // ['100%', '200%', '300%', '12%'];
// getNewArray([0.01, 1]); // ['1%', '100%']


let _args = [1,2,3]
let args = [4,5]
// [].push.apply(_args, args);
_args = _args.push(1)
console.log('arr', _args)




 /**
  * 柯里化应用
  */

//缺点, 每次都会执行判断
function addEvent(el, type, fn){
  if (window.addEventListener) {
    el.addEventListener(type, function(e){
      // fn.call(el, e)    //this是点击元素
      fn(e)               //this是window
    }, true)
  }else{
    el.attchEvent('on' + type, function(e){
      fn.call(el, e)
    })
  }
}

addEvent(document, 'click', function(e){
  console.log('e', this, e)
})

//利用柯里化, 提前返回和延迟执行, 虽然代码增多了, 但是只会进行一次判断
var addEvent1 = (function (){
  if (window.addEventListener) {
    return function(el, type, fn){
      el.addEventListener(type, function(e){
        // fn.call(el, e)
        fn(e)
      }, true)
    }
  } else {
    return function(el, type, fn){
      el.attchEvent( 'on' + type, function(e){
        fn.call(el, e)
      })
    }
  }
})()

addEvent1(document.body, 'click', function(e){
  console.log('e2', this, e)
})




//柯里化2
//目标 实现multi(2)(3)(4)=24


/**
 * 方法1 闭包
 */

 function multi1(a){
   return function(b){
     return function(c){
      return a * b * c
     }
   }
 }




 console.log('mutil1', multi1(2)(3)(4)) 




//闭包
function obj(){
  var a = 1
  return {
    name: 'zhangsna',
    getA: function (){
      return a
    },
    add: function (){
      a++
    }
  }
}


let objs = obj()
let name = objs.name
let b0 = objs.getA()
let b1 = objs.getA()
console.log('objs', objs, name, b0, b1)

let a = 1;


(function(window, undefined){
  var db = {
    /**
     * ...
     */
  }
  window.app = window.app || {}
  window.app.db = db
}(window))



var abc = (function(a){
  var b = a + 1
  return {
    name: 'zhangsan',
    text: b,
    add: function(){
      b+=1
    },
    getB: function(){
      console.log('bbb', b)
    }
  }
})(1)

abc.add()
abc.getB()
console.log('abc', abc)


function currys (func){
  len = func.length
  
  return function(){
    
    let newArgs = Array.prototype.slice.call(arguments)
    return func.call(this, ...newArgs)
  }
}


let addss = function(a, b){
  return a + b
}

let ccc = currys(addss)

console.log('ccc', ccc(1, 2), ccc) 





let arr = [{"addtime":"2019-05-28T10:17:17","catalog":"dengjiangbo/qianshe","name":"Tulips.jpg","contentType":"image/jpeg","md5":"08b8d18c11be6c10f93659deb32e21aa","guid":"93cc1fd2c211414aa3bdc785ba0451026608","size":606.3359375},{"addtime":"2019-05-28T10:17:17","catalog":"dengjiangbo/qianshe","name":"Penguins.jpg","contentType":"image/jpeg","md5":"cf25ab55b7d79dc0f4b1f37180a41b50","guid":"735c32fdd9e642dc9e009cedc86a83e66825","size":759.6044921875},{"addtime":"2019-05-28T10:06:14","catalog":"dengjiangbo/qianshe","name":"Lighthouse.jpg","contentType":"image/jpeg","md5":"33d0759bf74f41b754564b9dfaef2b28","guid":"0c00701434e34210bca12c58f8cc1d3c7790","size":548.12109375},{"addtime":"2019-05-27T14:27:04","catalog":"dengjiangbo/qianshe","name":"Chrysanthemum.jpg","contentType":"image/jpeg","md5":"65f3ef905a96e606f3a155bfccb0db08","guid":"6676268f282640e3a0f55fa66bc223518659","size":858.783203125},{"addtime":"2019-05-25T17:54:22","catalog":"dengjiangbo/qianshe","name":"218035518_218220306_192421.png","contentType":"image/png","md5":"2AA047909F20570ED4328DC0A1B2E1E7","guid":"d53089c2691c419f83d123884625cb446957","size":438.806640625},{"addtime":"2019-05-25T17:54:20","catalog":"dengjiangbo/qianshe","name":"218035518_874877.png","contentType":"image/png","md5":"CFA2D2C11B2E13253A633C1C39D6E663","guid":"6a6000538497495ca8a4466f02ba0a785921","size":100.166015625},{"addtime":"2019-05-25T17:54:17","catalog":"dengjiangbo/qianshe","name":"218220306_671833.png","contentType":"image/png","md5":"9E3426C101B9F57A495F85A3B11F70D8","guid":"a155f0dcd23642878badd214231e6ee69729","size":1043.4541015625},{"addtime":"2019-05-25T17:54:16","catalog":"dengjiangbo/qianshe","name":"218035518_741909.png","contentType":"image/png","md5":"B35AD71E6751A3D21AFFA3B201CD6223","guid":"eaf7bc99afc34414b0dbb7dd555102dd3893","size":92.3447265625},{"addtime":"2019-05-25T17:54:16","catalog":"dengjiangbo/qianshe","name":"218035518_811716.png","contentType":"image/png","md5":"557315DF3069AE9D9FE6FE59BF37F822","guid":"b56d70629c8a494b893859358d5692ed6252","size":281.75},{"addtime":"2019-05-25T17:54:16","catalog":"dengjiangbo/qianshe","name":"218035518_218220306_531682.png","contentType":"image/png","md5":"4B045AD204D619B7F919E1D8B4ABD670","guid":"40eda612ae9a4c2c8e76304ea56c52779010","size":432.0009765625},{"addtime":"2019-05-25T17:54:15","catalog":"dengjiangbo/qianshe","name":"218035518_717230.png","contentType":"image/png","md5":"140F9B73986BD17E9190AF5F082BB713","guid":"a666de85bcf84c8ab6d0c7753d5611986887","size":72.6484375},{"addtime":"2019-05-25T17:54:15","catalog":"dengjiangbo/qianshe","name":"218035518_462352.png","contentType":"image/png","md5":"CAD8F3C0263411C5C6460D49CDF3E94B","guid":"03c9a760c5a1463aadca22761a1a2b608711","size":266.80078125},{"addtime":"2019-05-25T17:54:15","catalog":"dengjiangbo/qianshe","name":"218035518_936301.png","contentType":"image/png","md5":"53479FF4B3FAA4AFE50BF8C10465DEB8","guid":"93c2c813d9654b18acc0a9ba12032b091503","size":395.298828125},{"addtime":"2019-05-25T17:54:13","catalog":"dengjiangbo/qianshe","name":"309376604_443451301_433632.png","contentType":"image/png","md5":"CAE2186CA407B73D94E0C5447CADEBF4","guid":"2477d5dffbfe45f7bd6c008d1f68014c9727","size":135.8193359375},{"addtime":"2019-05-25T17:54:11","catalog":"dengjiangbo/qianshe","name":"218035518_218220306_579811.png","contentType":"image/png","md5":"6D66B405410D2258EA608C16E8A467A7","guid":"0a102b0460af4d2c8f9474c3f4166dba5625","size":2186.380859375},{"addtime":"2019-05-25T17:54:10","catalog":"dengjiangbo/qianshe","name":"218035518_664922.png","contentType":"image/png","md5":"0918FB5B802752948C5B4922641D4667","guid":"4b292348de3548979579ada9fe27bd844201","size":687.3681640625},{"addtime":"2019-05-25T17:53:58","catalog":"dengjiangbo/qianshe","name":"218035518_652834.png","contentType":"image/png","md5":"A845963B3FDF97F9A949337DAEFF6188","guid":"a97c9866d31549589d52954d9bf516f52801","size":281.3115234375},{"addtime":"2019-05-25T17:53:53","catalog":"dengjiangbo/qianshe","name":"218220306_363472.png","contentType":"image/png","md5":"9E3426C101B9F57A495F85A3B11F70D8","guid":"5c588e64d2de49e394e41330a4afc0d87097","size":1043.4541015625},{"addtime":"2019-05-25T17:53:52","catalog":"dengjiangbo/qianshe","name":"218035518_360433.png","contentType":"image/png","md5":"557315DF3069AE9D9FE6FE59BF37F822","guid":"b418aba878ea496a8acbc024ed81ff1c5051","size":281.75},{"addtime":"2019-05-25T17:53:52","catalog":"dengjiangbo/qianshe","name":"218035518_218220306_498472.png","contentType":"image/png","md5":"4B045AD204D619B7F919E1D8B4ABD670","guid":"b42d0dc83a8d4586babaef47e75f6bad8025","size":432.0009765625},{"addtime":"2019-05-25T17:53:51","catalog":"dengjiangbo/qianshe","name":"309376604_443451301_529439.png","contentType":"image/png","md5":"CAE2186CA407B73D94E0C5447CADEBF4","guid":"5605b943ad9e47039f06fe76dd132c973749","size":135.8193359375},{"addtime":"2019-05-25T17:53:51","catalog":"dengjiangbo/qianshe","name":"218035518_429141.png","contentType":"image/png","md5":"140F9B73986BD17E9190AF5F082BB713","guid":"92f8898d11594f8e99d5ec38ae9f90b75352","size":72.6484375},{"addtime":"2019-05-25T17:53:51","catalog":"dengjiangbo/qianshe","name":"218035518_142321.png","contentType":"image/png","md5":"CAD8F3C0263411C5C6460D49CDF3E94B","guid":"b3fa02d8745d49f7b2c3b589fcd3e5e67194","size":266.80078125},{"addtime":"2019-05-25T17:53:51","catalog":"dengjiangbo/qianshe","name":"218035518_982680.png","contentType":"image/png","md5":"53479FF4B3FAA4AFE50BF8C10465DEB8","guid":"457cff558d53430eb276ce9ad967a8129752","size":395.298828125},{"addtime":"2019-05-25T17:53:51","catalog":"dengjiangbo/qianshe","name":"218035518_560172.png","contentType":"image/png","md5":"B35AD71E6751A3D21AFFA3B201CD6223","guid":"9c2a3097f37340f1b12da00fa133ec2b1984","size":92.3447265625},{"addtime":"2019-05-25T17:50:36","catalog":"dengjiangbo/qianshe","name":"218035518_474863.png","contentType":"image/png","md5":"B35AD71E6751A3D21AFFA3B201CD6223","guid":"053f31d917194ec4b372d4c54f54e0e34708","size":92.3447265625},{"addtime":"2019-05-25T17:50:35","catalog":"dengjiangbo/qianshe","name":"218035518_352075.png","contentType":"image/png","md5":"CAD8F3C0263411C5C6460D49CDF3E94B","guid":"bdd65400aef04bee9cc43907526c0d6f9949","size":266.80078125}]

const findMd5Index = (arr) => {
  let guidArr = []
  arr.forEach((t, index) => {
    arr.forEach((m, i) => {
      if (t.md5 === m.md5 && index !== i ) {
        guidArr.push({
          guid: t.guid,
          index: index,
          i: i
        })
      }
    })
  })
  return guidArr
}

let m = '810EF6704D213EBB86AE65982A1C1003'

console.log('findMd5Index', arr, findMd5Index(arr, m))

const findGuid = (arr) => {
  let guidArr = []
  arr.forEach((t, index) => {
    arr.forEach((m, i) => {
      if (t.guid === m.guid && index !== i ) {
        guidArr.push({
          guid: t.guid,
          index: index,
          i: i
        })
      }
    })
  })
  return guidArr
}

console.log('findGuid', findGuid(arr))