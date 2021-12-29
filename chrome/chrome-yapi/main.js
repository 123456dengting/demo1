(function(){
  window.onload = function(){
    let TOPOPUP = {
      source: "main",
      target: "popup"
    }
    // 请求接口数据
    function ajaxGetDemo(apiId){
      let reqTs, resTs;
      $.ajax({
          url: "http://testyapi.AxxxB.com/api/interface/get",
          data: {
            id: apiId
          },
          method: "get",
          success: (res) => {
              let resBody = res.data.res_body ? JSON.parse(res.data.res_body) : {};
              let reqBody = res.data.req_body_other ? JSON.parse(res.data.req_body_other) : {};
              console.log("111111-resBody", resBody)
              console.log("111111-reqBody", reqBody)
              if(!reqBody.type){
                reqBody.type = "object"
              }
              if(!resBody.type){
                resBody.type = "object"
              }
              
              try {
                reqTs = trans("", reqBody, reqBody.required)
              } catch (error) {
                reqTs = "请求参数转化失败"
              }
              try {
                resTs =  trans("", resBody || {});
              } catch (error) {
                resTs = "返回参数转化失败"
              }  
              let data = {
                success: true,
                errMsg: undefined,
                data: {reqTs, resTs}
              }
              chrome.runtime.sendMessage({...TOPOPUP, value: data});
          },
          error: (err) => {
              let data = {
                success: false,
                errMsg: "接口异常,请稍后重试",
              }
              chrome.runtime.sendMessage({...TOPOPUP, value: data});
          }
      })
    }

    // 获取api数据
    function getApiData () {
      let apiId = +location.pathname.split("api/")[1];
      if(!isNaN(apiId)){
        ajaxGetDemo(apiId);
      }else{
        let data = {
          success: false,
          errMsg: "请到接口页面再执行",
        }
        chrome.runtime.sendMessage({...TOPOPUP, value: data});
      }
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
      {
        console.log("11111-message", request, sender, sendResponse)
        // 根据消息内容执行操作
        if(request.source === 'popup' && request.target === "main"){
          getApiData()
        }
      });
  }    
})()