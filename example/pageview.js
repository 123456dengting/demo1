
(function() {
var nowDate = Date.now();
var date = parseInt(nowDate/1000);
var s_date = date;
var _domain = document.domain.replace(/.*(\..*\.com).*/g, '$1');
var cookieData = document.cookie.split('; ');
var akam_id = get_AKAM_ID(cookieData);
var clickEventDate = getDateToLimitEvent(cookieData);
var exp = new Date();
function get_AKAM_ID(ck) {
	var obj_akam_id = {};
	try {
		for (var i = 0; i < ck.length; i++) {
        var result = RegExp('AKAM_CLIENTID').exec(ck[i]);
        (result && result.length > 0) && (obj_akam_id['akam_id'] = result.input.replace(/.*=(.*)/g, '$1').replace('; ', ''));
      }
   } catch(e) {
		
   }
	return obj_akam_id['akam_id'] || '';
}
  
function getDateToLimitEvent(ck) {
  var result;
	for (var i = 0; i < ck.length; i++) {
      if (/^_mpageviewEventDate/g.test(ck[i])) {
        result = ck[i].split('=')[1];
      }
	}
  if( !result || date - result > 1) {
    //document.cookie = '_mpageviewEventDate=' + date + '; path=/; domain=' + _domain;
  }
  if (!result) {
    result = date;
  }
  return result;
}
 
var _screenWidth = window.screen.width;
var _screenHeight = window.screen.height;
var _navigator = window.navigator.userAgent;
var currentClickDOM = {{Click Element}};
var currentPage = {{当前页面}};
var currentPageLang = {{网站语言}} || 'en';
var _url = 'https://nginx.1cros.net/click_re';
//var _url = 'https://testnginx.1cros.net/click_re';
var _config = ['m', 'ar-m', 'de-m', 'es-m', 'fr-m', 'it-m', 'pt-m'];
var event_guid = _guid_();

function receiveError(cb, errorcb) {
	try {
		cb && cb();
  	} catch(e) {
		errorcb && errorcb();
      
   } finally {
		
   }
} 
  
function _S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function _guid_(date) {
  if (date) {
		return ((akam_id || (_S4()+_S4()+"-"+_S4()+"-"+Date.now()+"-"+_S4()+"-"+_S4()+_S4()+_S4())) + '_' + date);
  }
  return (akam_id || (_S4()+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+_S4()+_S4())) + nowDate + s_date;
}
// 添加唯一ID
var WEBF_guid = getGuid();
function getGuid() {
  var WEBF_guid;
  
  var currentDomain = location.href.replace(/.*(\.[\s\S]+\.com).*/g, '$1');

  function setExpDate() {
  		var expDate = exp;
		try {
     	expDate.setTime(expDate.getTime() + 31 * 60 * 1000);
       return expDate.toUTCString();
     } catch(e) {
     	return '';
     }
  }
  
  var expiresDate = setExpDate();
  
  function setGUID() {
		var webf_guid = _guid_(date);
		document.cookie = 'WEBF_guid=' + webf_guid + '; path=/; domain=' + currentDomain + ';expires=' + expiresDate;
		return webf_guid;
	}
	
  function execCookie(reg) {
    var cookies = document.cookie.split('; ');
    for (var i = 0, _cookie; _cookie=cookies[i++];) {
      var result = reg.exec(_cookie);
      if (result) {
        try {
        	var execResult = result[1].replace('=', '');
          return execResult;
        } catch(e) { return ''; }
      }
    }
  }
  
  function getPreDate() {
    var preDate;
    if (!/WEBF_predate=/g.test(document.cookie)) {
    	preDate = date;
      document.cookie = 'WEBF_predate=' + preDate + '; path=/; domain=' + currentDomain + ';expires=' + expiresDate;
    } else {
    	preDate = execCookie(/WEBF_predate(.*)/);
    }
    return preDate;
  }
  
  var preDate = getPreDate();
  
  //检测cookie中是否有 GUID 
  if (!/WEBF_guid=/g.test(document.cookie)) {
    WEBF_guid = setGUID();
  } else {
    WEBF_guid = execCookie(/WEBF_guid(.*)/);
  }
	
	if (date - preDate > 1800) {
		WEBF_guid = setGUID();
	}
	document.cookie = 'WEBF_guid=' + WEBF_guid + '; path=/; domain=' + currentDomain + ';expires=' + expiresDate;
  
  // 重置 当前时间 为 preDate
  document.cookie = 'WEBF_predate=' + date + '; path=/; domain=' + currentDomain + ';expires=' + expiresDate;
  
	return WEBF_guid;
}

function ajax(param) {
	var _rootname = document.domain.replace(/(.*?)\.[\w\W]+/g, '$1');
	var isRootName = RegExp(_rootname).test(_config);
	var postData, filterPostData = [];
	var handleParam = {
		rootname: isRootName,
		requestResult: true,
		param: param,
		postData: null,
		filterData: null
	};
  filterPostData.push(param);
  	// 获取cookie或者storage中的参数, 如果返回cookie中或者storage中的值, 说明上次发送失败
	try {
    //postData = isRootName ? getStorageData(param) : getCookie(param);
      var storeParam = [];
      storeParam.push(param);
      postData = storeParam;
	} catch(e) { var paramArray = []; paramArray.push(param); postData = paramArray; }
  
	handleParam['postData'] = postData;

	// 给每条数据重新设置 guid 
	for (var _index = 0, _pd; _pd = postData[_index++];) {
		try {
		  _pd['raw']['guid'] = WEBF_guid;
       if (!_pd['raw']['eventid']) _pd['raw']['eventid'] = _guid_();
       if (!_pd['raw']['dtitle']) _pd['raw']['dtitle'] = document.title.replace(/\^/g, '').replace(/"|(%22)/g, '');

       if (!_pd['status']) {
          _pd['status'] = 1;
          _pd['statusTime'] = date;
       }

       if (_pd['status'] == 1 && date - _pd['statusTime'] > 10) {
          _pd['status'] = 2;
          _pd['statusTime'] = date;
       }

       if (_pd['status'] == 2) { filterPostData.push(_pd); _pd['status'] = 1; }
		} catch(e) {}
	}
	handleParam['filterData'] = filterPostData;

  	//receiveError(function() { document.cookie = '_WEDATA=' + JSON.stringify(postData) + '; path=/; domain=' + _domain; });
	
   // 发送ajax
	try {
		if (postData.length > 4 || hanldeDataSplice(filterPostData).length == 0) { handlAjaxProcess(true); return; }
      // || date - clickEventDate <= 1
      
		$.ajax({
			url: _url,
			type: 'POST',
			timeout: 10000,
			contentType: 'application/x-www-form-urlencoded',
			dataType: 'text',
			data: JSON.stringify(hanldeDataSplice(filterPostData)),
			success: function(data) {
				handlAjaxProcess(true);
			},
			error: function(req, errorStatu, errorThrow) {
				receiveError(function() { JSON.stringify(hanldeDataSplice(filterPostData)) });
				//handlAjaxProcess(false);
			}
		})
	} catch(e) {
		//handlAjaxProcess(false);
     _post(_url, JSON.stringify(hanldeDataSplice(filterPostData)), function() {});
	}

	// 数据拼接
	function hanldeDataSplice(data) {
		var _postData = [];
		try { _postData = JSON.parse(JSON.stringify(data)); } catch(e) { _postData.push(param); }
		var sep = "^";
		function strify(str) {
          if (!str) str = "";
          str += sep;
          return str;
      }
		function rStrign(str) {
			if (!str) str = "";
			return str + "";
		}
		 var _body;
      var _array = [];
      try {
          _body = _postData;

          if (typeof _body !== "object") {
              console.error("数据格式出错");
					 handlAjaxProcess(true);
              return;
          }

          var str = "";

          for (var i = 0; i < _body.length; i++) {

              var tem = _body[i];

              str += strify(rStrign(tem.ev || tem["ev\u007f"]).slice(0, 20));

              if (!tem.data) tem.data = {};
              str += strify(rStrign(tem.data.cy).slice(0, 10));
              str += strify(tem.data.v);
              str += strify(rStrign(tem.data.tp).slice(0, 20));

              if (!tem.data.ids || typeof tem.data.ids !== "object") tem.data.ids = [];
              str += strify(rStrign(tem.data.ids.join(",")).slice(0, 500));
              str += strify(tem.data.cnt);
              str += strify(rStrign(tem.data.cg).slice(0, 500));

              str += strify(tem.dt);
              str += strify(rStrign(tem.wid).slice(0, 30));

              if (!tem.raw) tem.raw = {};
              str += strify(rStrign(tem.raw.lp).slice(0, 1000));
              str += strify(rStrign(tem.raw.ref).slice(0, 1000));
              str += strify(tem.raw.sw);
              str += strify(tem.raw.sh);
              str += strify(rStrign(tem.raw.aid).slice(0, 100));
              str += strify(rStrign(decodeURI(tem.raw.agent)).slice(0, 500));
              str += strify(rStrign(tem.raw.ga).slice(0, 30));
              str += strify(rStrign(tem.raw.sid).slice(0, 50));
              str += strify(rStrign(tem.raw.lid).slice(0, 20));
              str += strify(rStrign(tem.raw.gid).slice(0, 30));
					 str += strify(rStrign(tem.raw.uid).slice(0, 50));
					 str += strify(rStrign(tem.raw.guid).slice(0, 90));
            	str += strify(rStrign(tem.data.order).slice(0, 50));
            	str += strify(rStrign(tem.raw.eventid).slice(0, 90));
            	str += strify(rStrign(tem.raw.dtitle).slice(0, 500));
					 str += strify(rStrign(tem.payway).slice(0, 30));
            	str += strify(rStrign(tem.paramOk).slice(0, 20));
					 str += tem.raw.lang.slice(0, 5);
            
              _array[i] = {sd: str, st: date - tem.dt, ct: date};
              str = "";
          }
			  return _array;
      } catch (e) {
          console.log(e);
          var emptyArr = [];
        	emptyArr.push(param);
          return hanldeDataSplice(emptyArr);
      }
	}

  	// console.log(JSON.stringify(postData));
	// 处理不同请求状态
	function handlAjaxProcess(bol) {
		handleParam['requestResult'] = bol;
		var handleAjax = handleAjaxResult(handleParam);
		handleAjax.start();
	}
  
	function getCookie(param) {
		// console.log('trigger cookie!;')
		var storeParamData = [];
		storeParamData.push(param);
		if (!/_WEDATA=\[(.*)\]/g.test(document.cookie)) return storeParamData;
      var cookieParam = document.cookie.split('; ');
      for (var i = 0; i < cookieParam.length; i++) {
        var cItem = cookieParam[i];
        if (/_WEDATA=/g.test(cItem)) {
          var ckdata;
          try {
					ckdata = storeParamData.concat(JSON.parse(cItem.split('=').slice(1).join('=')));
				} catch(e) { ckdata = storeParamData }
          return ckdata;
        }
      }
	}
	function getStorageData(param) {
		// console.log('trigger storage!;')
		var storage = window.localStorage;
		var storageData = storage.getItem('_eData');
		var storeParamData = getCookie(param);
		// 将cookie和storage结合
		if (!storageData) return storeParamData;
		var sData, _sData;
      try {
      		sData = JSON.parse(storageData);
         for (var i = 0; i < storeParamData.length; i++) {
        	if (RegExp(' '+ storeParamData[i]['raw']['eventid'] +' ').test(' '+ sData.map(function(item) { return item['raw']['eventid'] }).join(" ") +' ')) {
             storeParamData.splice(i, 1);
               i--;
           }
        }
        _sData = sData.concat(storeParamData);
      } catch(e) { _sData = storeParamData; }
		return _sData;
	}
}
function handleAjaxResult(obj) {
	var Strage = function(obj) {
		this.rootname = obj.rootname;
		this.requestResult = obj.requestResult;
		this.param = obj.param;
		this.postData = obj.postData;
		this.filterData = obj.filterData;
	}
	Strage.prototype.start = function() {
		this.rootname ? (this.requestResult ? this.handleLocalSuccess() : this.handleLocalFailue()) : (this.requestResult ? this.handleCookieSuccess() : this.handleCookieFailue());
	};
	Strage.prototype.handleLocalFailue = function() {
		this.handleClearCookie();
		// 存在localstorage中, 等待下次发送
		var storage = window.localStorage;

		for (var i = 0; i < this.postData.length; i++) {
      	 this.postData[i]['status'] = 2;
		  this.postData[i]['statusTime'] = date;
      }
		
		var _self = this;
		try {
        storage.setItem('_eData', JSON.stringify(_self.postData));
		} catch(e) { storage.setItem('_eData', JSON.stringify([])); }
		
		return;
		var storeParamData = [];
		storeParamData.push(this.param);
		if(!storage.getItem('_eData')) {
			storage.setItem('_eData', JSON.stringify(storeParamData));
		} else {
			var getOriginData = JSON.parse(storage.getItem('_eData'));
			getOriginData.push(this.param);
		}
	};
	Strage.prototype.handleLocalSuccess = function() {
		// 清除storage中的origin data
		this.handleClearStorage();
		this.handleClearCookie();
	};
	Strage.prototype.handleCookieFailue = function() {
		// 请求失败不用做处理, 在请求之前将失败的数据全部存储在cookie中;
      for (var i = 0; i < this.postData.length; i++) {
      	 this.postData[i]['status'] = 2;
		  this.postData[i]['statusTime'] = date;
      }
       
      var _self = this;
      try {
      		document.cookie = '_WEDATA=' + JSON.stringify(_self.postData) + '; path=/; domain=' + _domain;
      } catch(e) {
      		document.cookie = '_WEDATA=' + JSON.stringify([]) + '; path=/; domain=' + _domain;
      }
		return ; 
	};
	Strage.prototype.handleCookieSuccess = function() {
		// 清除cookie中的origindata
		this.handleClearCookie();
	};
	Strage.prototype.handleClearCookie = function() {
      if (!/\_WEDATA=/g.test(document.cookie)) return;
			// 处理请求成功
      var _eData= this.handleSuccessData();
      
      if (_eData.length > 0) {
			document.cookie = '_WEDATA=' + JSON.stringify(_eData) + '; path=/; domain=' + _domain;
        return;
      }
      exp.setTime(exp.getTime() - 60 * 1000);
      document.cookie = '_WEDATA=[]; path=/; domain=' + _domain;
      document.cookie = '_WEDATA=[]; expires=' + exp.toUTCString() + '; path=/; domain=' + _domain;
	};
	Strage.prototype.handleClearStorage = function() {
		var storage = window.localStorage;
		
      // 处理请求成功
		var _eData = this.handleSuccessData();
      
		_eData.length == 0 && storage.getItem('_eData') && storage.removeItem('_eData');
		_eData.length > 0 && storage.setItem('_eData', JSON.stringify(_eData));
	};
   Strage.prototype.handleSuccessData = function() {
		var _pData
		try {
        _pData = JSON.parse(JSON.stringify(this.postData)), _fData = this.filterData;
         for (var i = 0; i < _pData.length; i++) {
           if (RegExp(' '+ _pData[i]['raw']['eventid'] +' ').test(' '+ _fData.map(function(item) { return item['raw']['eventid'] }).join(" ") +' ')) {
             _pData.splice(i, 1);
               i--;
           }
       }
     } catch(e) {
     	_pData = [];
     }
		return _pData;
   };
	return new Strage(obj);
}

function handleEventData(page) {
	RegExp('_innerid=').test(location.href) && handleInnerPage();
	// 处理广告位置事件
   function handleInnerPage() {
		if (!location.search.slice(1)) return;
		var searchParam = location.search.slice(1).split('&');
		var inneridParam = searchParam.filter(function(item, index) {
		  return item.split('=')[0] && item.split('=')[0] == '_innerid';
		});
		var inneridArray = inneridParam[0].split('=');
		var _data = eventData('InnerPage', inneridArray[1]);
		inneridArray[1] && ajax(_data);
	}
	
  if (page == 'turn_payment') {
		ajax(eventData('Purchase_Link'));
	}

	// 处理购物车页面的 pageview 事件
		var _pageviewData = eventData('PageView', page);
		// console.log('trigger pageview!');
		ajax(_pageviewData);
}

function getRegParam(str, name, status) {
	// status: 1 href  2 cookie
	var regexpes = status == 1 ? new RegExp('(^|&)'+ name +'=([^&]+)(&|$)') : new RegExp('(^| )'+ name +'=([^;]+)(;|$)');
	var matched = str.match(regexpes);
	if (matched) { return matched[2]; }
	return '';
}

var eventData = (function () {
	var _index = 0;
	var _localRef = location.href;
	var _docRef = document.referrer;
	var raw = {
      sw: _screenWidth,
      sh: _screenHeight,
		 aid: akam_id,
      agent: encodeURI(_navigator.replace(/;/g, '').replace(/\r\n/g, '').replace(/"|(%22)/g, ''))
	};
    
   try { raw['lp'] = encodeURI(handleRef(_localRef)); } catch(e) { raw['lp'] = encodeURI(_localRef).slice(0, 1001).replace(/(%20)| /g, '').replace(/\^|(%5e)/gi, '+').replace(/(%22)|"/g, ''); }
	try { raw['ref'] = encodeURI(handleRef(_docRef)); } catch(e) { raw['ref'] = encodeURI(_docRef).slice(0, 1001).replace(/(%20)| /g, '').replace(/\^|(%5e)/gi, '+').replace(/(%22)|"/g, ''); }
  
	function handleRef(str) {
		if (!/%/g.test(str) || _index > 8) return str.slice(0, 1001).replace(/(%20)| /g, '').replace(/\^|(%5e)/gi, '+').replace(/(%22)|"/g, '');
		var _str = decodeURI(str);
		_index++;
		return handleRef(_str);
	}
  
   function handlePayokOrderSn() {
		var ordersn = {{payok - 订单号}};
		var searchKeys = getSearchOrderSn();
		function getSearchOrderSn() {
        var searchObj = {};
			var result;
        var searchWords = location.search.slice(1);
        if (!searchWords) return searchObj;
        searchWords = searchWords.split('&');
        for (var i = 0; i < searchWords.length; i++) {
        	if (result = /^(oid|code)=(.*)$/.exec(searchWords[i])) {
             try {
             	result[2] && (searchObj[result[1]] = result[2].replace(/(-.*)$/, ''));
             } catch(e) {}
          }
        }
			return searchObj;
     }
  		ordersn = ordersn ? ordersn : searchKeys['oid'];
  		
  		var returnObject = { 'ordersn': ordersn };
		
  		return returnObject;
   }
  
	try { getCookieMsg(); } catch(e) {}
  function getCookieMsg() {
      var ck = document.cookie.split('; ');
      for (var i = 0; i < ck.length; i++) {
          var item = ck[i];
          if (/^linkid=(.*)+/.test(item)) {
             raw['lid'] = item.replace('linkid=', '');
          }
          if (/^WEBF\-user_id=(.*)+/.test(item)) {
             raw['uid'] = item.replace('WEBF-user_id=', '');
          }
          if (/^ZA_SESSIONID=(.*)+/.test(item)) {
             raw['sid'] = item.replace('ZA_SESSIONID=', '');
          }
          if (/^_ga=(.*)+/.test(item)) {
             raw['ga'] = item.replace('_ga=', '');
          }
          if (/^_gid=(.*)+/.test(item)) {
             raw['gid'] = item.replace('_gid=', '');
          }
      }
	
		raw['guid'] = WEBF_guid;
		raw['eventid'] = _guid_();
		raw['dtitle'] = document.title.replace(/\^/g, '').replace(/"|(%22)/g, '');
		raw['lang'] = currentPageLang;
    // 添加唯一ID
  }
	var events = {
		'PageView': function(page) {
			var data = page == 'goods' ? {
					cy: 'USD',
					v: parseFloat({{goods - 价格}}),
					tp: 'product',
					ids: ['{{goods - SKU}}']
				} : (page == 'payok' ? { 'order': handlePayokOrderSn() && handlePayokOrderSn()['ordersn'], 'v': {{payok - 订单总价}} } : {});
        var contentIdsArr = [];
        if (page == 'payok') {
        	try {
              {{payok - 订单列表}}.forEach(function(item, key){
                  contentIdsArr.push(item.goods_sn);
              })
          } catch(e) {
          		contentIdsArr = [];
          }
          data['ids'] = contentIdsArr;
        }
			return {
				ev: 'PageView',
				data: data,
				dt: date,
				wid: 'XA-1000040-2',
				raw: raw,
				status: 1,
				statusTime: date
			}
		},
		'Purchase_Link': function() {
			var orderSn = {{payok - 订单号}}, sendObject = {}, contentIdsArr = [];
        if(!orderSn) orderSn = getRegParam(location.search, 'ordersn', 1);
			try {
        	{{payok - 订单列表}}.forEach(function(item, key){
           		contentIdsArr.push(item.goods_sn);
        	})
				sendObject = {
					ev: 'Purchase_Link',
					data: {
             	ids: contentIdsArr,
             	order: orderSn,
					  tp: 'product',
          	    v: {{payok - 订单总价}} || 0
					},
					dt: date,
					wid: 'XA-1000040-2',
					raw: raw,
					payway: {{payok - 支付方式}},
					status: 1,
					statusTime: date
				};
        } catch(e) {
        	sendObject = {
					ev: 'Purchase_Link',
					data: {
             	ids: [],
             	order: orderSn,
					  tp: 'product',
          	    v: {{payok - 订单总价}} || 0
					},
					dt: date,
					wid: 'XA-1000040-2',
					raw: raw,
					payway: {{payok - 支付方式}},
					paramOk: '1',
					status: 1,
					statusTime: date
				};
        
        }
  
        return sendObject;
		},
		'InnerPage': function(id) {
			return {
				ev: '_innerid',
           data: {
             '_innerid': id
           },
           dt: date,
           wid: 'XA-1000040-2',
				raw: raw,
				status: 1,
				statusTime: date
			}
		}
	}
    
	return function(event, goodslist) {
		return events[event](goodslist);
	}

})();
  
handleEventData(currentPage);
})();

function _post(url,options,callback){//定义post函数
    //创建Ajax对象
    if(XMLHttpRequest){
      var xhr=new XMLHttpRequest();
    }else{
      var xhr=new ActiveXObject("Microsoft.XMLHTTP");//兼容ie
    }
     
    xhr.open("post",url);//开启一个异步请求
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//设置请求头部
    xhr.send(options);//发送请求
    xhr.onreadystatechange=function(){//注册事件 处理返回数据
        if(xhr.readyState==4){//若请求完毕
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){//若请求成功
                callback && callback(xhr.responseText);//调用回调函数处理响应结果
            }else{//若请求失败

            }
        }
    };
}