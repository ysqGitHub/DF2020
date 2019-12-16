// components/shangjia-list/shangjia-list.js
let productBehavior = require('../behaviors/behaviors.js') //引用组件（可重复使用）
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shangjiaId: {
      type: String,
      value: ''
    }
  },
  behaviors: [productBehavior],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 获取商家ID
     * 通过使用data - xxxx 的方法标识来传值，xxxx可以自定义取名 比my.wxml中的data-index。
     * 如何获取data-xxxx传递的值？
     * 在js的bindtap的响应事件中：
     * 通过数据解析一层层找到数据，var id=e.target.dataset.index(根据你的data-id的取名)
     */

    /**
     * 
     * 
     * 
     * 通过商家ID跳转到详情，详情根据商家ID展示相应的数据
     */
    xiangqing: function(e) {
      var id = e.currentTarget.dataset.id;
      
      app.globalData.xiangxi_shangjia_openid = id;

      console.log('跳转id：', app.globalData.xiangxi_shangjia_openid);

      wx.navigateTo({
        url: '../../pages/xiangqing/xiangqing' //跳转
      })
    }
  }
})