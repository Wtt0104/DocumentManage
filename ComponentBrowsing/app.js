import {
  UserModel
} from './models/user.js';
let userModel = new UserModel();

const {
  $Toast
} = require('./component/dist/base/index');

App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {
    let companyId = options.query.companyId,
      that = this;
    wx.login({
      success: function(res) {
        userModel.Login(res.code, (res) => {
          that.setStorage(res.DataPacket.list)
          wx.setStorageSync('token', res.DataPacket.token);
        })
      }
    })
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },
  globalData: {
    code: '',
    token: String
  },
  setStorage: function(data, companyId) {
    if (data != null) {
      wx.setStorageSync('code', data[0].Code);
      wx.setStorageSync('codes', data);
    } else {
      if (companyId == undefined) {
        $Toast({
          content: '请先关注对应项目',
          duration: 3
        });
      }
    }
  }
})