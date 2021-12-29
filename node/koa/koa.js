const Koa = require('koa');
const cros = require('koa-cors')
const app = new Koa();

// logger
app.use(cros())
app.use(async (ctx, next) => {
  let data = await  parseData(ctx)
  console.log('data', data)
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async ctx => {
  ctx.body = 'Hello World3';
});


app.listen(3000);


function parseData(ctx) {
  return new Promise((resolve, reject) => {
      try {
          let str = ''
          ctx.req.on('data', (data) => {
              str += data
          })
          ctx.req.addListener('end', () => {
              resolve(parseUrl(str))
          })
      } catch (err) {
          reject(err)
      }
  });
}

function parseUrl(url) {
  let obj = {}
  let arr = url.split('&')
  arr.forEach((e, i) => {
      let temparr = e.split('=')
      obj[temparr[0]] = temparr[1]
  });
  return obj
}
