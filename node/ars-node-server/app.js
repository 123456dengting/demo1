require('events').EventEmitter.prototype._maxListeners = 100;
var cors = require('./middleware/cors'); //解决跨域
var api = require('./routes/api');
var app = require('express')()
var Browser = require('./modules/Browser')
var {
  GoogleRequestState
} = require('./modules/RequestState')
var ResolveRequest = require('./modules/ResolveRequest')
const puppeteer = require('puppeteer');
var svr = require('http').Server(app);
var io  = require('socket.io')(svr);
var ioServer = require('http').Server(app);
var moment = require('moment')
var distributionTask = require('./modules/DistributionTask');
var BrowserCollection = require('./modules/BrowserCollection')
var Websocket = require('./modules/Websocket')
const schedule = require('node-schedule');
var TASK_QUEUE = require('./modules/TaskQueue');
const tracer = require('tracer')
var {
  timeout,
  getRandom,
  createTimeOutFn,
  RunShell
} = require('./utils/utils')
var logger = require('./utils/log')
var Ajax = require('./utils/Ajax')
var {closeChromeTime} = require('./config/global')

//每天0清空重复的黑名单
Ajax.clearRepeatData()



// setInterval(() => {
//   RunShell(async (msg) => {
//     if(msg){
//       // if(TASK_QUEUE.count() === 0){
//         await BrowserCollection.destroyBrowsers()
//         await timeout(500)
//         await BrowserCollection.__init__()
//         await timeout(2000)
//         BrowserCollection.browsers.forEach(s => {
//           s.isCanDestory = false
//         })
//       // }
//     }
//   })
// }, closeChromeTime)

svr.listen(3009); // socket服务

Websocket.initSocket(io)

var server = app.listen('8901', function () {
  console.info('Express server listening on port ' + server.address().port);
})

app.use(cors);




//关键词格式
let reqData = {
  actionId: 4,
  data: {
    id: '201',
    keyword: 'zaful',
    domainSign: 'zaful',
    execTime: {
      id: '463',
      time: '00:00:00',
      keywordId: '201',
      intervalHours: 6
    },
    country: [{
        id: '772',
        name: '美国'
      }
    ],
    devices: [{
        id: '634',
        userAgent: 'PC'
      }
    ],
    languages: [{
        id: '94',
        language: 'en'
      }
    ]
  }
}
