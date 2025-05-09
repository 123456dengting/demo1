/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    console.log("111111-func-opt-data", opt.data)
    opt.success = opt.success || function () {};
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }


    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', opt.contentType || 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(opt.data);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        var params = [];
        for (var key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        params = params.join('&');
        xmlHttp.open(opt.method, opt.url + '?' + params, opt.async);
        xmlHttp.send(null);
    }
    
    xmlHttp.onreadystatechange = function () {
        console.log("111111-2222222-func", xmlHttp.readyState, xmlHttp.status)
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let response;
            try {
                response = JSON.parse(xmlHttp.responseText)
            } catch (error) {
                response = xmlHttp.responseText;
            }
            opt.success(response);
        }else{
            opt.error()
        }
    };
}