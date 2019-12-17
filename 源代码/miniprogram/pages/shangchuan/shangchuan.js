// pages/shangchuan/shangchuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yun_lujing: '',
    columns: ['家常菜', '夜宵', '甜点', '美食'],
    show: false
  },


  /**
   * 显示底部弹出层
   * 
   */
  showPopup() {
    this.setData({
      show: true
    });
  },
  //关闭底部弹出层
  onClose() {
    this.setData({
      show: false
    });
  },

  /**
   * 上传商品数据
   * 
   */
  formSubmit: function(e) {

    if (this.data.yun_lujing != null && this.data.yun_lujing != '') {


      console.log('form发生了submit事件，携带数据为：', e.detail.value)

      if (e.detail.value.mingzi != '' && e.detail.value.shichangjia != '' && e.detail.value.youhuijia != '' && this.data.yun_lujing != '') {
        //插入数据

        const db = wx.cloud.database();
        wx.showLoading({
          title: '信息上传中...',
        })

        db.collection('shangpinDB').add({
          data: {
            shangpin_mingzi: e.detail.value.mingzi,
            shangpin_shichangjia: e.detail.value.shichangjia,
            shangpin_youhuijia: e.detail.value.youhuijia,
         //   shangpin_zhonglei: this.data.zhonglei,
            shangpin_tupian_lujing: this.data.yun_lujing

          },
          success: res => {
            wx.showToast({
              title: '成功！',
            })
          }
        })
      } else {
        wx.showToast({
          image: '../../miniprogram_npm/images/err.png',
          title: '请填完所有内容！',
        })
      }
    } else {
      wx.showToast({
        image: '../../miniprogram_npm/images/err.png',
        title: '先上传图片！',
      })
      this.shangChuan()
    }
  },

  formReset: function() {
    console.log('form发生了reset事件')
  },




  shangChuan: function(e) {

    wx: wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: res => {
        let imgName = 'SP' + Math.floor(Math.random() * 1000000).toString() + '.png'
        const tempFilePath = res.tempFilePaths;

        wx.showLoading({
          title: '上传中...',
        })

        wx.cloud.uploadFile({
          cloudPath: imgName, //云端路径
          filePath: tempFilePath[0], //临时文件路径
          success: res => {
            this.setData({
              yun_lujing: res.fileID
            })

            wx.showToast({
              title: '图片上传成功！',
            })
          }
        })
      },
      fail: err => {
        wx.showToast({
          image: '../../miniprogram_npm/images/err.png',
          title: 'err'
        })
      },
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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