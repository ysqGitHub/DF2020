//index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nowshangjia: '美食',
    logged: false,
    takeSession: false,
    requestResult: '',
    userid: 'openid默认值',
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //自动轮播
    interval: 3000, // 自动切换时间间隔
    duration: 1000, // 滑动动画时长
    circular: true, //是否采用衔接滑动 

    shangjiaList: [], //商家列表
    //用户详细信息
    shangjia_mingzi: '',
    shangjia_jianjie: '',
    yonghu_leixing: '',
    shangjia_leixing: '',
    yonghu_dizhi: '',
    yonghu_shoujihao: '',
    shangjia_openid: '',

    banners: [
      {
        image: "cloud://nnuzb2020-bqn6u.6e6e-nnuzb2020-bqn6u-1300779465/SP595246.png"
      },
      {
        image: "cloud://nnuzb2020-bqn6u.6e6e-nnuzb2020-bqn6u-1300779465/SP958285.png"
      },
      {
        image: "cloud://nnuzb2020-bqn6u.6e6e-nnuzb2020-bqn6u-1300779465/SP709670.png"
      }
    ],
    themes: [{
      theme_icon: 'cloud://nnuzb2020-bqn6u.6e6e-nnuzb2020-bqn6u-1300779465/fenlei/jiachangcai.png',
        theme_name: '家常菜',
        theme_type: 1
      },
      {
        theme_icon: 'cloud://nnuzb2020-bqn6u.6e6e-nnuzb2020-bqn6u-1300779465/fenlei/yexiao.png',
        theme_name: '夜宵',
        theme_type: 2
      },
      {
        theme_icon: 'cloud://nnuzb2020-bqn6u.6e6e-nnuzb2020-bqn6u-1300779465/fenlei/tiandian.png',
        theme_name: '甜点',
        theme_type: 3
      },
      {
        theme_icon: 'cloud://nnuzb2020-bqn6u.6e6e-nnuzb2020-bqn6u-1300779465/fenlei/meishi.png',
        theme_name: '美食',
        theme_type: 4
      },
    ],
  },


  /**
   * 
   * 判断现在点击的商品类型，进行商家显示
   */

  newUrl: function(e) {
    app.globalData.nowshangjia = e.currentTarget.dataset.newthemename;
    this.setData({
      nowshangjia: app.globalData.nowshangjia
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
          userid: app.globalData.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })



    //连接数据库
    const db = wx.cloud.database();
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('yonghuDB').get({
      success: res => {
        this.setData({
          shangjiaList: res.data
        })

        console.log('商家：',this.data.shangjiaList);

        // this.data.shangjia_mingzi = res.data.shangjia_mingzi;
        // this.data.shangjia_leixing = res.data.shangjia_leixing;
        // this.data.shangjia_jianjie = res.data.shangjia_jianjie;
        // this.data.shangjia_touxiang = res.data.shangjia_touxiang;
        // this.data.yonghu_dizhi = res.data.yonghu_dizhi;
        // this.data.yonghu_leixing = res.data.yonghu_leixing;
        // this.data.yonghu_shoujihao = res.data.yonghu_shoujihao;
        // this.data.shangjia_openid = res.data._openid;

        wx.hideLoading(); //关闭等待图标
      }

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