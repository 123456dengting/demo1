'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async text() {
    const { ctx } = this;
    ctx.body = '用户名: AAA';
  }

  async ajaxGet() {
    const { ctx } = this;
    ctx.body = {
      id: 111,
      method: 'get',
      name: ctx.query.name,
    };
    const aa = {
      "appVersion": "4.4.1",
      "description": "web-离线包测试",
      "isDisabled": "true",
      "isMandatory": "true",
      "rollout": "1",
    };
    // ctx.status = 200;
  }

  async ajaxPost() {
    const { ctx } = this;
    ctx.body = {
      id: 222,
      method: 'post',
    };
    // ctx.status = 200;
  }


  async getInfo() {
    const { ctx } = this;
    const result = await ctx.service.getData.getUserInfo();
    const id = ctx.request.body.id;
    ctx.body = {
      ...result,
      id,
    };
    this.ctx.logger.info('getUserInfo', id);
    // ctx.status = 200;
  }
}

module.exports = HomeController;
