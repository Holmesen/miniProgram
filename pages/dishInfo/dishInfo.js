const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishID:'',
    menu: '菜系',
    cuisine: '类别',
    taste: '',
    mainPic: '',
    dishName: '',
    features: '',
    prepareT: '',
    cookingT: '',
    component: '',
    difficult: '',
    component: '',
    description: '',
    viewCount: 0,
    collectCount: 0,
    likeCount: 0,
    unlikeCount: 0,
    authorName: '',
    authorImg:'',
    process:'',
    date:'0000-00-00',
    zhuliao: [],
    fuliao: [],
    tiaoliao: [],
    stepList: [],
    zan:false,
    collect:false,
    cai:false,
    sameDishList:[],
    dishData:null,
    operate:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let dishID=options.dishID;
    that.data.dishID = options.dishID;
    that.data.operate = app.globalData.operate;
    if(that.data.operate!=null){
      for (let i = 0; i < app.globalData.operate.length; i++) {
        if (app.globalData.operate[i].dishID == options.dishID) {
          if (app.globalData.operate[i].operate == 'collection') {
            that.data.collect = true;
          }
          if (app.globalData.operate[i].operate == 'like') {
            that.data.zan = true;
          }
          if (app.globalData.operate[i].operate == 'unlike') {
            that.data.cai = true;
          }
        }
      }
    }
    that.setData({
      operate: app.globalData.operate,
      zan: that.data.zan,
      collect:that.data.collect,
      cai:that.data.cai
    })
    /*
     let dishInfo = that.dishOper([wx.getStorageSync('dishInfo')])[0];
     that.setData({
       menu: dishInfo.menu,
       cuisine: dishInfo.cuisine,
       taste: dishInfo.taste,
       mainPic: dishInfo.img_src,
       dishName: dishInfo.name,
       features: dishInfo.features,
       prepareT: dishInfo.time2,
       cookingT: dishInfo.time1,
       component: dishInfo.component,
       difficult: dishInfo.difficult,
       process: dishInfo.process,
       description: dishInfo.description,
       zhuliao: dishInfo.ingredients,
       fuliao: dishInfo.excipient,
       tiaoliao: dishInfo.seasoning,
       stepList: dishInfo.practice,
       viewCount: dishInfo._view,
       collectCount: dishInfo.collection,
       likeCount: dishInfo._like,
       unlikeCount: dishInfo.unlike,
       authorName: dishInfo.user_name,
       authorImg: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epsxMo5qmngb3ZkrbvQicVIm52NS5I9PJBSGXEichYRXujqiaicXiahxVB7CtKNMKiaC9ehE7lXABNYG90Q/132',
       date: dishInfo.date,
     })
    */
    wx.request({
      url: myurl +'/dish/dish_info?dishID='+dishID,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        let objData = that.dishOper(res.data.data);
        console.log(objData);
        that.setData({
          dishID: objData[0].ID,
          menu: objData[0].menu,
          cuisine: objData[0].cuisine,
          taste: objData[0].taste,
          mainPic: objData[0].img_src,
          dishName: objData[0].name,
          features: objData[0].features,
          prepareT: objData[0].time2,
          cookingT: objData[0].time1,
          component: objData[0].component,
          difficult: objData[0].difficult,
          process:objData[0].process,
          description: objData[0].description,
          zhuliao: objData[0].ingredients,
          fuliao: objData[0].excipient,
          tiaoliao: objData[0].seasoning,
          stepList: objData[0].practice,
          viewCount: objData[0]._view,
          collectCount: objData[0].collection,
          likeCount: objData[0]._like,
          unlikeCount: objData[0].unlike,
          authorName: res.data.avatar[0].name,
          authorImg: res.data.avatar[0].avatar_url,
          date: objData[0].date,
          dishData: objData[0],
        })
        that.getSameDish(that.data.menu, that.data.cuisine);
      },
    })
  },

  onShow: function(){
    wx.setStorageSync('dishInfo', this.data.dishData);
  },

  getSameDish:function(menu,cuisine){
    let that=this;
    if(menu==''){
      menu='菜系';
    }
    if(cuisine==''){
      cuisine='类别';
    }
    wx.request({
      url: myurl+'/dish/same_menu_cuisine?menu='+menu+'&cuisine='+cuisine+'&limit=0&offset=6',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        for(let i=0;i<res.data.data.length;i++){
          if(res.data.data[i].ID==that.data.dishID){
            (res.data.data).splice(i,1);
          }
        }
        that.setData({
          sameDishList:res.data.data
        })
      },
    })
  },

  viewBigPic:function(e){
    wx.previewImage({
      urls: [e.target.dataset.imgsrc],
    })
  },

  to_dishInfo: function (e) {
    let that = this;
    wx.setStorageSync('dishInfo', that.data.sameDishList[e.target.dataset.idx]);
    wx.navigateTo({
      url: '/pages/dishInfo/dishInfo?dishID=' + e.target.dataset.id,
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

  operate:function(e){
    let that=this;
    let _url='';
    if(app.globalData.userInfo&&app.globalData.userInfo!=null){
      switch (e.target.dataset.tag) {
        case 'zan':
          _url = myurl + '/operate/like?dishID=' + that.data.dishID + '&userID=' + app.globalData.userInfo.ID + '&avatarID=' + that.data.dishData.user_id + '&operate=like&flag=' + that.data.zan;
          break;
        case 'collect':
          _url = myurl + '/operate/' + (that.data.collect ? 'un_collect_dish' : 'collect_dish') + '?dishID=' + that.data.dishID + '&userID=' + app.globalData.userInfo.ID + '&avatarID=' + that.data.dishData.user_id + '&flag=' + that.data.collect;
          break;
        case 'cai':
          _url = myurl + '/operate/unlike?dishID=' + that.data.dishID + '&userID=' + app.globalData.userInfo.ID + '&avatarID=' + that.data.dishData.user_id + '&flag=' + that.data.cai;
          break;
      }
      wx.request({
        url: _url,
        success: function (res) {
          console.log(res);
          if (res.data.success == true) {
            switch (e.target.dataset.tag) {
              case 'zan':
                if (that.data.zan)
                  that.data.likeCount -= 1;
                else
                  that.data.likeCount += 1;
                that.setData({ zan: !that.data.zan, likeCount: that.data.likeCount });
                break;
              case 'collect':
                if (that.data.collect)
                  that.data.collectCount -= 1;
                else
                  that.data.collectCount += 1;
                that.setData({ collect: !that.data.collect, collectCount: that.data.collectCount });
                break;
              case 'cai':
                if (that.data.cai)
                  that.data.unlikeCount -= 1;
                else
                  that.data.unlikeCount += 1;
                that.setData({ cai: !that.data.cai, unlikeCount: that.data.unlikeCount });
                break;
            }
            wx.request({
              url: myurl+'/operate/operate?userID=' + app.globalData.userInfo.ID,
              success: function(res) {
                app.globalData.operate=res.data.data;
              },
            })
          } else {
            wx.showToast({
              title: '操作失败！',
              icon: 'none',
              duration: 2000,
              mask: true,
            })
          }
        },
      })
    }else{
      wx.showToast({
        title: '请先登录再操作！',
        icon: 'none',
        mask: true,
      })
    }
  }
  

})