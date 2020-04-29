import {
  WGTRACK,
  wgPageUtil
} from '../utils/manage'

const wgPage = function(config) {
  const {
    onLoad,
  } = config
  // 页面创建时执行
  config.onLoad = function(options) {
    //埋点方法放在if之前不需要页面中实现onShow自动调用，放在if内需要在页面实现该方法
    WGTRACK.pageBrowse(options, wgPageUtil.getCurrentPageUrl(), wgPageUtil.routerIsString(wgPageUtil.getCurrentPageUrl()))
    if (typeof onLoad === 'function') {
      //由于官方没有提供页面标题的获取方式，不再支持全自动获取，为确保 page_title 获取，需要开发配合完成如下配置
      this.setData({
        title: wgPageUtil.routerIsString(wgPageUtil.getCurrentPageUrl())
      })
      //添加公共场景值取参方法
      console.log("方法参数：", options, options.scene)
      if (options.scene) { //如果获取到场景值，则将场景值取出赋值给自定义参数
        let scene = decodeURIComponent(options.scene).split('&')
        let param = {}
        for (let i in scene) {
          let item = scene[i].split('=')
          let itemKey = item[0]
          let itemVal = item[1]
          options[itemKey] = itemVal
        }
      }
      onLoad.call(this, options)
      console.log("回调参数：", options)
    }
  }
  let app = getApp()
  return Page(config)
}

export default wgPage