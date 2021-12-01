function Main() {	
	console.log("111111-main-exe");

	window.addEventListener("load", initial);

	function initial(){
		chrome.runtime.onMessage.addListener(onMessageBack)
		console.log("111111-main-onload", document);
		document.getElementById("btn").onclick = sendMsg
		//向back.js发送消息
		chrome.runtime.sendMessage({target:0,typeid:0,from:"main", to: "back"});
	}

	function sendMsg (){
		chrome.runtime.sendMessage({target:0,typeid:0,from: "main", to: "baidu"});
	}

	function onMessageBack(request, sender, sendResponse){
		console.log("111111-main-addListener", request)
	}
  
  return this;
}
    
var main = new Main();


