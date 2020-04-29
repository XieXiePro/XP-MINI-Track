# 小程序宿主项目相关说明

 - 版本号   1.1.0 
 - 修订内容 
 - [x] 小程序宿主项目，用于快速创建新小程序项目
 - [x] 接入有数埋点，实现自动化配置埋点
 - 修订人   Haraway
 - 修订日期 2020.4.29

### 一、代码相关说明

```
├─components      组件
├─images
│  └─tabbar     底部按钮图标
├─libs      第三方代码库
├─pages     Demo页面
│  ├─Home       首页    
│  └─Share      分享
├─style         公共样式
└─utils         工具类
```

### 二、腾讯有数数据统计小程序端接入记录

&emsp;&emsp;[腾讯有数](https://mp.zhls.qq.com/youshu-docs/start/youshu_intro.html)是由[腾讯智慧零售](https://lingshou.tencent.com)推出，为品牌商、零售商打造的数据分析与管理平台，融合腾讯数据、技术与生态优势，提供全链路经营数据分析、消费者洞察、精准营销等能力，让企业经营更“有数”。

# [](https://mp.zhls.qq.com/youshu-docs/develop/sdk/prepare.html#上报步骤) 1 SDK引入

## [](https://mp.zhls.qq.com/youshu-docs/develop/sdk/prepare.html#_1-获取-sdk) 1.1 获取 [SDK](https://mp.zhls.qq.com/sdk/sdk-weapp/index.js)，将该SDK下载后重命名，引入小程序工程中，如下图。

![图片.png](https://upload-images.jianshu.io/upload_images/2783386-6617ee1c37326d91?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## [](https://mp.zhls.qq.com/youshu-docs/develop/sdk/prepare.html#_2-添加可信域名) 1.2 添加可信域名

&emsp;&emsp;登录[微信公众平台](https://mp.weixin.qq.com/)，进入<开发><开发设置><服务器域名>，将 `https://zhls.qq.com` 添加为 request 合法域名。

&emsp;&emsp;在开发环境中还有SDK版本检查，所以会提示 `https://sr-home-1257214331.cos.ap-guangzhou.myqcloud.com 不在以下 request 合法域名列表中` , 可以通过设置不校验域名来处理。

# 2 init 初始化

### [init(options: object)](https://mp.zhls.qq.com/youshu-docs/develop/sdk/prepare.html#init-options-object) 

&emsp;&emsp;配置接口，用来调整SDK的基础机制。官方建议init初始化应该在`App()`调用之前调用，如果自己改造，只要测试通过即可。

&emsp;&emsp;在app中初始化如下：

```
let sr = require('./libs/sr-sdk-wxapp.js').init({ // 腾讯有数,建议在App()调用之前调用。
  appid: 'wxxxx', // 微信小程序appID，以wx开头
  token: 'bidxxx', // token是唯一必须配置的参数，请联系有数数据服务sr_data_service@tencent.com提供
  trackApp: true, //SDK 默认上报小程序的 启动 、显示 、隐藏 事件， false 关闭该功能。
  proxyPage: true, // 是否开启自动代理 Page，默认是：false。
  usePlugin: true,// 是否使用插件，默认是：false。
  debug: true
})
```

# 3 数据上报

&emsp;&emsp;有数小程序数据上报SDK是一个小程序环境的数据采集工具，它提供了简单的接口帮助你快速将数据接入数据中心。

* 上报队列 数据上报任务通过队列发送，降低数据丢失率。
* 自动采集 可自动对常见的行为进行埋点，并收集通用的属性，可通过配置打开和关闭，具体见文档 [微信小程序SDK](https://mp.zhls.qq.com/youshu-docs/develop/sdk/prepare.html) 中的使用方法。

![通过 track 上报行为图例](https://upload-images.jianshu.io/upload_images/2783386-cc100f7e8511ab0b?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## [3.1 App 相关](https://mp.zhls.qq.com/youshu-docs/develop/sdk/report_event.html#app-相关) 

&emsp;&emsp;SDK 默认上报小程序的 `启动` 、`显示` 、`隐藏` 事件，可以在初始化的时候配置 `trackApp: false` 关闭该功能。

## [3.2 Page 相关](https://mp.zhls.qq.com/youshu-docs/develop/sdk/report_event.html#page-相关) 

*   未使用小程序插件，SDK 提供 `proxyPage` 开关对 `Page` 开启代理模式。 会自动上报页面相关的预置事件，如 `browse_wxapp_page` 。
*   已使用小程序插件，SDK 提供 sdk.page 支持对 Page 的改造。
*   也可以选择使用 track 自己上报预置事件。

&emsp;&emsp;注意：在小程序里有如下几种异步数据容易导致问题：通过wx.login获取 openid ，通过wx.getShareInfo获取 openGId 。

##  [3.3 Element相关](https://mp.zhls.qq.com/youshu-docs/develop/event/flow/element.html)
### 3.3.1 方法一：SDK上报(详见官方文档：[事件元素上报](https://mp.zhls.qq.com/youshu-docs/develop/event/flow/element.html))

&emsp;&emsp;通过这种手动埋点的方式对代码有较强的侵入性，另外，由于PM会频繁调整埋点信息，而埋点是一个繁琐又无聊的工作，基于Don't Repeat Yourself 原则，可以采用方法二自动埋点方案。

```
sr.track('element',
{
    "type": "change",
    "element_id": "secKillPage-banner1_1",
    "index": "1",
    "name": "秒杀页面-轮播1_1",
    "page": "pages/product?sku_id=AOdjf7u",
    // more...
})
```
### 3.3.2 方法二：配置上报（实现原理参考文档：[xbosstrack 小程序自动埋点](https://www.ctolib.com/zhengguorong-xbosstrack-wechat.html)）

###### &emsp;&emsp;实现思路：监听用户点击或方法调用-->读取埋点配置JOSN，判断是否需要上报--> 上报数据

&emsp;&emsp;目前已实现监听页面和组件中的元素点击事件或方法调用，自动上报埋点数据。

&emsp;&emsp;使用时需添加需要埋点的点击事件上报如下。
```
const trackConfig = [{
    title: '会员商城首页',
    path: 'pages/Home/Home',
    elementTracks: [{//这是页面中的元素点击配置
      element: '.home-page',
      elementName: '首页点击埋点测试',
      dataKeys: ['env1'],
    }, {
      element: '.home-contact>>>.lxkf',//这是组件中的元素点击配置
      elementName: '首页组件中点击埋点测试',
      dataKeys: ['level'],
    }],
    methodTracks: [{
      method: 'initHomePage',
      element: 'initHomePage',
      elementName: '首页方法埋点测试',
      dataKeys: ['addtominiprogram'],
    }],
    comMethodTracks: [{
      method: 'getLevel',
      element: 'getLevel',
      elementName: '首页组件中方法埋点测试',
      dataKeys: ['ysf'],
    }]
  }
export default trackConfig;
```
&emsp;&emsp;另外，使用时要在需埋点页面wxml最外层插入监听方法。示例：
```
<view catchtap='elementTracker'>
	
</view>
```

&emsp;&emsp;通过配置上报完成有数通用点击事件埋点，例如点击立即购买按钮时，上报数据示例如下：
```
courseId: "1"
element_id: ".list-item"
index: "1"
lesson: 2
name: "课程章节"
page: "pages/Course/CourseList/CourseList?courseId=1"
page_title: "课程列表"
sr_sdk_version: "1.1.8"
time: 1587535443662
type: "tap"
```

## 3.4 用户身份上报

&emsp;&emsp;**有数要求所有的上报接口必须上报open_id，但允许部分行为可能产生无法获得 open_id, page 为空的情况**

&emsp;&emsp;用户注册行为 register_wxapp，绑定手机号看成是注册，用户授权手机号获取到userId后上报用户userId。

&emsp;&emsp;用户登录行为 login_wxapp，在获取到用户unionid登录后上报用户unionId。

&emsp;&emsp;接入时在需要上报用户指定身份信息上报的位置调用指定公共方法即可，调用方法如下：

```
// 设置每个上报必须的用户信息
        sr.setUser({
          open_id: openId,//必传，字符串类型
          union_id: unionId',//非必传，字符串类型
          user_id: userId'//非必传，字符串类型
        })
```
## 3.5 渠道上报

&emsp;&emsp;**有数要求所有的上报接口必须上报chan_wxapp_scene：小程序场景值。**
&emsp;&emsp;如果未使用自定义渠道手动设置上报，则有数SDK会自动获取渠道信息上报。

&emsp;&emsp;[渠道可用于区分流量来源。主要分为三种渠道类型](https://mp.zhls.qq.com/youshu-docs/develop/event/channel/intro.html)：场景值渠道、引流渠道、自定义渠道。

&emsp;&emsp;其中引流渠道ID由有数后台-渠道管理-新增渠道时系统生成，有数渠道管理后台地址传送门： [https://lingshou.tencent.com](https://lingshou.tencent.com)；


&emsp;&emsp;由于有数渠道参数使用场景值带参方式，需要兼容原自定义带参，在扩展页面类 onLoad方法中添加公共场景值取参方法如下：

```
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
```

### 总结记录

 - 1、初始化时配置 trackApp:true启用自动上报小程序的 启动 、显示 、隐藏 事件；未使用小程序插件，SDK 提供 proxyPage:true 开关对 Page 开启代理模式。 会自动上报页面相关的预置事件，如 browse_wxapp_page等 。已使用小程序插件，SDK 提供 sdk.page 支持对 Page 的改造，另外需配置usePlugin: true， 是否使用插件，默认是：false。
 - 2、建议文档从头到尾的读，读3遍！！！包括官方[产品介绍](https://mp.zhls.qq.com/youshu-docs/start/youshu_intro.html)和[产品接入](https://mp.zhls.qq.com/youshu-docs/develop/dev_account/dev_module.html)文档。
 - 3、仔细看[测试点文档](https://mp.zhls.qq.com/youshu-docs/develop/dev_account/dev_process_test.html)，因为没看仔细文档，硬是找了3天问题，有数那边工作人员也一起帮忙找问题，结果修改后的上报数据和修改前相差无几，还好在修修补补的过程中，发现了一些其他问题，也算有所收获。
![图片.png](https://upload-images.jianshu.io/upload_images/2783386-e20d806a113c6c69?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 - 4、在接入某个原来接入mta腾讯移动分析的小程序项目中，onShareAppMessage方法的res有问题，导致有数SDK获取不到分享类型报错，产生原因参考：
[onShareAppMessage方法的res问题](https://developers.weixin.qq.com/community/develop/doc/0002429b170388b0d5c7cdf2a51400?highLine=onShareAppMessage%2520res)，我目前的解决办法是移除mta SDK。
 - 5、使用微信开发工具 wechat_devtools_1.02.1911180_x64，渠道chan_wxapp_scene偶尔会丢失，查后发现只有在编译器模拟环境会出现该问题，在真机环境下不会。