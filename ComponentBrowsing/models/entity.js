import {
   HTTP
} from '../utils/http.js'
class EntityModel extends HTTP {
   constructor() {
      super()
   }
   geEntityList(fileId, success) {
      var params = {
         url: 'File/GetFileInfo',
         success: success,
         data: {
            code: wx.getStorageSync('code'),
            fileId: fileId
         }
      }
      this.request(params)
   }
}
export {
   EntityModel
}