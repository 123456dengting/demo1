'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/text', controller.home.text);
  router.get('/ajaxGet', 'home.ajaxGet');
  router.post('/ajaxPost', controller.home.ajaxPost)
  router.post('/getInfo', controller.home.getInfo)

};
