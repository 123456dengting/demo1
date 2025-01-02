## 生成插件步骤

1. npm install -g yo generator-code | yarn global add yo generator-code
2. yo code  
-1. 选择New Code Snippets
-2. 导入文件，可以不输入
-3. 扩展名称
-4. 扩展身份可以和扩真名称一样
-5. 扩展描述
-6. Language id: javascript
-7. initialize a repository?(Y/n): n

3. 补充完善自己的 .code-snippets文件
4. 测试 在vscode的debug菜单下，点击运行按钮，弹出一个名为扩展开发主机的窗口，这个窗口就是包含这个插件的临时调试窗口。

## 打包
1.  npm install -g vsce  |  yarn global add vsce
2.  切到项目目录下执行 vsce package 打包成功生成 .vsix文件