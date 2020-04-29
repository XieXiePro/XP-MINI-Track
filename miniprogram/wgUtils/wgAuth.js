/*  **************************************  微信授权通用方法 start  ****************************************** */

// * 1. 在app.js的onLaunch()中调用 wxLogin() 和 qyLogin()  
// * 2. 在button为getUserInfo的回调中调用getUserInfo
// * 3. 在button为getPhoneNumber的回调中调用getPhoneNumber
// * 其他方法不需要调用，在getPhoneNumber或getUserInfo中会默认走完下面的登录流程，拿到的所有数据会存在本地缓存中  

// * 本地缓存可取到的值：
// *  (1) wxLogin后：openId + sessionKey [ + unionId ]
// *  (2) getPhoneNumber后：openId + sessionKey + phone + cusId + vipCusStatus [ + unionId ]
// *  (3) getUserInfo后：openId + nickName + avatarUrl + unionId
// *  (4) qyLogin后：staffId

//     使用方法：
//     import wgAuth from '/wgUtils/wgAuth'
//     wgAuth.wxLogin()
//     wgAuth.qyLogin()
//     wgAuth.getPhoneNumber(e).then(res => {
//       // can do something
//     })
//     wgAuth.getUserInfo(e).then(res => {
//       // can do something
//     })

/*  **************************************  微信授权通用方法 end  ****************************************** */


import env from "./wgEnv"
import WGCOMMON from './wgCommon'
import WGTRACK from './wgTrack'

let appId = env.appId,
  baseUrl = env.baseUrl,
  jsCode2sessionUrl = baseUrl + "xxx/jscode2sessionPost", // 微信静默授权登录
  getUserInfoUrl = baseUrl + "xxx/saveMiniAppUser", // 手机号解密 
  getPhoneNumberUrl = baseUrl + "xxx/getPhoneNumber", // 用户信息解密  
  saveUnionIdUrl = baseUrl + "xxx/saveUnionId", // 保存会员的unionId 
  appLoginUrl = baseUrl + "xxx/webLogin", // 登录获取会员信息接口  
  querySVipOnlineCusInfoUrl = baseUrl + "xxx/querySVipOnlineCusInfo", // 查询会员等级（是否是会员）
  qyJsCode2StaffIdUrl = baseUrl + "xxx/microMallJscode2session" // 企业微信登录获取顾问工号 

/** wxLogin - 微信登录静默授权
 *  @param 无需参数
 *  @return sessionKey
 *  本地存值setStorageSync： openId + sessionKey [ + unionId ]
 *  调用时机：在app.js的onLaunch中调用
 */
function wxLogin() {
  return new Promise((resolve, reject) => {
    let key = wx.getStorageSync('sessionKey')
    let openId = wx.getStorageSync('openId')
    if (key && openId) {
      wx.checkSession({
        success() { //session_key 未过期，并且在本生命周期一直有效
          resolve(key)
        },
        fail() { // session_key 已经失效，需要重新执行登录流程
          wx.login({
            success(res) {
              if (res.code) {
                wx.request({
                  url: jsCode2sessionUrl,
                  method: "POST",
                  data: {
                    appId: appId,
                    jsCode: res.code
                  },
                  success(codeRes) {
                    if (codeRes.data) {
                      let codeResObj = codeRes.data
                      wx.setStorageSync('sessionKey', codeResObj.session_key)
                      wx.setStorageSync('openId', codeResObj.openid)
                      // 设置登录用户OpenId
                      WGTRACK.setUserOpenId(codeResObj.openid)
                      if (codeResObj.hasOwnProperty('unionid') && codeResObj.unionid) {
                        wx.setStorageSync('unionId', codeResObj.unionid)
                        saveUnionId(codeResObj.unionid)
                        // 设置登录用户信息
                        WGTRACK.setLoginUser(codeResObj.unionid)
                      }
                      if (codeResObj.hasOwnProperty('cusId') && codeResObj.cusId) {
                        wx.setStorageSync('cusId', codeResObj.cusId)
                        // 设置注册用户信息
                        WGTRACK.setRegisterUser(codeResObj.cusId)
                        wx.request({
                          url: querySVipOnlineCusInfoUrl,
                          method: "POST",
                          header: {
                            "content-type": 'application/x-www-form-urlencoded'
                          },
                          data: {
                            cusId: codeResObj.cusId
                          },
                          success(vipRes) {
                            if (vipRes.data.msgCode == 0) {
                              wx.setStorageSync('vipCusStatus', vipRes.data.resultInfo.vipCusStatus) // vipCusStatus 0非会员 1未过期会员 2已过期会员
                            } else {
                              WGCOMMON.toast('querySVipOnlineCusInfo报错---')
                              WGCOMMON.toast(vipRes.data)
                            }
                            resolve()
                          },
                          fail(err) {
                            WGCOMMON.toast('querySVipOnlineCusInfo报错---')
                            WGCOMMON.toast(err)
                            reject(err)
                          }
                        })
                      }
                      resolve(codeResObj.session_key)
                    } else {
                      reject(codeRes)
                    }
                  },
                  fail(err) {
                    WGCOMMON.toast('base/jscode2sessionPost报错--')
                    WGCOMMON.toast(err, 3500)
                    reject(err)
                  }
                })
              } else {
                WGCOMMON.toast(res.errMsg)
                reject(res.errMsg)
              }
            },
            fail(err) {
              WGCOMMON.toast(err, 3500)
              reject(err)
            },
          })
        }
      })
    } else {
      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: jsCode2sessionUrl,
              method: "POST",
              data: {
                appId: appId,
                jsCode: res.code
              },
              success(codeRes) {
                if (codeRes.data) {
                  let codeResObj = codeRes.data
                  wx.setStorageSync('sessionKey', codeResObj.session_key)
                  wx.setStorageSync('openId', codeResObj.openid)
                  // 设置登录用户OpenId
                  WGTRACK.setUserOpenId(codeResObj.openid)
                  if (codeResObj.hasOwnProperty('unionid') && codeResObj.unionid) {
                    wx.setStorageSync('unionId', codeResObj.unionid)
                    saveUnionId(codeResObj.unionid)
                    // 设置登录用户信息
                    WGTRACK.setLoginUser(codeResObj.unionid)
                  }
                  if (codeResObj.hasOwnProperty('cusId') && codeResObj.cusId) {
                    wx.setStorageSync('cusId', codeResObj.cusId)

                    wx.request({
                      url: querySVipOnlineCusInfoUrl,
                      method: "POST",
                      header: {
                        "content-type": 'application/x-www-form-urlencoded'
                      },
                      data: {
                        cusId: codeResObj.cusId
                      },
                      success(vipRes) {
                        if (vipRes.data.msgCode == 0) {
                          wx.setStorageSync('vipCusStatus', vipRes.data.resultInfo.vipCusStatus) // vipCusStatus 0非会员 1未过期会员 2已过期会员
                        } else {
                          WGCOMMON.toast('querySVipOnlineCusInfo报错---')
                          WGCOMMON.toast(vipRes.data)
                        }
                        resolve()
                      },
                      fail(err) {
                        WGCOMMON.toast('querySVipOnlineCusInfo报错---')
                        WGCOMMON.toast(err)
                        reject(err)
                      }
                    })
                  }
                  resolve(codeResObj.session_key)
                } else {
                  reject(codeRes)
                }
              },
              fail(err) {
                WGCOMMON.toast('base/jscode2sessionPost报错--')
                WGCOMMON.toast(err, 3500)
                reject(err)
              }
            })
          } else {
            WGCOMMON.toast(res.errMsg)
            reject(res.errMsg)
          }
        },
        fail(err) {
          WGCOMMON.toast(err, 3500)
          reject(err)
        },
      })
    }
  })
}

/** getPhoneNumber - 解密手机号
 *  @param {*} e  bindgetphonenumber的handle方法的参数e
 *  @return null
 *  本地存值setStorageSync：phone + cusId + vipCusStatus
 *  调用时机：
 *   <button open-type="getPhoneNumber" bindgetphonenumber="bindgetphonenumber"></button>
 */
function getPhoneNumber(e) {
  return new Promise((resolve, reject) => {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      wxLogin().then(key => {
        wx.request({
          url: getPhoneNumberUrl,
          data: {
            appId: appId,
            encryptedData: e.detail.encryptedData,
            sessionKey: wx.getStorageSync('sessionKey'),
            iv: e.detail.iv
          },
          header: {
            "content-type": "application/json"
          },
          method: "POST",
          success(phoneRes) {
            let phoneResObj = phoneRes.data
            wx.setStorageSync('phone', phoneResObj.phoneNumber)
            // 设置注册用户信息
            WGTRACK.setRegisterUser(wx.getStorageSync('cusId'))
            appLogin(phoneResObj.phoneNumber).then(res => {
              resolve(res)
            }).catch(e => {
              WGCOMMON.toast('webLogin报错--')
              WGCOMMON.toast(e, 3500)
              reject(e)
            })
          },
          fail(err) {
            WGCOMMON.toast('base/getPhoneNumber报错--')
            WGCOMMON.toast(err, 3500)
            reject(err)
          }
        })
      }).catch(e => {
        WGCOMMON.toast(e)
        reject(e)
      })
    } else {
      WGCOMMON.toast(e.detail.errMsg)
      reject(e.detail.errMsg)
    }
  })
}

/** getPhoneNumber - 解密用户信息
 *  @param {*} e  bindgetuserinfo的handle方法的参数e
 *  @return null
 *  本地存值setStorageSync： openId + nickName + avatarUrl + unionId
 *  调用时机：
 *   <button open-type="getUserInfo" bindgetuserinfo="bindgetuserinfo"></button>
 */
function getUserInfo(e) {
  return new Promise((resolve, reject) => {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      wxLogin().then(key => {
        wx.request({
          url: getUserInfoUrl,
          data: {
            encryptedData: e.detail.encryptedData,
            sessionKey: wx.getStorageSync('sessionKey'),
            iv: e.detail.iv,
            appId: appId
          },
          method: "POST",
          success(userInfoRes) {
            let userInfoObj = userInfoRes.data.data
            if (userInfoObj) {
              wx.setStorageSync('openId', userInfoObj.openId)
              wx.setStorageSync('nickName', userInfoObj.nickName)
              wx.setStorageSync('avatarUrl', userInfoObj.avatarUrl)
              if (userInfoObj.hasOwnProperty('unionId') && userInfoObj.unionId) {
                wx.setStorageSync('unionId', userInfoObj.unionId)
                saveUnionId(userInfoObj.unionId)
                if (wx.getStorageSync('phone')) {
                  appLogin(wx.getStorageSync('phone'))
                }
              } else {
                WGCOMMON.toast(userInfoObj)
                console.error('解密用户信息，居然没有unionId', userInfoObj)
              }
              if (userInfoObj.hasOwnProperty('cusId') && userInfoObj.cusId && userInfoObj.cusId != "") {
                wx.setStorageSync('cusId', userInfoObj.cusId)
                wx.request({
                  url: querySVipOnlineCusInfoUrl,
                  method: "POST",
                  header: {
                    "content-type": 'application/x-www-form-urlencoded'
                  },
                  data: {
                    cusId: userInfoObj.cusId
                  },
                  success(vipRes) {
                    if (vipRes.data.msgCode == 0) {
                      wx.setStorageSync('vipCusStatus', vipRes.data.resultInfo.vipCusStatus) // vipCusStatus 0非会员 1未过期会员 2已过期会员
                    } else {
                      WGCOMMON.toast('querySVipOnlineCusInfo报错---')
                      WGCOMMON.toast(vipRes.data)
                    }
                    resolve()
                  },
                  fail(err) {
                    WGCOMMON.toast('querySVipOnlineCusInfo报错---')
                    WGCOMMON.toast(err)
                    reject(err)
                  }
                })
              }
            }
            resolve(userInfoObj)
          },
          fail(err) {
            WGCOMMON.toast('saveMiniAppUser报错---')
            WGCOMMON.toast(err, 3500)
            reject(err)
          }
        })
      }).catch(e => {
        WGCOMMON.toast(e)
        reject(e)
      })
    } else {
      WGCOMMON.toast(e.detail.errMsg)
      reject(e.detail.errMsg)
    }
  })
}

/** saveUnionId - 保存用户的unionId
 * @param {*} unionId 
 * @return null
 * 本地存值：无
 * 调用时机：被wxLogin调用，被getUserInfo调用，无需开发者主动调用
 */
function saveUnionId(unionId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: saveUnionIdUrl,
      method: "POST",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      data: {
        openId: wx.getStorageSync('openId'),
        unionId: unionId
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        WGCOMMON.toast('saveUnionId报错--')
        WGCOMMON.toast(err, 3500)
        reject(err)
      }
    })
  })
}

/** appLogin - 手机号登录
 * @param {*} phone 
 * @return null
 * 本地存值setStorageSync：cusId + vipCusStatus
 * 调用时机：被getPhoneNumber调用，无需开发者主动调用
 */
function appLogin(phone) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: appLoginUrl,
      method: "POST",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      data: {
        mobile: phone,
        checkCode: '###123',
        unionId: wx.getStorageSync('unionId') ? wx.getStorageSync('unionId') : null
      },
      success(res) {
        let appUserObj = res.data.resultInfo
        if (appUserObj) {
          wx.setStorageSync('cusId', appUserObj.customerId)
          wx.request({
            url: querySVipOnlineCusInfoUrl,
            method: "POST",
            header: {
              "content-type": 'application/x-www-form-urlencoded'
            },
            data: {
              cusId: appUserObj.customerId
            },
            success(vipRes) {
              if (vipRes.data.msgCode == 0) {
                wx.setStorageSync('vipCusStatus', vipRes.data.resultInfo.vipCusStatus) // vipCusStatus 0非会员 1未过期会员 2已过期会员
              } else {
                WGCOMMON.toast(vipRes.data)
              }
              resolve()
            },
            fail(err) {
              WGCOMMON.toast('querySVipOnlineCusInfoUrl报错--')
              WGCOMMON.toast(err, 3500)
              reject(err)
            }
          })
        } else {
          WGCOMMON.toast('appLogin报错--')
          WGCOMMON.toast(res.data, 3500)
          resolve()
        }
      },
      fail(err) {
        WGCOMMON.toast('appLogin报错--')
        WGCOMMON.toast(err, 3500)
        reject(err)
      }
    })
  })
}

/** qyLogin - 企业微信静默授权登录
 * 主要为了获得顾问的工号，用于有关顾问的业务逻辑开发
 * 本地存值：staffId
 */
function qyLogin() {
  let env = wx.getSystemInfoSync()
  if (env.environment) { // 企业微信打开
    wx.qy.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: qyJsCode2StaffIdUrl,
            method: 'GET',
            data: {
              jsCode: res.code
            },
            success(qyres) {
              if (qyres.data.status == 0) {
                wx.setStorageSync('staffId', qyres.data.data)
                wx.showToast({
                  title: '您的顾问ID为' + qyres.data.data,
                  icon: 'none',
                  duration: 3000
                })
              } else {
                WGCOMMON.toast(qyres.data)
              }
            }
          })
        } else {
          WGCOMMON.toast(res.errMsg)
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
}

export default {
  wxLogin,
  getPhoneNumber,
  getUserInfo,
  qyLogin,
  saveUnionId,
  appLogin
}