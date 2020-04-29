import {
  SAVEIMAGE,
  Page
} from '../../utils/manage'
Page({
  data: {
    nickName: "New",
    sign_days: "100",
    profileImg: "http://img.wxcha.com/file/201807/04/c5ac2f5230.jpg",
    shareImg: 'http://image.biaobaiju.com/uploads/20180802/01/1533146398-pkHMfZrmYw.jpg', //绘制时使用 
    tip: '每日坚持减肥瘦身', //绘制时使用 
    shareImage: '' //保存图片时使用 
  },
  onLoad: function() {
    this.eventDraw();
  },
  eventDraw() {
    this.setData({
      isPainting: true,
      painting: {
        width: 375,
        height: 555,
        clear: true,
        views: [{
            type: 'image',
            url: this.data.shareImg,
            top: 0,
            left: 0,
            width: 375,
            height: 400
          },
          //头像 
          {
            type: 'image',
            url: this.data.profileImg,
            top: 27.5,
            left: 29,
            width: 50,
            height: 50,
            borderRadius: 25
          },
          { //昵称 
            type: 'text',
            content: this.data.nickName,
            fontSize: 12,
            textAlign: 'left',
            top: 46,
            left: 88,
            color: '#ffffff',
            width: 140,
            height: 40,
            background: '#27253B'
          },
          { //绘制白色背景 
            type: 'rect',
            background: '#fff',
            borderRadius: 6,
            top: 0,
            left: 0,
            width: 375,
            top: 400,
            height: 200
          },
          {
            type: 'text',
            content: this.data.tip,
            fontSize: 14,
            color: '#333333',
            textAlign: 'left',
            top: 460,
            left: 20,
            lineHeight: 20,
            MaxLineNumber: 2,
            breakWord: true,
            width: 120
          },
          {
            type: 'text',
            content: '已坚持打卡/天',
            fontSize: 12,
            lineHeight: 20,
            color: '#333333',
            textAlign: 'left',
            top: 435,
            left: 270,
            width: 280,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true
          },
          {
            type: 'text',
            content: this.data.sign_days,
            fontSize: 60,
            color: '#333333',
            textAlign: 'center',
            top: 460,
            left: 310,
            bolder: true
          }
        ]
      }
    })
  },
  eventGetImage(event) {
    console.log(event)
    const {
      tempFilePath,
      errMsg
    } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath,
        isPainting: false,
      })
    }
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  eventSave(e) {
    let name = e.currentTarget.dataset.name
    let text = e.currentTarget.dataset.text
    console.log(this.data.shareImage)
    SAVEIMAGE.saveImage(this.data.shareImage)
  }
});