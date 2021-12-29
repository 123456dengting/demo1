/*
读取content_scripts中相关的信息
*/
function content_scripts()
{
  window.onload = function(){
    
  console.log("content_scripts_onlaod");       

  //监听扩展程序进程或内容脚本发送的请求
	chrome.runtime.onMessage.addListener( 
        function  (request, sender, sendResponse) {
            chrome.runtime.sendMessage({target:0,typeid:0,from: "content_scripts", to: "main"});
            chrome.runtime.sendMessage({target:0,typeid:0,from: "content_scripts", to: "back"});
        }
   );
    return this;
  }

}
    
var master=new content_scripts();