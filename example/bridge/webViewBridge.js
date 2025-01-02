// 获取当前浏览器的基础信息: 内核、版本、操作系统
var ua = navigator.userAgent.toLowerCase();
// 是否是iphone客户端
var isIPhone = ~ua.indexOf("iphone");
// 是否是Android客户端
var isAndroid = ~ua.indexOf("android");
// 当前Hybird应用中App端注入的JSContext上下文的名称
var appJSContextName = "AjJSBridge";
// 所有回调事件的列表
var callbackBuckets = {};
var ajJXRSApi = {};

function isFn(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
}
function createCallbackID(action) {
  return "cb_" + action + "_" + new Date().getTime();
}
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
       return callback(WebViewJavascriptBridge); 
    }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback]; // 创建一个 WVJBCallbacks 全局属性数组，并将 callback 插入到数组中。
    var WVJBIframe = document.createElement('iframe'); // 创建一个 iframe 元素
    WVJBIframe.style.display = 'none'; // 不显示
    WVJBIframe.src = 'https://__BRIDGE_LOADED__'; // 设置 iframe 的 src 属性
    document.documentElement.appendChild(WVJBIframe); // 把 iframe 添加到当前文导航上。
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

function webviewBridge(fun,data) {
  setupWebViewJavascriptBridge(function(bridge){
      if ( window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler(fun,{'data':data});
      }
   
  });
}

function webviewCallBackBridge(fun,callback,data) {
    setupWebViewJavascriptBridge(function(bridge){
        if ( window.WebViewJavascriptBridge) {
            window.WebViewJavascriptBridge.callHandler(fun,{'data':data},callback);
          }
    });
}
function invokeApp(action, params, callback) {
  if (arguments.length === 2 && isFn(params)) {
    callback = params;
    params = null;
  }

  var callbackid = void 0;

  if (callback) {
    callbackBuckets[callbackid = createCallbackID(action)] = callback;
  }

  params = params ? typeof params === "string" ? params:JSON.stringify(params) : "";
  callbackid = callbackid || "";
  if (isIPhone) {
    window.webkit.messageHandlers[appJSContextName].postMessage({action: action,data: params,callbackid: callbackid});
  } else {
    window[appJSContextName].postMessage(JSON.stringify({action: action,data: params,callbackid: callbackid}));
  }
}
/**
	 * Native通知web,主要是为了用来处理回调函数
	 *
	 * @param {String} jsonStr
	 */
function notify(callbackid, jsonStr) {
  try {
    if (!callbackid) return;

    var fn = callbackBuckets[callbackid];

    // jsonStr = JSON.parse(jsonStr);

    fn && fn(jsonStr);
  } catch (ex) {
    throw new Error(ex);
  }
}
function isFlutter() {
  return true
}
window.setupWebViewJavascriptBridge = setupWebViewJavascriptBridge;
window.webviewBridge = webviewBridge;
window.webviewCallBackBridge = webviewCallBackBridge;
window.ajInvokeApp = invokeApp;
window.ajNotify = notify;
window.isFlutter = isFlutter;