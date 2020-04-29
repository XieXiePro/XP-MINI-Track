const dateFormat = (val, format) => {
  var date = new Date(val)
  var map = {
    "M": date.getMonth() + 1, //月份   
    "d": date.getDate(), //日   
    "h": date.getHours(), //小时   
    "m": date.getMinutes(), //分   
    "s": date.getSeconds(), //秒   
    "q": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  }
  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}
const currency = (num, pre) => {
  if (num || num === 0) {
    if (pre) {
      return pre + Math.round(num * 100) / 100
    } else {
      return Math.round(num * 100) / 100
    }
  } else {
    return ""
  }
}
const totalPrice = (orderDetails) => {
  if (orderDetails && orderDetails.length > 0) {
    let total = 0
    for (let i = 0; i < orderDetails.length; i++) {
      total += (orderDetails[i].quantity * orderDetails[i].pricePerUnit)
    }
    return '￥' + total.toFixed(2)
  } else {
    return '-'
  }
}
const toFixed = (num) => {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
const lastTime = (time) => {
  if (time <= 0) {
    return "00:00:00";
  }
  var leftTime = time / 1000;
  var h = toFixed(Math.floor(leftTime / (60 * 60)));
  var m = toFixed(Math.floor(leftTime % (60 * 60) / 60));
  var s = toFixed(Math.floor(leftTime % 60));
  return h + ":" + m + ":" + s;
}
const getPriceRange = (arr, discount = 1) => {
  if (!arr) return ''
  let min = null
  let max = null
  if (discount) {
    max = currency(!(Math.max.apply(Math, arr) * discount).toString().split('.')[1] ? (Math.max.apply(Math, arr) * discount) : (Math.max.apply(Math, arr) * discount))
    min = currency(!(Math.min.apply(Math, arr) * discount).toString().split('.')[1] ? (Math.min.apply(Math, arr) * discount) : (Math.min.apply(Math, arr) * discount))
  }
  if (min === max) {
    return min
  } else {
    return min + '~' + max
  }
}
const getStockMin = (arr) => {
  if (!arr) return false
  return Math.min.apply(Math, arr)
}
const getFullDate = function (time, isFull){
  let curTime = new Date(time)
  if (isFull) {
    return curTime.getFullYear() + '.' + (curTime.getMonth() + 1) + '.' + curTime.getDate()
  } else {
    return (curTime.getMonth() + 1) + '.' + curTime.getDate()
  }
}
export default {
  dateFormat,
  currency,
  totalPrice,
  lastTime,
  toFixed,
  getPriceRange,
  getStockMin,
  getFullDate
}