import {
   HTTP
} from '../utils/http.js'
class MenuModel extends HTTP {
   constructor() {
      super()
   }
   getMenuList(success) {
      var params = {
         url: 'Category/GetCategoryList',
         data: {
            code: wx.getStorageSync('code')
         },
         success: success
      }
      this.request(params)
   }
}
export {
   MenuModel
}