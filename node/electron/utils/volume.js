const loudness = require('loudness')

// 设置音量为特定值
function setVol(vol = 20) {
  loudness.setVolume(vol)
}
// 获取当前音量
function getVol() {
  return loudness.getVolume()
}

async function setmuted(bol = true) {
  if (bol) {
    //   取消静音
    await loudness.setMuted(false)
    return false
  } else {
    //   静音
    await loudness.setMuted(true)
    return true
  }
}


module.exports = {
  setVol,
  getVol,
  setmuted

}
