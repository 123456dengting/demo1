// main.js
 
const { app, BrowserWindow } = require('electron')
const volume = require("./utils/volume")
 
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  // 创建浏览器窗口。
  const mainWindow = new BrowserWindow({
    backgroundColor: '#fff',
    width: 1200,
    height: 800,
  })
  console.log("111111", volume.setVol(60))
  
  // 加载 index.html
  mainWindow.loadFile('index.html')
})