const axios = require('axios');
const schedule = require('node-schedule');
const rp = require('request-promise');   // request 支持promise版本
const {postResultCOnfig, getIpConfig} = require('../config/global')
const {deepObj2array } = require('./utils')
var {ipTimeout} = require('../config/global')
// import qs from 'Qs'
var logger = require('./log')
var qs = require('qs')

//重复的数据
var repeatData = [];



class Ajax{
  constructor(){

  }

  /**
   * 请求ip
   */
  async getPublicIp(){
      let url = `${getIpConfig.url}:${getIpConfig.port}/getIp`
      // let url = 'http://127.0.0.1:8081/getIp'
      let data = {
        timeout: ipTimeout
      }
      let res = await this.ajaxGet(url, data)
      
      let ip = res.code === 200 ? res.data.ip : '';
      let priveIp = res.code === 200 ? res.data.priveIp : '';
      return {
        ip,
        priveIp
      }
  }

  async reloadPriveIp(priveIp = '0.0.0.0'){
    logger.trace('reloadPriveIp', priveIp)
    let url = `${getIpConfig.url}:${getIpConfig.port}/reload`
    // let url = 'http://127.0.0.1:8081/getIp'
    let data = {
      priveIp: priveIp
    }
    let res = await this.ajaxPost(url, data)
}

  /**
   * get请求
   * @param {String} url 
   * @param {Object} data 
   */
  async ajaxGet(url, data){
    return await axios.get(url, {params: data}).then(res => {
      if(res.status === 200){
        return res.data
      }else{
        logger.warn(`服务器异常, ${url}, ${res.status}`)
      }
    })
  }

  /**
   * post请求
   * @param {String} url 
   * @param {Object} data 
   */
  ajaxPost(url, data){
    axios.post(url, qs.stringify(data)).then(res => {
      if(res.status === 200){
        return res.data
      }else{
        logger.warn(`服务器异常, ${url}, ${res.status}`)
      }
    })
  }

  /**
     * postResult
     * 提交数据
     * @param { object } param 数据块参数 
     * @return { promise } 
     * @memberof Ajax 
     */
    async postResult(param) {
      const postData = JSON.stringify({ "actionid": "10", "autoTestResult": param });
      try {
          let url = postResultCOnfig.url + ':' + postResultCOnfig.port + '/api/AutoTestResult';
          let res = await rp.post({ url: url, form: { json: postData } });
          res = JSON.parse(res);
          
          if (res.code !== 1) {
              logger.trace('推送数据返回值异常', res);
              // res.data = JSON.parse(res.data);
              // throw Error(res.data.msg;)
              // logger.warn('推送数据失败', res);
          } else {
            // logger.trace('推送数据成功');
          }
      } catch (err) {
        logger.warn('推送数据服务器异常', err);
      }
  }

  /**
   * 推送数据
   * @param {Array} dataArr 
   */
  postResults(dataArr = []){
    let filterResult = dataArr.filter(s => this.filterData(s))
    logger.trace('过滤数据', dataArr.length - filterResult.length)
    logger.trace('推送数据', filterResult)
    const pmPostResults = filterResult.map(it => this.postResult(it));
    
  }
  

  /**
   * 每天0点清空重复的黑名单
   */
  clearRepeatData(){
    let rule = new schedule.RecurrenceRule();
    rule.hour = [0]
    schedule.scheduleJob(rule,  async () => {
      //启动任务
      console.log('清空重复黑名单', repeatData.length)
      repeatData = []
    })
  }

  //分类
  testAdType(requestUrl, lkid){
    let reg1 = /zaful.com|rosegal.com|dresslily.com/ig;
    let reg2 = /utm_source|erfahrungenscout|webgains|shareasale|couponsism|couponcause|hotdeals|promopro|getcoupon4u|ozsavingspro|shoppingworldz|dealsdesire|anycodes|thecoupon/ig;

    if(reg2.test(requestUrl) || lkid.length === 8){
      if(reg1.test(requestUrl)){
        return 2   //绿色
      }else{
        return 1   //红色
      }
    }else{
      return 0  //黑色
    }
  }

  /**
   * 过滤数据
   * @param {Object} data 
   */
  filterData({requestUrl, redirections, lkid, source, advertisingWord, advertisingContent　}){
    if (requestUrl.trim() === 'chrome-error://chromewebdata/') {
      return false
    }
    if (!advertisingWord || !source || !advertisingContent) {
      return false
    }
    
    requestUrl = requestUrl.toLocaleLowerCase()
    

    let repeatItem = JSON.stringify({
      advertisingWord: advertisingWord.substr(0, 20),
      advertisingContent: advertisingContent.substr(0, 20)
    })
    // //每天抓的数据按照 广告标题和广告内容去重
    // if (repeatData.includes(repeatItem)) {
    //   logger.trace('过滤落地页-重复', requestUrl)
    //   return false
    // }else if(!advertisingWord || !source){
    //   return false
    // }else{
    //   repeatData.push(repeatItem)
    //   return true
    // }

    return true;   //暂时只去重, 不做过滤
    

    let isReturn = true;
    let regBefor = /^https:\/\/www.google/ig;
    let reg = /zaful.com$|rosegal.com$|dresslily.com/ig;
    let words = ['zaful.com', 'rosegal.com', 'dresslily.com'];
    let filterW = 'gclid';

    //排除自家广告
    if (reg.test(requestUrl)) {      
      isReturn = false
      logger.trace('过滤落地页-自家广告', requestUrl)
    //排除开头是https://www.google的广告
    }else if(regBefor.test(requestUrl)){
      return false
    }else{
      words.forEach(t => {
        if(requestUrl.includes(t) && requestUrl.includes(filterW)){
          isReturn = false
        }
      })
      if(!isReturn){
        logger.trace('过滤落地页-自家+gclid', requestUrl)
      } 
      
    }

    return isReturn
  }

  /**
     * getParams
     * 获取初始化配置参数
     * @returns { <promise> array } 数组形式配置数据
     */
    async getKeywordList () {
      const url = postResultCOnfig.url + ':' + postResultCOnfig.port + '/api/AutoTestGetKeyWord';
      const params = { actionid: "7", id: "-1" };
      let res = await rp.post({ url: url, form: { json: JSON.stringify(params) } });
      res = typeof res === "string" ?  JSON.parse(res) : res;
      if(!res || typeof res === "string" || res.code !== 1){
          return [];
      }else {
          const { keyword } = res.data.autoTest;
          let result = deepObj2array(keyword, 'country', 'execTime', 'devices', 'languages');

          let keywordArr = ['zaful', 'zaful com', 'rosegal', 'rosegal com', 'dresslily', 'dresslily com']
          result = result.filter(s => !keywordArr.includes(s.keyword))

          console.log('keywordList', result.length)

		
          return result
      }
  }

}


module.exports = new Ajax();