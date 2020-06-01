

let _private = {
  hasOwnProperty: Object.prototype.hasOwnProperty         // 判断一个属性是定义在对象本身而不是继承自原型链
}

class I {
  constructor(item) {
    this.text = item.text || ''
    this.value = item.value || 0
  }
  // 获取value
  valueOf() {
    return this.value
  };
  // 获取text
  getText() {
    return this.text
  };
}

class Enums {
  constructor(items) {
    // 将传入的items赋值为函数的静态类
    Object.keys(items).forEach((key) => {

      // 判断一个属性是定义在对象本身而不是继承自原型链，意思就是循环该对象上本身的属性，而不是继承的属性
      if (_private.hasOwnProperty.call(items, key)) {
        // 该赋值操作会触发下面的get(),和set();
        // 并制定该属性的原型来自I，继承来自I的value of, toSting方法。
        this[key] = new I(items[key])
      }
    })

    // 该赋值操作会触发下面的get items(),和set items();
    this.items = items
  };

  get(partten, mismatch = { text: '', value: -1, alias: {} }) {
    let num
    let buffer

    // 优先匹配枚举值
    if (typeof partten === 'number') {
      num = partten
    } else {
      buffer = parseInt(partten)

      if (!isNaN(buffer)) {
        num = buffer
      }
    }

    if (!isNaN(num)) {
      // 按枚举值查找
      let items = this.items
      // 使用全等匹配查找
      buffer = items.filter(function (item) { return parseInt(item.value) === num })
      return buffer && buffer.length > 0 ? buffer[0] : mismatch
    } else {
      // 按枚举名称查找
      if (hasOwnProperty.call(this, partten)) {
        return this[partten]
      }
      return mismatch
    }
  };

  set(name, value, text) {
    if (_private.hasOwnProperty.call(this, name)) {
      value && (this[name].value = value)
      text && (this[name].text = text)
    }
  };

  get items() {
    return this._items
  }

  set items(items) {
    this._items = []
    Object.keys(items).forEach((key) => {
      _private.hasOwnProperty.call(this, key) && this._items.push(this[key])
    })
  }
}

// 是否APP
const EnumIsApp = new Enums({
  A: {
    text: '所有',
    value: -1
  },
  Y: {
    text: '是',
    value: 1
  }, 
  N: {
    text: '否',
    value: 2
  }
})

//FaceBook广告格式
const EnumFBType = new Enums({
  A: {
    value: -1,
    text: '所有'
  },
  B: {
    value: 'PE',
    text: '主页贴广告'
  },
  C: {
    value: 'PA',
    text: '幻灯片广告'
  },
  D: {
    value: 'VIDEO',
    text: '单视频广告'
  },
  E: {
    value: 'MPA',
    text: '轮播广告'
  },
  F: {
    value: 'PL',
    text: '单图片广告'
  },
  G: {
    value: 'unknown',
    text: '未知'
  }
})

const FBType = {
  all: '所有',
  PE: '主页贴广告',
  PA: '幻灯片广告',
  VIDEO: '单视频广告',
  MPA: '轮播广告',
  PL: '单图片广告',
  DPA: '动态产品广告',
  unknown: '未知',
}

//谷歌广告格式
const EnumGGType = new Enums({
  A: {
    value: -1,
    text: '所有'
  },
  B: {
    value: 'DISPLAY',
    text: '展示广告'
  },
  C: {
    value: 'SEARCH',
    text: '搜索广告'
  },
  D: {
    value: 'SHOPPING',
    text: '购物广告'
  },
  E: {
    value: 'unknown',
    text: '未知'
  }
})

const GGType = {
  all: '所有',
  DISPLAY: '展示广告',
  SEARCH: '搜索广告',
  SHOPPING: '购物广告',
  unknown: '未知',
}

//与名词
const EnumDomainWord = new Enums({
  A: {
    text: '所有',
    value: -1
  },
  Y: {
    text: '域名',
    value: 1
  }, 
  N: {
    text: '非域名',
    value: 2
  }
})


//状态
const EnumStatus = new Enums({
  N: {
    text: '所有',
    value: -1
  },
  ACTIVE: {
    text: 'ACTIVE',
    value: 1
  }, 
  INACTIVE: {
    text: 'INACTIVE ',
    value: 2
  }
})

const EnumBudgetType = new Enums({
  Y: {
    text: '将预算提高',
    value: 1
  }, 
  N: {
    text: '将预算减少',
    value: 2
  }
})

//广告查询, 趋势图类型
const EnumTableType = new Enums({
  campaignStatus: {
    text: 'campaignStatus',
    value: 1,
    idType: 'campaignId'
  }, 
  adsetStatus: {
    text: 'adsetStatus',
    value: 2,
    idType: 'adsetId'
  },
  adsStatus: {
    text: 'adsStatus',
    value: 4,
    idType: 'adsId'
  }
})

//排序
const EnumSortType = new Enums({
  up: {
    text: '升序',
    value: 1,
  }, 
  down: {
    text: '降序',
    value: 2,
  },
})

//轮询结果
const EnumRepeatCode = new Enums({
  success: {
    text: '成功',
    value: 20,
  }, 
  failture: {
    text: '失败',
    value: 30,
  },
})

//渠道枚举(只用于判断)
const EnumMedia = new Enums({
  FB: {
    text: 'FaceBook',
    value: 0,
  }, 
  GG: {
    text: 'Google',
    value: 10,
  }, 
  SC: {
    text: 'Snapchat',
    value: 70,
  }, 
})

//冻结列
const EnumFiexdColumns = new Enums({
  A: {
    text: '无冻结列',
    value: 0,
  }, 
  B: {
    text: '前面1列',
    value: 1,
  }, 
  C: {
    text: '前面2列',
    value: 2,
  }, 
  D: {
    text: '前面3列',
    value: 3,
  }, 
  E: {
    text: '前面4列',
    value: 4,
  }, 
  F: {
    text: '前面5列',
    value: 5,
  }, 
  G: {
    text: '前面6列',
    value: 6,
  }, 
})

//
//性别
const EnumSex = new Enums({
  All: {
    text: 'All',
    value: 0,
  }, 
  Male: {
    text: 'Male',
    value: 1,
  }, 
  Female: {
    text: 'Female',
    value: 2,
  }, 
})


//设备终端
const EnumDevice = new Enums({
  mobile: {
    text: '移动设备',
    value: 1,
  }, 
  desktop: {
    text: '桌面设备',
    value: 1,
  }, 
})

//移动设备
const EnumOsType = new Enums({
  ANDROID: {
    text: '安卓',
    value: 1,
  }, 
  iOS: {
    text: '苹果',
    value: 1,
  }, 
})

export {
  EnumIsApp, // 是否APP
  EnumFBType, //FaceBook广告格式
  FBType,
  GGType,
  EnumGGType, //谷歌广告格式
  EnumDomainWord, //与名词
  EnumStatus,   //状态
  EnumBudgetType,   //修改预算类型
  EnumTableType,    //广告查询, 趋势图类型
  EnumSortType,     //排序枚举
  EnumRepeatCode,     //修改成功/失败
  EnumMedia,  
  EnumFiexdColumns,
  EnumSex,      //受众性别
  EnumDevice,
  EnumOsType,
  
}