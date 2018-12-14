const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishList:[],
    title:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    console.log(options);//options._type
    //that.data.dishList=wx.getStorageSync('showDishList');
    // for(let i=0;i<that.data.dishList.length;i++){
      
    // }
    that.setData({
      title: options._type
    })
    switch(options._type){
      case '类别':
        if(options.cate=='菜系'){
          wx.request({
            url: myurl + '/dish/same_menu_cuisine?cuisine='+options.tag,
            success: function (res) { 
              console.log(res);
              that.setData({
                dishList:res.data.data
              })
              wx.hideLoading();
            },
          })
        }else{
          wx.request({
            url: myurl + '/ingredients/subcate_ingred?subcate=' + options.tag,
            success: function (res) {
              console.log(res);
              that.setData({
                dishList: res.data.data
              })
              wx.hideLoading();
            },
          })
        }
        break;
      case '菜品推荐':
        that.getRecommend();
        break;
      default : 
        that.setData({
          dishList: wx.getStorageSync('showDishList')
        })
        wx.hideLoading();
        break;
    }
    setTimeout(()=>{wx.hideLoading();},10*1000);
  },

  to_dishInfo:function(e){
    let that=this;
    wx.setStorageSync('dishInfo', that.data.dishList[e.target.dataset.idx]);
    wx.navigateTo({
      url: '/pages/dishInfo/dishInfo?dishID=' + e.target.dataset.id,
    })
  },

  /**
   * 获取推荐菜品
   */
  getRecommend: function () {
    let that = this;
    wx.request({
      url: myurl + '/user/user_operate?user_id=' + app.globalData.userInfo.ID,
      success: function (res) {
        console.log('res:', res);
        let idList = [];
        let cuisineList = [];
        let k = 0;
        let list = [];
        for (let j = 0; j < res.data.data.length; j++) {
          if (res.data.data[j].operate != 'unlike' && res.data.data[j].operate != 'history') {
            list.push(res.data.data[j]);
          }
        }
        res.data.data = list;
        if (res.data.data.length > 0) {
          for (let i = 0; i < res.data.data.length; i++) {
            if (idList.indexOf(res.data.data[i].ID) == -1) {
              idList.push(res.data.data[i].ID);
              wx.request({
                url: myurl + '/dish/dish_info?dishID=' + res.data.data[i].dishID,
                success: function (res2) {
                  console.log('res2:', res2);
                  k += 1;
                  if (cuisineList.indexOf(res2.data.data[0].cuisine) == -1) {
                    cuisineList.push(res2.data.data[0].cuisine)
                  }
                  if (k == res.data.data.length - 1) {
                    let rand = Math.floor(Math.random() * cuisineList.length);
                    wx.request({
                      url: myurl + '/dish/same_menu_cuisine?cuisine=' + cuisineList[rand] + '&limit=0&offset=20',
                      success: function (res3) {
                        console.log('res3:', res3);
                        that.setData({
                          dishList: res3.data.data
                        })
                        wx.hideLoading();
                      },
                    })
                  }
                },
              })
            }
          }
        } else {
          wx.request({
            url: myurl + '/dish/rand_dish',
            success: function (res3) {
              console.log('res3:', res3);
              that.setData({
                dishList: res3.data.data
              })
              wx.hideLoading();
            },
          })
        }
      },
    })
  },

})