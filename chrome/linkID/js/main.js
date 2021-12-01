var user_data={};
var current_data={};



function Main() 
{	
	window.addEventListener("load", initial);
	// var testdata={"result":true,"data":[{"_wid":15,"affiliate_account_id":"2540","affiliate_account_name":"salimaction13@gmail.com","account_id":["1378855405667640"]},{"_wid":15,"affiliate_account_id":"2194743","affiliate_account_name":"fbdexpost@gmail.com","account_id":["682900501808028"]}]};
	
	function initial()
	{
		chrome.runtime.onMessage.addListener(processMessage);//注册消息处理
		
    document.getElementById("btn_login").onclick=on_btn_login;
		document.getElementById("btn_add").onclick=on_btn_add;
		document.getElementById("btn_remove").onclick=on_btn_remove;
		document.getElementById("link_img").onblur=on_img_change;
		document.getElementById("cancel_reg").onclick=on_cancel_reg;
    document.getElementById("btn_close").onclick=function(){window.close()};
    document.getElementById("username").oninput  = function() {removeErrMsg('username', '')}
    document.getElementById("pwd").oninput  = function(){removeErrMsg('password', '')}
		
		
		document.getElementById("link_website").onchange=on_change_website;
		document.getElementById("account_id").onchange=on_change_account;
		
		document.getElementById("btn_create_linkid").onclick=createLinkId;
		document.getElementById("btn_create_shorturl").onclick=createShortUrl;
		//向back.js请求guid验证
		chrome.runtime.sendMessage({target:0,typeid:0});
  }
  
  //添加错误信息
  function addErrMsg (str, text = '') {
    let content = str + '-content'
    let err = str + '-err'
    let UConent = document.getElementsByClassName(content)[0]
    if (UConent && !hasClass(UConent, err)) {
      addClass(UConent, err)
    }
    document.getElementById(err).innerHTML = text
  }

  //是否存在错误信息
  function checkErrMsg (){
    var msgArr = document.getElementsByClassName('err-msg')
    var unErr = true
    for (let index = 0; index < msgArr.length; index++) {
      const element = msgArr[index];
      if (element.innerHTML.trim()) {
        unErr = false
      } 
    }
    return unErr
  }

  //删除错误信息
  function removeErrMsg (str, text = '')  {
    let content = str + '-content'
    let err = str + '-err'
    let UConent = document.getElementsByClassName(content)[0]
    if (UConent && hasClass(UConent, err)) {
      removeClass(UConent, err)
      document.getElementById(err).innerHTML = text
    }
    var loginErr = document.getElementById('login-err')
    loginErr.style.visibility = 'hidden'
    loginErr.innerText = ''
  }

	function on_cancel_reg()
	{//取消当前注册
		if(confirm('要取消当前注册的用户吗？'))
		{
			document.getElementById('tips').innerText='';
			document.getElementById('table_log').style.display='block';
			document.getElementById('table_link').style.display='none';
			document.getElementById('cancel_reg').style.display='none';
			
			chrome.runtime.sendMessage({target:0,typeid:15});
		}
	}
	
	function initialUserData(data)
	{/*
	初始化用户设置数据，以可以根据wid->account_id->affliat id
  */		
    // result.data.forEach(s => {
    //   s.wid = s.wid2
    // })
	  delete user_data;
	  user_data={};
    data.forEach(function(account, index){
      if (!user_data[account.wid]) {
        user_data[account.wid] = {}
      }
      user_data[account.wid][account.accountid] = [{
        "affiliate_account_id": account.aff_id,
        "affiliate_account_name": account.aff_id ? (account.aff_email || '未知email') : null,
        "account_name": account.account_name
      }]
    })

	}
	
	function clearInterface()
	{
		// RemoveOptions(document.getElementById('link_website'),1);
		RemoveOptions(document.getElementById('account_id'),1);
    RemoveOptions(document.getElementById('affiliate_account_id'),1);
    

		
		document.getElementById('link_name').value='';  
		document.getElementById('link_url').value='';
		document.getElementById('link_text').value='';
		document.getElementById('link_desc').value='';
		document.getElementById('link_img').value='';
	}
	
	function createShortUrl()
	{//创建shorturl
		var url=document.getElementById('link_url').value.trim();
		var website=document.getElementById('link_website').value.trim();
		
		if(url=='')
		  alert('需要生成短链接的网址');
		else
		{
		  var data={link_url: encodeURIComponent(url)};
		  chrome.runtime.sendMessage({target:0,typeid:22,data:data});
		}
	}
	
	function on_change_website()
	{//website发生变化时，显示对应的account
		var website=document.getElementById('link_website');
		var list=document.getElementById('account_id'),option;
		RemoveOptions(list,1);
    RemoveOptions(document.getElementById('affiliate_account_id'),1);
		
		if(website.value!='')
		{
			var id=parseInt(website.options[website.selectedIndex].getAttribute("website_id"));
      var data=user_data[id],account;
			for(var prop in data)
			{
				account=data[prop];//广告账户信息
				option=document.createElement('option');
				option.value=prop;
				option.innerText=account[0].account_name+'('+prop+')';
				option.data=account;
				list.options.add(option);
				
				if(prop==current_data.account_id)
				{
					list.value=prop;
					on_change_account();
				}
			}
			
		}
	}
	
	function on_change_account()
	{//广告账户发生过变化时，刷新对应的affliate account信息
		var account=document.getElementById('account_id');
		var list=document.getElementById('affiliate_account_id'),option;
		RemoveOptions(list,1);
		
		if(account.value!='')
		{
			var data=account.options[account.selectedIndex].data;

			data.forEach(
				function(affiliate)
				{
					option=document.createElement('option');
					option.value=affiliate.affiliate_account_id;
					option.innerText=affiliate.affiliate_account_name;
					list.options.add(option);
					
					if(option.value==current_data.affiliate_account_id)
						list.value=option.value;
				}
			)
		}		
	}
  
  //登录
	function on_btn_login()
	{
		var username=document.getElementById('username').value.trim();
    var pwd= document.getElementById('pwd').value.trim() ;
    pwd = pwd ? md5(pwd) : '' 
    if(!checkErrMsg()){
      return
    }
    if(username==''||pwd==''){
      username || addErrMsg('username', '用户名或邮箱不能为空')
      pwd || addErrMsg('password', '密码不能为空')
    }else
    {//向back.js发送请求
			document.getElementById('tips').innerHTML='正在登录<img src="img/loading.gif" style="width:16px;margin-left:10px">';
			chrome.runtime.sendMessage({target:0,typeid:10,data:{username:username,pwd:pwd}});
		}
  }
  
	
	function on_img_change()
	{
		var url=document.getElementById('link_img').value.trim();
		if(url!='')
			document.getElementById('img').src=url;
	}
	
	function on_btn_add()
	{//增加按钮
		var obj_sku=document.getElementById('sku');
		var sku=obj_sku.value.trim();
		if(sku=='')
			alert('需要输入有效SKU');
		else if(isSkuInList(sku))
			alert('该SKU已存在');
		else
		{
			var option=document.createElement('option');
			option.id=sku;
			option.innerText=sku;
			document.getElementById('skulist').options.add(option);
			obj_sku.value='';
			obj_sku.focus();
			rebuildLinkName();
		}
	}
	
	function on_btn_remove()
	{//删除按钮
		var skulist=document.getElementById('skulist');
		var nlen=skulist.options.length-1;
		var br=false;
		
		for(var ni=nlen;ni>=0;ni--)
			if(skulist.options[ni].selected)
			{
				br=true;
				skulist.options.remove(ni);
			}
			
		if(!br)
			alert('未选择要删除的SKU');
		else
			rebuildLinkName();
	}
	
	function rebuildLinkName()
	{//根据sku重新建立名称
		var obj=document.getElementById('link_name');
		var value=obj.value.trim();
		var ni=value.lastIndexOf('[');
		if(ni!=-1)
			value=value.substring(0,ni).trim();
		var obj_skulist=document.getElementById('skulist');
		var r='';
		for(var ni=0;ni<obj_skulist.options.length;ni++)
			r+='\''+obj_skulist.options[ni].value+'\','
		if(r!='')
			r='['+r.substring(0,r.length-1)+']';
		obj.value=value+r;
	}
	
	
	function isSkuInList(sku)
	{//检查sku是否已存在
		var obj=document.getElementById('skulist');
		var br=false;
		for(var ni=0;ni<obj.options.length;ni++)
			if(obj.options[ni].value==sku)
			{
				br=true;
				break;
			}
		return br;
	}
	
    function processMessage(request, sender, sendResponse) 
    {//新的处理方式
      
    if(request.target!=10)//识别命令目标
        return true;

		var data=request.data;
		
		switch(request.typeid)
		{
      case 10:
        //登录异常
				if(!data||!data.result)
				{
					document.getElementById('tips').innerText='';
          document.getElementById('table_log').style.display='block';
          //402 密码错误  403用户名错误
          if (data.code === 402) {
            addErrMsg('password', data.message)
          }else if (data.code === 403) {
            addErrMsg('username', data.message)
          }else{
            var loginErr = document.getElementById('login-err')
            loginErr.style.visibility = 'visible'
            loginErr.innerText = data.message || null
          }
				}
				break;
			case 20://成功获取用户信息
				document.getElementById('tips').innerHTML='当前用户: '+data.name;
				document.getElementById("cancel_reg").style.display='inline';
				document.getElementById('table_log').style.display='none';
        document.getElementById('table_link').style.display='inline';
        // document.getElementById('table_log').style.display='block';
        // document.getElementById('table_link').style.display='none';
        
				clearInterface();
				Array.isArray(data.setting_linkid) && initialUserData(data.setting_linkid);
				break;
			case 25://获取了原始页面信息
				if(!!request.data)
				{
          var obj=request.data.result;
          console.log('页面信息', obj)
					if(!!obj.account&&!!obj.account.id)
          {
            //根据account_id信息，设置website等信息
						setAccontInfo(obj.account.id);
          }
          
          //设置图片信息
					if(!!obj.image.url)
					{
						document.getElementById('img').src=obj.image.url;
						document.getElementById('link_img').value=obj.image.url;
					}
          
          
					if(!!obj.website_url.value)
					{//设置网站信息
						document.getElementById('link_url').value=trimUrl(obj.website_url.value);
						setWebsite();
					}
          
          //设置账号信息
					if(!!obj.ad_name.value)
						document.getElementById('link_name').value=obj.ad_name.value+'_';
				}				
				break;
      case 30:
      //{"code":200,"msg":"success","data":{"link_id":"2191382","link_url":"https://www.dresslily.com/promotion/group-sale.html?innerid=11165lkid=2191382"}}
					document.getElementById('link_url').value=data.link_url;
					chrome.runtime.sendMessage({target:0,typeid:25,data:{url:data.link_url,linkid:data.link_id}});
				break;
      case 32://已创建短链接
				document.getElementById('shorturl').value=data.short_link;
				break;
		}
		
		document.getElementById('link_name').value+=getDateValue();
    }
	
	function trimUrl(url)
	{
		var param=['lkid=','vip='];
		param.forEach(
			function(p)
			{
			  var ni=url.indexOf('?'+p);
			  if(ni==-1)
				  ni=url.indexOf('&'+p);
			  else
				  ni++;

			  if(ni!=-1)
			  {
				var nj=url.indexOf('&',ni+1),r=((nj==-1)?'':url.substring(nj));
				url=url.substring(0,ni);
				if(r!='')
				{
					if(url[url.length-1]=='?'&&r[0]=='&')
						r=r.substring(1);
					url+=r;
				}		
			  }
			}
		)
		
		return url;
	}
	
	function getDateValue()
	{
		var date=new Date();
		var year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate();
		return year+''+((month<10)?'0'+month:month)+((day<10)?'0'+day:day);
	}
	
	function setWebsite()
    {
		var website=document.getElementById('link_website'),url=document.getElementById('link_url').value.trim();
		if(website.value==''&&url!='')
		{
			var a= document.createElement('a');
			a.href=url;
			website.value=a.hostname;
			delete a;
		}
	}

	function createLinkId()
	{//实际生成linkid
		var select=document.getElementById('link_website');
		var host=document.getElementById('link_website').value;
		var website_id=select.options[select.selectedIndex].getAttribute('website_id');
		select=document.getElementById('affiliate_account_id');
		var affiliate_account_id=select.value;
		var creator=select.options[select.selectedIndex].innerText;
		var name=document.getElementById('link_name').value.trim();
		if(name.indexOf('[API]')==-1)
			name='[API]'+name;
		var url=document.getElementById('link_url').value.trim();
		var text=document.getElementById('link_text').value.trim();
		var desc=document.getElementById('link_desc').value.trim();
    var img=document.getElementById('link_img').value.trim();
		
		if(website_id==''||affiliate_account_id==''||name==''||url=='')
		{
			alert('需要选择网站以及affiliate账户id,并且需要输入名称和链接');
		}
		else if(url.indexOf('vip=')!=-1||url.indexOf('lkid=')!=-1)
			alert('网址中已经包含了linkid,请检查后再生成');
		else
		{
      var data={host:host,_wid:website_id,creator_id:affiliate_account_id,creator:creator,link_name:name,link_url:url,link_text:text,link_desc:desc,link_img:img};
      var params = {
        link_name: name,
          link_url: encodeURIComponent(url),
          img: img,
          link_text: text,
          link_desc: desc,
          user_id: affiliate_account_id,
          web_id: widToWid2(website_id)
      }      
			chrome.runtime.sendMessage({target:0,typeid:20,data:params});
		}
	}
	
	function setAccontInfo(account_id)
  {//根据account_id信息，设置website等信息
		current_data={};
		
		for(var prop in user_data)
		{
			for(var prop2 in user_data[prop])
				if(prop2==account_id)
				{
					current_data.wid=prop;
					current_data.account_id=account_id;
					current_data.affiliate_account_id=user_data[prop][prop2][0].affiliate_account_id;
				}
		}
		//然后启动website_id设置
		if(!!current_data.account_id)
		{
			var select=document.getElementById('link_website');
			for(var ni=0;ni<select.options.length;ni++)
				if(select.options[ni].getAttribute('website_id')==current_data.wid)
				{
					select.value=select.options[ni].value;
					on_change_website();
					break;
				}
    }
	}		
  return this;
}
    
var main = new Main();


