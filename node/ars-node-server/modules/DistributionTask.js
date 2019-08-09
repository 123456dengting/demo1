var TaskCollection = require('./TaskCollection')
var BrowserCollection = require('./BrowserCollection')
var TASK_QUEUE = require('./TaskQueue');
var ResolveRequest = require('./ResolveRequest')
const {pageStatus, getDataStatus } = require('../utils/enumLibs')
var {
  timeout,
  moment,
  getRandom
} = require('../utils/utils')
var Ajax = require('../utils/Ajax')
var logger = require('../utils/log')

/**
 * 定时分配任务
 */
class DistributionTask {
    constructor() {
        this.timer = null
        this.resolveNum = 3;
        this.__init__()
        this.getKeywordList();
      
    }

    __init__() {
        let i = 0
        this.timer = setInterval(async() => {
            if (TASK_QUEUE.count()) {
                let browser = null,
                    page = null
                try {
                    browser = BrowserCollection.getBrowser()
                } catch (error) {
                  i++;
                  if(i % 30 === 0){
                    logger.trace('请等待浏览器创建完成', TASK_QUEUE.count(), 'browsers', BrowserCollection.browsers.length)
                  }
                }

                if (browser) {
                    page = await browser.getPage()
                }

                if (browser && page) {
                    let requestState = TASK_QUEUE.dequeue();
                    this.resolveTask(browser, requestState);
                }
            }
        }, 1000)
    }

    /**
     * 获取所有关键字
     */
    async getKeywordList(){
      let res = await Ajax.getKeywordList()
      TaskCollection.__init__(res)
    }

    /**
     * 处理需要推送给后台的数据
     * @param {Array} res 
     * @param {RequestState} requestState 
     */
    exChangeReturnData(res, requestState){
      const resData = (res || []).map(it => ({
        keywordId: requestState.keywordId,
        keyword: requestState.keyword,
        language: requestState.lang.language,
        userAgent: requestState.userAgent,
        domainSign: it.domain,
        advertisingWord: it.title,
        advertisingContent: it.body,
        requestUrl: it.url,
        // source: "来源---",
        source: it.link,
        // account: "账号---",
        // email: "email---",
        execTime: it.execTime,
        country: requestState.country.name,
        redirections: it.redirections.filter(item => item.url).map(_it => ({ url: _it.url })),
        
        lkid: it.lkid,
        // link: it.link,
        fromPage: it.fromPage,
        nodeType: 1,
        
      }));
      return resData;
    }

    /**
     * 获取空闲的浏览器, 获取抓取数据结果
     */
    async resolveTask(browser, requestState) {
        timeout(getRandom(200, 600))
        let resolveRequest = new ResolveRequest(requestState)
        let res = {}

        try {
          //如果10分钟还没有返回结果, 重启浏览器, 重新插入队列尾部
          let goToTimeOut = setTimeout(() => {
            TASK_QUEUE.enqueue(requestState)
            BrowserCollection.__reloadBrowser__(browser.index)
          }, 10 * 60000)
          res = await browser.goto(resolveRequest)
          clearTimeout(goToTimeOut)
          goToTimeOut = null;

          //如果是隐藏浏览器, 不用切换tab页面
          if(!browser.headless){
            browser.__repeatTab__()
          }
          
          if (res.status.value === getDataStatus.success.value) {
            //抓取数据成功
            let resData = this.exChangeReturnData(res.data, requestState)
            let keyContent = `id=${requestState.keywordId}&country=${requestState.country.name}&langages=${requestState.lang.language}&userAgent=${requestState.userAgent}&page=${requestState.page}&length=${resData.length}`
            logger.trace('keyContent', keyContent, `&browser-index=${browser.index}`)
            Ajax.postResults(resData)
          }else if (res.status.value === getDataStatus.isAnchor.value){
            //进入人机检测, 重新启动浏览器窗口
            logger.trace('进入人机检测, 重启服务器 ,重启浏览器', 'ip=', browser.ip, ' priveIp=', browser.priveIp)
            Ajax.reloadPriveIp(browser.priveIp)
            TASK_QUEUE.enqueue(requestState)
            resolveRequest = null;
            BrowserCollection.__reloadBrowser__(browser.index, resolveRequest.startTime)
          }else{
            logger.trace("其他异常1")
            if(requestState.count < 3){
              requestState.count++;
              TASK_QUEUE.enqueue(requestState)
            }
          }
        } catch (error) {
          let reg = /^.*ERR_PROXY_CONNECTION_FAILED|ERR_NO_SUPPORTED_PROXIES|browser has disconnected|Most likely the page has been closed.*$/ig
          logger.trace("其他异常2", error)
          let errorString = error.toString()  
          if (reg.test(errorString)) {
            BrowserCollection.__reloadBrowser__(browser.index, resolveRequest.startTime)
            if(requestState.count < 3){
              requestState.count++;
              TASK_QUEUE.enqueue(requestState)
            }
            
          }else{
            return
          }
        }

        /**
         * 关键字     keyword 
         * 广告标题   advertisingWord
         * 广告内容   advertisingContent
         * 广告链接   source
         * 着陆页     requestUrl
         * 国家       country
         * 语言       language
         * 设备       userAgent
         * 页码       fromPage
         * 抓取时间   execTime 
         * 跳转网页   redirections
         */
        
    }

}

module.exports = new DistributionTask()