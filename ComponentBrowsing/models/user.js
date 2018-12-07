import {
  HTTP
} from '../utils/http.js'
class UserModel extends HTTP {
  constructor() {
    super()
  }
  Login(wxcode, success) {
    var params = {
      url: 'User/GetUserInfo',
      success: success,
      data: {
        wxcode: wxcode
      }
    }
    this.request(params);
  }
  UpdataUser(token, companyId, success) {
    console.log(companyId)
    var params = {
      url: 'User/BindCompanyByToken',
      success: success,
      data: {
        token: token,
        companyId: companyId
      }
    }
    this.request(params);
  }
}
export {
  UserModel
}