const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishList: [],
    limit: 0,
    userID: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.data.userID = options.userID;
    that.getCollectDish();
  },

  getCollectDish: function () {
    let that = this;
    wx.request({
      url: myurl + '/user/get_user_upload?limit=0&userID=' + that.data.userID,
      success: function (res) {
        console.log('上传的菜品：', res);
        let idList = [];
        for (let i = 0; i < res.data.data.length; i++) {
          idList.push(res.data.data[i].ID);
        }
        that.data.limit += res.data.data.length;
        wx.request({
          url: myurl + '/dish/dishid_list?idList=[' + idList + ']',
          success: function (res2) {
            console.log(res2);
            that.setData({
              dishList: (that.data.dishList).concat(res2.data.data)
            })
          },
        })
      },
    })
  },

  to_dishInfo: function (e) {
    let that = this;
    wx.setStorageSync('dishInfo', that.data.dishList[e.target.dataset.idx]);
    wx.navigateTo({
      url: '/pages/dishInfo/dishInfo?dishID=' + e.target.dataset.id,
    })
  },

  managerDish: function (e) {
    let that = this;
    wx.showToast({
      title: '暂时还无法管理菜品！',
      icon: 'none',
      mask: true,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //this.getCollectDish();
  },
})