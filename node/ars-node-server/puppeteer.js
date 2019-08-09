
const puppeteer = require('puppeteer');
(async () => {
  // 创建一个浏览器实例 Browser 对象
  const browser = await puppeteer.launch();
  // 通过浏览器实例 Browser 对象创建页面 Page 对象
  const page = await browser.newPage();

  
  // 通过url参数打开指定的页面
  await page.goto('https://example.com');

  console.log('browser1', browser.target())
  console.log('page1', page.target())

  // 对页面进行截图
  // await page.screenshot({path: 'example.png'});
  // 关闭浏览器
  await browser.close();

  // await page.close()

  console.log('browser2', browser.target() )
  console.log('page2', page.target() )

  

})();