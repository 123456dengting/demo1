//express_demo.js 文件
var { postCallBack, getCallBack } = require('./reqFn')
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//post 请求参数放到req.body里面
app.use(bodyParser.urlencoded({ extended: false }))

//跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.get('/user', function (req, res) {
  let a = postCallBack()
  res.send(a)
})


app.post('/user', function (req, res) {
  console.log('req', req.body)
  url.parse(req.url).pathname
  res.send({ name: 'aaa', age: 18111 });
})

let reqNum = 0

app.get('/api/cashloan/getRetainCoupon', function (req, res) {
  reqNum++;
  console.log("reqNum:", reqNum)
  let response =
  {
    "success": true,
    "sysTime": 1578402410247,
    "data": {
      "needPopup": true,
      "retainCouponType": {
        "title": "Hoki Anda bagus banget! Anda mendapatkan voucher bebas biaya admin pinjaman, hanya berlaku hari ini",
        "subTitle": "(Sudah terkirim ke akun Anda)",
        "popupType": 2
      },
      "availableCoupons": [
        {
          "couponTemplateId": 10008,
          "name": "授信7+天未借款免服务费券",
          "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
          "discount": "Diskon100%",
          "type": 3,
          "timeParams": {
            "relative": true,
            "relativeDays": 1
          },
        },
        {
          "couponTemplateId": 10008,
          "name": "授信7+天未借款免服务费券",
          "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
          "discount": "Diskon100%",
          "type": 3,
          "timeParams": {
            "relative": true,
            "relativeDays": 1
          },
        },
        {
          "couponTemplateId": 10008,
          "name": "授信7+天未借款免服务费券",
          "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
          "discount": "Diskon100%",
          "type": 3,
          "timeParams": {
            "relative": true,
            "relativeDays": 1
          },
        }
      ],
      "coupons": [
        {
          "couponTemplateId": 10008,
          "name": "授信7+天未借款免服务费券",
          "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
          "discount": "Diskon100%",
          "type": 3,
          "timeParams": {
            "relative": true,
            "relativeDays": 1
          },
        },
        // {
        //   "couponTemplateId": 10008,
        //   "name": "授信7+天未借款免服务费券",
        //   "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
        //   "discount": "Diskon100%",
        //   "type": 3,
        //   "timeParams": {
        //     "relative": true,
        //     "relativeDays": 1
        //   },
        // },
        // {
        //   "couponTemplateId": 10008,
        //   "name": "授信7+天未借款免服务费券",
        //   "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
        //   "discount": "Diskon100%",
        //   "type": 3,
        //   "timeParams": {
        //     "relative": true,
        //     "relativeDays": 1
        //   },
        // }
      ]
    }
  }

  res.send(response)

})

app.get('/api/coupon/business/receive/list', function (req, res) {
  console.log("receive/list:")
  let response = {
    "success": true,
    "sysTime": 1579061160963,
    "data": [
      {
        "couponTemplateId": 10001,
        "name": "Pinjaman tanpa bunga, terbatas!",
        "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
        "discount": "Diskon100%",
        "type": 3,
        "timeParams": {
          "relative": true,
          "relativeDays": 3
        }
      },
      // {
      //   "couponTemplateId": 10014,
      //   "name": "Diskon bunga 40% khusus pinjaman",
      //   "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 40, \"moreDesc\": [\"Bunga: Diskon 40%\"]}",
      //   "discount": "Diskon40%",
      //   "type": 3,
      //   "timeParams": {
      //     "relative": true,
      //     "relativeDays": 3
      //   }
      // },
      // {
      //   "couponTemplateId": 10013,
      //   "name": "Diskon bunga 30% khusus pinjaman",
      //   "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 30, \"moreDesc\": [\"Bunga: Diskon 30%\"]}",
      //   "discount": "Diskon30%",
      //   "type": 3,
      //   "timeParams": {
      //     "relative": true,
      //     "relativeDays": 3
      //   }
      // },
      // {
      //   "couponTemplateId": 10015,
      //   "name": "Diskon bunga 80% khusus pinjaman",
      //   "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 80, \"moreDesc\": [\"Bunga: Diskon 80%\"]}",
      //   "discount": "Diskon80%",
      //   "type": 3,
      //   "timeParams": {
      //     "relative": true,
      //     "relativeDays": 3
      //   }
      // }
    ]
  }


  res.send(response)


})

app.get('/api/coupon/business/use/list', function (req, res) {
  console.log("use/list:")
  let response =
  {
    "success": true,
    "sysTime": 1579085926209,
    "data": {
      "availableCoupons": [
        {
          "couponId": "60327673305505792",
          "couponTemplateId": "10009",
          "name": "Pinjaman tanpa bunga, terbatas!",
          "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
          "discount": "Diskon100%",
          "type": 3,
          "beginTime": 1579000838150,
          "endTime": 1579087238150,
          "bestCoupon": true
        },
        {
          "couponId": "60327673305505793",
          "couponTemplateId": "10009",
          "name": "Pinjaman tanpa bunga, terbatas!",
          "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
          "discount": "Diskon100%",
          "type": 3,
          "beginTime": 1579000838150,
          "endTime": 1579087238150,
          "bestCoupon": true
        },
        // {
        //   "couponId": "60327673305505793",
        //   "couponTemplateId": "10009",
        //   "name": "Pinjaman tanpa bunga, terbatas!",
        //   "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
        //   "discount": "Diskon100%",
        //   "type": 3,
        //   "beginTime": 1579000838150,
        //   "endTime": 1579087238150,
        //   "bestCoupon": true
        // },
        // {
        //   "couponId": "60327673305505793",
        //   "couponTemplateId": "10009",
        //   "name": "Pinjaman tanpa bunga, terbatas!",
        //   "description": "{\"desc\": \"Syarat pinjam:Rp300.000-Rp3.000.000\", \"discount\": 100, \"moreDesc\": [\"Bunga: Diskon 100%\"]}",
        //   "discount": "Diskon100%",
        //   "type": 3,
        //   "beginTime": 1579000838150,
        //   "endTime": 1579087238150,
        //   "bestCoupon": true
        // }
      ],
      "unavailableCoupons": []
    }
  }


  res.send(response)


})


app.post('/api/base/public/phone/captcha', function (req, res) {
  console.log("reqNum: HnSoBQ8IGfuiRkEwT5y1eW12ohk=", reqNum)
  let response =
  {
    "success": false,
    "sysTime": 1578301931347,
    "data": {
      "countryId": 1,
      "phoneNumber": "0811331011",
      "type": 100,
      "captcha": "88328",
      "createTime": 1578301931185,
      "expireTime": 1578302531185
    }
  }
  response.data = undefined;
  res.send(response)
})

app.get('/api/cashloan/loan/public/type', function (req, res) {
  console.log("typesss")
  res.send(typeData)
})


app.get('/api/cashloan/check-status', function (req, res) {
  console.log("typesss")
  res.send(checkStatus)
})





var server = app.listen(8081, function () {

  var host = server.address()

  console.log('host', host)


  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

const checkStatus = {
  "success": true,
  "sysTime": 1578636224805,
  "data": {
    "bankAccountStatus": 10,
    "creditStatus": 10,
    "orderStatus": 10,
    "billStatus": 10,
    "partialRejectInfo": [],
    "newsList": [{ "id": 388, "type": 100, "subType": 100004 }]
  }
}


const typeData = {
  "success": true,
  "sysTime": 1578625182691,
  "data": {
    "uid": 37142798440337408,
    "available": 0,
    "reasonCode": "RA.101",
    "options": [
      {
        "principal": 900000,
        "details": [
          {
            "loanPeriod": 15,
            "disbursementDate": "2020-01-10",
            "repaymentDate": "2020-01-25",
            "disbursementAmount": 900000,
            "interest": 27000,
            "serviceFee": 81000,
            "totalRepayment": 1008000,
            "preFeeDesc": "Jumah diterima sama dengan jumlah pokok pinjaman.",
            "preServiceFee": {},
            "postServiceFee": {
              "provisionFee": 81000,
              "interest": 27000
            }
          },
          {
            "loanPeriod": 22,
            "disbursementDate": "2020-01-10",
            "repaymentDate": "2020-02-01",
            "disbursementAmount": 900000,
            "interest": 39000,
            "serviceFee": 118000,
            "totalRepayment": 1057000,
            "preFeeDesc": "Jumah diterima sama dengan jumlah pokok pinjaman.",
            "preServiceFee": {},
            "postServiceFee": {
              "provisionFee": 118000,
              "interest": 39000
            }
          }
        ]
      },
      {
        "principal": 800000,
        "details": [
          {
            "loanPeriod": 15,
            "disbursementDate": "2020-01-10",
            "repaymentDate": "2020-01-25",
            "disbursementAmount": 800000,
            "interest": 24000,
            "serviceFee": 72000,
            "totalRepayment": 896000,
            "preFeeDesc": "Jumah diterima sama dengan jumlah pokok pinjaman.",
            "preServiceFee": {},
            "postServiceFee": {
              "provisionFee": 72000,
              "interest": 24000
            }
          },
          {
            "loanPeriod": 22,
            "disbursementDate": "2020-01-10",
            "repaymentDate": "2020-02-01",
            "disbursementAmount": 800000,
            "interest": 35000,
            "serviceFee": 105000,
            "totalRepayment": 940000,
            "preFeeDesc": "Jumah diterima sama dengan jumlah pokok pinjaman.",
            "preServiceFee": {},
            "postServiceFee": {
              "provisionFee": 105000,
              "interest": 35000
            }
          }
        ]
      },
      {
        "principal": 600000,
        "details": [
          {
            "loanPeriod": 15,
            "disbursementDate": "2020-01-10",
            "repaymentDate": "2020-01-25",
            "disbursementAmount": 600000,
            "interest": 18000,
            "serviceFee": 54000,
            "totalRepayment": 672000,
            "preFeeDesc": "Jumah diterima sama dengan jumlah pokok pinjaman.",
            "preServiceFee": {},
            "postServiceFee": {
              "provisionFee": 54000,
              "interest": 18000
            }
          },
          {
            "loanPeriod": 22,
            "disbursementDate": "2020-01-10",
            "repaymentDate": "2020-02-01",
            "disbursementAmount": 600000,
            "interest": 26000,
            "serviceFee": 79000,
            "totalRepayment": 705000,
            "preFeeDesc": "Jumah diterima sama dengan jumlah pokok pinjaman.",
            "preServiceFee": {},
            "postServiceFee": {
              "provisionFee": 79000,
              "interest": 26000
            }
          }
        ]
      },
      {
        "principal": 500000,
        "details": [
          {
            "loanPeriod": 15,
            "disbursementDate": "2020-01-10",
            "repaymentDate": "2020-01-25",
            "disbursementAmount": 500000,
            "interest": 15000,
            "serviceFee": 45000,
            "totalRepayment": 560000,
            "preFeeDesc": "Jumah diterima sama dengan jumlah pokok pinjaman.",
            "preServiceFee": {},
            "postServiceFee": {
              "provisionFee": 45000,
              "interest": 15000
            }
          },
          {
            "loanPeriod": 22,
            "disbursementDate": "2020-01-10",
            "repaymentDate": "2020-02-01",
            "disbursementAmount": 500000,
            "interest": 22000,
            "serviceFee": 66000,
            "totalRepayment": 588000,
            "preFeeDesc": "Jumah diterima sama dengan jumlah pokok pinjaman.",
            "preServiceFee": {},
            "postServiceFee": {
              "provisionFee": 66000,
              "interest": 22000
            }
          }
        ]
      }
    ],
    "purposes": [
      {
        "id": 100101000000001,
        "name": "Konsumtif",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Konsumtif",
        "sort": 1,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000002,
        "name": "Pertanian, Perburuan dan Kehutanan",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Pertanian, Perburuan dan Kehutanan",
        "sort": 2,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000003,
        "name": "Perikanan",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Perikanan",
        "sort": 3,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000004,
        "name": "Pertambangan dan Penggalian",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Pertambangan dan Penggalian",
        "sort": 4,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000005,
        "name": "Industri Pengolahan",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Industri Pengolahan",
        "sort": 5,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000006,
        "name": "Listrik, Gas, dan Air",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Listrik, Gas, dan Air",
        "sort": 6,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000007,
        "name": "Konstruksi",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Konstruksi",
        "sort": 7,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000008,
        "name": "Perdagangan Besar dan Eceran",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Perdagangan Besar dan Eceran",
        "sort": 8,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000009,
        "name": "Pertambangan dan PenggalianPenyediaan Akomodasi dan Penyediaan Makan Minum",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Pertambangan dan PenggalianPenyediaan Akomodasi dan Penyediaan Makan Minum",
        "sort": 9,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000010,
        "name": "Transportasi, Pergudangan, dan Komunikasi",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Transportasi, Pergudangan, dan Komunikasi",
        "sort": 10,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000011,
        "name": "Perantara Keuangan",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Perantara Keuangan",
        "sort": 11,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000012,
        "name": "Real Estate, Usaha Persewaan, dan Jasa Perusahaan",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Real Estate, Usaha Persewaan, dan Jasa Perusahaan",
        "sort": 12,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000013,
        "name": "Administrasi Pemerintahan, Pertahanan, dan Jaminan Sosial Wajib",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Administrasi Pemerintahan, Pertahanan, dan Jaminan Sosial Wajib",
        "sort": 13,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000014,
        "name": "Jasa Pendidikan",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Jasa Pendidikan",
        "sort": 14,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000015,
        "name": "Jasa Kesehatan dan Kegiatan Sosial",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Jasa Kesehatan dan Kegiatan Sosial",
        "sort": 15,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000016,
        "name": "Kegiatan Organisasi Yang Tidak Diklasifikasi Ditempat Lain",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Kegiatan Organisasi Yang Tidak Diklasifikasi Ditempat Lain",
        "sort": 16,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000017,
        "name": "Jasa Perorangan yang Melayani Rumah Tangga",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Jasa Perorangan yang Melayani Rumah Tangga",
        "sort": 17,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000018,
        "name": "Badan Internasional dan Badan Ekstra Internasional Lainnya",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Badan Internasional dan Badan Ekstra Internasional Lainnya",
        "sort": 18,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000019,
        "name": "Kegiatan yang Belum Jelas Batasannya",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Kegiatan yang Belum Jelas Batasannya",
        "sort": 19,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000020,
        "name": "Sektor Ekonomi Bukan Lapangan Usaha",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Sektor Ekonomi Bukan Lapangan Usaha",
        "sort": 20,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000021,
        "name": "Rumah Tangga",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Rumah Tangga",
        "sort": 21,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      },
      {
        "id": 100101000000022,
        "name": "Bukan Lapangan Usaha Lainnya",
        "channelId": 1,
        "productId": 10,
        "countryId": 1,
        "value": "Bukan Lapangan Usaha Lainnya",
        "sort": 22,
        "status": 1,
        "createTime": 1574417750246,
        "updateTime": 1574417750246
      }
    ],
    "lastLoanPurpose": "100101000000002"
  }
}