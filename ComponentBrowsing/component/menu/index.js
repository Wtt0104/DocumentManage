// component/menu/index.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      side: Object,
      sideitem: String,
      sideLowerMenu: Object
   },

   /**
    * 组件的初始数据
    */
   data: {
      side: ['编程语言', '前端开发', '软件开发'],
      sideitem: '编程语言',
      sideLowerMenu: null
   },

   /**
    * 组件的方法列表
    */
   methods: {
      bindside: function (event) {
         var classify = event.currentTarget.dataset.classify;
         var that = this;
         console.log(classify)  //输出的结果就是你点击的
         this.setData({
            sideitem: classify.Name,
           sideLowerMenu: classify.SubMenu //更新
         })
      }
   }
})
