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
    title:'食材',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.data.cate=options.tag;
    that.setData({
      title:options.type
    })
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
      url: myurl + '/ingredients/subcate_ingred?subcate=' + that.data.cate + '&limit=' + that.data.limit,
      success: function (res) {
        console.log(res);
        for(let i=0;i<res.data.data.length;i++){
          (that.data.ingreList).push(res.data.data[i]);
        }
        that.setData({
          ingreList: that.data.ingreList,
          limit : that.data.limit+res.data.data.length
        })
      },
    })
  },

  onReachBottom:function(){
    this.getIngreList();
  }

})