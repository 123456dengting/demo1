

function fetchGet(url, callback){
    let el = document.createElement("script");
    el.type = "text/javascript";
    el.src = `${url}?callback=${callback}`;
    document.querySelector("head").appendChild(el);
}

fetchGet("http://localhost:8081/user", "showMessage");

function showMessage(data){
    console.log(1111111, data);
    //执行完把创建的标签删除
    let callbackName = arguments.callee.name;
    document.querySelector('script[src*="callback=' + callbackName + '"]').remove();
}









