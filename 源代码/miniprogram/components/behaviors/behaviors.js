//注册一个 behavior，接受一个 Object 类型的参数。
module.exports = Behavior({
  behaviors: [],
  properties: {
    list: { // 属性名
      type: Object,
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (shangpin) {
      }
    }
  },
  methods: {

  }
})
