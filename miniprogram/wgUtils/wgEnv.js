// let env = "TEST"  // 测试环境 (切换正式环境注释此行)
let env = "PROD" // 正式环境 (切换测试环境注释此行)


let url = "https://wx.xxx.com/" // 正式环境http请求的baseUrl
if (env == "TEST") {
  url = "https://test.xxx.com/" // 测试环境http请求的baseUrl
}


export default {
  env: env,
  baseUrl: url,
  appId: 'wx568afcd707507bf4', // 各种授权API需要此参数，不同的小程序appId不一样，使用时注意修改该参数
}