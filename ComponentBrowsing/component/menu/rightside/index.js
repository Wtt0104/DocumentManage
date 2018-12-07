// component/menu/rightside/index.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      side: Object
   },

   /**
    * 组件的初始数据
    */
   data: {
   },

   /**
    * 组件的方法列表
    */
   methods: {
      ClickSkip: function (event) {
         var id = event.currentTarget.dataset.id;
         console.log(id);
         wx.navigateTo({
            url: "/pages/classifylist/classifylist?cAssemblyId=" + id
         })
      }
   }
})
