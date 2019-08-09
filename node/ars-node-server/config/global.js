const global = {
    "postResultCOnfig": {
      "url": 'http://10.40.6.82',
      "port": "8091"
    },
    "getIpConfig": {
      "url": "http://10.40.2.173",
      "port": "8903"
    },
    "defaultIpTimeout": 4 * 60 * 60000,
    "defaultIntervalHours": 24,
    "closeChromeTime": 4 * 3600000,
    "COUNTRY_TO_GURL": {
        "美国": "https://www.google.com",
        "英国": "https://www.google.co.uk",
        "加拿大": "https://www.google.ca",
        "澳大利亚": "https://www.google.com.au",
        "法国": "https://www.google.fr",
        "德国": "https://www.google.de"
    },
    "UA": {
        "PC": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3264.0 Safari/537.36",
        "iPad": "User-Agent,Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
        "mobile": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0_3 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A432 MicroMessenger/6.6.1 NetType/4G Language/en"
    },
    "SPIDER": {
      "LOADOPTS": {
        "waitUntil": "domcontentloaded",
        "timeout": 360000
    },
    },
    "DATA_PATH_UTILS": "../data/data.json",
    
}

module.exports = global;