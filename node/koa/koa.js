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

let reqNum = 0;
app.get('/api/cashloan/getRetainCoupon', function (req, res) {
  reqNum++;

  console.log("reqNum:", reqNum)
  let response = 	
  {
   "success": true,
   "sysTime": 1577415310199,
   "data": {
   "needPopup": true,
   "retainCouponType": {
   "title": "Anda memiliki voucher khusus yang belum digunakan, yakin untuk keluar?",
   "subTitle": "(Sudah terkirim ke akun Anda)",
   "popupType": 2
   },
   "availableCoupons": [{
   "couponTemplateId": 10001,
   "name": "Pinjaman tanpa bunga, terbatas!",
   "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
   "discount": "Diskon100%",
   "type": 3,
   "timeParams": {
   "relative": true,
   "relativeDays": 3
   }
   }]
   }
  }
  res.send(response)
})

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
