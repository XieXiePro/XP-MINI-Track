  // 长按保存图片 - 授权相册功能
  const saveImage = function(url) {
    //用户需要授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              saveImg(url); // 同意授权
            },
            fail: (res) => {
              console.log(res);
            }
          })
        } else { // 已经授权了
          saveImg(url);
        }
      },
      fail: (res) => {
        console.log(res);
      }
    })
  }
  // 长按保存图片 - 保存图片
  const saveImg = function(url) {
    wx.getImageInfo({
      src: url,
      success: (res) => {
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: (res) => {
            console.log(res);
            wx.showToast({
              icon: 'success',
              title: '图片保存成功！',
              duration: 2500
            })
          },
          fail: (res) => {
            console.log(res);
            wx.showToast({
              icon: 'success',
              title: '图片保存失败，请清除相册授权，再重新进入小程序保存图片！',
              duration: 2500
            })
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  }

  export default {
    saveImage
  }