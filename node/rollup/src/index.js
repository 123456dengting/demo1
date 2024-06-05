import bridgeCommon from "./lib.js";

const JsBridge = {
    getAppInfo: (params, callback) => {
        const name = "getAppInfo";
        bridgeCommon(name, params, (res) => {
            callback(res)
            
        })
    },
    getUserInfo: (params, callback) => {
        const name = "getUserInfo";
        bridgeCommon(name, params, (res) => {
            callback(res)
            
        })
    },
    getPosition: (params, callback) => {
        const name = "getPosition";
        bridgeCommon(name, params, (res) => {
            callback(res)
        })
    }
}

export default JsBridge;