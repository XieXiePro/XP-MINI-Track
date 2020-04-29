import wgHttp from './wgHttp'
import WGAUTH from './wgAuth'
import WGCOMMON from './wgCommon'
import WGDATATYPE from './wgDataType'
import sr from '../libs/sr-sdk-wxapp.js'
/**
 * 
 * @param {*} onLoadOption 生命周期函数onLoad里的参数
 * @param {*} pageUrl 当前页面链接
 * @param {*} pageName 当前页面的中文名称
 */
function pageBrowse(onLoadOption, pageUrl, pageName) { // 页面浏览记录上报
  console.log(pageName, pageUrl, onLoadOption)
}

function setEvent(page_name, page_url, element_id, params) { // 事件埋点
  setUser().then(() => {
    getChanInfo()
    setSRTrack('element', params)
    console.log('element---setUser')
  }).catch((e) => {
    console.log('element---catch', e)
  })
}

function setLoginUser(unionId) { // 登录就是授权获取unionid
  if (unionId) {
    sr.setUser({
      union_id: unionId
    })
    setTrack('login_wxapp')
  }
}

function setRegisterUser(userId) { // 绑定手机号看成是注册
  if (userId) {
    if (!WGDATATYPE.isString(userId)) {
      userId = userId.toString()
    }
    sr.setUser({
      user_id: userId
    })
    setTrack('register_wxapp')
  }
}

function setUserOpenId(openId) { //补充每个上报都要求的用户openId
  if (openId) {
    sr.setUser({
      open_id: openId
    })
  }
}

function setUser() { //补充每个上报都要求的用户信息
  let that = this
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (wx.getStorageSync('unionId')) {
        sr.setUser({
          union_id: wx.getStorageSync('unionId'),
        })
      }
      if (wx.getStorageSync('cusId')) {
        var userId = wx.getStorageSync('cusId')
        if (!WGDATATYPE.isString(userId)) {
          userId = userId.toString()
        }
        sr.setUser({
          user_id: userId
        })
      }
      if (wx.getStorageSync('openId')) {
        sr.setUser({
          open_id: wx.getStorageSync('openId'),
        })
        resolve()
      } else {
        reject()
      }
    }, 1000)
  })
}

// 商品卡曝光 expose_sku_component
// 商品卡触发 trigger_sku_component
// 商品页浏览 browse_sku_page
// 商品加购 add_to_cart
// 订单状态变更 custom_order
// 搜索 search
function setSRTrack(trackKey, trackData) {
  sr.track(trackKey, trackData)
}


/**
 * 腾讯有数获取引流渠道
 */
function getChanID(query) { //获取引流渠道 chan_id，参考文档：https://mp.zhls.qq.com/youshu-docs/develop/event/channel/chan_id.html  
  let chan_id = query.chan_id
  if (chan_id) {
    return chan_id
  }

  let sceneInQuery = decodeURIComponent(query.scene)
  let match = sceneInQuery.split('&').map(m => m.match(/^chan_id=(.*)$/)).find(m => !!m)
  if (match) {
    return match[1]
  }
}

/**
 * 腾讯有数埋点方法
 */
function setTrack(track) {
  setUser().then(() => {
    getChanInfo()
    sr.track(track)
  }).catch(e => {
    console.log(e)
  })
}

/**
 * 下单接口需要增加chan_refer_app_id、chan_wxapp_scene参数
 * chan_wxapp_scene 	int 	就是小程序场景值，可从 options.scene 获取
 * chan_refer_app_id 	string 	来源公众号或小程序appID，可从 options.referrerInfo.appId 获取
 */
function setChanInfo(options) { // 引流渠道
  if (options.scene) {
    var chan_wxapp_scene = options.scene
    wx.setStorageSync('chan_wxapp_scene', chan_wxapp_scene)
  }
  if (options.referrerInfo && options.referrerInfo.appId) {
    var chan_refer_app_id = options.referrerInfo.appId
    wx.setStorageSync('chan_refer_app_id', chan_refer_app_id)
  }
}
/**
 * 由于页面带参时，有数会自动从页面链接中读取渠道参数，所以每次上报之前将渠道参数设置到有数，
 * 避免因拿不到chan_wxapp_scene 场景值而导致上报失败
 * chan_id 	string 	自定义渠道的收集方法较复杂，详见有数官方文档
 * chan_wxapp_scene 	int 	就是小程序场景值，可从 options.scene 获取
 * chan_refer_app_id 	string 	来源公众号或小程序appID，可从 options.referrerInfo.appId 获取
 */
function getChanInfo() { // 引流渠道
  if (wx.getStorageSync('chan_id')) {
    sr.setChan({
      chan_id: wx.getStorageSync('chan_id'),
    })
  }
  if (wx.getStorageSync('chan_wxapp_scene')) {
    sr.setChan({
      chan_wxapp_scene: wx.getStorageSync('chan_wxapp_scene'),
    })
  }
  if (wx.getStorageSync('chan_refer_app_id')) {
    sr.setChan({
      chan_refer_app_id: wx.getStorageSync('chan_refer_app_id'),
    })
  }
}

export default {
  setChanInfo,
  getChanInfo,
  getChanID,
  pageBrowse,
  setUser,
  setTrack,
  setEvent,
  setUserOpenId,
  setLoginUser,
  setRegisterUser,
  setSRTrack,
}