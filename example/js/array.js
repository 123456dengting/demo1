


//数组去重简便方法 1
function delRepeat(arr){
    var arr2 = arr.filter((x, index,self) => self.indexOf(x) === index)  
    return arr2;
}


//数组去重简便方法2
let sss = [1,2,2,3,3,50,60,5,5,6,6,6,'6']

sss = [...new Set(sss)]

console.log('sss', sss)


let arr1111 = [
    { id: 0, name: "张三" },
    { id: 1, name: "李四" },
    { id: 2, name: "王五" },
    { id: 3, name: "赵六" },
    { id: 1, name: "孙七" },
    { id: 2, name: "周八" },
    { id: 2, name: "吴九" },
    { id: 3, name: "郑十" },
  ];

// 数据对象根据key去重
const removeDuplicateObj = (arr, key) => {
    let obj = {};
    arr = arr.reduce((newArr, next) => {
    if(!obj[next[key]]){
        obj[next[key]] = true;
        newArr.push(next)
    }
    return newArr;
    }, []);
    return arr;
};

console.log("111111removeDuplicateObj", removeDuplicateObj(arr1111, "id"));


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



//数组扁平化处理

var arr = [1, 2, 3, [4,5,6, [8,9,10]], 7]
var brr = arr.flat(Infinity)

console.log('arr', arr)
console.log('brr', brr)


const sortArr = [4,1,2,'--',3, 10, '--', 'c', -35, 58];
const ccccArr = [
    {
        "materialName": "插座箱",
        "specification": "",
        "specificationName": "",
        "averagePrice": "9.1"
    },
    {
        "materialName": "营养快线（代）",
        "specification": "ggxh1",
        "specificationName": "ggxh1"
    },
    {
        "materialName": "042501物料",
        "specification": "90",
        "specificationName": "90"
    },
    {
        "materialName": "1234",
        "specification": "A剂",
        "specificationName": "A剂"
    },
    {
        "materialName": "水",
        "specification": "Ø90",
        "specificationName": "Ø90"
    },
    {
        "materialName": "数字工厂测试物料01",
        "specification": "szgctest01-wl",
        "specificationName": "szgctest01-wl"
    },
    {
        "materialName": "阿三大苏打",
        "specification": "",
        "specificationName": ""
    },
    {
        "materialName": "乳化物料333",
        "specification": "",
        "specificationName": ""
    },
    {
        "materialName": "液态硝酸铵",
        "specification": "22",
        "specificationName": "22",
        "averagePrice": "7.88"
    },
    {
        "materialName": "一体化油相",
        "specification": "Ø70",
        "specificationName": "Ø70"
    },
    {
        "materialName": "0324物料",
        "specification": "70",
        "specificationName": "70"
    },
    {
        "materialName": "042301物料",
        "specification": "20",
        "specificationName": "20"
    },
    {
        "materialName": "液态硝酸铵",
        "specification": "Ø70",
        "specificationName": "Ø70",
        "averagePrice": "6.26"
    },
    {
        "materialName": "星形块",
        "specification": "170",
        "specificationName": "170"
    },
    {
        "materialName": "离合器箱体",
        "specification": "ZY6II-7-100",
        "specificationName": "ZY6II-7-100"
    },
    {
        "materialName": "多孔硝酸铵",
        "specification": "",
        "specificationName": ""
    },
    {
        "materialName": "有色眼镜",
        "specification": "",
        "specificationName": "",
        "averagePrice": "35.83"
    },
    {
        "materialName": "康师傅冰红茶（主）",
        "specification": "",
        "specificationName": "",
        "averagePrice": "1000"
    },
    {
        "materialName": "硝酸钠",
        "specification": "Ø90",
        "specificationName": "Ø90"
    },
    {
        "materialName": "111我",
        "specification": "A剂",
        "specificationName": "A剂"
    },
    {
        "materialName": "硝酸铵",
        "specification": "Ø90",
        "specificationName": "Ø90"
    },
    {
        "materialName": "乳化物料222",
        "specification": "",
        "specificationName": ""
    },
    {
        "materialName": "刀座",
        "specification": "ZYFKJ18-01-20",
        "specificationName": "ZYFKJ18-01-20"
    },
    {
        "materialName": "456666",
        "specification": "aaa",
        "specificationName": "aaa"
    },
    {
        "materialName": "fsafsaf",
        "specification": "",
        "specificationName": ""
    },
    {
        "materialName": "测试物料02",
        "specification": "testwl02",
        "specificationName": "testwl02"
    },
    {
        "materialName": "测试",
        "specification": "",
        "specificationName": ""
    },
    {
        "materialName": "乳化专用复合油相",
        "specification": "Ø90",
        "specificationName": "Ø90"
    },
    {
        "materialName": "乳化物料111",
        "specification": "",
        "specificationName": ""
    },
    {
        "materialName": "怡宝",
        "specification": "",
        "specificationName": ""
    },
    {
        "materialName": "统一绿茶（主）",
        "specification": "ggxh2",
        "specificationName": "ggxh2"
    },
    {
        "materialName": "0601物料01",
        "specification": "2023060101-A",
        "specificationName": "2023060101-A"
    },
    {
        "materialName": "测试物料",
        "specification": "Ø90",
        "specificationName": "Ø90"
    },
    {
        "materialName": "复合乳化油相",
        "specification": "type-fhrhyx",
        "specificationName": "type-fhrhyx"
    },
    {
        "materialName": "0601物料",
        "specification": "20230601",
        "specificationName": "20230601"
    },
    {
        "materialName": "导入物料测试1",
        "specification": "",
        "specificationName": ""
    }
];
// 处理指定字符排在末尾
const sortBrr = ccccArr.sort((a, b) => {
    const aVal = a['averagePrice'];
    const bVal = b['averagePrice'];

    const isANum = !isNaN(Number(aVal));
    const isBNum = !isNaN(Number(bVal));

    if (isANum && !isBNum) return -1; // 如果 a 是数字而 b 不是，a 应该排在 b 前面
    if (!isANum && isBNum) return 1; // 如果 b 是数字而 a 不是，b 应该排在 a 前面
    if (isANum && isBNum) {
        return Number(bVal) - Number(aVal); // 如果两者都是数字，按照数字大小排序
    }
    return 0;
})

console.log('111111-brr1', sortBrr);



/**
 高阶函数
 一个函数接受另一个函数为参数的函数为高阶函数(map, sort, filter ...)
 */

/**
不会改变原来数组的有：
concat()---连接两个或更多的数组，并返回结果。

every()---检测数组元素的每个元素是否都符合条件。

some()---检测数组元素中是否有元素符合指定条件。

filter()---检测数组元素，并返回符合条件所有元素的数组。

indexOf()---搜索数组中的元素，并返回它所在的位置。

join()---把数组的所有元素放入一个字符串。

toString()---把数组转换为字符串，并返回结果。
lastIndexOf()---返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。

map()---通过指定函数处理数组的每个元素，并返回处理后的数组。

slice()---选取数组的的一部分，并返回一个新数组。

valueOf()---返回数组对象的原始值。

flat() ---- 扁平化处理数组  (IE不支持)

----------------------------------------------------------------

会改变原来数组的有：
pop()---删除数组的最后一个元素并返回删除的元素。

push()---向数组的末尾添加一个或更多元素，并返回新的长度。

shift()---删除并返回数组的第一个元素。

unshift()---向数组的开头添加一个或更多元素，并返回新的长度。

reverse()---反转数组的元素顺序。

sort()---对数组的元素进行排序。

splice()---用于插入、删除或替换数组的元素。 



 */





