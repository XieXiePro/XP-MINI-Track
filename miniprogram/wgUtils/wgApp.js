import {
  ROUTER
} from '../utils/manage'


const wgApp = function(config) {
  console.log(config, 'wgApp')
  const {
    onPageNotFound
  } = config
  config.onPageNotFound = function() {
    console.log('onPageNotFound---')
    wx.switchTab({
      url: ROUTER.go_home
    })
  }
  return App(config)
}
export default wgApp