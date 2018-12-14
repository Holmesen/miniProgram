const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ingreList:[],
    limit:0,
    cate:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.data.cate=options.tag;
    that.getIngreList();
  },

  to_shicaiInfo:function(e){
    let that=this;
    console.log(e);
    wx.setStorageSync('dishInfo', that.data.ingreList[e.target.dataset.idx]);
    wx.navigateTo({
      url: '/pages/shicaiInfo/shicaiInfo?shicaiID=' + e.target.dataset.id,
    })
  },

  getIngreList:function(){
    let that=this;
    wx.request({
      url: myurl + '/ingredients/subcate_ingred?subcate=' + that.data.cate + '&limit=' + limit,
      success: function (res) {
        console.log(res);
        that.setData({
          ingreList: res.data.data,
          limit : that.data.limit+res.data.length
        })
      },
    })
  },

  onReachBottom:function(){
    this.getIngreList();
  }

})