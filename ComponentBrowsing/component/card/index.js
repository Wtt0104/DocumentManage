// component/card/index.js
Component({
         /**
          * 组件的属性列表
          */
         properties: {
            card:Object
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
               cardClick: function (event){
                  var id = event.currentTarget.dataset.id;
                  wx.navigateTo({
                     url: "/pages/details/details?entityId=" + id
                  })
               }
            }
         })