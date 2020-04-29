import {
  REQUEST,
  TOAST,
  ROUTER,
  homeData
} from '../../utils/manage'
Page({
  onLoad: function() {
    this.getCourses()
  },
  getCourses: function() {
    //模拟网络请求数据
    this.setData({
      dataList: homeData
    })
  },
  goShare: function(e) {
    wx.navigateTo({
      url: ROUTER.go_share
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: '小程序宿主工程',
      path: '/pages/Home/Home'
    }
  }
})