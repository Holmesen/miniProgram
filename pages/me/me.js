const app=getApp();
const myurl=app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },

  get_user_info: function (e) {
    if(app.globalData.userInfo==null){
      wx.showLoading({
        title: '登录中...',
      });
      var that = this;
      //that.userLogin();
      console.log('用户点击登录按钮授权登录：', e);
      app.globalData.userInfo = e.detail.userInfo;

      that.setData({
        userInfo: e.detail.userInfo,
      })

      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          console.log(res);
          wx.login({
            success: function (e) {
              //console.log(e);
              wx.request({
                url: myurl + '/user/login?code=' + e.code + '&userInfo=' + JSON.stringify(res.userInfo),
                success: function (res) {
                  console.log(res);
                  app.globalData.userInfo = res.data.data.info[0];
                  app.globalData.userID = res.data.data.info[0].ID;
                  app.globalData.operate = res.data.data.operate;
                  that.setData({
                    userInfo: res.data.data.info[0]
                  })
                  console.log(app.globalData);
                  wx.hideLoading();
                },
              })
            },
          })
        },
      })
      console.log('globalData:', app.globalData);
    }
    setTimeout(()=>{wx.hideLoading();},10*1000);
  },

  collectDish:function(){
    if(app.globalData.userInfo==null){
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }else{
      // wx.request({
      //   url: myurl + '/user/get_user_collect?userID=3&limit=0',
      //   success: function (res) {
      //     console.log('收藏的菜品：', res);
      //   },
      // })
      wx.navigateTo({
        url: '/pages/collectDish/collectDish?userID=' + app.globalData.userInfo.ID,
      })
    }
  },

  manageDish: function () {
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '/pages/managerDish/managerDish?userID=' + app.globalData.userInfo.ID,
      })
      // wx.request({
      //   url: myurl + '/user/get_user_upload?userID=3&limit=0',
      //   success: function (res) {
      //     console.log('上传的菜品：', res);
      //   },
      // })
    }
  },

  personalInfo:function(){
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    } else {
      // wx.request({
      //   url: myurl + '/user/user_info?userID=3',
      //   success: function (res) {
      //     console.log('个人信息：', res);
      //   },
      // })
      wx.navigateTo({
        url: '/pages/preInfo/preInfo',
      })
    }
  },

  tool:function(){
    wx.showToast({
      title: '还没有可用工具！',
      icon: 'none',
    })
  },

  feedback:function(){
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '/pages/feedback/feedback',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})