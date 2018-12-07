import {
   CardModel
} from '../../models/card.js';
const {
   $Toast
} = require('../../component/dist/base/index');

let cardModel = new CardModel()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      card: Object,
      cAssemblyId: 1
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      let Id = this.getCAssemblyId(options);
      let code=wx.getStorageSync('code')
      this.spin();
      cardModel.getCardList(code,Id, '', (data) => {
         this.setData({
            card: data.DataPacket.list
         });
      });
      $Toast.hide();
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
   getCAssemblyId: function(options) {
      this.setData({
         cAssemblyId: options.cAssemblyId
      })
      return this.data.cAssemblyId;
   },
   spin: function() {
      $Toast({
         content: '加载中',
         type: 'loading'
      });
   }
})