(function(){

  window.onload = function(){
    let reqData, resData;

    // 发送消息
    function sendMessageToContentScript(message, callback){
      setLoading(true)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
      {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
          if(callback) callback(response);
        });
      });
    }

    // 接受消息
    function addListenerMessage(request, sender, sendResponse){
      setLoading(false)
      if(request.source === "main" && request.target === "popup"){
        resolveMainMessage(request.value)
      }
    }
  
    // 处理main消息
    function resolveMainMessage(data){
      if (data.success) {
        setHtml(data.data.reqTs, data.data.resTs)
      }else{
        setHtml("", "")
        messageHandle(data.errMsg)
      }
    }

    // 设置html内容
    function setHtml(reqTs, resTs){
      document.getElementsByClassName("req_data")[0].innerHTML = reqTs;
      document.getElementsByClassName("res_data")[0].innerHTML = resTs;
      reqData = reqTs;
      resData = resTs;
    }
  
    chrome.runtime.onMessage.addListener(addListenerMessage);
    sendMessageToContentScript({source:'popup', target: "main", value:''}, function(response) {
      console.log('来自content的回复：'+response);
    });
    
    // 点击重新获取ts
    document.getElementById("get_api").onclick = function(){
      setHtml("", "")
      sendMessageToContentScript({source:'popup', target: "main", value:''}, function(response)
      {
        console.log('来自content的回复112233：'+response);
      });
    }

    // 点击复制接口参数
    document.getElementById("req_copy").onclick = function(){
      copyText(reqData)
    }

    // 点击复制接口返回值
    document.getElementById("res_copy").onclick = function(){
      copyText(resData)
    }

  }
})()