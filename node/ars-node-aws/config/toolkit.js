/**
 * Created by wangdawei on 2017/6/6.
 */
var os = require('os');
var util = require('util');

/**
 * 获取req的iP地址
 * @param req
 * @returns {*}
 */
function reqIP(req) {
    if (!!req && !!req.ip) {
        var result = req.ip.match(/\d+\.\d+\.\d+\.\d+/);

        if (util.isArray(result) && result.length > 0) {
            return result[0];
        }

        return result;
    }

    return null;
}

function isWhite() {
    var WhiteList = ["10.40.2.68", "10.36", "192.168.0.162", "192.168.0.161"];
}

module.exports = {
    reqIP: reqIP
};