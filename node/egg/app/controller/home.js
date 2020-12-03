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
      id: 111 ,
      method: "get",
      name: ctx.query.name,
    };
    // ctx.status = 200;
  }

  async ajaxPost() {
    const { ctx } = this;
    ctx.body = { 
      id: 222 ,
      method: "post"
    };
    // ctx.status = 200;
  }


  async getInfo() {
    const { ctx } = this;
    const result = await ctx.service.getData.getUserInfo();
    let id = ctx.request.body.id
    ctx.body = {
      ...result,
      id
    }
    this.ctx.logger.info('getUserInfo', id);
    // ctx.status = 200;
  }
}

module.exports = HomeController;
