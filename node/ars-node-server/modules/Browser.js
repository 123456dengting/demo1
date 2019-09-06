const {
  browserStatus,
  pageStatus,
  getDataStatus
} = require('../utils/enumLibs')
const puppeteer = require('puppeteer');
const {
  RequestState
} = require('../modules/RequestState');

const global = require('../config/global');
var {
  timeout,
  createTimeOutFn
} = require('../utils/utils')
const moment = require('moment')
const devices = require('puppeteer/DeviceDescriptors');
const ResolveRequest = require('./ResolveRequest');
var logger = require('../utils/log')


const LOADOPTS = global.SPIDER.LOADOPTS;
const UA = global.UA;


class PageWorker {
  constructor(browser) {
    if (!(browser instanceof Browser)) throw Error("222");
    this.status = pageStatus.free.value
    this.browser = browser;
    this.__page__ = null;
    this.resolveRequest = null;
    this.isStop = false;
  }

  async currentPage() {
    if (this.__page__ != null) return this.__page__;
    this.__page__ = await this.browser.browser.newPage();
    return this.__page__;
  }

  async goto(url, resolveRequest) {
    let startTime = new Date().getTime()
    if (!(resolveRequest instanceof ResolveRequest)) throw Error("resolveRequest参数类型错误1。");
    let newPage = await this.currentPage();
    resolveRequest.page = newPage;
    this.resolveRequest = resolveRequest;
    let currUserAgent = this.getUserAgent(resolveRequest.param.userAgent);
    newPage.on('request', resolveRequest.handleRequest.bind(resolveRequest));
    newPage.on('response', resolveRequest.handleResponse.bind(resolveRequest));
    newPage.setUserAgent(currUserAgent);
    let isAnchor = null;

    try {
      await newPage.goto(url, LOADOPTS)
      isAnchor = await this.checkAnchor(newPage)
      if (isAnchor) {
        return {
          status: getDataStatus.isAnchor,
          data: {
            requestState: resolveRequest.param,
            browser: this.browser
          }
        }
      }
      //多两次回车, 防止漏抓
      await newPage.goto(url, LOADOPTS)
      await timeout(500)
      await newPage.goto(url, LOADOPTS)
      await timeout(300, 600)
    } catch (error) {
      if (this.isStop) {
        return {
          status: getDataStatus.browserDestory,
          data:　res
        }
      }else{
        throw Error(error)
      }
    }
    
    let res = await resolveRequest.getPageData()

    if (!Array.isArray(res)) {
      res = []
    }

    if (resolveRequest.isStop) {
      return {
        status: getDataStatus.browserDestory,
        data:　res
      }
    }

    let endTime = new Date().getTime()
    logger.trace('本次抓取数据', res.length, (endTime - startTime) / 1000, moment().format('MM-DD hh:mm:ss'))
    return {
      status: getDataStatus.success,
      data:　res
    }

  }

  /**
   * 是否出现人机检测
   */
  async checkAnchor(page){
    let anchor = await page.$$('#recaptcha')
    let content = await page.$$('#infoDiv')
    return anchor.length && content.length
  }

  changeStatus(status) {
    this.status = status.value;
  }

  //停止正在执行的数据业务
  stop() {
    this.isStop = true;
    this.resolveRequest && this.resolveRequest.stop()
  }

  async close() {
    try {
      await this.currentPage && this.currentPage.close();
    } catch (error) {
      logger.warn('将要销毁的page不存在')
    }
    
    this.changeStatus(2);
  }

  getUserAgent(UAType) {
    switch (UAType) {
      case 'iPad':
        return devices['iPad'].userAgent;
        break;
      case 'mobile':
        return devices['iPhone 6'].userAgent;
        break;
      default:
        return UA['PC'];
        break;
    }
  }

}

class Browser {
  /**
   * 
   * @param {*} ip          ip
   * @param {*} ipTimeout   ip超时时间
   * @param {*} reqTimeout  请求超时时间
   * @param {*} maxPage     最大页面数量
   * @param {*} maxReqNum      最大请求数
   * @param {*} headless    隐藏浏览器界面
   */
  constructor({
    ip = '',
    priveIp = '',
    ipTimeout = 60000,
    reqTimeout = 60000,
    maxPage = 5,
    maxReqNum = 50,
    headless = false,
  }) {
    this.__createdTime__ = new Date().getTime();
    this.ip = ip;
    this.priveIp = priveIp;
    this.ipTimeout = ipTimeout;
    this.maxPage = maxPage;
    this.maxReqNum = maxReqNum;
    this.headless = headless;
    this.reqTimeout = reqTimeout;
    this.status = browserStatus.notCreate.value;
    

  }

  /**
   * 当前浏览器是否空闲状态
   */
  get isFree() {
    return this.status == browserStatus.normal.value;
  }

  /**
   * 是否可以销毁
   */
  canDestory() {
    //当最后活动时间与现在间隔超过20分钟, 则可以销毁, 重新创建
    if (new Date().getTime() - this.lastActiveTime > 60000 * 20) {
      return true
    }
    if (this.status === browserStatus.notCreate.value) return false
    let expiredTime = this.__createdTime__ + this.ipTimeout;
    let currentTime = new Date().getTime() - 6000;
    if (currentTime >= expiredTime) return true;
    if (this.requestedNum >= this.maxReqNum) return true;
    
    return false;
  }

  /**
   * 初始化浏览器
   */
  async init() {
    this.requestedNum = 0;
    this.browser = null;
    this.pages = [];
    this.timer = null;
    this.repeatTabStart = false;
    this.isCanDestory = false;
    this.tabChangeTimer = null;
    this.createTime = new Date().getTime();     //创建时间
    this.lastActiveTime = new Date().getTime(); //最后活动时间
    this.tabChangeFail = 0; //切换页面次数, 如果失败次数过多,重启浏览器, 切换成功清0


    if (this.browser) return;
    this.browser = await puppeteer.launch({
      headless: this.headless,
      args: ['--proxy-server=' + this.ip]
    });
    this.changeStatus(browserStatus.normal);

  }

  /**
   * 获取一个空闲页面
   */
  async getPage() {
    if (!this.isFree) throw Error("没有可用的浏览器页面." + this.status);
    if (this.requestedNum >= this.maxReqNum) {
      this.changeStatus(browserStatus.manyRequests);
    }
    let page = null;
    // 检测是否存在空闲的page
    let freePages = this.findFreePages();
    // 存在则直接返回一个
    if (freePages.length) {
      page = freePages[0]
    } else if (this.pages.length < this.maxPage) {
      // 不存在则创建以个新的(在page没有达到限制的数量的情况下)
      page = new PageWorker(this);
      this.pages.push(page);
    } else {
      this.changeStatus(browserStatus.busy);
    }
    return page;
  }

  /**
   * 向当前浏览器发起请求以返回请求结果。
   * @param {RequestState} reqState 请求对象
   */
  async goto(resolveRequest) { 
    let res = {}
    if (!(resolveRequest instanceof ResolveRequest)) throw Error("resolveRequest参数类型错误2。");
    let page
    try {
      page = await this.getPage();
    } catch (error) {
      res.status = {
        status: getDataStatus.browserBusy,
        data:　`浏览器状态: ${this.status}`
      }
    }

    if (page == null) {
      this.changeStatus(browserStatus.busy);
    } else {
      this.requestedNum++;
      this.__beforeGoto__();
      let url = resolveRequest.param.url
      //标记页面忙碌
      page.changeStatus(pageStatus.busy);
      res = await page.goto(url, resolveRequest);
      //标记页面空闲
      page.changeStatus(pageStatus.free);
      this.__afterGoto__();
    }
    return res;
  }

  __beforeGoto__() {
    if (this.canDestory()) {
      this.changeStatus(browserStatus.willExpire);
    }
  }

  __afterGoto__() {
    this.changeStatus(browserStatus.normal);
  }

  /**
   * 修改状态
   * @param {*} status 
   */
  changeStatus(status) {
    this.lastActiveTime = new Date().getTime();
    this.status = status.value;
  }

  /**
   * 查询是否有空闲页面
   */
  findFreePages() {
    return this.pages.filter(s => s.status === pageStatus.free.value)
  }

  /**
   * 销毁
   */
  async destroy() {

    this.stopRepeatTab()
    this.changeStatus(browserStatus.expired);
    let closeList = []
    if (this.pages.length) {
      this.pages.forEach(p => {
        p.stop()
        closeList.push(p.close())
      })
    }

    Promise.all(closeList).then(res => {
      if (!!this.browser) {
        this.browser.close();
      }
    })

    
  }

  /**
   * 定时循环切换tab页
   */
  __repeatTab__() {
    if (this.repeatTabStart) return
    this.repeatTabStart = true;
    this.tabChangeTimer = setInterval(async () => {
      //当page是忙碌状态的时候, 切换page
      if (this.pages.length > 1) {
        for (let index = 0; index < this.pages.length; index++) {
          const page = this.pages[index];
          if (page.status === pageStatus.busy.value) {
            await timeout(1000)
            try {
              page.__page__ && await page.__page__.bringToFront();
              this.tabChangeFail = 0;
            } catch (error) {
              this.tabChangeFail++;
              if(this.tabChangeFail > 30){
                logger.trace('自启动')
                //let index = this.index;
                //this.destroy();
                //this.browser = await this.init();
                page.changeStatus(pageStatus.free);
              }
              logger.warn('切换页面失败', this.index, '---', this.tabChangeFail)
            }
          }
        }
      }
    }, 60 * 1000)
  }

  stopRepeatTab(){
    if(this.tabChangeTimer){
      clearInterval(this.tabChangeTimer)
      this.tabChangeTimer = null;
      this.repeatTabStart = false;
    }
  }

}



module.exports = Browser;