//express_demo.js 文件
var { postCallBack, getCallBack } = require('./reqFn')
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//post 请求参数放到req.body里面
app.use(bodyParser.urlencoded({ extended: false }))

//跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.get('/user', function (req, res) {
  let a = postCallBack()
  res.send(a)
})


app.post('/user', function (req, res) {
  console.log('req', req.body)
  url.parse(req.url).pathname
  res.send({ name: 'aaa', age: 18111 });
})



var server = app.listen(8081, function () {

  var host = server.address()

  console.log('host', host)


  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

