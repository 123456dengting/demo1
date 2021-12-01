/*
读取facebook中与linkid相关的信息
*/
function Adwords()
{
	chrome.runtime.onMessage.addListener(onMessageBack);
 
    function onMessageBack(request, sender, sendResponse)
    {
        var order,bset=false;
        var result=getInfo();;
		
        switch(request.typeid)
        {
           case 10://请求当前环境信息，当前URL,image的url
			  sendResponse({result:result});
			  break;
		   case 20://修改url内容
			  if(!!result&&!!result.website_url)
			  {
				  /*var linkid=request.data.linkid;
				  result.website_url.obj.focus();
				  result.website_url.obj.value=request.data.url;
				  var obj=result.expand_control.control;
				  if(obj.getAttribute('aria-expanded')=='false')
					  obj.click();
				  
				  result.expand_control.control_name.value='lkid';
				  result.expand_control.control_value.value=linkid;*/
				  result.website_url.obj.value=request.data.url;
			  }
			  break;
		   break;
        }
    }    

	function getInfo()
	{
		var PARAMLIST={'account.left_div':{'id':'aw-cues-jumptoaccount','comment':'包含account的div'},'account.name.left_div':{'class':'qu-f','comment':'包含account的div'},'account.id.left_div':{'class':'qu-h','comment':'包含account的div'},'account.name_div':{'class':'aw-cues-customerpanel aw-cues-downarrow','comment':'包含account的table'},'account.name.id_span':{'dir':'ltr','comment':'帐户id'},'account.name.name_span':{'class':'aw-cues-username','comment':'帐户id'},'account_div':{'class':'qt-h','comment':'输入框'},'adgroup.name_span':{'gwtdebugid':'nav-bar-editor-name-label','comment':'ad group名称'},'url_input':{'gwtdebugid':'text-ad-destination-url-input','comment':'当前账户信息'},'expand_span':{'gwtdebugid':'ads-url-options-zippy','comment':'展开按钮'},'param_name_input':{'aria-label':'Custom parameter 1 name','comment':'名称'},'param_value_input':{'aria-label':'Custom parameter 1 value','comment':'值'},'param_name2_input':{'aria-label':'自定义参数 1 的名称','comment':'名称'},'param_value2_input':{'aria-label':'自定义参数 1 的值','comment':'值'}};
		
		var result={ad_name:{},website_url:{},image:{},account:{},expand_control:{control:null,control_name:null,control_value:null}};
		
		var obj=getObjectFromDefine(PARAMLIST,null,'account.left_div')[0],obj_account_id,obj_account_name;
		if(!!obj)//&&!!(obj=getObjectFromDefine(PARAMLIST,obj,'account_div')[0]))
		{
			obj_account_name=getObjectFromDefine(PARAMLIST,obj,'account.name.left_div')[0];
			result.account.name=obj_account_name.innerText.trim();
			obj_account_id=getObjectFromDefine(PARAMLIST,obj,'account.id.left_div')[0];
			result.account.id=getAccountId(obj.innerText);
		}
		else
		{
			obj=getObjectFromDefine(PARAMLIST,null,'account.name_div')[0];
			if(!!obj)
			{
				result.account.id=getAccountId(getObjectFromDefine(PARAMLIST,obj,'account.name.id_span')[0].innerText);
				result.account.name=getObjectFromDefine(PARAMLIST,obj,'account.name.name_span')[0].innerText.trim();
			}
		}
		
		if(!!(obj=getObjectFromDefine(PARAMLIST,null,'adgroup.name_span')[0]))
		{
			result.ad_name.obj=obj;
			result.ad_name.value=obj.innerText.trim();
		}

		if(!!(obj=getObjectFromDefine(PARAMLIST,null,'url_input')[0]))
		{
			result.website_url.obj=obj;
			result.website_url.value=obj.value.trim();
		}

		if(!!(obj=getObjectFromDefine(PARAMLIST,null,'expand_span')[0]))
		{
			result.expand_control.control=obj;
			
			if(!(obj=getObjectFromDefine(PARAMLIST,null,'param_name_input')[0]))
				obj=getObjectFromDefine(PARAMLIST,null,'param_name2_input')[0];
			
			result.expand_control.control_name=obj;

			if(!(obj=getObjectFromDefine(PARAMLIST,null,'param_value_input')[0]))
				obj=getObjectFromDefine(PARAMLIST,null,'param_value2_input')[0];
			
			result.expand_control.control_value=obj;			
		}
		
		return !result.ad_name.value?null:result;
	}

	function getAccountId(name)
	{
		var ni=name.indexOf('•');
		if(ni!=-1)
			name=name.substring(ni+1);
		
		name=name.replaceAll('-','').trim();
		
		return name;
	}
	
    return this;
}
    
var master=new Adwords();