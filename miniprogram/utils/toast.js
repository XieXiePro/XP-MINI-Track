import ASSERT from './assert'
class Toast {
  constructor() {
    this.config = {
      title: '提示',
      mask: true,
      duration: 1500,
      icon: 'none',
      success: () => {},
      fail: () => {},
      complete: () => {}
    }
  }

  mixin(userConfig, defaultConfig) {
    if (ASSERT(userConfig, 'string') || ASSERT(userConfig, 'number')) {
      defaultConfig.title = userConfig
    } else if (userConfig && ASSERT(userConfig, 'object')) {
      defaultConfig = Object.assign({}, defaultConfig, userConfig)
    }
    return Object.assign({}, this.config, defaultConfig)
  }

  open(config) {
    return new Promise((resolve, reject) => {
      wx.showToast({
        ...config,
        success() {
          config.success()
          setTimeout(resolve, config.duration) // 调用成功，并且tost关闭后返回resolve
        },
        fail() {
          config.fail()
          reject()
        }
      })
    })
  }

  success(config) {
    let warningConfig = {
      title: '成功',
      icon: 'none'
    }
    return this.open(this.mixin(config, warningConfig))
  }

  warning(config) {
    let warningConfig = {
      title: '警告',
      icon: 'none'
    }
    return this.open(this.mixin(config, warningConfig))
  }

  error(config) {
    return this.warning(config)
  }

  timeout(status, config) {
    // 这里固定为 300 毫秒
    const sleep = 300
    if (ASSERT(config, 'string')) {
      config = {
        title: config
      }
    } else if (!ASSERT(config, 'object')) {
      config = {}
    }
    setTimeout(() => {
      this[status]({
        duration: this.config.duration - sleep,
        ...config
      })
    }, sleep)
  }

  hide() {
    wx.hideToast()
  }
}

const instance = new Toast()
instance.__proto__.success.timeout = instance.timeout.bind(instance, 'success')
instance.__proto__.warning.timeout = instance.timeout.bind(instance, 'warning')
instance.__proto__.error.timeout = instance.timeout.bind(instance, 'error')

/**
 * 关闭 loading 后，马上调用 toast，在 iOS 上会出现 不响应的状况。
 * 所以，这里 增加一个方法 timeout
 * 例如：
 *    LOADING.hide()
 *    TOAST.success.timeout('成功')
 */

export default instance