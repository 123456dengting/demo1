(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.JsBridge = factory());
})(this, (function () { 'use strict';

    const bridgeCommon = function(name, params, callback){
        // 避免全局的回调方法重名就行
        const key = name + '__' + new Date().getTime();
        window[key] = function(data){
                console.log("111111-key", key, data);
                callback(data);
                window[key] = undefined;
                delete window[key];
        };
        if(window.gtjt_jsbridge){
            window.gtjt_jsbridge(key, params);
        }else {
            console.log("请在指定webView执行该方法", key);
        }
        
    };

    const JsBridge = {
        getAppInfo: (params, callback) => {
            const name = "getAppInfo";
            bridgeCommon(name, params, (res) => {
                callback(res);
                
            });
        },
        getPosition: (params, callback) => {
            const name = "getPosition";
            bridgeCommon(name, params, (res) => {
                callback(res);
            });
        }
    };

    return JsBridge;

}));
