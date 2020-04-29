const app = getApp()
Component({
  properties: {
    bannerData: Array,
    currentIndex: Number
  },
  data: {
    hideLoginPanel: true
  },
  methods: {
    loadImg(e) {
      var imgh = e.detail.height;　　　　　　　　　　　　　　　　
      var imgw = e.detail.width;
    },
    linkToPage(e) {
      let obj = e.currentTarget.dataset.item
      if (!obj.id) {
        console.log('页面数据', obj)
      }
    },
    closeModal() {
      this.setData({
        hideLoginPanel: true
      })
    },
  },
})