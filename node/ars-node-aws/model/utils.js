var fs = require('fs');
var path = require('path');
const child_process = require('child_process')


class Utils {
  static updateHostInfo(hostArr, newHostArr) {
    newHostArr = Array.isArray(newHostArr) ? newHostArr : [newHostArr]
    hostArr.forEach(h => {
      newHostArr.forEach(n => {
        if (h.InstanceId === n.InstanceId) {
          //这里不能从新赋值一个新对象
          h.State = n.State
          h.PrivateIpAddress = n.PrivateIpAddress
          h.PublicIpAddress = n.PublicIpAddress
          h.PublicDnsName = n.PublicDnsName
          h.isReStart = n.isReStart === undefined ? h.isReStart : n.isReStart
        }
      })
    })
  }

  /**
   * 
   * 
   * @static appendFilePromise
   * @param {string} str The text which write to file 
   * @returns {promise}
   * @memberof Tools
   */
  static appendFilePromise(str, fileName) {
    return new Promise((resolve, reject) => {
      fs.appendFile(fileName, str, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            code: 100
          });
        }
      })
    })
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

  //递归创建目录 异步方法  
  static mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
      if (exists) {
        callback();
      } else {
        //console.log(path.dirname(dirname));  
        Utils.mkdirs(path.dirname(dirname), function () {
          fs.mkdir(dirname, callback);
        });
      }
    });
  }

}



module.exports = Utils;