//express_demo.js 文件
var { postCallBack, getCallBack } = require('./reqFn')
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//post 请求参数放到req.body里面
app.use(bodyParser.urlencoded({ extended: false }))

//跨域设置
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.post('/api/base/public/phone/captcha', function(req, res) {
    console.log("reqNum: HnSoBQ8IGfuiRkEwT5y1eW12ohk=", reqNum)
    let response = {
        "success": false,
        "sysTime": 1578301931347,
        "data": {
            "countryId": 1,
            "phoneNumber": "0811331011",
            "type": 100,
            "captcha": "88328",
            "createTime": 1578301931185,
            "expireTime": 1578302531185
        }
    }
    response.data = undefined;
    res.send(response)
})

// app.get('/api/cashloan/loan/public/type', function (req, res) {
//   console.log("typesss")
//   res.send(typeData)
// })


// app.get('/api/cashloan/check-status', function (req, res) {
//   console.log("check-status")
//   res.send(checkStatus)
// })

var server = app.listen(8081, function() {

    var host = server.address()

    console.log('host', host)


    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})