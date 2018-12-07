// pages/details/details.js
import {
   EntityModel
} from '../../models/entity.js';
let entityModel = new EntityModel()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      entityId: 1,
      entity: Object,
      UploadTime:''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      let Id = this.getEntityId(options);
      entityModel.geEntityList(Id, (data) => {
         this.setData({
            entity: data.DataPacket.data,
            UploadTime: this.toDate(data.DataPacket.data.UploadTime)           
         });
         wx.setNavigationBarTitle({
            title: this.data.entity.Title//页面标题为路由参数
         })
         console.log(this.data.entity);
      })
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
   getEntityId: function(options) {
      this.setData({
         entityId: options.entityId
      });
      return this.data.entityId;
   },
   //时间戳转换时间
   toDate: function(number) {
      var n = number * 1000;
      var date = new Date(n);
      var Y = date.getFullYear() + '/';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return (Y + M + D)
   }

})