/**
 截取字符串
 slice() 
    stringObject.slice(start, end)
    //数组也有slice方法, 可不传参数可用于浅复制
    start（必需）：规定从何处开始选取。如果是负数，那么它规定从字符串尾部开始算起的位置。也就是说，-1 指最后一个字符，-2 指倒数第二个字符，以此类推。
    end（可选）：规定从何处结束选取，即结束处的字符下标。如果没有指定该参数，那么截取的字符串包含从 start 到结束的所有字符。如果这个参数是负数，那么它规定的是从数组尾部开始算起的字符。

 
 substring() 
    stringObject.substring(start, stop)
    start（必需）：如果为负数,则从0开始

 substr() 
    stringObject.substr(start, length)
    start（必需）：规定从何处开始选取。如果是负数，那么它规定从字符串尾部开始算起的位置。也就是说，-1 指最后一个字符，-2 指倒数第二个字符，以此类推。
    length（可选）：在返回的子字符串中应包括的字符个数。 如果 length 为 0 或负数，将返回一个空字符串。 如果没有指定 length，则子字符串将延续到 stringObject 的最后。
    
  


  如果start填0, 则这几个函数的效果一样  
 */

let str = 'abcdefghijk';

let str1 = str.slice()
let str2 = str.substring()
let str3 = str.substr()



