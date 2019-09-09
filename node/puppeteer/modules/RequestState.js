const {COUNTRY_TO_GURL, UA} = require('../config/global')
var logger = require('../utils/log')

class RequestState {
  constructor(userAgent ='', type = 'google'){
    this.userAgent = userAgent;
    this.type = type;
  }

  getUrl(){
    return '';
  }
}

class GoogleRequestState extends RequestState{
  constructor({keyword = '', page = 1, country, lang, userAgent, keywordId}){
    super(userAgent, 'google');
    this.keywordId = keywordId;
    this.__searchSize__ = 10;
    
    this.keyword = keyword;
    this.country = country;
    this.lang = lang;
    this.page = page;
    this.count = 0; //抓取次数
  }
  
  get url(){
    let baseUrl = COUNTRY_TO_GURL[this.country.name];
    let start = (this.page - 1) * this.__searchSize__;
    let lang = this.lang.language


    if(!baseUrl) 
    
    logger.trace(`未找到${this.country.name}对应的搜索地址。`)

    return `${baseUrl}/search?hl=${lang}&q=${this.keyword}&start=${start}`;
  }
}

module.exports = { RequestState, GoogleRequestState };