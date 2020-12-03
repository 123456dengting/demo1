//express_demo.js 文件
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var URL = require("url")

//post 请求参数放到req.body里面
app.use(bodyParser.urlencoded({ extended: false }))

//跨域设置
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1');
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });


function getUrlParams(url, name) { 
  let search = url.split("?")[1] ? url.split("?")[1] : "";
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
  var r = search.match(reg);  
  if (r != null) return unescape(r[2]); 
  return null; 
}

app.get('/user', function (req, res) {
    let path = URL.parse(req.url).path;
    console.log("uuuuuu", getUrlParams(path, "callback"));
    let callBackName = getUrlParams(path, "callback") || ""
    let data = {"name": "aaa", "age": "18"};
    if(callBackName){
      res.send(`${callBackName}(${JSON.stringify(data)})` );
    }else{
      res.send(data)
    }
})

var server = app.listen(8081, function () {

  var host = server.address()

  console.log('host', host)


  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

