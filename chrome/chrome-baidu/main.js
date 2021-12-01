/*
读取Baidu中相关的信息
*/
function Baidu()
{
  window.onload = function(){
    // 修改按钮文案
    document.getElementById("su").value = "search";
    
    let contentList = [];
    var wrapperContentDoms = document.getElementById("hotsearch-content-wrapper") ? document.getElementById("hotsearch-content-wrapper").getElementsByClassName("hotsearch-item") : [];
    for (let index = 0; index < wrapperContentDoms.length; index++) {
      const element = wrapperContentDoms[index];
      let newsNumber = element.getElementsByClassName("title-content-index")[0] ?  element.getElementsByClassName("title-content-index")[0].innerText : ""
      let newsTitle = element.getElementsByClassName("title-content-title")[0] ? element.getElementsByClassName("title-content-title")[0].innerText : "";
      let newsTag = element.getElementsByClassName("title-content-mark")[0] ? element.getElementsByClassName("title-content-mark")[0].innerText : "";
      let newsHref = element.getElementsByClassName("c-link")[0] ? element.getElementsByClassName("c-link")[0].getAttribute("href") : "";
      contentList.push({
        newsNumber,
        newsTitle,
        newsTag,
        newsHref
      })
    }

    let dataJson = {
      name: "张三",
      age: 30,
      contentList
    }


    function ajaxGetDemo(){
      let startTime = new Date().getTime()    
      $.ajax({
          url: "http://127.0.0.1:7001/ajaxGet",
          method: "get",
          success: (res) => {
              let endTime = new Date().getTime()
              console.log("get success", res, endTime - startTime)
          },
          error: (err) => {
              console.log("get error", err)
          }
      })
    }

    function ajaxPostDemo(){
      let startTime = new Date().getTime()    
      $.ajax({
            url: "http://127.0.0.1:7001/ajaxPost",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(dataJson),
            success: (res) => {
                let endTime = new Date().getTime()
                console.log("post success", res, endTime - startTime)
            },
            error: (err) => {
                console.log("post error", err)
            }
        })
    }

    ajaxGetDemo();
    ajaxPostDemo();

    return this;
  }
}
var master=new Baidu();