var taskCollection = require('./TaskCollection');
var { TaskState } = require('./Task')
var { deepObj2array } = require('../utils/utils')
var logger = require('../utils/log')

class Websocket {
    constructor() {

    }

    /**
     * @method initSocket
     * @description 初始化sockect，链接并监听客户端socket
     * @memberof Monitor
     */
    initSocket(io) {
        logger.trace('启动websocket')
        io.on('connection', socket => {
            this.socket = socket;
            socket.on('client', this.onSocketAdMonitor.bind(this));
            socket.emit('server', { msg: 'Hello,This is server' });
        });
    }

    /**
     * @method onSocketAdMonitor
     * @description 处理adMonitor模块socket消息        
     * @param { object } req 收到消息
     * @param { function } cb callback函数 
     */
    onSocketAdMonitor(req, cb) {
      const keyword = req.data.autoTest ? deepObj2array(req.data.autoTest.keyword, 'country', 'execTime', 'devices', 'languages') : [];
      if (typeof cb === 'function') cb({ code: 100 });
      logger.trace('client-data', req.data)
      switch (req.actionId) {
          case 1:      // 添加新配置任务
              this.addJobs(keyword)
              break;  
          case 2:      // 修改配置任务
              this.editJob(keyword[0]);
              break;
          case 3:      // 删除配置任务
              this.removeJob(req.data.id);
              break;
          case 4:      // 立即运行某配置任务
              const isRunNow = true;
              const runData = deepObj2array(req.data, 'country', 'execTime', 'devices', 'languages');
              this.addJobs(runData, isRunNow);
              break;
          default:
              break;
      }
  }
  addJobs(runData, isRunNow = false){
    let addkeywold = Array.isArray(runData) ? runData[0] : runData
    let taskState = new TaskState({...addkeywold})
    taskCollection.add(taskState, isRunNow)
  }
  editJob(runData){
    let addkeywold = Array.isArray(runData) ? runData[0] : runData
    this.removeJob(addkeywold.id)
    this.addJobs(addkeywold)
  }
  removeJob(keywordId){
    let removeIndex = taskCollection.tasks.findIndex(s => s.taskState.id == keywordId)
    if (removeIndex !== -1) {
      taskCollection.tasks[removeIndex].destroy();
      taskCollection.tasks.splice(removeIndex, 1)
    }else{
      logger.trace('删除的关键字不存在')
    }

  }
}


const websocket = new Websocket()

let  res = [{
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
}]

// websocket.addJobs(res, true)


module.exports = websocket