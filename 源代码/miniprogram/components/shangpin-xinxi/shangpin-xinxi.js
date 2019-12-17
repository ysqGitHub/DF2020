// components/shangpin-xinxi/index.js
let productBehavior = require('../behaviors/behaviors.js') //引用组件（可重复使用）
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  behaviors: [productBehavior], //继承behavior.js里面的properties
  /**
   * 组件的初始数据
   */
  data: {
    num: 0,
    name: '',
    id: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**--------------------------------------------------------------------------------------------------------------------
     * 
     *  加数   
     * 
     *  */
    addCount: function(e) {
      var num = this.data.num; //获取当前页面下，该商品的数量
      var obj = {};
      var name = e.currentTarget.dataset.name;

      obj.id = e.currentTarget.dataset.id;
      obj.count = ++num;
      obj.name = e.currentTarget.dataset.name;
      obj.shichangjia = e.currentTarget.dataset.shichangjia;
      obj.youhuijia = e.currentTarget.dataset.youhuijia;

      // 将数值与状态写回  ，用于页面展示
      this.setData({
        num: num,
        name: name
      });

      /**
       * 购物车数据重新写入
       * 
       */
      var length = app.globalData.carCount.length
      if (length > 0) {
        for (let i = 0; i <= length - 1 && app.globalData.carCount[i] != null; i++) {
          //通过与当前页面的商品名字对应 ，来修改
          if (e.currentTarget.dataset.id == app.globalData.carCount[i].id) {
            //读取购物车中数量然后+1，计算当前商品的总量 以及 价格
            obj.zongjia = (app.globalData.carCount[i].count + 1) * (e.currentTarget.dataset.youhuijia)
            //计算所有商品的总量，先减去总量中该商品原来的数量，接下来重新写入该商品现有数量
            app.globalData.count -= app.globalData.carCount[i].count;
            //删除购物车原数据，接下来重新写入
            app.globalData.carCount.splice(i, 1);
          }
          // else {
          //  obj.zongjia = e.currentTarget.dataset.youhuijia
          // }
        }
      } else { //如果此前购物车为空，就直接添加总价
        obj.zongjia = e.currentTarget.dataset.youhuijia
      }

      //往购物车中写数据
      app.globalData.carCount.push(obj);
      length = app.globalData.carCount.length;
      //将总价赋值为空，重新计算
      app.globalData.money = 0;
      for (let i = 0; i <= length - 1 && app.globalData.carCount[i] != null; i++) {
        if (e.currentTarget.dataset.id == app.globalData.carCount[i].id) {
          app.globalData.count += app.globalData.carCount[i].count;
        }
        //遇见数组某一位为空，直接赋值为零
        if (app.globalData.carCount[i].zongjia == undefined)
          app.globalData.money += 0;
        else
          app.globalData.money += app.globalData.carCount[i].zongjia;
      }
    },

    /**--------------------------------------------------------------------------------------------------------------------
     * 
     * 
     * 
     * 
     * 减数 
     * 
     * */
    delCount: function(e) {
      var num = this.data.num;
      var obj = {};
      var name = e.currentTarget.dataset.name;

      //删除
      if (num > 0) {
        obj.id = e.currentTarget.dataset.id;
        obj.count = --num;
        obj.name = name;
        obj.shichangjia = e.currentTarget.dataset.shichangjia;
        obj.youhuijia = e.currentTarget.dataset.youhuijia;
        // 将数值与状态写回  ，用于页面展示
        this.setData({
          num: num,
          name: name
        });

        var length = app.globalData.carCount.length
        if (length > 0) {
          for (let i = 0; i <= length - 1 && app.globalData.carCount[i] != null; i++) {
            if (e.currentTarget.dataset.id == app.globalData.carCount[i].id) {
              obj.zongjia = (app.globalData.carCount[i].count - 1) * (e.currentTarget.dataset.youhuijia)

              app.globalData.count -= app.globalData.carCount[i].count;

              app.globalData.carCount.splice(i, 1);

            }
            //   else {
            //    obj.zongjia = e.currentTarget.dataset.youhuijia
            //  }
          }
        } else {
          obj.zongjia = e.currentTarget.dataset.youhuijia
        }
      }

      app.globalData.carCount.push(obj);
      app.globalData.money = 0;
      length = app.globalData.carCount.length;
      for (let i = 0; i <= length - 1 && app.globalData.carCount[i] != null; i++) {
        if (e.currentTarget.dataset.id == app.globalData.carCount[i].id) {
          app.globalData.count += app.globalData.carCount[i].count;
        }
        if (app.globalData.carCount[i].zongjia == undefined)
          app.globalData.money += 0;
        else
          app.globalData.money += app.globalData.carCount[i].zongjia;
      }
    },
  }
})