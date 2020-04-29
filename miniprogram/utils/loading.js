import TIPS from './tips'
import ASSERT from './assert'

class Loading {
  constructor() {
    this.config = {
      title: TIPS.loading,
      mask: true,
      success: '',  // function
      fail: '',  // function
      complete: () => { },  // function
    }
  }

  mixin(userConfig) {
    if (ASSERT(userConfig, 'string')) {
      userConfig = { title: userConfig }
    }
    return Object.assign({}, this.config, userConfig)
  }

  open(config) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        ...config,
        success() {
          if (ASSERT(config.success, 'function')) {
            config.success()
          } else {
            resolve()
          }
        },
        fail() {
          if (ASSERT(config.fail, 'function')) {
            config.fail()
          } else {
            reject()
          }
        }
      })
    })
  }

  show(config) {
    return this.open(this.mixin(config))
  }

  hide() {
    wx.hideLoading()
  }
}

const instance = new Loading()

export default instance