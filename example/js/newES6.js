

/**
 一 Set
 1.ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。
 2.Set 本身是一种构造函数，用来生成 Set 数据结构。
 3.Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。

 4.属性 
    constructor: 构造函数
    size

 5.方法
  add(value)：新增，相当于 array里的push
  delete(value)：存在即删除集合中value
  has(value)：判断集合中是否存在 value
  clear()：清空集合

 */

//用const定义的set也可以被修改
const s = new Set();
['a', 'b', 'c', 'a', 'b', 'd'].forEach(element => {
  s.add(element)
});
s.add(window)

//因为是无序的所以下面的输出值都是  a, b, c, d
console.log('sss', s, s.size) // ['a', 'b', 'c', 'd']
console.log('keys', s.keys()) // ['a', 'b', 'c', 'd']
console.log('values', s.values()) // ['a', 'b', 'c', 'd']
console.log('entries', s.entries()) // ['a', 'b', 'c', 'd']
s.forEach(( item, index) => {
  console.log('forEach', item, index)  // a , a |   b, b  |   c, c | d, d
})


/**
 二 WeakSet
 1.WeakSet 对象允许你将弱引用对象储存在一个集合中
 2.WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
 3.WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，
 如果没有其他的变量或属性引用这个对象值，
 则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），
 所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，
 运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），
 WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素

 属性
  constructor: 构造函数
 方法
  add(value)：在WeakSet 对象中添加一个元素value
  has(value)：判断 WeakSet 对象中是否包含value
  delete(value)：删除元素 value
 */

 let arr = [1], brr = [2]
 const weakSet = new WeakSet([arr, brr])
 console.log('weakSet', weakSet.size)   //undefined  运行之后成员应被垃圾回收了 所以取不到所有值


 /**
三 Map
  集合 与 字典 的区别：
    共同点：集合、字典 可以储存不重复的值
    不同点：集合 是以 [value, value]的形式储存元素，字典 是以 [key, value] 的形式储存

    注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
  属性
    constructor: 构造函数
    size  
  操作方法
    set(key, value)：向字典中添加新元素
    get(key)：通过键查找特定的数值并返回
    has(key)：判断字典中是否存在键key
    delete(key)：通过键 key 从字典中移除对应的数据
    clear()：将这个字典中的所有元素删除  

  */


let maoA1 = [1, 2, 3], maoA2 = [2], mapO = {name : '张三'}
const map1 = new Map()

map1.set(arr, brr).set(mapO, maoA1).set(mapO, maoA1)

console.log('map', map1, map1.size)


/**
四 WeakMap
  1.WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。
  2.注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
  3.WeakMap 中，每个键对自己所引用对象的引用都是弱引用，
    在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），
    所以，WeakMap 的 key 是不可枚举的。
  属性
    constructor: 构造函数
  方法：
    has(key)：判断是否有 key 关联对象
    get(key)：返回key关联对象（没有则则返回 undefined）
    set(key)：设置一组key关联对象
    delete(key)：移除 key 的关联对象
 */



/**
 五 总结
  成员唯一、无序且不重复

  Set  
    [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
    可以遍历，方法有：add、delete、has
  WeakSet
    成员都是对象
    成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
    不能遍历，方法有add、delete、has
  Map
    本质上是键值对的集合，类似集合
    可以遍历，方法很多可以跟各种数据格式转换
  WeakMap
    只接受对象作为键名（null除外），不接受其他类型的值作为键名
    键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
    不能遍历，方法有get、set、has、delete
 */

// 工具函数
let _toString = Object.prototype.toString;
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
}

let getType = (item) => {
  return _toString.call(item).slice(8, -1)
}
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
}


//深复制, 深度优先遍历
let DFSdeepClone = (obj, visitedArr = []) => {
  let _obj = {}
  if (isTypeOf(obj, 'array') || isTypeOf(obj, 'object')) {
    let index = visitedArr.indexOf(obj)
    _obj = isTypeOf(obj, 'array') ? [] : {}
    if (~index) { // 判断环状数据
      _obj = visitedArr[index]
    } else {
      visitedArr.push(obj)
      for (let item in obj) {
        _obj[item] = DFSdeepClone(obj[item], visitedArr)
      }
    }
  } else if (isTypeOf(obj, 'function')) {
    _obj = eval('(' + obj.toString() + ')');
  } else {
    _obj = obj
  }
  return _obj
}


//沈复制  广度优先遍历
let BFSdeepClone = (obj) => {
  let origin = [obj],
    copyObj = {},
    copy = [copyObj]
    // 去除环状数据
  let visitedQueue = [],
    visitedCopyQueue = []
  while (origin.length > 0) {
    let items = origin.shift(),
      _obj = copy.shift()
    visitedQueue.push(items)
    if (isTypeOf(items, 'object') || isTypeOf(items, 'array')) {
      for (let item in items) {
        let val = items[item]
        if (isTypeOf(val, 'object')) {
          let index = visitedQueue.indexOf(val)
          if (!~index) {
            _obj[item] = {}
              //下次while循环使用给空对象提供数据
            origin.push(val)
              // 推入引用对象
            copy.push(_obj[item])
          } else {
            _obj[item] = visitedCopyQueue[index]
            visitedQueue.push(_obj)
          }
        } else if (isTypeOf(val, 'array')) {
          // 数组类型在这里创建了一个空数组
          _obj[item] = []
          origin.push(val)
          copy.push(_obj[item])
        } else if (isTypeOf(val, 'function')) {
          _obj[item] = eval('(' + val.toString() + ')');
        } else {
          _obj[item] = val
        }
      }
      // 将已经处理过的对象数据推入数组 给环状数据使用
      visitedCopyQueue.push(_obj)
    } else if (isTypeOf(items, 'function')) {
      copyObj = eval('(' + items.toString() + ')');
    } else {
      copyObj = obj
    }
  }
return copyObj
}


var arrss = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

const formatArr = (arr) => {
  let brr = []
  arr.forEach(m => {
    if (Array.isArray(m)) {
      brr = [...brr, ...formatArr(m)]
    }else{
      brr.push(m)
    }
  })
  return brr
}

let newArr = formatArr(arrss).sort((a , b) => a - b)

console.log('arrss', newArr)







//数组去重
let c = [1,2,2,3,3,4]
let sss = [...new Set(c)]
console.log('c', c)

console.log('s', sss)