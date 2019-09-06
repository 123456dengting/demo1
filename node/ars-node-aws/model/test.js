var AWS = require('aws-sdk');
var config = require('../config/default.js');
var moment = require('moment')
var async = require('async');
var hostArr = require('./hostArr')
var {updateHostInfo} = require('./utils')
var logger = require('./log')

/**
 * 初始化 AWS.EC2
 */
AWS.config.loadFromPath('./config/config.json');
var ec2 = new AWS.EC2({
  apiVersion: '2016-11-15'
});


class AwsEc2 {
  constructor() {}

  /**
   * 获取参数
   * @param {Array} instances @param {Aray} instances [{InstanceId: ['i-002ccb13760e2c858'], region: 'us-east-1'}]
   */
  getParams(instances) {
    instances = JSON.parse(JSON.stringify(instances))
    var params = config.ap();
    var region = instances[0].region;
    params.InstanceIds = instances.map(item => item.InstanceId)
    return {
      params,
      region
    }
  }

  //定时查询某台机器的状态, 一定时间之后还没查到ip则警告

  async timeOutGetIp(params, region = 'us-east-1'){
    logger.trace('定时查询ip', params)
    //每隔10秒查一次, 超过 30次警告
    let i = 0;
    let self = this;
    let timer = setInterval(() => {
      i++;
      self.describeInstance(params, region, function(data){
        if(data.data[0].PublicIpAddress){
          data.data[0].isReStart = false
          updateHostInfo(hostArr, data.data)
          clearInterval(timer)
          timer = null
        }
      })
      if(i >= 30){
        clearInterval(timer)
        timer = null
        logger.trace('查询ip超时', params.InstanceIds[0])
      }
    }, 10000);

  }

  /**
   * 获取实例信息
   * @param {Object} params {
       DryRun: false
       InstanceIds: ['i-0f97616d4ff13bea5']
      }
   * @param {String} region  'us-east-1'
   * @param {Function} callback 
   */
  async describeInstance(params, region = 'us-east-1', callback) {
    let self = this
    /**
     * params = 
     */
    AWS.config.update({"region": region });
    ec2.describeInstances(params, function (err, data) {
      if (err) {
        callback({
          msg: 'error',
          data: err
        })
      } else if (data) {
        let hostInfoArr = []
        data.Reservations.forEach(t => {
          t.Instances.forEach(s => {
            const {
              InstanceId,
              PrivateIpAddress,
              PublicIpAddress,
              State,
              PrivateDnsName,
              PublicDnsName
            } = s
            let hostInfo = {
              region,
              InstanceId,
              State,
              PrivateIpAddress,
              PublicIpAddress,
              PrivateDnsName,
              PublicDnsName
            }
            hostInfoArr.push(hostInfo)
          })
        })
        callback({
          msg: 'success',
          data: hostInfoArr
        })
      }
    });
  }
  /**
   * 重启实例
   * @param {Aray} instances [{InstanceId: ['i-002ccb13760e2c858'], region: 'us-east-1'}]
   */
  restartHost(instances) {
    let self = this
    async.waterfall([function (cb) {
      //关闭实例
      let {
        params,
        region
      } = self.getParams(instances)
      ec2.stopInstances(params, function (err, data) {
        if (err) {
          cb({
            msg: 'error',
            data: err
          });
        } else if (data) {
          logger.trace('关闭实例成功', moment().format('MM-DD hh:mm:ss'))
          cb(null, params, region);
        }
      });
    }, function (params, region, cb) {
      //有可能是正在关闭状态 stopping 等待两秒
      setTimeout(() => {
        self.describeInstance(params, region, function (data) {
          if (data.msg !== 'success') cb({
            msg: 'error',
            data: '查询实例信息失败' + data.data
          })
          let notStop = false;
          //查询所需要处理的实例的状态是不是已经成功关闭
          if (Array.isArray(data.data)) {
            (data.data).forEach(d => {
              if (d.State.Name !== 'stopped') {
                notStop = true;
              }
            })
          }
          
          // if (!notStop) {
            ec2.startInstances(params, function (err, data) {
              if (err) {
                cb({
                  msg: 'error',
                  error: err
                });
              } else if (data) {
                logger.trace('启动实例成功', moment().format('MM-DD hh:mm:ss'))
                cb(null, params, data);
              }
            });
          // } else {
          //   cb({
          //     msg: 'error',
          //     data: '可能有的实例不是关闭状态,启动未执行'
          //   })
          // }
        })
      }, 20 * 1000)
    }], function (err, params, data) {
      if (!!err) {
        logger.trace('重启实例失败', err)
        awsEc2.restartHost(instances)
      } else {
        setTimeout(() => {
          self.describeInstance(params, '', function (data) {
            if (data.msg === 'success') {
              data.data.forEach(d => {
                  if(!d.PublicIpAddress){
                    d.isReStart = true
                    let getipParam = JSON.parse(JSON.stringify(params))
                    getipParam.InstanceIds = [d.InstanceId]
                    self.timeOutGetIp(getipParam, 'us-east-1')
                  }else{
                    d.isReStart = false
                  }
              })
              updateHostInfo(hostArr, data.data)
            }
          })
        }, 20 * 1000)
      }
    })
  }
}

const awsEc2 = new AwsEc2()

//启动服务器查询所有实例的状态
let {params, region} = awsEc2.getParams(hostArr)

function searchStatus() {
  awsEc2.describeInstance(params, region, function(data){
    if (data.msg === 'success') {
      updateHostInfo(hostArr, data.data)
      logger.trace(`查询所有实例成功, ${moment().format('MM-DD hh:mm:ss')}`)
      logger.trace(hostArr)
      let undefinedArr = data.data.filter(item => item.PublicIpAddress === undefined || item.PublicIpAddress === 'undefined' || item.PublicIpAddress.trim() === '')
      if(undefinedArr.length > 0){
        logger.trace(`重启ip为undefined的服务器--${undefinedArr}`)
        awsEc2.restartHost(undefinedArr) 
      }
    }else{
      logger.trace(`查询所有实例失败, ${moment().format('MM-DD hh:mm:ss')}`)
      logger.trace(data.data)
    }
  })
}
searchStatus()
setInterval(() => {
  searchStatus()
}, 10 * 60000)






module.exports = awsEc2