const bridgeCommon = function(name, params, callback){
    // 避免全局的回调方法重名就行
    const key = name + '__' + new Date().getTime();
    window[key] = function(data){
            console.log("111111-key", key, data);
            callback(data);
            window[key] = undefined;
            delete window[key];
    }
    if(window.gtjt_jsbridge){
        window.gtjt_jsbridge(key, params)
    }else{
        console.log("请在指定webView执行该方法", key)
    }
    
}

export default  bridgeCommon;