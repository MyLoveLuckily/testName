// component/productCard/productCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4075510848,3148597249&fm=26&gp=0.jpg'
    },
    name: {
      type: String,
      value: '休闲连衣裙 小仙女必备 2020年新品 潮流款'
    },
    price: {
      type: Number,
      value: 56
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    product:{
      src:"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4075510848,3148597249&fm=26&gp=0.jpg",
      name:"休闲连衣裙 小仙女必备 2020年新品 潮流款",
      price:"89"
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeName:function(){
      this.triggerEvent('changeName',{
        name:"这是子组件数据"
      })
    }
  }
})
