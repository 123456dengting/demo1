



//判断是否存在类名
const hasClass = (obj, cls) => {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
//添加类名
const addClass = (obj, cls) => {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}
//删除类名
const removeClass = (obj, cls) => {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

//url传值加密
const compile = (code) => {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c)
}

//url传值解密
const uncompile = (code) => {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
}


//获取url参数
const GetQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 复制到剪切板
const copyText = (text) => {
    let textare, value;
    textare = document.createElement('textarea');
    value = document.createTextNode(text);
    textare.appendChild(value);
    document.body.appendChild(textare);
    document.getElementsByTagName('textarea')[0].select();
    try {
        document.execCommand('copy');
        document.body.removeChild(textare);
        console.log("复制成功");
    } catch (e) {
        console.log("复制失败，请手动复制");
        document.body.removeChild(textare);
    }
}


/**
 * 日期格式化
 *   let newDate = new Date(); 或者  let newDate = new Date('时间戳');
 *   newDate =  newDate.Format("yyyy-MM-dd hh:mm:ss")   里面的字母不能换,符号任意
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds(), //毫秒
        //      "w":this.getDay()
    };
    var week = ["", "一", "二", "三", "四", "五", "六", "日"];
    //年
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    //星期  w  ww  
    if (/(w+)/i.test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? week[this.getDay()] : this.getDay());
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



/**
 * 将选中的文件转化为base64
 * @param {*} file 文件流
 * @param {*} fn 回调函数
 */
const selectImage = (file, fn) => {
	var reader = new FileReader();
	reader.onload  = (function(file){
		return function(e){
			fn(e.target.result)
		}
	})(file)
	reader.readAsDataURL(file);
}


/**
 * 网络图像文件转Base64
 * @param {*} img 
 */
const getBase64Image = (img) => {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}
 

/**
 * Base64字符串转二进制
 * @param {*} dataurl  base64
 * @param {*} type     blob,byte  默认转化为blob, byte转化为二进制 
 * 返回指定类型的流或者二进制
 */
const  dataURLtoBlob = (dataurl,type = 'blob') => {
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    if (type == "byte") {
        return u8arr;
    } else {
        return new Blob([u8arr], {
            type: mime
        });
    }
}


//字符串和base64互转  
/**
 * let base64 = new Base64()
 * let str64 = base64.encode(str)
 * let str  =  base64.decode(str64)
 * 
 */
const Base64 = function () {  
   
    // private property  
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    }  
   
    // public method for decoding  
    this.decode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
    }  
   
    // private method for UTF-8 encoding  
    var _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    var _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;  
        var c , c1 , c2;
        c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                var c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
}



/**
 *   //光标移动到目标元素的末尾
 * @param {*} obj  一个dom元素对象
 */
function keepLastIndex(obj) {
    if (window.getSelection) { //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
    } else if (document.selection) { //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
    }
}


/**
 * 获取可编辑div光标位置   <div contenteditable="true" ></div>
 * @param {*} obj  一个dom元素对象
 * 返回值中startOffset  endOffset 代表选中区域的起始位置和结束位置, 两个值相同代表光标位置
 */
function getRangeAt(obj){
    let nodes = obj.childNodes;
    if (window.getSelection) { //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        let target = range.focusNode;
        if (range.focusNode.parentNode != obj) {
            target = range.focusNode.parentNode;
        }
        let targetSelection = range.getRangeAt(0);    //点击的子节点光标位置,相对于子节点
        let len = 0;
        //解决可编辑div中含有标签元素的时候光标定位不准问题
        for (let index = 0; index < nodes.length; index++) {
            let item = nodes[index];
            if(target != item){
               //当点击的node不等于循环的node的时候
               if (item.tagName) {
                   //如果item是标签
                   len += item.outerHTML.trim().length;
               }else if(item.nodeName == "#text"){
                   //如果item是纯文本
                   len += item.data.trim().length
               }
            }else{
                //当点击的node等于循环的node的时候
               if (item.tagName) {
                   //如果item是标签
                   len += item.tagName.length;
               }else if(item.nodeName == "#text"){
                   //如果item是纯文本
               }
               break;
            }
            
        }
        let selectCus = {
            startOffset:targetSelection.startOffset + len,
            endOffset:targetSelection.endOffset + len
        }
        return  selectCus
    }else{
        //暂不支持
    }
}




/** * 是否为mac系统（包含iphone手机） * */ 
const isMac = function() { 
    return /macintosh|mac os x/i.test(navigator.userAgent); 
}

/** * 是否为windows系统 * */
const isWindows = function() { 
    return /windows|win32/i.test(navigator.userAgent);
}

//获取用户信息
let userInfo;
const getUser = () => {
    if (!userInfo) {
        userInfo = caches.get("UserInfo") ? JSON.parse(caches.get("UserInfo")) : false;
    }
    return userInfo;
}

//与运算的2的n次方拆分为数组
const get2nToArr = (n) => {
    let isNumber = typeof n == "number" ? true : false
    n = Number(n);
    let arr = [],t;
    for (let index = 0; index < 32; index++) {
       t = Math.pow(2,index)
       if ( t & n) {
           if (isNumber) {
            arr.push(t)
           }else{
            arr.push(t.toString())
           }
           
       }
    }
    return arr;
}


//数组进行与运算
const getArrTo2n = (arr) => {
    let t;
    arr.forEach(item => {
        t = t | Number(item);
    })
    return t;
}


//深复制
function deepClone(obj){
    //定义对象来判断当前的参数是数组还是对象
    let objClone = Array.isArray(obj)?[]:{};
    //如果obj存在并且为对象		
    if(obj&&typeof obj == "object"){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                //如果obj的子元素为对象，那么递归（层级遍历）
                if(obj[key]&&typeof obj[key] == "object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                //如果不是，直接赋值
                    objClone[key] = obj[key];
                }
            }
        }
    }	
    return objClone;
}


//简单的深复制(不能复制函数,对象的类没了)
var a = [1,2,3];
var b = JSON.parse(JSON.stringify(a));


//根据父子ID关系,循环格式化数据结构
let arrs = [
	{
		id:1,
		name:"1",
		parentId:0
	},
	{
		id:2,
		name:"1-2",
		parentId:1
	},
	{
		id:3,
		name:"1-3",
		parentId:1
	},
	{
		id:4,
		name:"4",
		parentId:0
	},
	{
		id:5,
		name:"4-5",
		parentId:4
	},
	{
		id:6,
		name:"4-5-6",
		parentId:5
	}
]

/**
 * 因为数组是引用类型,后面的子集改变之后.结果会相应的改变到当前的引用数组元素里面
 */
const _findArrChild = arr => {
	let findChildren = t => {
		return arr.filter(s => t.id === s.parentId)
	}

	return arr.filter(item => {
		let ch = findChildren(item)
		if (ch && ch.length > 0) {
			item['children'] = ch	
		}
		return item.parentId === 0
		
	})
}




// console.log('_findArrChild(arrs)', _findArrChild(arrs)) 


