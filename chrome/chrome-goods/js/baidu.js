/*
读取Baidu中相关的信息
*/
function Baidu()
{
  window.onload = function(){
    document.getElementById("su").value = "search"
    
    console.log("111111-baidu-onload");      

	chrome.runtime.sendMessage({target:0,typeid:0,from: "baidu", to: "main"});
    chrome.runtime.sendMessage({target:0,typeid:0,from: "baidu", to: "back"});
    
    return this;
  }

}
    
var master=new Baidu();