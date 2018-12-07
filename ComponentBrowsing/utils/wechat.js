import {
  UserModel
} from '../models/user.js';
let userModel = new UserModel();

class Wechat {
  static Login() {
    return new Promise((resolve, reject) => wx.login({
      success: resolve,
      fail: reject
    }));
  }
  static UpdataUser(code, companyId) {
    return new Promise((resolve, reject) => userModel.UpdataUser({
      code: code,
      companyId: companyId,
      success: resolve,
      fail: reject
    }));
  }
  static UserLogin(code) {
    return new Promise((resolve, reject) => userModel.Login({
      code: code,
      success: resolve,
      fail: reject
    }));
  }
}

module.exports = Wechat;