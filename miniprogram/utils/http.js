import {
  ENV
} from './manage'

function getHeader(type) {
  let t = 'application/json'
  if (type == 'formdata') {
    t = 'application/x-www-form-urlencoded'
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

function showErrToast(e) {
  if (e) {
    wx.showToast({
      title: e,
      icon: 'none',
      duration: 1500
    })
  }
}

function getPromise(url, data, method, requestType) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${ENV}${url}`,
      header: getHeader(requestType),
      method: method,
      data: data,
      success: function(res) {
        if (res.data.status != undefined) {
          if (res.data.status === 0) {
            if (res.data.hasOwnProperty('data')) {
              resolve(res.data.data)
            }
            resolve(res.data)
          } else {
            reject(res.data.msg)
          }
        }
        if (res.data.msgCode != undefined) {
          if (res.data.msgCode === 0) {
            resolve(res.data.resultInfo)
          } else {
            showErrToast(e)
            reject(res.data.msgInfo)
          }
        }
        resolve(res.data)
      },
      fail: function(err) {
        showErrToast(e)
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