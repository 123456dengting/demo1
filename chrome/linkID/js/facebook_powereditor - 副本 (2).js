/*
读取facebook中与linkid相关的信息
*/
function Facebook()
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
				  result.website_url.obj.focus();
				  result.website_url.obj.value=request.data.url;
			  }
			  break;
		   break;
        }
    }    

	function getInfo()
	{
		//var PARAMLIST={'ad_name_div':{'class':'_5527','comment':'名称'},'ad_name_2_div':{'class':'*_2vl9','comment':'名称'},'website_url_div':{'label':'Website URL','comment':'名称'},'website_url2_div':{'label':'网址','comment':'名称'},'website_url3_div':{'label':'Destination URL','comment':'名称'},'website_url4_textarea':{'data-testid':'website-url-field','comment':'名称'},'common_textarea':{'class':'_2vli _2vlj _1h26 _1h27','comment':'输入框'},'common.image_div':{'class':'_3-90','comment':'图像'},'common.image_img': { 'class': '_5i4g img', 'comment': '图像' },'account_span':{'class':'_55pe','comment':'当前账户信息'}};
		var PARAMLIST={'ad_name_div':{'class':'_5527','comment':'名称'},'ad_name_2_div':{'class':'*_2vl9','comment':'名称'},'website_url_div':{'label':'Website URL','comment':'名称'},'website_url2_div':{'label':'网址','comment':'名称'},'website_url3_div':{'label':'Destination URL','comment':'名称'},'website_url4_textarea':{'data-testid':'website-url-field','comment':'名称'},'website_url5_input':{'data-testid':'website-url-field','comment':'名称'},'common_textarea':{'class':'_2vli _2vlj _1h26 _1h27','comment':'输入框'},'common.image_div':{'class':'_3-90','comment':'图像'},'common.image_img': { 'class': '_5i4g img', 'comment': '图像' },'account_span':{'class':'_55pe','comment':'当前账户信息'}};
		
		var result={ad_name:{},website_url:{},image:{},account:{}};
		//Ad Name
		
		obj=getObjectFromDefine(PARAMLIST,null,'ad_name_div')[0];
		
		if(!obj)
			obj=getObjectFromDefine(PARAMLIST,null,'ad_name_2_div')[0];
		
		if(!!obj)
		{
			obj=obj.querySelector('textarea');
			result.ad_name.value=obj.value.trim();
			result.ad_name.obj=obj;
		}
		
		obj=getObjectFromDefine(PARAMLIST,null,'website_url_div')[0];
		if(!obj||!obj.parentElement.querySelector('textarea'))
			if(!(obj=getObjectFromDefine(PARAMLIST,null,'website_url2_div')[0])||!obj.parentElement.querySelector('textarea'))
				if(!(obj=getObjectFromDefine(PARAMLIST,null,'website_url3_div')[0])||!obj.parentElement.querySelector('textarea'))
					if(!(obj=getObjectFromDefine(PARAMLIST,null,'website_url4_textarea')[0]))
						obj=getObjectFromDefine(PARAMLIST,null,'website_url5_input')[0];
				
			
		if(!!obj)
		{
			if(obj.tagName.toLowerCase()!='input')
				obj=obj.parentElement.querySelector('textarea');
			
			if(!!obj)
			{
				result.website_url.value=obj.value.trim();
				result.website_url.obj=obj;
			}
		}

		obj=getObjectFromDefine(PARAMLIST,null,'common.image_div')[0];
		if(!!obj)
		{
			obj=obj.querySelector('div');
			result.image.url=obj.style.backgroundImage.replaceAll('url(','').replaceAll(')','').replaceAll('\'','').replaceAll('"','');
			result.image.obj=obj;
		}
		else if(!!(obj=getObjectFromDefine(PARAMLIST,null,'common.image_img')[0]))
		{
		    result.image.obj = obj;
			result.image.url=obj.src;
        }

		obj=getObjectFromDefine(PARAMLIST,null,'account_span')[0];
		if(!!obj)
		{
			var text=obj.innerText.trim(),param=':',param2='(',param3=')';
			text=text.replaceAll('：',':').replaceAll('（','(').replaceAll('）',')');
			
			var ni,nj,nk;
			ni=text.indexOf(param);
			
			if((nj=text.lastIndexOf(param2))>ni)
				if((nk=text.lastIndexOf(param3))>ni)
				{
					result.account.name=text.substring(ni+1,nj).trim();
					result.account.id=text.substring(nj+1,nk).trim();
					result.account.obj=obj;
				}
		}
		
		return !result.ad_name.value?null:result;
	}	
	
	function getFacebookAccount(url)
	{//https://business.facebook.com/ads/manager/account/?home=1&act=1378205029063427
		var param='act=',result=null;
		var ni=url.indexOf(param);
		if(ni!=-1)
		{
			var nj=url.indexOf("&",ni+1);
			if(nj==-1)
				nj=url.length;
			result=url.substring(ni+param.length,nj);
		}
		
		return result;
	}
	
	
    return this;
}
    
var master=new Facebook();