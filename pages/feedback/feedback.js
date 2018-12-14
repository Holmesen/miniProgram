var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contact: '',
    title: '',
    detail: '',
    firstSubmit: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    //console.log('转发：',e);
    
  },

  inputContact: function (e) {
    //console.log(e);//e.detail.value
    var that = this;
    that.setData({
      contact: e.detail.value
    })
  },

  inputTitle: function (e) {
    var that = this;
    that.setData({
      title: e.detail.value
    })
  },

  inputDetail: function (e) {
    var that = this;
    that.setData({
      detail: e.detail.value
    })
  },

  submitFeedback: function () {
    var that = this;
    that.setData({
      firstSubmit: true
    })
    if (that.data.contact != '' && that.data.detail) {
      wx.showLoading({
        title: '提交中...',
        mask: true,
      });
      setTimeout(function () { wx.hideLoading(); }, 10000);
    } else {
      wx.showToast({
        title: '请补充完整信息！',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
    }
  },

  callphone: function () {
    wx.makePhoneCall({
      phoneNumber: '17759502262',
    })
  }

})