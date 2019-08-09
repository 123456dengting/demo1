var Enum = require('./enum');


const EnumLibs = {
  browserStatus: new Enum({
    notCreate: {
      text: '未创建',
      value: 0
    },
    normal: {
      text: '正常',
      value: 1
    },
    busy: {
      text: '忙碌',
      value: 2
    }, 
    willExpire: {
      text: '即将过期',
      value: 3
    },
    expired: {
      text: '已过期',
      value: 4
    },
    manyRequests: {
      text: '请求过多',
      value: 5
    },
  }),
  pageStatus: new Enum({
    free: {
      text: '空闲',
      value: 1
    },
    busy: {
      text: '忙碌',
      value: 2
    }, 
  }),
  taskStatus: new Enum({
    notRun: {
      text: '未开始',
      value: 0
    },
    running: {
      text: '运行中',
      value: 1
    },
    stoped: {
      text: '已停止',
      value: 2
    },
    destroy:{
      text: '已销毁',
      value: 3
    }
  }),
  getDataStatus: new Enum({
    success: {
      text: '抓取数据成功',
      value: 0
    },
    isAnchor: {
      text: '人机检测',
      value: 1
    },
    iptimeout: {
      text: 'IP超时',
      value: 2
    },
    browserBusy: {
      text: '没有可用的浏览器',
      value: 3
    }
  })
}


module.exports = EnumLibs;