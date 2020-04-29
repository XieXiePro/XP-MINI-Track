

export default {
  copy (text) { // 复制文本
    wx.setClipboardData({
      data: text,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(text, '复制成功！')
          }
        })
      }
    })
  },
  toast (text, duration) { // toast提示
    if(Object.prototype.toString.call(text) == '[object Object]') {
      text = JSON.stringify(text)
    }
    wx.showToast({
      icon: 'none',
      title: text.toString(),
      duration: duration?duration:2500
    })
  },
  toastSuccess (text) { // toast成功提示
    if(Object.prototype.toString.call(text) == '[object Object]') {
      text = JSON.stringify(text)
    }
    wx.showToast({
      icon: 'success',
      title: text.toString(),
      duration: 2500
    })
  },
  showLoading (text) { // 显示 ‘加载中’
    wx.showLoading({
      title: text?text:'加载中'
    })
  },
  hideLoading () { // 隐藏 ‘加载中’
    wx.hideLoading()
  },
  showModal (title, content) { // 显示 ‘确认/取消’ 弹窗
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title?title:'提示',
        content: content?content:'这是一个模态弹窗',
        confirmColor: "#ff491d",
        success (res) {
          if (res.confirm) {
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  },
  setPageTitle (title) { // 设置当前页面标题
    wx.setNavigationBarTitle({
      title: title?title:'当前页面标题'
    })
  },
  navigateTo (url) { // 页面跳转
    wx.navigateTo({ url: url })
  },
  compareVersion(v1, v2) {  // 版本比较
    // compareVersion('1.11.0', '1.9.9') // => 1    // 1 表示 1.11.0 比 1.9.9 要新
    // compareVersion('1.11.0', '1.11.0') // => 0   // 0 表示 1.11.0 和 1.9.9 是同一个版本
    // compareVersion('1.11.0', '1.99.0') // => -1  // -1 表示 1.11.0 比 1.99.0 要老
    v1 = v1.split('.')
    v2 = v2.split('.')
  
    let len = Math.max(v1.length, v2.length)
  
    while(v1.length < len) {
      v1.push('0')
    }
    while(v2.length < len) {
      v2.push('0')
    }
  
    for(let i = 0; i < len; i++) {
      let num1 = parseInt(v1[i])
      let num2 = parseInt(v2[i])
  
      if(num1 > num2) {
        return 1
      } else if(num1 < num2) {
        return -1
      }
    }
  
    return 0
  },
}