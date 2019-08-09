const data = [
  {
    "sd": ` // 取下述字段, 用 ^ 分割   
      PageView^     // 事件名称    
      ^             // 货币类型
      ^             // 产品价格
      ^             // 'product' | ''
      ^             // 产品SKU
      ^             // 产品数量
      ^             // 产品类目
      1560225886^   // 时间戳
      XA-1000040-1^ // 流量自定义网站ID
      https://hk.zaful.com/^    // 着落页          =>${sourceUrl}
      ^                         // 来源 referrer   ${externalReferrer} || ${documentReferrer} 有问题
      1920^                     // 屏幕宽度        => ${screenWidth}
      1080^                     // 屏幕高度        =>${screenHeight} 
      f5c8df037ec0b3e1995a10f1b6898266^   // aid  => ${aid(AKAM_CLIENTID)}  aid=CLIENT_ID(cid-scope-cookie-fallback-name）
      Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36^  // userAgent => ${userAgent}
      GA1.2.1340046946.1541816647^  // cookie _ga 字段
      ^                             // cookie sessionId
      ^                             // cookie linkid
      ^                             // cookie _gid
      ^                             // cookie userId
      f5c8df037ec0b3e1995a10f1b6898266_1560225886^  // 前端生成 guid
      ^                                             // orderId 订单号
      f5c8df037ec0b3e1995a10f1b689826615602258861941560225886^  // 前端生成事件ID eventid
      ZAFUL Hong Kong: 網購時尚潮流女裝^  // 网站title  => ${title}
      ^                                 // 支付方式 payway
      ^                                 // 参数是否异常 paramOk
      zh-tw`,                           // 网站输出语言字段  => ${browserLanguage}
    "st": 0,  // 当前时间与所取数据的时间差 => ${totalTime}
    "ct": 1560225886  // 当前时间 => ${timestamp}
  }
]

