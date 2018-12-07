// pages/index/index.js
const {
  $Toast
} = require('../../component/dist/base/index');
const {
  $Message
} = require('../../component/dist/base/index');
import {
  CardModel
} from '../../models/card.js';
import {
  UserModel
} from '../../models/user.js';
import {
  CompanyModel
} from '../../models/company.js';

let userModel = new UserModel(),
  cardModel = new CardModel(),
  companyModel = new CompanyModel(),
  app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 'homepage',
    card: Object,
    code: wx.getStorageSync('code'),
    codes: wx.getStorageSync('codes'),
    companyName: String,
    companyId: Int32Array,
    visible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let companyId = options["companyId"],
      that = this,
      state = 0;
    let companyList = wx.getStorageSync("codes");
    for (let i = 0; i < companyList.length; i++) {
      if (companyList[i].Id == companyId) {
        state = 1
      }
    }
    if (companyId != undefined && companyId != null && companyId != "" && state != 1) {
      companyModel.getCompanyInfo(companyId, (data) => {
        this.setData({
          companyName: data.DataPacket.data.Name,
          companyId: companyId,
          visible: true
        });
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.card(this.data.code);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  spin() {
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });
  },
  card: function(code) {
    // this.spin();
    cardModel.getCardList(code, 0, '', (data) => {
      this.setData({
        card: data.DataPacket.list
      });
      $Toast.hide();
      if (code != undefined && code != null && code != "") {
        if (data.DataPacket.list.length == 0) {
          $Toast({
            content: '该项目暂无对应文档'
          });
        }
      }
    })
  },
  tSelect: function(event) {
    let code = event.detail.code;
    this.card(code);
  },
  Updata() {
    userModel.UpdataUser(wx.getStorageSync("token"), this.data.companyId, (res) => {
      this.setData({
        codes:res.DataPacket.list,
        code: res.DataPacket.list[0].Code,
        visible: false
      });
      this.card(res.DataPacket.list[0].Code)
    })
  },
  handleClose() {
    this.setData({
      visible: false
    });
  }
})