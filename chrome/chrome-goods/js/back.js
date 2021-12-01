function Back() 
{
  //主控


  console.log("111111-Back-exe");

    chrome.runtime.onMessage.addListener(processMessage);//注册消息处理


  function processMessage(a, b, c){  
    console.log("111111-processMessage", a, b, c);
  }


}


    
var main = new Back();


