var Browser = require('./Browser');
const { browserStatus, pageStatus } = require('../utils/enumLibs')
const { GoogleRequestState } = require('./RequestState')
var {
  timeout
} = require('../utils/utils')
var Ajax = require('../utils/Ajax')
var {defaultIpTimeout} = require('../config/global')
var logger = require('../utils/log')

class BrowserCollection {
    /**
     * 
     * @param {*} ipTimeout      ip过期时间
     * @param {*} reqTimeout     请求超时时间 
     * @param {*} maxbrowserNum  浏览器数量
     * @param {*} maxPage        每个浏览器最打开的页面数
     * @param {*} maxReqNum      最大请求数
     * @param {*} headless       是否隐藏浏览器界面
     */
    constructor({ ipTimeout = defaultIpTimeout, reqTimeout = 5 * 60000, maxPage = 5, maxReqNum = 5000, headless = false, maxbrowserNum = 1 }) {
        this.ipTimeout = ipTimeout;
        this.reqTimeout = reqTimeout;
        this.maxbrowserNum = maxbrowserNum;
        this.maxPage = maxPage;
        this.maxReqNum = maxReqNum;
        this.headless = headless;

        this.browsers = [];
        this.__init__()

        //定时判断是否需要重启浏览器
        setInterval(() => {
            this.browsers.forEach((s, index) => {
                //等没有任务的时候才去重启
                if (s && s.canDestory() && !s.isCanDestory) {
                  let notFree = s.pages.filter(p => p.status !== pageStatus.free.value)
                    try {
                      logger.trace('定时重启窗口1') 
                      this.__reloadBrowser__(index, '定时');
                    } catch (error) {
                      logger.warn('定时重启窗口失败1', error)
                    }
                }
            })
        }, 10000)
    }

    getBrowser() {
        let freeBrowsers = (this.browsers || []).filter(s => {
            return s.isFree && !s.canDestory();
        });

        if (freeBrowsers.length) {
            return freeBrowsers[0]
        }else{
          throw Error('没有可用的浏览器, 请等待')
        }

    }

    /**
     * 每隔一段时间重新启动所有浏览器, 避免一些异常情况导致浏览器数量减少
     */
    async reloadAllBrowser(){
      logger.trace('重启所有浏览器--开始')
      await this.destroyBrowsers()
      timeout(2000)
      logger.trace('重启所有浏览器--成功')
      this.__init__()
    }


    async __init__() {
        this.browsers = [];
        await this.__createBrowsers__();
        logger.trace('浏览器初始化完成', this.browsers.length)
        return true
    }

    

    /**
     * 生成所有的浏览器
     */
    async __createBrowsers__() {

        let arr = []
        for (let index = 0; index < this.maxbrowserNum; index++) {
            arr.push(this.__createBrowser__(index))
        }

        let resArr = await Promise.all(arr);
        this.browsers = [...resArr, ...this.browsers];
    }

    /**
     * 请求获取ip
     */
    async getIP() {
      let {ip, priveIp} = await Ajax.getPublicIp()
	  

      ip = ip.trim()

      // let ip= '13.125.42.54:3128'
      if (!ip || ip === 'undefined') {
        setTimeout( async () => {
          return await this.getIP()
        }, 1000 * 10)
      }else{
        return {
          ip, 
          priveIp
        }
      }
    }

    /**
     * 生成一个浏览器
     */

    async __createBrowser__(index) {
      let {ip, priveIp} = await this.getIP()
      try {
        ip = ip + ':3128'
        logger.trace('__createBrowser__', ip)
        let browserParams = {
            ip,
            priveIp,
            ipTimeout: this.ipTimeout,
            reqTimeout: this.reqTimeout,
            maxPage: this.maxPage,
            maxReqNum: this.maxReqNum,
            headless: this.headless,
        }

        let browser = new Browser(browserParams)
        browser.index = index

        await browser.init()

        return browser
      } catch (error) {
        logger.warn('创建失败,重新创建', index, 'ip=>', ip)
        setTimeout(() => {
          return this.__createBrowser__(index)
        }, 60000)
      }
 
    }

    /**
     * 重新加载浏览器
     * @param {*} index 
     */
    async __reloadBrowser__(index, type, startTime = undefined) {
        logger.trace('重启窗口总次数', type)
        let canDestoryBrowser = this.browsers[index];

        if (!canDestoryBrowser) throw Error("即将销毁的页面不存在", index);

        if (canDestoryBrowser.isCanDestory) {
          return
        }

        //如果传了开始时间, 并且开始时间比当前浏览器重载的时间还早, 则不重新加载
        if (startTime) {
          if(startTime < (canDestoryBrowser.createTime || 0)){
            logger.trace('阻止重启浏览器', index)
            return
          }
        }

        logger.trace('成功重启浏览器', index, (new Date().getTime()) - canDestoryBrowser.createTime)

        canDestoryBrowser.isCanDestory = true;
        
        await canDestoryBrowser.destroy();
        logger.trace('销毁浏览器--', index)

        canDestoryBrowser = await this.__createBrowser__(index);
        
        logger.trace('创建浏览器--', index)
        canDestoryBrowser.isCanDestory = false;
        this.browsers[index] = canDestoryBrowser;
        this.browsers[index].status = canDestoryBrowser.status;

    }

    /**
      销毁所有窗口
     */
    async destroyBrowsers(){
      let res
      try{
          res = this.browsers.map(s => {
          s.isCanDestory = true;
          return s.destroy()
        })
      }catch(error){
        logger.trace('destroyBrowsers', error)
      }
      
      return await Promise.all(res)
    }
}

module.exports = new BrowserCollection({})