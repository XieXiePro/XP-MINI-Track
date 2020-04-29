/**
 * path 页面路径
 * elementTracks 页面元素埋点
 * methodTracks 执行函数埋点
 * comMethodTracks: 执行组件内函数埋点
 */
const trackConfig = [{
    title: '首页',
    path: 'pages/Home/Home',
    elementTracks: [{
      element: '.list-container',
      elementName: '轮播',
      dataKeys: ['courseId', 'dataList'],
    }, {
      element: '.bottom-view',
      elementName: '下一节按钮',
    }],
    methodTracks: [{
      method: 'goShare',
      element: '.bottom-view',
      elementName: '下一节按钮',
    }],
    comMethodTracks: [{
      method: 'getLevel',
      element: '.course-contact>>>.home-contact',
      elementName: '获取等级',
      dataKeys: ['level'],
    }]
  },
  {
    title: '分享',
    path: 'pages/Share/Share',
    elementTracks: [{
      element: '.to-save-btn',
      elementName: '保存图片按钮'
    }]
  }
]

export default trackConfig;