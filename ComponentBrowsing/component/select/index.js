// component/select/index.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      selectData: Array
   },

   /**
    * 组件的初始数据
    */
   data: {
      show: false,
      selectData: ['1', '2', '3', '4', '5', '6'],
      index: 0
   },

   /**
    * 组件的方法列表
    */
   methods: {
      selectTap() {
         this.setData({
            show: !this.data.show
         });
      },
      optionTap(e) {
         let Index = e.currentTarget.dataset.index;
         let Code = e.currentTarget.dataset.code;
         this.setData({
            index: Index,
            show: !this.data.show
         });

         wx.setStorageSync('code', Code)

         var myEventDetail = {
            code: Code
         }
         var myEventOption = {}
         this.triggerEvent('optionTap', myEventDetail, myEventOption)
      }
   }
})