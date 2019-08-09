var fs = require('fs');
var path = require('path');
const global = require('../config');     // 基础配置参数
const obj_d2c = require('../data/spider/domain2country.json');    // 域名->国家映射对象
const PATH_NAME = path.resolve(__dirname, global['DATA_PATH_UTILS']);
const moment = require('moment')
const child_process = require('child_process')

// const FormData = require('form-data');
class Tools {

    static timeout(delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(1)
                } catch (e) {
                    reject(0)
                }
            }, delay)
        })
    }

    static getRandom(min, max){
      if (min > max) {
        let c = min;
        min = max;
        max = c;
      }
      try {
        return parseInt(Math.random() * (max + 1 - min) + min )
      } catch (error) {
        return 0
      }
     
    }

    /**
     * 定时函数  严格模式下不能使用 anguments.callee 
     * @param {*} interval 
     * @param {*} fn 
     */


    static  createTimeOutFn(fn, interval){
      let func = async function() {
        await fn()
        setTimeout(func, interval);
      }
      func()
    }

    /**
     * format string params to Json
     * 
     * @static paramsStringToJson
     * @param {string} 'from=en&to=zh&query=th&transtype=realtime&simple_means_flag=3'
     * @returns {Object}
     * @memberof Tools
     */
    static paramsStringToJson(str = 'from=en&to=zh&query=th&transtype=realtime&simple_means_flag=3') {
        const arrStr = str.split('&');
        return arrStr.reduce((a, b) => {
            let k = b.split('=')[0];
            let v = b.split('=')[1];
            return { ...a, ...{ [k]: v } };
        }, {});
    }
    /**
     * 
     * [{k:'a', v:123},{k:'b', v:456}]  -> {a:123, b:456}
     * @static kvArrayToObject
     * @param {Array} kvArr 
     * @memberof Tools
     * @return {Object} 
    */
    static kvArrayToObject(kvArr) {
        return kvArr.reduce((prev, item) => {
            const { k, v } = item;
            return { ...prev, ...{ [k]: v } };
        }, {});
    }
    /**
     * 
     * 
     * @static trim() 
     * @param {string} str 
     * @returns {string}
     * @memberof Tools
     */
    static trim(str){ 
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    /**
     * 
     * @static
     * @param {string} [type=''] 
     * @param {string} [str=''] 
     * @returns 
     * @memberof Tools
     */
    static verify(type = '', str = '') {
       let reg = new RegExp();
       switch (type.toUpperCase()) {
           case 'URL':
               reg = new RegExp('(https ?|ftp | file | http)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
               break;
           default:
               break;
       }
       return reg.test(str);
    }

    /**
     * 
     * @static readFilePromise  Reading file which return a promise variable with the text string
     * @param {string} fileName [default] '../data/configs.json'
     * @returns {promise}
     * @memberof Tools
     */
    static readFilePromise(fileName) {
        fileName = fileName === undefined ? PATH_NAME : fileName;
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            })
        })
    }
    /**
     * 
     * 
     * @static writeFilePromise 
     * @param {string} str The text which write to file 
     * @param {string} fileName [default] '../data/configs.json'
     * @returns {promise}
     * @memberof Tools
     */
    static writeFilePromise(str, fileName) {
        fileName = fileName === undefined ? PATH_NAME : fileName;
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, str, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ code: 100 });
                }
            })
        })
    }
    /**
     * 
     * 
     * @static appendFilePromise
     * @param {string} str The text which write to file 
     * @param {string} fileName [default] '../data/configs.json'
     * @returns {promise}
     * @memberof Tools
     */
    static appendFilePromise(str, fileName) {
        fileName = fileName === undefined ? PATH_NAME : fileName;
        return new Promise((resolve, reject) => {
            fs.appendFile(fileName, str, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ code: 100 });
                }
            })
        })
    }


    //递归创建目录 异步方法  
    static mkdirs(dirname, callback) {
        fs.exists(dirname, function (exists) {
            if (exists) {
                callback();
            } else {
                //console.log(path.dirname(dirname));  
                Tools.mkdirs(path.dirname(dirname), function () {
                    fs.mkdir(dirname, callback);
                });
            }
        });
    }  
    /**
     * 
     * 
     * @static isObjectValueEqual
     * @param {object} a  
     * @param {object} b 
     * @returns {boolean} is Equal?
     * @memberof Tools
     */
    static isObjectValueEqual(a, b) {
        // Of course, we can do it use for in 
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }

    /**
     * [TimeTools description]
     * @param {[type]} timestamp  12312312312312
     * @param {[type]} formatStr Y年M月D日
     *
     * M: month 1~12
     * Y: year 2017
     * D: date 0 ~ 31
     */
    static moment(formatStr, timestamp) {
        let date = new Date(timestamp || new Date().getTime())

        let M = date.getMonth() + 1

        let Y = date.getFullYear()

        let D = date.getDate()

        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();

        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();  

        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        return formatStr.replace('M', M).replace('Y', Y).replace('D', D).replace('h', h).replace('m', m).replace('s', s)
    }

    static getMsgObject(msg, status) {
        const time = Tools.moment('M-D h:m:s');
        return {msg: msg || '', time: time, timeStamp: new Date().getTime(), status: status || 'success'};
    }
    
    /**
     * 
     * isElementsInArray
     * @static
     * @param {Object} obj 母Obj 
     * @param {Object} ele 子Obj
     * @returns {Boolean} status 
     * @memberof Tools
     */
    static isElementsInArray(obj, ele){
        return Object.keys(ele).every( it => obj.hasOwnProperty(it) && obj[it] === ele[it] );
    }


    static async domain2Country(domain) {
        return domain in obj_d2c ? obj_d2c[domain] : '未知';
    }

    static guid(isShort) {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        if (isShort) return (S4() + S4() + "-" + S4() + "-"  + S4() + S4());
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    static isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    /**
     * 递归转换对象为数组
     * @param {object} obj 需要处理的object
     * @param {array} others 需要处理的字段
     */
    static deepObj2array(obj, ...others) {
        // if(!obj) return []
        obj = Tools.isObject(obj) ? [obj] : obj;
        return obj.map(it => {
            const els = others.filter(_it => it[_it] !== undefined);
            if (els.length > 0) els.forEach(el => it[el] = Tools.deepObj2array(it[el], ...others))
            return it;
        })
    }

    /**
     * 转换json格式到Form格式
     * @static
     * @param {object} obj 
     * @returns {formdata} data
     * @memberof Tools
     */
    static json2FormData(obj) {
        let data = new FormData();
        for (var props in obj) {
            if (obj.hasOwnProperty(props)) {
                var el = obj[props];
                console.log(typeof props, typeof el)
                data.append(props, el);
            }
        }
        return data;
    }

    /**
     * Transfer json data to post data
     * 
     * @static
     * @param {object} obj post object
     * @param {string} [name='json'] formdata's name, default 'json'
     * @returns {formdata}
     * @memberof Tools
     */
    static json2PostData(obj, name='json') {
        console.log(obj, name)
        return Tools.json2FormData({[name]: JSON.stringify(obj)});
    }

    /**
      关闭chrome进程
     */
    static RunShell(cb){
      child_process.execFile("close-chrome.bat",null, function(error,stdout,stderr){
          if(error !==null){
            console.log("exec error"+error)
            cb(false)
          }else{
            console.log("关闭所有浏览器进程成功", moment().format('MM-DD hh:mm:ss'))
            cb(true)
          }   
      })
    }

    
};

module.exports = Tools;