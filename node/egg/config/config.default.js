/* eslint valid-jsdoc: "off" */

'use strict';

const { security } = require("./plugin");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597740358997_3651';

  // config.cluster = {
  //   listen: {
  //     port: 10060, // 全局的应用端口配置
  //   },
  // };

  // add your middleware config here 
  // 插件执行顺序是倒叙
  config.middleware = [ "addStatus", 'resadd',  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  //配置跨域
  config.cors = {
      origin: '*',//匹配规则  域名+端口  *则为全匹配
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  //post请求的死后不配置会报错告警 "missing csrf token",
  //请求失败配置不需要token, 项目初始阶段一般都没有token
  config.security = {
      csrf: {
        enable: false
      },
  }

  //axios请求插件配置
  config.http = {
    headers: {
      common: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
