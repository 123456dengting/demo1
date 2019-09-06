/**
 * Created by wangdawei on 2017/6/2.
 */
var util = require('util');
var path = require('path');
var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var routes = require('./routes');
var config = require('./config/default.js');
var toolkit = require('./config/toolkit.js');
var pkg = require('./package');
var winston = require('winston');
var expressWinston = require('express-winston');
var AWSReboot = require('./modules/reboot.js').AWSReboot;

var app = express();

// flash 中间件，用来显示通知
app.use(flash());

// 设置模板全局常量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

// 正常请求的日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));

app.use(function (req, res, next) {
    var reqIp = toolkit.reqIP(req);
    next();
});

// 路由
routes(app);

//定期检测待重启的AWS
AWSReboot.start();

// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));

// 监听端口，启动程序
app.listen(config.port, function () {
    console.log(util.format('%s listening on port %s', pkg.name, config.port));
});