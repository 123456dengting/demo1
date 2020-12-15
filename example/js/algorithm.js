
let arr = [1 ,20 ,3, 100, 1000, -40, 1, 35, 7];
//https://segmentfault.com/a/1190000020072884

/**
 1.冒泡排序
 每一遍循环把最大的往下面排,小的往上面排
 冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
 */
let bubbleSortIndex = 0;
function bubbleSort(arr) {
    arr = arr.slice();
    var len = arr.length;
    //这里填 len - 1是因为倒数第二次已经把最后一个比完了
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            bubbleSortIndex++;
            if (arr[j] > arr[j+1]) {       // 相邻元素两两对比
                var temp = arr[j+1];       // 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

/**
 2. 选择排序
 选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
 */
let selectSortIndex = 0;
function selectSort(arr){
    arr = arr.slice();
    var minIndex, temp, len = arr.length;
    //这里填 len - 1是因为倒数第二次已经把最后一个比完了
    for (let i = 0; i < len - 1; i++) {
        minIndex = i
        for (let j = i + 1; j < len; j++) {
            selectSortIndex++;
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp
        
    }
    return arr
}


/**
 2. 插入排序
 */

let InsertSoryIndex = 0;
 function InsertSory(arr){
     arr = arr.slice();
     let preIndex, current;
     for (let i = 0; i < arr.length; i++) {
         preIndex = i - 1;
         current = arr[i];
         while (preIndex >= 0 && current < arr[preIndex]) {
            InsertSoryIndex++;
                arr[preIndex + 1] = arr[preIndex]
                preIndex--;
         }
         arr[preIndex + 1] = current;
     }
     return arr
 }




 // 斐波那契数列优化算法


  function fn(n){
    if(n === 0 || n === 1){
      return 1
    }else{
      return fn(n - 1) + fn(n - 2)
    }
  }



//   function fn2{
//       let 
//   }
//  let arr = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  let time1 = new Date().getTime()
  let result = fn1(40)  //写50就会爆栈
  let time2 = new Date().getTime()
  console.log("111111-time", (time2 - time1) / 1000, result);

