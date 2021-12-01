function Main() 
{//主控
    var window_id,tab_id;//对话窗口
	var opener_id;//打开linkid的窗口
	var api=new Interface();
  var user_guid={};
  var USERINFO = {}
	
    chrome.runtime.onMessage.addListener(processMessage);//注册消息处理
    chrome.browserAction.onClicked.addListener(onBrowserAction);//注册按钮功能

    function onBrowserAction(tab) 
    {//首先向tab页发送数据获取请求
		if(!window_id)
			chrome.windows.create({url: 'main.html', type: 'popup',left:500,top:100,width:800,height:580}, 
				function(window){
          console.log('window', window)
					window_id=window.id;
					tab_id=window.tabs[0].id;
					opener_id=tab.id;
				});
		else
			chrome.windows.update(window_id,{focused:true},
				function(result)
				{
					if(chrome.runtime.lastError && !result)
					{
						window_id=null;
						tab_id=null;
						opener_id=null;
						onBrowserAction(tab);
					}
				}
		);
  }

  function login(data){
    api.login({data:data,callback: 
      function(result){
        if(result.code === 200 && result.data)
        {//保存guid信息
          var res = result.data
          USERINFO = {
            name:res.name,
            username:res.username,
            token:res.token,
            pwd:data.pwd
          }
          chrome.storage.local.set({"userinfo":{name:res.name,username:res.username,token:res.token,pwd:data.pwd}});
          getWebsite()
        }
        else
        {//各种异常情况
          chrome.runtime.sendMessage({target:10,typeid:10, data: result});
        }
      }
    });
  }
  
  function getWebsite(){
    api.getWebsite({data: null,
      callback: function(result){
        if(result.code === 200 && result.data){
            //向客户端发送信息
            try {
              queryData({openerid:opener_id,tabid:tab_id});
            } catch (error) {
              alert('获取启动页面信息失败')
              chrome.runtime.sendMessage({target:10,typeid:10, data: result});
            }
            
            chrome.storage.local.get("userinfo", function(res){
              chrome.runtime.sendMessage({target:10,typeid:20,data:{name:res.userinfo.name,setting_linkid: result.data}});
            })
            
        }else{
          chrome.runtime.sendMessage({target:10,typeid:10, data: result});
        }
      }
    });
  }
    
	function queryGUID()
	{//查询是否有guid信息，如果没有则返回，否则去服务器获取配置信息
		chrome.storage.local.get("userinfo", function(res){
        var userinfo = res.userinfo
				if(userinfo && (!userinfo.username||!userinfo.pwd))
				{
          //通知页面进入登录页面
					chrome.runtime.sendMessage({target:10,typeid:10,data:{result:false}});
				}
				else
        {//用登录信息去获取用户信息
          // let params = {
          //   username: userinfo.username,
          //   pwd: userinfo.pwd
          // }
          // login(params)
          //获取站点账号信息
          getWebsite()
				}
			}
		);
	}
	
	function queryData($)
  {//向启动页获取信息
		 chrome.tabs.sendMessage($.openerid, {typeid:10},function(result)
			{
        if(!!result)
					chrome.runtime.sendMessage({target:10,typeid:25,data:result});
			}
		);
  }

    function processMessage(request, sender, sendResponse) 
    {//新的处理方式
        if(request.target!=0)//识别命令目标
            return true;
		
    var data=request.data;
		
		switch(request.typeid)
		{
			case 0://查询是否有guid信息
				queryGUID();
				break;
      case 10://登录
        login(data)
				break;
			case 15://取消用户注册 
				chrome.storage.local.get("userinfo",
					function(userinfo)
					{
            chrome.storage.local.set({userinfo:{}});
					}
				);
				break;
			case 20://创建linkid
				api.createLinkId({data:data,callback:
					function(result)
					{
            // result=JSON.parse(result);
            if (result.code === 200) {
              chrome.runtime.sendMessage({target:10,typeid:30,data:result.data});
            }else{
              alert('生成linkId失败,请重新生成')
            }		
					}
				});
				break;
			case 22://创建shorturl
				api.createShortUrl({data:data,callback:
					function(result)
					{
            if (result.code === 200) {
              chrome.runtime.sendMessage({target:10,typeid:32,data:result.data});
            }else{
              alert('生成短连接失败,请重新生成')
            }						
					}
				});
				break;				
      case 25://回写到界面上
				chrome.tabs.sendMessage(opener_id, {typeid:20,data:data});
				break;
		}
    }
    
    return this;
}


function Interface() 
{//用于与API对接
  // var URL_REQUEST = "http://10.33.255.220:8083/";
  // var URL_REQUEST = "http://10.32.3.230:9602/";  //测试环境
  var URL_REQUEST = "http://10.33.255.220:8081/";  //线上
  


  
  
    //注销用户
	this.unRegUser = function($) 
    {
		// $.path='auth/auth_user/unreg_linkid_user';
        // doAction($);
    }
    //登录(拿已经保存的本地信息去登录)
	this.login=function($)
	{
		$.path='api/WebSite/Authorization/Login';
        doAction($);		
  }
  //获取网站账户信息
  this.getWebsite = function($){
    $.path = 'api/WebSite/AdPublish/GetAccount'
    doAction($);	
  }
	//创建linkId
	this.createLinkId=function($)
	{
		$.path='api/WebServices/Linkid/CreateLinkid';
        doAction($);		
	}
  //创建短连接
	this.createShortUrl=function($)
	{
    $.path='api/WebServices/Linkid/CreateShortUrl';
        doAction($);		
	}
	
    function doAction($)
    {//封装实际的命令处理
      chrome.storage.local.get('userinfo', function(res){
        var token = res && res.userinfo && res.userinfo.token
        var reader = new UrlReader($.callback, token);
        
        var paramsFormat = function(data){
          if(typeof data === 'object'){
            arr = []
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                const element = data[key];
                arr.push(key + '=' + element)
              }
            }
            return arr.join('&')
          }else{
            return 'data='+data
          }
        }
        var paramsData = paramsFormat($.data)
        reader.Read("post", URL_REQUEST+$.path, paramsData, true);
      })
       
        
    }

    return this;
}
    
var main = new Main();


