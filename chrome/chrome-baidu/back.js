/*
background
*/
function back()
{
  var window_id,tab_id;
	var opener_id;
  console.log("111111-back");
  chrome.browserAction.onClicked.addListener(onBrowserAction); //注册按钮功能
  function onBrowserAction(){
    if(!window_id){
      chrome.windows.create({url: 'main.html', type: 'popup',left:500,top:100,width:800,height:580}, 
          function(window){
            window_id=window.id;
            tab_id=window.tabs[0].id;
          });
    }else{
      chrome.windows.update(window_id,{focused:true},
        function(result)
        {
          if(chrome.runtime.lastError && !result)
          {
            window_id=null;
            tab_id=null;
            opener_id=null;
          }
        }
    );
    }
  }

  
}
var master=new back();