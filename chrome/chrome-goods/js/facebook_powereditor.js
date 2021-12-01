/*
读取facebook中与linkid相关的信息
*/
function Facebook()
{
  window.onload = function(){
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
  
  //根据获取的图片数组,和adName值, 过滤对应的图片dom对象
  function findImage (obj, name) {
    let target = null
    for (let index = 0; index < obj.length; index++) {
      const element = obj[index];
      try {
        let ele = element.parentElement.parentElement.querySelectorAll('._62i0 span')
        let text = ele[0].innerText
        if (element.parentElement.parentElement.querySelectorAll('._62i0 span')[0].innerText === name) {
          target = element
        }
      } catch (error) {
        // console.log('error-读取图片失败', error)    
      }
    }
    return target;
  }  

	function getInfo()
	{
		var PARAMLIST={'ad_name_0_div':{'class':'_6xmg','comment':'名称'},'ad_name_div':{'class':'_5527','comment':'名称'},'ad_name_2_div':{'class':'*_2vl9','comment':'名称'},'website_url_div':{'label':'Website URL','comment':'名称'},'website_url2_div':{'label':'网址','comment':'名称'},'website_url3_div':{'label':'Destination URL','comment':'名称'},'website_url4_textarea':{'data-testid':'website-url-field','comment':'名称'},'website_url5_input':{'data-testid':'website-url-field','comment':'名称'},'common_textarea':{'class':'_2vli _2vlj _1h26 _1h27','comment':'输入框'},'common.image_div':{'class':'_3-90','comment':'图像'},'common.image_img': { 'class': '_5i4g img', 'comment': '图像' },'account_button':{'data-testid':'*account','comment':'当前账户信息'},'account_span':{'class':'_55pe','comment':'当前账户信息'}};
		var obj2=null;

		var result={ad_name:{},website_url:{},image:{},account:{}};
		//Ad Name
		
		obj=getObjectFromDefine(PARAMLIST,null,'ad_name_0_div')[0];
		
		if(!!obj)
		{
			obj2=obj.querySelector('input');
                        if(!obj2)
			   obj2=obj.querySelector('textarea');
			if(!!obj2)
			{
				result.ad_name.value=obj2.value.trim();
				result.ad_name.obj=obj2;	
			}
		}
		else
		{
			obj=getObjectFromDefine(PARAMLIST,null,'ad_name_div')[0];
		
			if(!obj)
				obj=getObjectFromDefine(PARAMLIST,null,'ad_name_2_div')[0];
		
			if(!!obj)
			{
				obj=obj.querySelector('textarea');
				result.ad_name.value=obj.value.trim();
				result.ad_name.obj=obj;
			}
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
      // obj=obj.querySelector('div');
      obj=obj.querySelectorAll('div')[0].querySelector('div').querySelector('div')
      // console.log('读取图片方式1', obj)
			result.image.url=obj.style.backgroundImage.replaceAll('url(','').replaceAll(')','').replaceAll('\'','').replaceAll('"','');
			result.image.obj=obj;
		}
		else{
      obj=getObjectFromDefine(PARAMLIST,document.querySelector('._1yi2'),'common.image_img')
      obj = document.querySelectorAll('img._5i4g.img')
      if(obj.length > 0){
        // console.log('读取图片方式2', obj)
        let target = findImage(obj, result.ad_name.value) || {}
        result.image.obj = target;
        result.image.url=target.src;
      }
    }

		obj=getObjectFromDefine(PARAMLIST,null,'account_button')[0];
		if(!!obj)
		{
			obj=obj.querySelector('span');
			if(!!obj)
				setAccountInfo(result,obj);
		}
		else
		{
			obj=getObjectFromDefine(PARAMLIST,null,'account_span')[0];
			if(!!obj)
				setAccountInfo(result,obj);
		}
			
		return !result.ad_name.value?null:result;
	}	
	
	function setAccountInfo(result,obj)
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
}
    
var master=new Facebook();