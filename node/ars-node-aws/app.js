var express = require('express');
var app = express();
var config = require('./config/default.js');
var router = express.Router();
var { postCallBack, getCallBack } = require('./reqFn')
var bodyParser = require('body-parser')
var hostArr = require('./model/hostArr')
var awsEc2 = require('./model/test')
var logger = require('./model/log')

// awsEc2.restartHost(hostArr)    

// clearInterval(() => {
//   awsEc2.restartHost(hostArr)     
// }, 2 * 6000)


// awsEc2.restartHost([hostArr[0]])     


//post 请求参数放到req.body里面
app.use(bodyParser.urlencoded({ extended: false }))

//跨域设置
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", '3.2.1')
  if(req.method=="OPTIONS") res.send(200)
  else next();
});

app.get('/getIp', async function (req, res) {
   let data = await getCallBack(req.query, res)
   res.send(data)
})


app.post('/reload', async function (req, res) {
  let data = postCallBack(req.body, res)
  res.send({
    msg: 'success'
  })
})

// server.listen(3888)

var server = app.listen(8903, function () {
  
  var host = server.address()

  console.log('host', host)

  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

server.setTimeout(300000)