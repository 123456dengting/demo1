// 复制 
function copyText (copyText) {
    if(document && typeof copyText === "string" && copyText ){
        var tag = document.createElement('textarea');
        var elementID = "cp_hgz_input";
        tag.setAttribute('id', elementID);
        tag.value = copyText;
        document.body.appendChild(tag);
        document.getElementById(elementID).select();
        document.execCommand('copy');
        document.getElementById(elementID).remove();
        messageHandle("复制成功")
    }
}

// toast弹窗
function messageHandle (text){
    var elementID = "message_chrome_toast";
    var tag = document.getElementById(elementID);
    if(!tag){
        tag = document.createElement('div');
        tag.setAttribute('id', elementID);
        tag.style.position = "fixed";
        tag.style.top = "20%";
        tag.style.left = "50%";
        tag.style.padding = "10px";
        tag.style.borderRadius = "4px";
        tag.style.color = "#FFF";
        tag.style.transform = "translateX(-50%)";
        tag.style.background = "rgba(21,17,17,0.7)";
        tag.innerText = text;
        document.body.appendChild(tag);
        setTimeout(() => {
          tag.style.display = "none";
        }, 1000)
    }else{
      tag.innerText = text;
      tag.style.display = "block";
      setTimeout(() => {
        tag.style.display = "none";
        }, 1000)
    }
}


// loading
function setLoading (isLoading){
    var elementID = "message_chrome_loading";
    var tag = document.getElementById(elementID);
    if(!tag){
        tag = document.createElement('div');
        tag.setAttribute('id', elementID);
        tag.style.position = "fixed";
        tag.style.top = "20%";
        tag.style.left = "50%";
        tag.style.padding = "10px";
        tag.style.borderRadius = "4px";
        tag.style.color = "#FFF";
        tag.style.transform = "translateX(-50%)";
        tag.style.background = "rgba(21,17,17,0.7)";
        tag.innerText = "加载中...";
        document.body.appendChild(tag);
        tag.style.display = "block";  
    }else{
        tag.style.display = isLoading ? "block" : "none";  
    }
   
}
