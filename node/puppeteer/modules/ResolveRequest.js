var browser = require('./Browser')
var {
  timeout,
  moment,
  paramsStringToJson
} = require('../utils/utils')
const {
  LOADOPTS
} = require('../config/global').SPIDER;
var logger = require('../utils/log')

const SELECTOR = {
  'PC': {
    adBlock: '.ads-ad',
    adTitle: '.ad_cclk h3',
    adBody: '.ads-creative',
    adUrl: '.ad_cclk a:nth-child(2)',
    adLink: '.ad_cclk a:nth-child(2) > div.ads-visurl > cite',
    nextPage: '#pnnext'
  },
  'iPad': {
    adBlock: '.ads-fr',
    adTitle: 'a[data-rw] div[aria-level]',
    adBody: 'div[data-hveid] > div > div:nth-child(2) > div',
    adUrl: 'a[data-rw] div:last-child span:last-child',
    adLink: 'a[data-rw] > div:nth-child(1) > div > span:last-child',
    nextPage: '#botstuff > div > div:nth-child(3)',
    nextPageBlock: '#botstuff > div > div:nth-child(3) > div'

  },
  'mobile': {
    adBlock: '.ads-fr',
    adTitle: 'a[data-rw] div[aria-level]',
    adBody: 'div[data-hveid] > div > div:nth-child(2) > div',
    adUrl: 'a[data-rw] div:last-child span:last-child',
    adLink: 'a[data-rw] > div:nth-child(1) > div > span:last-child',
    nextPage: '#botstuff > div > div:nth-child(3)'
  },
  'anchor': '.rc-anchor-center-container'
};


const languages = [{
    "label": "English",
    "value": "en"
  },
  {
    "label": "Deutsch",
    "value": "de"
  },
  {
    "label": "español",
    "value": "es"
  },
  {
    "label": "français",
    "value": "fr"
  },
  {
    "label": "italiano",
    "value": "it"
  },
  {
    "label": "português (Portugal)",
    "value": "pt-PT"
  },
  {
    "label": "polski",
    "value": "pl"
  },
  {
    "label": "Nederlands",
    "value": "nl"
  },
  {
    "label": "hrvatski",
    "value": "hr"
  }
]


class ResolveRequest {
  constructor(param) {
    this.param = param;
    this.page = null;
    this.signToJump = false; // 记录跳转标识       
    this.redirections = []; // 记录跳转url
    this.guid = this.createGuid(true); // get short guid
    this.info = [];
    this.runResolve = null;
    this.runReject = null;
    this.domainSign = 'zaful'; // 网站标识名
    this.pageUrl = '';
    this.startTime = new Date().getTime();
    this.isStop = false;
  }
  async getPageData() {
    const pageUrl = this.page.mainFrame().url()
    this.pageUrl = pageUrl
    const adText = await this.getAdText();
    logger.trace('adTextadTextadText',pageUrl, adText.title.length, adText.title)
    if(this.isStop){
      return []
    }
    const adUrl = await this.getAdUrl();
    

    if (!adUrl) {
      logger.trace('抓取数据结束失败， 需要重试')
      return;
    }


    adUrl.forEach((it, j) => {
      const domain = it.url.trim() ? it.url.split('/')[0] + '//' + it.url.split('/')[2] : "";
      const lkid = it.params.lkid ? it.params.lkid : '';
      const title = adText.title[j];
      const body = adText.body[j];
      const link = adText.link[j]
      const fromPage = this.param.page; // 搜索页码
      const country = this.param.country.name; // 当前检测的国家
      this.info.push({
        domain,
        title,
        body,
        country,
        lkid,
        link,
        fromPage,
        ...it,
        url: it.url
      });
    })
    return this.info

  }

  async handleRequest(req) {
    if (this.signToJump && req.resourceType() === "document") {
      let url = await this.getUrl(req)
      let arrStr = url.split('?');
      this.reqUrls.push(url);
      arrStr.splice(0, 1);
      this.redirections.push({
        url: url,
        params: paramsStringToJson(arrStr.join(""))
      });
    }
  }

  handleResponse(res) {
    let url = this.url = res.url === 'function' ? res.url() : res._url;
    
    if (this.signToJump) {
      this.resUrls.push(url);
      // if ((res.ok || res.status === 304) && (url.split('?')[0].indexOf(this.domainSign) !== -1) ) {  
      //满足以下条件认为当前url是落地页
      if ((res.ok || res.status === 304) && res._request._resourceType === 'document' && url.split('?')[0].indexOf('www.google') === -1) {
        this.signToJump = false; //获取到重定向终点之后改变标识
      }
    }
  }

  async secureClick(el, page) {
    const Mouse = page.mouse;
    await el.hover();
    const {
      x,
      y
    } = await el.boundingBox();
    await Mouse.move(x, y);
    await timeout(Math.random() * 100);
    await Mouse.click(x, y);
  }

  async getAdText(page = this.page) {
    return await page.evaluate(opts => {
      const [domainSign, userAgent, SELECTOR] = opts;
      let eAds = document.querySelectorAll(SELECTOR[userAgent].adBlock);
      let adTitle = [],
        adBody = [],
        adLink = [];
      for (var i = 0, len = eAds.length; i < len; i++) {
        try {
          var it = eAds[i];
          var eAdTitle = it.querySelector(SELECTOR[userAgent].adTitle).innerText;
          var eAdLink = it.querySelector(SELECTOR[userAgent].adLink).innerText;
          // if (eAdTitle.toLowerCase().indexOf(domainSign) > -1) {
          var eAdBody = it.querySelectorAll(SELECTOR[userAgent].adBody);
          adTitle.push(eAdTitle);
          adBody.push(Array.from(eAdBody).reduce((a, b) => a += b.innerText, ''));
          adLink.push(eAdLink)
          // }
        } catch (error) {
          
        }

      }
      return {
        title: adTitle,
        body: adBody,
        link: adLink
      };
    }, [this.domainSign, this.param.userAgent, SELECTOR]);
  }

  async getAdUrl(page = this.page) {
    const userAgent = this.param.userAgent
    const eAds = await page.$$(SELECTOR[userAgent].adBlock);
    

    let urls = [];

    for (let i = 0; i < eAds.length; i++) {
      if(this.isStop){
        break;
      }
      await timeout(Math.random() * 100);
      const eAds = await page.$$(SELECTOR[userAgent].adBlock);
      
      const urlText = eAds.length - 1 < i ? '' : await page.evaluate(el => el.innerText, await eAds[i].$(SELECTOR[userAgent].adTitle));
      // if (urlText.toLowerCase().indexOf(this.domainSign) > -1) {
      if (true) {
        const el = await eAds[i].$(SELECTOR[userAgent].adUrl);
        const nowUrl = page.mainFrame().url()
        await timeout(Math.random() * 500);
        this.setRedirectsState(true);
        await this.secureClick(el, page);
        await page.waitForNavigation({
          timeout: 0
        });
        await timeout(Math.random() * 100);
        let waitSumTime = 0;
        let startTime = new Date()
        while (this.signToJump && waitSumTime < 10000) {
          await timeout(50);
          waitSumTime += 50;
        }
        let endTime = new Date()

        logger.trace('等待', (endTime - startTime) / 1000 )
        
        const urlParam = this.redirections.length > 0 ? this.redirections.splice(-1, 1)[0] : {
          url: '',
          params: ''
        };
        const timeStamp = new Date().getTime();
        
        const redirections =  JSON.parse(JSON.stringify(this.redirections));

        const execTime = moment('Y-M-D h:m:s', timeStamp);

        //在返回之前取url 获取落地页. 
        let landingUrl = page.url()
        //优先该落地页, 否则用之前的方式取的落地页
        if(landingUrl && landingUrl !== nowUrl){
          urlParam.url = landingUrl
        }

        //如果失去响应.
        if(landingUrl.includes('chrome-error')){
          urls = null;
          break;
        }

        urls.push({
          timeStamp,
          execTime,
          ...urlParam,
          redirections
        });
        this.redirections = [];

         

        //点击进入广告 => 回到谷歌查询谷歌的列表页
        let goBackRes = null
        try {
          goBackRes =  await page.goBack()
          logger.trace(`goBack-success`);
        } catch (error) {
          logger.warn(`goBack-error`, error);
          break;
        }

        //如果返回页面不存在 这个值是null
        // if (!goBackRes) {
        //   try {
        //     //打开链接开始时间
        //     await page.goto(nowUrl, LOADOPTS);
        //     if (await this.isBlockedByGoogle(page)) {
        //       logger.trace(`Url: ${nowUrl} Blocked by google ...`);
        //       return;
        //     }
        //   } catch (err) {
        //     logger.trace(`[${this.guid}]`, `Catching error of goto ${this.pageUrl} network err ... `, err);
        //     return false;
        //   }
        // }
        
      }
      await timeout(200);
    }
    return urls
  }

  stop(){
    this.isStop = true
  }

  async getUrl(page){
    return typeof page.url  === 'function' ? await page.url() : page.url
  }

  setRedirectsState(isStart) {
    if (isStart) {
      this.signToJump = true;
      this.reqUrls = [];
      this.resUrls = [];
    } else {
      this.signToJump = false;
    }
  }

  async isBlockedByGoogle(page) {
    const pageUrl = await page.url();
    return pageUrl.startsWith('https://ipv4.google.com');
  }

  createGuid(isShort) {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    if (isShort) return (S4() + S4() + "-" + S4() + "-" + S4() + S4());
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
}


module.exports = ResolveRequest