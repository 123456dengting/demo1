1.  在电脑建立一个空文件夹
2.  vscode打开改目录
3.  安装node npm/cnpm  (自行安装) 
4.  $ npm -g install typescript
5.  $ tsc -v 可以看到安装的版本
6.  npm  init创建项目           ===> 自动生成package.json文件
7.  tsc --init构建tsc配置文件           ===> 自动生成tsconfig.js文件
8.  ctrl+shift+p 弹出的输入框中执行    configure task 再选择  tsc: 构建tsconfig.json            ===>    项目的根目录自动生成  ".vscode/tasks.json"
9.  只要修改了tsconifg文件,都需要重新执行  ctrl+shift+p  configure task 再选择  tsc: 构建tsconfig.json      
10.  新建一个.ts文件 ctrl+shift+b    再选择  tsc: 构建tsconfig.json  会把目录下.ts文件自动生成.js文件 
11. 这时候会发现用let 生成的变量 变成的 var 需要在 tsconfig.json 中把 "target": "ES2017"  重新执行 ctrl+shift+p  configure task 再选择  tsc: 构建tsconfig.json      