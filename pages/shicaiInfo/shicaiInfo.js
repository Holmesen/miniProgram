const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    values: [],
    effect: [],
    match:[],
    info:null,
    yijiTag:false,
    relatedDish:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: myurl + '/ingredients/ingredients?ingredientsID=' + options.shicaiID,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);

        if(res.data.data[0].value!=null&&res.data.data[0].value!=''){
          let _val = (res.data.data[0].value).split(/\n/);
          console.log('_val:',_val);
          // _val.splice(0, 1);
          // for (let i = 0; i < _val.length; i++) {
          //   _val[i] = _val[i].substring(0, _val[i].length - 1);
          // }
          that.setData({
            'info.value':_val,
            values:_val
          })
        }else{
          that.setData({
            'info.value':[]
          })
        }

        let arr = (res.data.data[0].effect).split(".");
        //console.log(arr);
        arr.splice(0, 1);
        for (let i = 0; i < arr.length - 1; i++) {
          arr[i] = arr[i].substring(0, arr[i].length - 2);
        }
        res.data.data[0].effect=arr;
        //console.log(arr);
        let match = (res.data.data[0]._match).substring(1, (res.data.data[0]._match).length - 1);
        let matchList=[];
        if(match!=null && match!=''){
          console.log(match);
          matchList = match.split(',{');
          console.log('matchList1:',matchList);
          res.data.data[0].match_yi = [];
          res.data.data[0].match_ji = [];
          for (let i = 0; i < matchList.length; i++) {
            if (matchList[i].indexOf('{') != 0) {
              matchList[i] = '{' + matchList[i];
            }
            matchList[i] = JSON.parse(matchList[i]);
            if (matchList[i].type == '宜') {
              res.data.data[0].match_yi.push(matchList[i]);
            } else {
              res.data.data[0].match_ji.push(matchList[i]);
            }
          }
          console.log('matchList2:',matchList);
          res.data.data[0]._match = matchList;
        }else{
          res.data.data[0]._match = [];
        }
        that.setData({
          match: matchList,
          info: res.data.data[0]
        })
        that.getRelatedDish();
        console.log(res.data.data[0]);
      },
    })
  },

  yijiSwitch:function(e){
    let that=this;
    if (e.target.dataset.tag=='yi'){
      that.setData({
        yijiTag:false
      })
    }else{
      if (e.target.dataset.tag == 'ji') {
        that.setData({
          yijiTag: true
        })
      }
    }
  },

  getRelatedDish:function(){
    let that=this;
    wx.request({
      url: myurl+'/ingredients/ingred2dish?offset=6',
      data: {
        shicai:`[${that.data.info.name}]`
      },
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('查找相关食材的菜品：',res);
        that.setData({
          relatedDish:res.data.data
        })
      },
    })
  },

  to_dishInfo: function (e) {
    let that = this;
    wx.setStorageSync('dishInfo', that.data.relatedDish[e.target.dataset.idx]);
    wx.navigateTo({
      url: '/pages/dishInfo/dishInfo?dishID=' + e.target.dataset.id,
    })
  }

})