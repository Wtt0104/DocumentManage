import {
   HTTP
} from '../utils/http.js'
class CardModel extends HTTP {
   constructor() {
      super()
   }
   getCardList(code, categoryId, search, success) {
      var params = {
         url: 'File/GetFileList',
         success: success,
         data: {
            Code: code,
            CategoryId: categoryId,
            Search: search
         }
      }
      this.request(params)
   }
}
export {
   CardModel
}