/*
读取Akulaku中相关的信息
*/
function Akulaku()
{
  window.onload = function(){
    
  console.log("content_scripts_onlaod");       

  //监听扩展程序进程或内容脚本发送的请求
	chrome.runtime.onMessage.addListener( 
        function  (request, sender, sendResponse) {
            chrome.runtime.sendMessage({target:0,typeid:0,from: "akulaku", to: "main"});
            chrome.runtime.sendMessage({target:0,typeid:0,from: "akulaku", to: "back"});
        }
   );
    return this;
  }

}
    
var master=new Akulaku();