
var hostArr = require('./model/hostArr')
var awsEc2 = require('./model/test')
var logger = require('./model/log')

const resultRes = (res) => {
  return {
    code: 200,
    msg: 'success',
    data: res
  }
}


const getCallBack = async (params, res) => {
  const {timeout = 1000 * 60 * 60 * 24} = params

  //找出ip存在并且满足  !host.isReStart && host.State.Code === 16 并且used最小的实例

  let copyHost = JSON.parse(JSON.stringify(hostArr))
  copyHost = copyHost.filter(host => {
    let ip = host.PublicIpAddress;
    if(!ip || ip.trim() === 'undefined'){
      return false
    }else{
      if(!host.isReStart && host.State.Code === 16){
        return true
      }
    }
  })


  copyHost.sort( (a, b) => { return a.used - b.used} )

  if (copyHost.length > 0) {
    let currenHost = copyHost[0]
    let returnIp = currenHost.PublicIpAddress;
    let returnPriveIp = currenHost.PrivateIpAddress;
    let usedNumLessIndex = currenHost.index;
  
    hostArr[usedNumLessIndex].used++;
  
    if (timeout) {
      hostArr[usedNumLessIndex].reStart.call(hostArr[usedNumLessIndex], timeout, awsEc2)
    }
  
    logger.trace('返回ip',{ip: returnIp, priveIp: returnPriveIp})

    return resultRes({ip: returnIp, priveIp: returnPriveIp})
  }else{
    logger.trace('暂无可用IP')
    return resultRes({ip: '', priveIp: ''})
  }
}

const postCallBack = (params, res) => {
  let {priveIp} = params
  logger.trace('重启私有ip', priveIp)
  if(priveIp !== '0.0.0.0'){
    let index = hostArr.findIndex(host => host.PrivateIpAddress === priveIp)
    
    hostArr[index].reStart.call(hostArr[index], 0, awsEc2)
  }
}


module.exports = {getCallBack, postCallBack}