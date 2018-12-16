const app=getApp();
const myurl=app.globalData.api;
const CityJson = require('../../utils/cityJson.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    _userInfo: null,
    sexList:['男','女','未知'],
    sexIdx:0,
    isUpdate:false,
    name:'',
    avatar_url:'',
    country:['China'],
    province:'',
    provinceList: [],
    provinceCN:[],
    city:'',
    cityList:[],
    cityCN:[],
    sex:'',
    introduction:'',
    cityJson:CityJson.cityJson,
    curr_province:'',
    curr_city:[],
    provinceIdx:0,
    cityIdx:0,
    tempImgSrc:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(that.data.cityJson);

    //省份和城市分开存储
    for(let i=0;i<that.data.cityJson.length;i++){
      that.data.provinceList.push({ name: that.data.cityJson[i].name, en: that.data.cityJson[i].name_en});
      that.data.provinceCN.push(that.data.cityJson[i].name);
      that.data.cityList[that.data.cityJson[i].name]=[];
      for (let j = 0; j < that.data.cityJson[i].city.length;j++){
        that.data.cityList[that.data.cityJson[i].name].push({ name: that.data.cityJson[i].city[j].name, en: that.data.cityJson[i].city[j].name_en})
      }
    }
    console.log(that.data.provinceList);
    console.log(that.data.cityList);
    that.setData({
      provinceList: that.data.provinceList,
      cityList: that.data.cityList
    })

    if(app.globalData.userInfo==null){
      wx.request({
        url: myurl + '/user/user_info?userID=' + app.globalData.userInfo.ID,
        success: function (res) {
          console.log('个人信息：', res);

          //省份和城市匹配
          for (let i = 0; i < that.data.provinceList.length;i++){
            //that.data.provinceCN.push(that.data.provinceList[i].name);
            if (res.province == that.data.provinceList[i].name){
              that.data.provinceIdx=i;
              that.data.curr_city = that.data.cityList[res.province];
              for (let j = 0; j < that.data.cityList[res.province].length;j++){
                that.data.cityCN.push(that.data.cityList[res.province][j].name);
                if (res.city == that.data.cityList[res.province][j].name){
                  that.data.cityIdx=j;
                }
              }
            }
          }

          that.setData({
            userInfo:res.data.userInfo,
            _userInfo: res.data.userInfo,
            provinceCN: that.data.provinceCN,
            curr_province: res.province,
            provinceIdx: that.data.provinceIdx,
            curr_city: that.data.curr_city,
            cityCN: that.data.cityCN,
            cityIdx: that.data.cityIdx,
            sexIdx:(res.data.sex == '男' ? 0 : (res.data.sex == '女' ? 1 : 2)),
            tempImgSrc: res.data.avatar_url,
            introduction: res.data.introduction,
            name:res.data.name
          })
        },
      })
    }else{
      let res = app.globalData.userInfo;
      for (let i = 0; i < that.data.provinceList.length; i++) {
        //that.data.provinceCN.push(that.data.provinceList[i].name);
        if (res.province == that.data.provinceList[i].name) {
          that.data.provinceIdx = i;
          that.data.curr_city = that.data.cityList[res.province];
          for (let j = 0; j < that.data.cityList[res.province].length; j++) {
            that.data.cityCN.push(that.data.cityList[res.province][j].name);
            if (res.city == that.data.cityList[res.province][j].name) {
              that.data.cityIdx = j;
            }
          }
        }
      }
      that.setData({
        userInfo: res,
        _userInfo: res,
        provinceCN: that.data.provinceCN,
        curr_province: res.province,
        provinceIdx: that.data.provinceIdx,
        curr_city: that.data.curr_city,
        cityCN: that.data.cityCN,
        cityIdx: that.data.cityIdx,
        sexIdx:(res.sex == '男' ? 0 : (res.sex == '女' ? 1 : 2)),
        tempImgSrc: res.avatar_url,
        introduction: res.introduction,
        name:res.name
      })
      console.log('从globalData中获取个人信息：', that.data.userInfo);
    }
  },

  updateInfo:function(){
    let that=this;
    let _cityCN=[];
    if(that.data.isUpdate){
      for (let i = 0; i < that.data.provinceList.length; i++) {
        if (that.data._userInfo.province == that.data.provinceList[i].name) {
          that.data.provinceIdx = i;
          that.data.curr_city = that.data.cityList[that.data._userInfo.province];
          for (let j = 0; j < that.data.cityList[that.data._userInfo.province].length; j++) {
            _cityCN.push(that.data.cityList[that.data._userInfo.province][j].name);
            if (that.data._userInfo.city == that.data.cityList[that.data._userInfo.province][j].name) {
              that.data.cityIdx = j;
            }
          }
        }
      }
      that.setData({
        userInfo: that.data._userInfo,
        curr_province: that.data._userInfo.province,
        provinceIdx: that.data.provinceIdx,
        curr_city: that.data.curr_city,
        cityCN: _cityCN,
        cityIdx: that.data.cityIdx,
        introduction: that.data._userInfo.introduction,
        sexIdx: (that.data._userInfo.sex == '男' ? 0 : (that.data._userInfo.sex == '女' ? 1 : 2)),
        tempImgSrc: that.data._userInfo.avatar_url,
        name:that.data._userInfo.name
      })
    }
    that.setData({
      isUpdate: !that.data.isUpdate
    })
  },

  saveInfo:function(){
    let that=this;
    let obj={};
    if(that.data.name!=that.data._userInfo.name){
      obj.name=that.data.name;
    }
    if (that.data.userInfo.province != that.data._userInfo.province) {
      obj.province = that.data.userInfo.province;
    }
    if (that.data.userInfo.city != that.data._userInfo.city) {
      obj.city = that.data.userInfo.city;
    }
    if (that.data.userInfo.sex != that.data._userInfo.sex) {
      obj.sex = that.data.userInfo.sex;
    }
    if (that.data.introduction != that.data._userInfo.introduction) {
      obj.introduction = that.data.introduction;
    }
    if (that.data.tempImgSrc != that.data._userInfo.avatar_url) {
      //obj.avatar_url = that.data.tempImgSrc;
      wx.uploadFile({
        url: myurl + '/upload_image',
        filePath: that.data.tempImgSrc,
        name: 'xx',
        header: { 'Content-Type': "multipart/form-data" },
        formData: { type: 'avatar' },
        success: function (res) {
          console.log('上传新头像：', res);
          wx.request({
          url: myurl + '/user/updateinfo',
          data: {
            userID: app.globalData.userID,
            _updateData: JSON.stringify({ avatar_url: myurl + JSON.parse(res.data).data})
          },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res2) {
            that.setData({
              tempImgSrc: myurl + JSON.parse(res.data).data,
              '_userInfo.avatar_url': myurl + JSON.parse(res.data).data,
              'userInfo.avatar_url': myurl + JSON.parse(res.data).data,
              isUpdate: false
            })
            app.globalData.userInfo.avatar_url = myurl + JSON.parse(res.data).data;
          },
          })
        },
      })
    }
    //https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epsxMo5qmngb3ZkrbvQicVIm52NS5I9PJBSGXEichYRXujqiaicXiahxVB7CtKNMKiaC9ehE7lXABNYG90Q/132
    if (JSON.stringify(obj)!='{}'){
      wx.request({
        url: myurl + '/user/updateinfo',
        data: {
          userID: app.globalData.userID,
          _updateData: JSON.stringify(obj)
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log('修改信息：', res);
          if (res.data.success) {
            that.setData({
              isUpdate: false
            })
            console.log(app.globalData);
            wx.request({
              url: myurl + '/user/user_info?userID=' + app.globalData.userInfo.ID,
              success: function (res) {
                if (res.data.success) {
                  app.globalData.userInfo = res.data.data.userInfo[0];
                  that.setData({
                    userInfo: res.data.data.userInfo[0],
                    _userInfo: res.data.data.userInfo[0],
                    introduction: res.data.data.userInfo[0].introduction
                  })
                }
              },
            })
            wx.showToast({
              title: '信息修改成功！',
              icon: 'success',
              duration: 2000,
              mask: true,
            })
          } else {
            wx.showToast({
              title: '信息修改失败！',
              icon: 'success',
              mask: true,
            })
          }
        },
      })
    }
    
    
  },

  changePicker:function(e){
    let that=this;
    switch(e.target.dataset.type){
      case 'sex':
        that.setData({
          'userInfo.sex': that.data.sexList[e.detail.value],
          sex: that.data.sexList[e.detail.value],
          sexIdx: e.detail.value
        })
        break;
      case 'country':
        that.setData({
          'userInfo.country': that.data.cityCN[e.detail.value]
        })
        break;
      case 'province':
        let _cityCN=[];
        that.data.curr_city = that.data.cityList[that.data.provinceCN[e.detail.value]];
        for (let j = 0; j < that.data.curr_city.length; j++) {
          _cityCN.push(that.data.curr_city[j].name);
        }
        that.setData({
          cityIdx:0,
          cityCN:_cityCN,
          provinceIdx:e.detail.value,
          'userInfo.province': that.data.provinceCN[e.detail.value],
          'userInfo.city': _cityCN[0]
        })
        break;
      case 'city':
        that.setData({
          cityIdx:e.detail.value,
          'userInfo.city': that.data.cityCN[e.detail.value]
        })
        break;
    }
  },

  changeImg:function(){
    let that=this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          tempImgSrc:res.tempFilePaths[0]
        })
      },
    })
  },

  inputName:function(e){
    let that=this;
    that.data.name=e.detail.value;
  },

  inputIntroduction:function(e){
    let that=this;
    that.data.introduction=e.detail.value;
  }

})