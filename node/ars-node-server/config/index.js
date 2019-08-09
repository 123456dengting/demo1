module.exports = {
  "TIMEOUT_RUN": 10000,
  "DATA_PATH": "../data/",
  "DATA_PATH_UTILS": "../data/data.json",
  "HEADLESS": false,
  "SPIDER": {
      "PER_TAB_COUNT": 3,
      "LOADOPTS": {
          "waitUntil": "domcontentloaded",
          "timeout": 360000
      },
      "HEADLESS": false,
      "UA": [
          "Mozilla/5.0 (Windows NT6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11",
          "Mozilla/5.0 (Windows; U; Windows NT6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.133 Safari/534.16",
          "Mozilla/5.0 (Windows NT6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36",
          "Mozilla/5.0 (Windows NT6.1; WOW64; Trident/7.0; rv: 11.0) like Gecko",
          "Mozilla/5.0 (Windows NT6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER",
          "Mozilla/5.0 (Windows NT6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/2.0 Safari/536.11"
      ],
      "TYPE_2_USERAGENT": {
          "PC": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3264.0 Safari/537.36",
          "iPad": "User-Agent,Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
          "mobile": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0_3 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A432 MicroMessenger/6.6.1 NetType/4G Language/en" 
      },
      "GOOGLE_URLS": [
          "https://www.google.com",
          "https://www.google.ca",
          "https://www.google.com.mx",
          "https://www.google.com.gt",
          "https://www.google.com.bz",
          "https://www.google.com.sv",
          "https://www.google.com.ni",
          "https://www.google.com.pa",
          "https://www.google.hn",
          "https://www.google.jp",
          "https://www.google.bs",
          "https://www.google.gl",
          "https://www.google.co.cr",
          "https://www.google.com.jm",
          "https://www.google.ht",
          "https://www.google.com.do",
          "https://www.google.com.pr",
          "https://www.google.co.vi",
          "https://www.google.vg",
          "https://www.google.com.ag",
          "https://www.google.ms",
          "https://www.google.dm",
          "https://www.google.com.vc",
          "https://www.google.tt",
          "https://www.google.com.ar",
          "https://www.google.com.br",
          "https://www.google.cl",
          "https://www.google.com.pe",
          "https://www.google.com.co",
          "https://www.google.co.ve",
          "https://www.google.com.ec",
          "https://www.google.com.bo",
          "https://www.google.com.py",
          "https://www.google.com.uy",
          "https://www.google.fi",
          "https://www.google.se",
          "https://www.google.no",
          "https://www.google.is",
          "https://www.google.dk"
      ],
      "COUNTRY_TO_GURL": {
          "美国": "https://www.google.com",
          "英国": "https://www.google.co.uk",
          "加拿大": "https://www.google.ca",
          "澳大利亚": "https://www.google.com.au",
          "法国": "https://www.google.fr",
          "德国": "https://www.google.de"
      },
      "PUBLIC_IP": "13.125.9.243:3128"

  }
}