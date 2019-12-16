// pages/xiangqing/xiangqing.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    zongjia: 0,
    openid: '',
    //列表显示
    shangpins: []
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    setInterval(function() {
      that.add();
    }, 800) //代表1秒钟发送一次请求

    this.setData({
      openid: app.globalData.xiangxi_shangjia_openid
    })

    //连接数据库
    const db = wx.cloud.database();
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('shangpinDB').get({
      success: res => {
        this.setData({
          shangpins: res.data
        })

        wx.hideLoading()
      }
    })

  },

  add: function() {
    this.setData({
      count: app.globalData.count,
      zongjia: app.globalData.money*100
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      openid: app.globalData.xiangxi_shangjia_openid,
      count: app.globalData.count,
      zongjia: app.globalData.money*100
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})