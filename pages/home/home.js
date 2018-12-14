const util=require('../../utils/util.js');
const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners :[
      '../../images/banner0.jpg', 
      '../../images/banner1.jpg', 
      '../../images/banner2.jpg', 
      '../../images/banner3.jpg', 
      '../../images/banner4.jpg',
      '../../images/banner5.jpg',
    ],
    time:'早餐',
    dayhotDish:[],
    weekhotDish:[],
    hourshotDish:[],
    newDish:[],
    meals:{ZC:[],WuC:[],XWC:[],WanC:[],YX:[]},
    randomCuisine: '菜系',
    caixiDish:[],
    randomCuisine2: '小吃',
    xiaochiDish: [],
    recommendDish:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.showLoading({
      title: 'Loading...',
      mask: true,
    })
    //获取当前时间判断什么时间段饮食
    let time = util.getTime();
    let arr=time.split(':');
    for(let i=0;i<arr.length;i++){
      if (arr[i].length<2) {
        arr[i] = '0' + arr[i];
      }
    }
    time=arr.join(":");
    console.log(time);
    if(time>='04:00:00'&&time<'10:00:00'){
      that.setData({
        time:'早餐',
      })
    }else{
      if (time >= '10:00:00' && time < '14:00:00') {
        that.setData({
          time: '午餐',
        })
      } else {
        if (time >= '14:00:00' && time < '16:00:00') {
          that.setData({
            time: '下午茶',
          })
        } else {
          if (time >= '16:00:00' && time < '21:00:00') {
            that.setData({
              time: '晚餐',
            })
          } else {
            if (time >= '21:00:00' || time < '4:00:00') {
              that.setData({
                time: '夜宵',
              })
            }
          }
        }
      }
    }

    that.getDayHot();
    that.getWeekHot();
    that.getHoursHot();
    that.getDayNew();
    
    that.getMeals();

    that.getRandomCuisineDish();

    that.getRandomCuisineDish2();
    
    //that.getRecommend();
    setTimeout(()=>{wx.hideLoading();},2*1000);
  },

  to_showDishList:function(e){
    let that=this;
    let _type=e.target.dataset.type;
    let data=null;
    switch(_type){
      case '今日最热': data = that.data.dayhotDish;break;
      case '本周最热': data = that.data.weekhotDish; break;
      case '热门菜谱': data = that.data.hourshotDish; break;
      case '最新菜谱': data = that.data.newDish; break;
    }
    wx.setStorageSync('showDishList', data)
    wx.navigateTo({
      url: '/pages/showDishList/showDishList?_type='+_type,
    })
    console.log(wx.getStorageSync('showDishList'));
  },

  getMeals:function(){
    let that=this;
    wx.request({
      url: myurl+'/dish/meals',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        for(let i=0;i<res.data.data.length;i++){
          switch(res.data.data[i].cuisine){
            case '早餐': (that.data.meals['ZC']).push(res.data.data[i]); break;
            case '午餐': (that.data.meals['WuC']).push(res.data.data[i]); break;
            case '下午茶': (that.data.meals['XWC']).push(res.data.data[i]); break;
            case '晚餐': (that.data.meals['WanC']).push(res.data.data[i]); break;
            case '夜宵': (that.data.meals['YX']).push(res.data.data[i]); break;
          }
        }
        that.setData({
          meals:that.data.meals
        })
      },
    })
  },



  /**
   * 获取今日最热菜品
   */
  getDayHot:function(){
    let that=this;
    wx.request({
      url: myurl+'/dish/new_dish?type=day',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('获取今日最热菜品',res);
        that.setData({
          dayhotDish:res.data.data
        })
      },
    })
  },

  /**
   * 获取本周最热菜品
   */
  getWeekHot: function () {
    let that = this;
    wx.request({
      url: myurl + '/dish/new_dish?type=week',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('获取本周最热菜品',res);
        that.setData({
          weekhotDish: res.data.data
        })
      },
    })
  },

  /**
   * 获取最热菜品（小时）
   */
  getHoursHot: function () {
    let that = this;
    wx.request({
      url: myurl + '/dish/new_dish?type=hours',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('获取最热菜品（小时）',res);
        that.setData({
          hourshotDish: res.data.data
        })
      },
    })
  },

  /**
   * 获取今日最新菜品
   */
  getDayNew: function () {
    let that = this;
    wx.request({
      url: myurl + '/dish/new_dish?type=new',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('获取今日最新菜品',res);
        that.setData({
          newDish: res.data.data
        })
      },
    })
  },

  to_dishInfo: function (e) {
    let that = this;
    let data=null;
    switch (e.target.dataset.type){
      case 'hourshot': data = that.data.hourshotDish[e.target.dataset.idx]; break;
      case 'daynew': data = that.data.newDish[e.target.dataset.idx]; break;
      case 'dayhot': data = that.data.dayhotDish[e.target.dataset.idx]; break;
      case 'weekhot': data = that.data.weekhotDish[e.target.dataset.idx]; break;
    }
    wx.setStorageSync('dishInfo', data);
    wx.navigateTo({
      url: '/pages/dishInfo/dishInfo?dishID=' + e.target.dataset.id,
    })
  },

  to_showDishList2:function(){
    let that=this;
    let data=[];
    switch(that.data.time){
      case '早餐':  data=that.data.meals['ZC']; break;
      case '午餐': data = that.data.meals['WuC']; break;
      case '下午茶': data = that.data.meals['XWC']; break;
      case '晚餐': data = that.data.meals['WanC']; break;
      case '夜宵': data = that.data.meals['YX']; break;
    }
    wx.setStorageSync('showDishList', data)
    wx.navigateTo({
      url: '/pages/showDishList/showDishList?_type=' + that.data.time,
    })
  },

  /**
   * 获取中华菜系
   */
  getRandomCuisineDish:function(){
    let that=this;
    wx.request({
      url: myurl+'/dish/subcategory?category=中华菜系',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        let arr=res.data.data;
        let i = Math.floor(Math.random() * arr.length);
        that.setData({
          randomCuisine:arr[i].cuisine
        })
        wx.request({
          url: myurl + '/dish/search_subcategory?subcategory=' + arr[i].cuisine,
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            that.setData({
              caixiDish:res.data.data
            })
          },
        })
      },
    })
  },

  to_showDishList3: function () {
    let that = this;
    wx.setStorageSync('showDishList', that.data.caixiDish)
    wx.navigateTo({
      url: '/pages/showDishList/showDishList?_type=' + that.data.randomCuisine,
    })
  },

  /**
   * 获取各地小吃
   */
  getRandomCuisineDish2: function () {
    let that = this;
    wx.request({
      url: myurl + '/dish/subcategory?category=各地小吃',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        let arr = res.data.data;
        let i = Math.floor(Math.random() * arr.length);
        that.setData({
          randomCuisine2: arr[i].cuisine
        })
        wx.request({
          url: myurl + '/dish/search_subcategory?subcategory=' + arr[i].cuisine,
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            that.setData({
              xiaochiDish: res.data.data
            })
          },
        })
      },
    })
  },

  to_showDishList4: function () {
    let that = this;
    wx.setStorageSync('showDishList', that.data.xiaochiDish)
    wx.navigateTo({
      url: '/pages/showDishList/showDishList?_type=' + that.data.randomCuisine2,
    })
  },

  /**
   * 获取推荐菜品
   */
  getRecommend:function(){
    let that = this;
  },

  to_showDishList5: function () {
    let that = this;
    if (app.globalData.userInfo && app.globalData.userInfo!=null){
      //wx.setStorageSync('showDishList', that.data.recommendDish)
      wx.navigateTo({
        url: '/pages/showDishList/showDishList?_type=菜品推荐',
      })
    }else{
      wx.showToast({
        title: '登录之后才能给你推荐菜品哦~~',
        icon: 'none',
        mask: true,
      })
    }
    
  },

})