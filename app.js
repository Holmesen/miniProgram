//app.js
App({
  onLaunch: function () {
    let that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        wx.login({
          success: function (e) {
            wx.request({
              url: that.globalData.api+'/user/login?code=' + e.code + '&userInfo=' + JSON.stringify(res.userInfo),
              success: function (res) {
                console.log('用户信息：',res);
                that.globalData.userInfo = res.data.data.info[0];
                that.globalData.userID = res.data.data.info[0].ID;
                that.globalData.operate = res.data.data.operate;
                console.log(that.globalData);
              },
            })
          },
        })
      },
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userID:3,
    //api:'https://www.holmesen.club',
    api:'http://localhost:3000',
    userInfo: null,
    operate:null,
  }
})