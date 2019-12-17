Page({

  
/**
 * 商家类型选择
 * 
 */
 zhongleiChange(event) {
    console.log('当前索引值', event.detail.value)
    this.setData({
      zhonglei: event.detail.value
    })
  }

})
