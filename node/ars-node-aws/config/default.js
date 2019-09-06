/**
 * Created by wangdawei on 2017/6/2.
 */
var moment = require('moment');

module.exports = {
    port: 5021,
    session: {
        secret: 'aws',
        key: 'aws',
        maxAge: 2592000000
    },
    url: 'http://api.track.gw-ec.com:8889/functions.aspx',
    rt: {
        status: 200,
        msg: "success",
        date: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    },
    ap: function () {
        return {
            DryRun: false,
            InstanceIds: []
        };
    }
};