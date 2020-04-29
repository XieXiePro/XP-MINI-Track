/*  **************************************  网络请求通用方法 start  ****************************************** */

// 1. 已经封装好对请求状态的判断，当请求失败或服务端错误，会toast提示，无需开发者自己判断请求状态和返回数据是否成功
// 2. 使用方法如下：
//       import wgHttp from "/wgUtils/wgHttp"

//       wgHttp.get(url, data).then( res => {
//         console.log("请求成功的返回值", res)
//       })
//       wgHttp.post(url, data).then( res => {
//         console.log("请求成功的返回值", res)
//       })
//       wgHttp.delete(url, data).then( res => {
//         console.log("请求成功的返回值", res)
//       })
//       wgHttp.put(url, data).then( res => {
//         console.log("请求成功的返回值", res)
//       })
// 3. 请求头默认使用json，即 "application/json"
//    如果请求头需要使用formdata，即"application/x-www-form-urlencoded"
//    则使用方法如下：
//    wgHttp.put(url, data, "formdata").then( res => {
//     console.log("请求成功的返回值", res)
//    })

/*  **************************************  网络请求通用方法 end  ****************************************** */

import env from "./wgEnv"
 
let baseUrl = env.baseUrl

function getHeader(type) { // 设置请求头，默认为json，传递formdata则为formdata类型，如果请求头需求秘钥token，则取本地缓存token
  let t = "application/json"
  if(type == 'formdata') {
    t = "application/x-www-form-urlencoded"
  }
  if (wx.getStorageSync('token')) {
    return {
      'content-type': t,
      'token': wx.getStorageSync('token')
    }
  }
  return {
    'content-type': t
  }
}
 
function showErrToast(e) { // toast请求错误提示
  if(e) {
    wx.showToast({
      title: e,
      icon: 'none',
      duration: 2000
    })
  }
}
 
function getPromise(url, data, method, requestType) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      header: getHeader(requestType),
      method: method,
      data: data,
      success: function(res) {
        if(res.data.status != undefined) {
          if (res.data.status === 0) {
            if(res.data.hasOwnProperty('data')) {
              resolve(res.data.data)
            }
            resolve(res.data)
          } else {
            reject(res.data.msg)
          }
        }
        if(res.data.msgCode != undefined) {
          if (res.data.msgCode === 0) {
            resolve(res.data.resultInfo)
          } else {
            reject(res.data.msgInfo)
          }
        }
        resolve(res.data)
      },
      fail: function(err) {
        reject(err)
      }
    })
  }).catch(function(e) {
    showErrToast(e)
  })
}
 
const http = {
  get: function(url, data, requestType) {
    return getPromise(url, data, 'GET', requestType)
  },
  post: function(url, data, requestType) {
    return getPromise(url, data, 'POST', requestType)
  },
  put: function(url, data, requestType) {
    return getPromise(url, data, 'PUT', requestType)
  },
  delete: function(url, data, requestType) {
    return getPromise(url, data, 'DELETE', requestType)
  }
}
 
export default http