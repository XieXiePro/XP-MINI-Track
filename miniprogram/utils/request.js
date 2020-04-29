import {
  TIPS,
  ASSERT,
  LOADING,
  TOAST
} from './manage'
class Request {
  constructor() {
    this.config = {
      url: '',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'customerId=${wx.getStorageSync("cusId")}'
      },
      data: {},
      dataType: 'json',
      success: '', // function
      fail: () => {
        TOAST.warning({
          title: '网络或服务器异常',
          duration: 1500
        })
      }, // function
      complete: () => {
        LOADING.hide()
      }, // function
    }
  }
  mixin(userConfig, defaultConfig) {
    if (userConfig && userConfig.toString() === '[object Object]') {
      defaultConfig = Object.assign({}, defaultConfig, userConfig)
    }
    defaultConfig.header = Object.assign({}, this.config.header, defaultConfig.header || {})
    return Object.assign({}, this.config, defaultConfig)
  }

  open(config) {
    return new Promise((resolve, reject) => {
      if (wx.getStorageSync('cusId')) {
        config.header.Cookie = `customerId=${wx.getStorageSync('cusId')}`
      }
      LOADING.show()
      wx.request({
        url: config.url,
        data: config.data,
        method: config.method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: config.header, // 设置请求的 header
        success: response => {
          if (config.success && ASSERT(config.success, 'function')) {
            config.success(response) // 默认操作
          } else {
            resolve(response)
          }
        },
        fail: () => {
          if (config.fail && ASSERT(config.fail, 'function')) {
            config.fail()
          } else {
            reject(TIPS.error)
          }
        },
        complete: () => {
          config.complete()
        }
      })
    })
  }

  post(url, config) {
    let postConfig = {
      url: url,
      method: 'POST'
    }
    return this.open(this.mixin(config, postConfig))
  }

  get(url, config) {
    let getConfig = {
      url: url,
      method: 'GET'
    }
    return this.open(this.mixin(config, getConfig))
  }
  delete(url, config) {
    let deleteConfig = {
      url: url,
      method: 'DELETE'
    }
    return this.open(this.mixin(config, deleteConfig))
  }
}

const instance = new Request()
export default instance