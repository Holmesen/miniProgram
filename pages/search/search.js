const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyName:'',
    limit:0,
    showDishList:[],
    showIngreList:[],
    loading:false,
    history:[],
    isfold:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.getHistory();
  },

  onShow:function(){
    if(app.globalData.userInfo!=null && this.data.history.length==0){
      this.getHistory();
    }
  },

  inputName:function(e){
    this.setData({
      keyName:e.detail.value
    })
  },

  search:function(){
    let that=this;
    if(that.data.keyName==''){
      wx.showToast({
        title: '搜索名不能为空哦~',
        icon: 'none',
        mask: true,
      })
    }else{
      that.searchMethod();
    }
    
  },

  searchMethod:function(){
    let that=this;
    wx.showLoading({
      title: '查找中...',
      mask: true,
    })
    wx.request({
      url: myurl + '/dish/dish_like?key=' + that.data.keyName + '&limit=' + that.data.limit,
      success: function (res) {
        that.data.limit+=res.data.data.length;
        console.log(res);
        res.data.data=that.dishOper(res.data.data);
        let idList=[];
        for (let i = 0; i < res.data.data.length;i++){
          if(idList.indexOf(res.data.data[i].user_id)==-1){
            idList.push(res.data.data[i].user_id);
          }
        }
        if (idList.length>0){
          wx.request({
            url: myurl + '/user/userid_list?idList=[' + idList + ']',
            success: function (res2) {
              for (let x = 0; x < res.data.data.length; x++) {
                for (let y = 0; y < res2.data.data.length; y++) {
                  if (res.data.data[x].user_id == res2.data.data[y].ID) {
                    res.data.data[x].userInfo = res2.data.data[y];
                    break;
                  }
                }
              }
              that.setData({
                showDishList: (that.data.showDishList).concat(res.data.data),
                loading: false
              })
              wx.hideLoading();
            },
          })
        }
        wx.hideLoading();
      },
    })
    wx.request({
      url: myurl + '/ingredients/ingredients_like?key=' + that.data.keyName,
      success: function (res) {
        console.log(res);
        that.setData({
          showIngreList: res.data.data,
          loading: false
        })
        wx.hideLoading();
      },
    })
    if ((that.data.history).indexOf(that.data.keyName)==-1 && app.globalData.userInfo!=null){
      wx.request({
        url: myurl + '/operate/add_history?userID=' + app.globalData.userInfo.ID +'&key=' + that.data.keyName,
        success: function (res) {
          if ((that.data.history).indexOf(that.data.keyName) == -1) {
            (that.data.history).push(that.data.keyName);
            that.setData({
              history: that.data.history
            })
          }
          wx.hideLoading();
        },
      })
    }
    setTimeout(()=>{wx.hideLoading();},5*1000);
  },

  getHistory:function(){
    let that=this;
    if (app.globalData.userInfo != null){
      wx.request({
        url: myurl + '/operate/get_history?userID=' + app.globalData.userInfo.ID,
        success: function (res) {
          if (res.data.success) {
            for (let i = 0; i < res.data.data.length; i++) {
              if ((that.data.history).indexOf(res.data.data[i]._key) == -1) {
                (that.data.history).push(res.data.data[i]._key);
              }
            }
            that.setData({
              history: that.data.history
            })
          }
        },
      })
    }
    
  },

  clearHistory: function () {
    let that = this;
    wx.request({
      url: myurl + '/operate/clear_history?userID=' + app.globalData.userInfo.ID,
      success: function (res) {
        if(res.data.success){
          that.setData({
            history: []
          })
        }
      },
    })
  },

  to_dishInfo: function (e) {
    let that = this;
    wx.setStorageSync('dishInfo', that.data.showDishList[e.target.dataset.idx]);
    wx.navigateTo({
      url: '/pages/dishInfo/dishInfo?dishID=' + e.target.dataset.id,
    })
  },

  to_ingreInfo: function (e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/shicaiInfo/shicaiInfo?shicaiID=' + e.target.dataset.id,
    })
  },

  clickHis:function(e){
    let that=this;
    if (that.data.keyName != e.target.dataset.name){
      that.setData({
        keyName: e.target.dataset.name,
        showDishList:[],
        limit:0
      })
      that.searchMethod();
    }
  },

  foldIngre:function(){
    let that=this;
    that.setData({
      isfold:!that.data.isfold
    })
  },

  dishOper: function (dishList) {
    let that = this;
    for (let i = 0; i < dishList.length; i++) {
      if ((dishList[i].practice).indexOf('[') != -1 && (dishList[i].practice).length > 2) {
        dishList[i].practice = that.str2arr(dishList[i].practice);
        //console.log(dishList[i].practice);
      } else {
        dishList[i].practice = [];
      }

      if ((dishList[i].excipient).indexOf('[') != -1 && (dishList[i].excipient).length > 2) {
        dishList[i].excipient = that.str2arr(dishList[i].excipient);
        //console.log(dishList[i].excipient);
      } else {
        dishList[i].excipient = [];
      }

      if ((dishList[i].ingredients).indexOf('[') != -1 && (dishList[i].ingredients).length > 2) {
        dishList[i].ingredients = that.str2arr(dishList[i].ingredients);
        //console.log(dishList[i].ingredients);
      } else {
        dishList[i].ingredients = [];
      }

      if ((dishList[i].seasoning).indexOf('[') != -1 && (dishList[i].seasoning).length > 2) {
        dishList[i].seasoning = that.str2arr(dishList[i].seasoning);
        //console.log(dishList[i].seasoning);
      } else {
        dishList[i].seasoning = [];
      }

      if ((dishList[i].features) && (dishList[i].features) != '') {
        dishList[i].features = (dishList[i].features).split(',');
        //console.log(dishList[i].features);
      } else {
        dishList[i].features = [];
      }
    }
    return dishList;
  },
  str2arr: function (_str) {
    _str = _str.replace(/\s+/g, "");
    let str = _str.substring(1, _str.length - 1);
    let list = [];
    let arr = str.split('},');
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf('}') == -1) {
        arr[i] += '}';
      }
      list.push(JSON.parse(arr[i]));
    }
    return list;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that=this;
    if (that.data.showDishList.length>0){
      that.setData({
        loading:true
      })
      wx.showLoading({
        title: '',
      })
      that.searchMethod();
    }
  },

})