# 1.chrome简介
 - 严格来讲，我们正在说的东西应该叫Chrome扩展(Chrome Extension)，真正意义上的Chrome插件是更底层的浏览器功能扩展，可能需要对浏览器源码有一定掌握才有能力去开发。鉴于Chrome插件的叫法已经习惯，本文也全部采用这种叫法，但读者需深知本文所描述的Chrome插件实际上指的是Chrome扩展。
  - Chrome插件是一个用Web技术开发、用来增强浏览器功能的软件，它其实就是一个由HTML、CSS、JS、图片等资源组成的一个.crx后缀的压缩包.


## 1.1chrome插件能干什么

扩展浏览器的功能,自定义一些定制化的功能,修改网页的dom结构,拦截图片,广告,抓取页面数据等等

## 1.2为什么要写chrome插件而不是Firefox插件

- Chrome占有率更高，更多人用；
- chrome插件除了可以运行在chrome之外,还可以运行在所有webkit内核的国产浏览器，比如360极速浏览器、360安全浏览器、搜狗浏览器、QQ浏览器等等
- 除此之外，Firefox浏览器也对Chrome插件的运行提供了一定的支持；

# 2.常用功能介绍

## 2.1 如何加载本地开发的扩展
  - 浏览器右上角设置 --> 更多工具 --> 扩展程序
  ![](https://test-bimg.akulaku.net/biz/openapi/9541df430156426ab026cf270f6daf455035.png)
  - 打开右上角的开发者模式 --> 加载已解压的扩展程序 --> 选择自己的文件夹
 ![](https://test-bimg.akulaku.net/biz/openapi/0d973d32352e4f0d92ec26adcc523b873017.png)

## 2.2 mainfest.json

这是一个Chrome插件最重要也是必不可少的文件，用来配置所有和插件相关的配置，必须放在根目录。其中，```manifest_version``` 、 ```name``` 、 ```version``` 3个是必不可少的，description和icons是推荐的。
下面给出的是一些常见的配置项，均有中文注释，完整的配置文档请戳 [这里](https://developer.chrome.com/docs/extensions/mv3/manifest/)。

```javascript
{
	// 清单文件的版本，这个必须写，每个版本配置有些不一样,现在有2和3, 本文是2的配置.
	"manifest_version": 2,
	// 插件的名称
	"name": "demo",
	// 插件的版本,自己按照自己的版本写
	"version": "1.0.0",
	// 插件描述
	"description": "简单的Chrome扩展demo",
	// 图标，一般偷懒全部用一个尺寸的也没问题
	"icons":
	{
		"16": "img/icon.png",
		"48": "img/icon.png",
		"128": "img/icon.png"
	},
	// 会一直常驻的后台JS或后台页面
	"background":
	{
		// 2种指定方式，如果指定JS，那么会自动生成一个背景页
		"page": "background.html"
		//"scripts": ["js/background.js"]
	},
	// 浏览器右上角图标设置，browser_action、page_action、app必须三选一
	"browser_action": 
	{
		"default_icon": "img/icon.png",
		// 图标悬停时的标题，可选
		"default_title": "这是一个示例Chrome插件",
		"default_popup": "popup.html"
	},
	// 需要直接注入页面的JS
	"content_scripts": 
	[
		{
			//"matches": ["http://*/*", "https://*/*"],
			// "<all_urls>" 表示匹配所有地址
			"matches": ["<all_urls>"],
			// 多个JS按顺序注入
			"js": ["js/jquery-1.8.3.js", "js/content-script.js"],
			// JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
			"css": ["css/custom.css"],
			// 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
			"run_at": "document_start"
		},
		// 这里仅仅是为了演示content-script可以配置多个规则
		{
			"matches": ["*://*/*.png", "*://*/*.jpg", "*://*/*.gif", "*://*/*.bmp"],
			"js": ["js/show-image-content-size.js"]
		}
	],
	// 权限申请
	"permissions":
	[
		"contextMenus", // 右键菜单
		"tabs", // 标签
		"notifications", // 通知
		"webRequest", // web请求
		"webRequestBlocking",
		"storage" // 插件本地存储
	],
	// 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
	"web_accessible_resources": ["js/inject.js"],
	// 插件主页，这个很重要，不要浪费了这个免费广告位
	"homepage_url": "https://www.baidu.com",
	// 覆盖浏览器默认页面
	"chrome_url_overrides":
	{
		// 覆盖浏览器默认的新标签页
		"newtab": "newtab.html"
	},
	// Chrome40以前的插件配置页写法
	"options_page": "options.html",
	// Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个
	"options_ui":
	{
		"page": "options.html",
		// 添加一些默认的样式，推荐使用
		"chrome_style": true
	},
	// 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
	"omnibox": { "keyword" : "go" },
	// 默认语言
	"default_locale": "zh_CN",
	// devtools页面入口，注意只能指向一个HTML文件，不能是JS文件
	"devtools_page": "devtools.html"
}
```
## 2.3 content-scripts

- 指定要向Web页面内注入的脚本。可注入多个css与js。扩展本身的运行环境为background，而background与web页面的运行环境是相互独立的。若希望在扩展中对web页面进行修改，那就需要使用content_scripts。
- content_scripts运行在一个隔离环境中，即与background和web页面运行环境都独立。但content_scripts共享了web页面的DOM，所以content_scripts可以对web页面DOM进行操作。然而共享仅限于DOM，不包括任何js变量与函数。同理，web页面的js也不能访问content_scripts中的js变量与函数。于是，二者引入的库也不能共享，各自使用各自的库。
- content-scripts和原始页面共享DOM,但是不共享JS.
- 打印的内容和接口请求在当前网页的控制台都能看到,接口请求会跨域

```javascript
{
	// 需要直接注入页面的JS
	"content_scripts": 
	[
		{
			//"matches": ["http://baidu.com/*", "https://baidu.com/*"],
			// "<all_urls>" 表示匹配所有地址
			"matches": ["<all_urls>"],
			// 多个JS按顺序注入
			"js": ["js/jquery-1.8.3.js", "js/content-script.js"],
			// JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
			"css": ["css/custom.css"],
			// 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
			"run_at": "document_start"
		}
	],
}
```

## 2.4 background
后台,运行于浏览器后台的一个页面,正常看不到,是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在background里面。
background的权限非常高，几乎可以调用所有的Chrome扩展API（除了devtools），而且它可以无限制跨域，也就是可以跨域访问任何网站而无需要求对方设置CORS。

配置中，background可以通过page指定一张网页，也可以通过scripts直接指定一个JS，Chrome会自动为这个JS生成一个默认的网页(背景页)：

打印内容和接口请求在控制台看不到,必须在打开改扩展在,扩展性详情的背景页里面才能看到

```javascript
{
	// 会一直常驻的后台JS或后台页面
	"background":
	{
		// 2种指定方式，如果指定JS，那么会自动生成一个背景页
		// "page": "background.html"
		"scripts": ["js/background.js"]
	},
}
```


## 2.5 popup
popup是点击browser_action或者page_action图标时打开的一个小窗口网页，焦点离开网页就立即关闭，一般用来做一些临时性的交互。
打印内容独立,右键popup页面能看到一个对应的控制台
例如: ![](https://images2015.cnblogs.com/blog/352797/201707/352797-20170711101114415-2019243064.png) 
```javascript
{
	"browser_action":
	{
		"default_icon": "img/icon.png",
		// 图标悬停时的标题，可选
		"default_title": "这是一个示例Chrome插件",
		"default_popup": "popup.html"
	}
}
```

## 2.6 发送消息(短连接)
- 从content_scripts发送消息到别的js
```javascript
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
```

- 从扩展程序向内容脚本发送请求看起来非常相似，不同之处在于您需要指定将其发送到哪个选项卡。
```javascript
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
```

- 接受消息
```javascript
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {}
);
```

# 3. yapi生成ts插件核心代码

## 3.1 mainfest配置文件
- yapi生成TS的配置文件
```json
{
  "manifest_version": 2,  
  "name": "yapi生成接口",
  "version": "1.0.0",
  "description": "yapi to TS demo",
  "icons": {
    "48" : "icon_48.png",
    "128" : "icon_128.png"
  },
 "browser_action": {
    "default_title": "Test",
    "default_popup": "popup.html"
  },  
  "content_scripts":
  [
      {
          "matches": ["http://testyapi.akulaku.com/*"],
          "js": ["./func.js", "./jquery.js", "./trans.js", "./main.js"],
          "run_at": "document_end"
      }
  ]
}



```

## 3.2 main脚本

- 收到popup消息之后,请求接口,拿到返回值,生成ts代码,并且发送消息给给popup

```javascript
(function(){
  window.onload = function(){
    let TOPOPUP = {
      source: "main",
      target: "popup"
    }
    // 请求接口数据
    function ajaxGetDemo(apiId){
      let reqTs, resTs;
      $.ajax({
          url: "http://testyapi.akulaku.com/api/interface/get",
          data: {
            id: apiId
          },
          method: "get",
          success: (res) => {
              let resBody = res.data.res_body ? JSON.parse(res.data.res_body) : {};
              let reqBody = res.data.req_body_other ? JSON.parse(res.data.req_body_other) : {};
              console.log("111111-resBody", resBody)
              console.log("111111-reqBody", reqBody)
              if(!reqBody.type){
                reqBody.type = "object"
              }
              if(!resBody.type){
                resBody.type = "object"
              }
            
              try {
                reqTs = trans("", reqBody, reqBody.required)
              } catch (error) {
                reqTs = "请求参数转化失败"
              }
              try {
                resTs =  trans("", resBody || {});
              } catch (error) {
                resTs = "返回参数转化失败"
              }
              let data = {
                success: true,
                errMsg: undefined,
                data: {reqTs, resTs}
              }
              chrome.runtime.sendMessage({...TOPOPUP, value: data});
          },
          error: (err) => {
              let data = {
                success: false,
                errMsg: "接口异常,请稍后重试",
              }
              chrome.runtime.sendMessage({...TOPOPUP, value: data});
          }
      })
    }

    // 获取api数据
    function getApiData () {
      let apiId = +location.pathname.split("api/")[1];
      if(!isNaN(apiId)){
        ajaxGetDemo(apiId);
      }else{
        let data = {
          success: false,
          errMsg: "请到接口页面再执行",
        }
        chrome.runtime.sendMessage({...TOPOPUP, value: data});
      }
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
      {
        console.log("11111-message", request, sender, sendResponse)

        // 根据消息内容执行操作
        if(request.source === 'popup' && request.target === "main"){
          getApiData()
        }
      });
  }    
})()
```

## 3.3 popup界面

- 发送消息给main,接受消息并更新dom结构

```javascript
(function(){

  window.onload = function(){
    let reqData, resData;

    // 发送消息
    function sendMessageToContentScript(message, callback){
      setLoading(true)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
      {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
          if(callback) callback(response);
        });
      });
    }

    // 接受消息
    function addListenerMessage(request, sender, sendResponse){
      setLoading(false)
      if(request.source === "main" && request.target === "popup"){
        resolveMainMessage(request.value)
      }
    }
  
    // 处理main消息
    function resolveMainMessage(data){
      if (data.success) {
        setHtml(data.data.reqTs, data.data.resTs)
      }else{
        setHtml("", "")
        messageHandle(data.errMsg)
      }
    }

    // 设置html内容
    function setHtml(reqTs, resTs){
      document.getElementsByClassName("req_data")[0].innerHTML = reqTs;
      document.getElementsByClassName("res_data")[0].innerHTML = resTs;
      reqData = reqTs;
      resData = resTs;
    }
  
    chrome.runtime.onMessage.addListener(addListenerMessage);
    sendMessageToContentScript({source:'popup', target: "main", value:''}, function(response) {
      console.log('来自content的回复：'+response);
    });
    
    // 点击重新获取ts
    document.getElementById("get_api").onclick = function(){
      setHtml("", "")
      sendMessageToContentScript({source:'popup', target: "main", value:''}, function(response)
      {
        console.log('来自content的回复112233：'+response);
      });
    }

    // 点击复制接口参数
    document.getElementById("req_copy").onclick = function(){
      copyText(reqData)
    }

    // 点击复制接口返回值
    document.getElementById("res_copy").onclick = function(){
      copyText(resData)
    }

  }
})()

```

## 3.4 trans代码生成

- 根据接口的返回数据结构分析出使用递归来处理会比较方便

```javascript

// 生成代码入口
function trans (name = '', data, required = []){
    if(data.type === "object"){
      return resolveObject(name, data.properties, required);
    }else if(data.type === "array"){
      return resolveArray(name, data);
    }else if(data.type === "integer"){
      return `${data.description ? `
       /**
       * ${data.description}
       */` : ""}
      ${name}${required.includes(name) ? "" : "?"}: number`
    }else{
      return `${data.description ? `
      /**
      * ${data.description}
      */ ` : ""} 
      ${name}${required.includes(name) ? "" : "?"}: ${data.type} `
    }
  };

  // 处理object
  function resolveObject (name, data = {}, required){
    let objJson  = `
    ${data.description ? `
    /**
    * ${data.description}
    */` : ""}
   ${name ? name + ":" : ''} {
    `
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          objJson += trans(key, element, required)
        }
      }
    return objJson += `\n }`  
  }

  // 处理array
  function resolveArray (name, data = {}){
    let arrJson = `
        ${data.description ? `
        /**
        * ${data.description}
        */` : ""} `;
      arrJson += trans(name, data.items, data.items.required)
     
      return arrJson += `[]\n`;
  }
```

# 4.参考资料

- [chrome开发官网](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
