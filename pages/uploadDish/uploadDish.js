const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.globalData.userInfo,
    tasteList: ["鱼香味", "酸辣味", "麻辣味", "酱香味", "豆瓣味", "香辣味", "咸鲜味", "家常味", "酸味", "酸甜味", "其它口味", "甜味", "椒麻味", "五香味", "蒜香味", "茄汁味", "苦香味", "奶香味", "姜汁味", "麻酱味", "葱香味", "糖醋味", "咖喱味", "怪味", "黑椒味", "果味", "芥末味", "红油味", "其他口味"],
    menu: ['中华菜系', '家常菜谱', '各地小吃', '疾病调理', '功能性调理', '脏腑调理','人群膳食'],
    _cuisine:{
      '中华菜系': ["川菜", "湘菜", "粤菜", "东北菜", "江西菜", "豫菜", "广西菜", "浙菜", "苏菜", "闽菜", "沪菜", "京菜", "西北菜", "山西菜", "港台菜", "云贵菜", "湖北菜", "徽菜", "鲁菜", "其它菜"],
      '家常菜谱': ["家常菜", "海鲜", "凉菜", "汤粥", "热菜", "素食", "卤酱", "时尚饮品", "糕点主食", "甜品点心", "火锅底料", "酱料蘸料", "微波炉", "干果制作", "私家菜"],
      '各地小吃': ["广东小吃", "北京小吃", "四川小吃", "山东小吃", "陕西小吃", "湖南小吃", "河南小吃", "上海小吃", "江苏小吃", "河北小吃", "浙江小吃", "重庆小吃", "湖北小吃", "天津小吃", "江西小吃", "广西小吃", "新疆小吃", "福建小吃", "云南小吃", "贵州小吃", "辽宁小吃", "甘肃小吃", "香港小吃", "台湾小吃", "安徽小吃", "黑龙江小吃", "成都小吃", "西藏小吃", "宁夏小吃", "蒙古小吃", "青海小吃", "海南小吃", "山西小吃", "吉林小吃"],
      '疾病调理': ["前列腺", "肠炎", "高血压", "糖尿病", "高血脂", "冠心病", "中风", "消化性溃疡", "防癌抗癌", "胆石症", "麻疹", "结核病", "肾炎", "肝硬化", "痛风", "胃炎", "甲状腺", "动脉硬化", "肝炎", "贫血", "子宫脱垂", "更年期", "月经不调", "痔疮", "痛经", "小儿遗尿", "关节炎", "跌打骨折损伤", "咽炎", "骨质疏松", "肺气肿", "尿路结石", "术后", "口腔溃疡", "支气管炎", "耳鸣"],
      '功能性调理': ["美容", "神经衰弱", "消化不良", "减肥", "延缓衰老", "补虚养身", "滋阴补肾", "乌发", "壮腰健肾", "补阳壮阳", "不孕不育", "夜尿多", "明目", "清热解毒", "产后调理", "营养不良", "益智补脑", "脚气", "防暑", "健脾开胃", "清热去火", "祛痰", "肢寒畏冷", "通乳", "解酒", "增肥", "头痛"],
      '脏腑调理': ["养肝", "补肾", "养肺", "补心", "补脾", "补血", "补气", "气血双补", "感冒", "哮喘", "腹泻", "失眠", "癫痫", "便秘", "水肿", "活血化瘀", "疏肝理气", "利尿", "健忘", "呕吐", "阳痿早泄", "痢疾", "心悸", "自汗盗汗", "胃调养", "咳喘"],
      '人群膳食': ["产妇", "幼儿", "孕妇", "婴儿", "哺乳期", "老人", "学龄期儿童", "青少年", "高温环境作业人群", "学龄前儿童", "低温环境作业人群", "围孕期", "运动员", "接触电离辐射人员", "接触化学毒素人员"]
    },
    cuisine:[],
    menu_curr:'',
    cuisine_curr:'',
    taste:'',
    mainPic:'',
    dishName:'',
    features:'',
    prepareT:'',
    cookingT:'',
    difficult: ['新手尝试', '初级入门','初中水平','中级掌勺','高级厨师','厨神级'],
    difficult_curr:'',
    component: ['一人份', '两人份', '三人份', '四人份', '五人份', '六人份', '七人份', '八人份', '九人份', '十人份'],
    component_curr:'',
    processList: ['炒','煮','干煸','腌','酱','煎','蒸', '其它工艺', '烧', '爆', '拌', '炖', '泡', '焖', '微波', '烤', '冻', '干锅', '卤', '炸', '熘', '煨', '煲', '腊', '砂锅', '灼', '汆', '熏', '扒', '拔丝', '烩', '炝', '糖蘸', '烙', '烘焙', '刺身', '焗', '榨汁', '其他工艺'],
    process:'',
    //xx:[]

    zhuliaoNum: 0,
    fuliaoNum: 0,
    tiaoliaoNum: 0,
    zhuliaoNameList: [{ "zhuLiaoName": "", "zhuLiaoWeight": "" }],
    fuliaoNameList: [{ "fuliaoName": "", "fuliaoWeight": "" }],
    tiaoliaoNameList: [{ "tiaoliaoName": "", "tiaoliaoWeight": "" }],
    zhuliaoImgList: [""],
    fuliaoImgList: [""],
    tiaoliaoImgList: [""],

    zlFold:false,
    flFold:false,
    tlFold:false,
    bzFold:false,

    stepNum: 0,
    inputListData: [""],
    imageListSrc: [""],
    imgsrc: '',
    stepList: [],//[{ "newStepText": "","newStepImgSrc":""}]
    description:'',
  },
  uploadDish: function () {
    let that=this;
    wx.request({
      url: myurl + '/dish/upload_dish',
      data: {
        user:{
          id:that.data.userInfo.ID,
          name:that.data.userInfo.name
        },
        baseInfo:{
          dishName:that.data.dishName,
          menu: that.data.menu_curr,
          cuisine: that.data.cuisine_curr,
          taste: that.data.taste,
          process:that.data.process,
          mainPic: that.data.mainPic,
          features: that.data.features,
          prepareT: that.data.prepareT,
          cookingT: that.data.cookingT,
          component: that.data.component_curr,
          difficult: that.data.difficult_curr,
          description: that.data.description
        },
        shicai:{
          zhuliaoNameList: that.data.zhuliaoNameList,
          fuliaoNameList: that.data.fuliaoNameList,
          tiaoliaoNameList: that.data.tiaoliaoNameList,
          zhuliaoImgList: that.data.zhuliaoImgList,
          fuliaoImgList: that.data.fuliaoImgList,
          tiaoliaoImgList: that.data.tiaoliaoImgList
        },
        step:{
          step: that.data.stepList
        }
      },
      header: { enctype: "multipart/form-data" },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
        console.log(res); 
        if(res.data.success){
          wx.showToast({
            title: '添加菜品成功！',
            mask: true,
          })
          that.setData({
            menu_curr: '',
            cuisine_curr: '',
            taste: '',
            mainPic: '',
            dishName: '',
            features: '',
            prepareT: '',
            cookingT: '',
            difficult_curr: '',
            component_curr: '',
            process: '',
            zhuliaoNum: 0,
            fuliaoNum: 0,
            tiaoliaoNum: 0,
            zhuliaoNameList: [{ "zhuLiaoName": "", "zhuLiaoWeight": "" }],
            fuliaoNameList: [{ "fuliaoName": "", "fuliaoWeight": "" }],
            tiaoliaoNameList: [{ "tiaoliaoName": "", "tiaoliaoWeight": "" }],
            zhuliaoImgList: [""],
            fuliaoImgList: [""],
            tiaoliaoImgList: [""],
            zlFold: false,
            flFold: false,
            tlFold: false,
            bzFold: false,
            stepNum: 0,
            inputListData: [""],
            imageListSrc: [""],
            imgsrc: '',
            stepList: [],
            description: '',
          })
        }else{
          wx.showToast({
            title: '添加菜品失败！',
            icon: 'none',
            mask: true,
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      userInfo: app.globalData.userInfo
    })
    // wx.request({
    //   url: myurl,
    //   data: '',
    //   header: {},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     for(let i=0;i<res.data.length;i++){
    //       that.data.xx.push(res.data[i].taste);
    //     }
    //     console.log(that.data.xx);
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },

  onShow:function(){
    if(!this.data.userInfo || this.data.userInfo==null){
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }
  },

  selectTaste:function(e){
    let that = this;
    console.log(e);
    that.setData({
      taste: that.data.tasteList[e.detail.value]
    })
  },

  selectProcess:function(e){
    let that = this;
    console.log(e);
    that.setData({
      process: that.data.processList[e.detail.value]
    })
  },

  selectMenu:function(e){
    let that=this;
    console.log(e);
    that.setData({
      menu_curr : that.data.menu[e.detail.value],
      cuisine : that.data._cuisine[that.data.menu[e.detail.value]]
    })
  },

  selectCuisine:function(e){
    let that=this;
    console.log(e);
    that.setData({
      cuisine_curr : that.data.cuisine[e.detail.value]
    })
  },

  selectDifficult:function(e){
    let that = this;
    console.log(e);
    that.setData({
      difficult_curr: that.data.difficult[e.detail.value]
    })
  },

  selectComponent:function(e){
    let that = this;
    console.log(e);
    that.setData({
      component_curr: that.data.component[e.detail.value]
    })
  },

  chooseMainPic:function(){
    let that=this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.uploadFile({
          url: myurl + '/upload_image',
          filePath: res.tempFilePaths[0],
          name: 'xx',
          header: {},
          formData: {type:'dish'},
          success: function (res) {
            that.setData({
              mainPic: myurl + JSON.parse(res.data).data
            })
          },
        })
      },
    })
  },

  inputValue:function(e){
    let that=this;
    switch (e.target.dataset.type){
      case 'dishName':
        that.setData({
          dishName: e.detail.value
        })
        break;
      case 'features':
        that.setData({
          features: e.detail.value
        })
        break;
      case 'prepareT':
        that.setData({
          prepareT: e.detail.value
        })
        break;
      case 'cookingT':
        that.setData({
          cookingT: e.detail.value
        })
        break;
      case 'component':
        that.setData({
          component: e.detail.value
        })
        break;
    }
  },


  addCaiLiao: function (e) {
    let that = this;
    //console.log(e);
    switch (e.target.dataset.type) {
      case 'ZL':
        that.data.zhuliaoNameList[that.data.zhuliaoNum] = { "zhuLiaoName": "", "zhuLiaoWeight": "" };
        that.data.zhuliaoImgList[that.data.zhuliaoNum] = "";
        that.setData({
          zhuliaoNum: that.data.zhuliaoNum + 1,
          zhuliaoNameList: that.data.zhuliaoNameList,
          zhuliaoImgList: that.data.zhuliaoImgList
        }); break;
      case 'FL':
        that.data.fuliaoNameList[that.data.fuliaoNum] = { "fuliaoName": "", "fuliaoWeight": "" };
        that.data.fuliaoImgList[that.data.fuliaoNum] = "";
        that.setData({
          fuliaoNum: that.data.fuliaoNum + 1,
          fuliaoNameList: that.data.fuliaoNameList,
          fuliaoImgList: that.data.fuliaoImgList
        }); break;
      case 'TL':
        that.data.tiaoliaoNameList[that.data.tiaoliaoNum] = { "tiaoliaoName": "", "tiaoliaoWeight": "" };
        that.data.tiaoliaoImgList[that.data.tiaoliaoNum] = "";
        that.setData({
          tiaoliaoNum: that.data.tiaoliaoNum + 1,
          tiaoliaoNameList: that.data.tiaoliaoNameList,
          tiaoliaoImgList: that.data.tiaoliaoImgList
        }); break;
      case 'BZ':
        that.data.inputListData[that.data.stepNum] = "";
        that.data.imageListSrc[that.data.stepNum] = "";
        that.data.stepList.push({ "newStepText": "", "newStepImgSrc": "" });
        that.setData({
          stepNum: that.data.stepNum + 1,
          inputListData: that.data.inputListData,
          imageListSrc: that.data.imageListSrc,
          stepList: that.data.stepList
        }); break;
    }
  },

  reduce: function (e) {
    console.log(e);
    let that = this;
    let shicaiList = null;
    switch (e.target.dataset.tag) {
      case 'ZL':
        (that.data.zhuliaoNameList).splice(e.target.dataset.idx, 1);
        (that.data.zhuliaoImgList).splice(e.target.dataset.idx, 1);
        that.data.zhuliaoNum = that.data.zhuliaoNum - 1;
        that.setData({
          zhuliaoNameList: that.data.zhuliaoNameList,
          zhuliaoImgList: that.data.zhuliaoImgList,
          zhuliaoNum: that.data.zhuliaoNum
        })
        if(that.data.zhuliaoNum<3){
          that.setData({
            zlFold:false
          })
        }
        break;
      case 'FL':
        (that.data.fuliaoNameList).splice(e.target.dataset.idx, 1);
        (that.data.fuliaoImgList).splice(e.target.dataset.idx, 1);
        that.data.fuliaoNum = that.data.fuliaoNum - 1;
        that.setData({
          fuliaoImgList: that.data.fuliaoImgList,
          fuliaoNameList: that.data.fuliaoNameList,
          fuliaoNum: that.data.fuliaoNum
        })
        if (that.data.fuliaoNum < 3) {
          that.setData({
            flFold: false
          })
        }
        break;
      case 'TL':
        (that.data.tiaoliaoNameList).splice(e.target.dataset.idx, 1);
        (that.data.tiaoliaoImgList).splice(e.target.dataset.idx, 1);
        that.data.tiaoliaoNum = that.data.tiaoliaoNum - 1;
        that.setData({
          tiaoliaoNameList: that.data.tiaoliaoNameList,
          tiaoliaoImgList: that.data.tiaoliaoImgList,
          tiaoliaoNum: that.data.tiaoliaoNum
        })
        if (that.data.tiaoliaoNum < 3) {
          that.setData({
            tlFold: false
          })
        }
        break;
      case 'BZ':
        (that.data.inputListData).splice(e.target.dataset.idx, 1);
        (that.data.imageListSrc).splice(e.target.dataset.idx, 1);
        that.data.stepNum = that.data.stepNum - 1;
        that.setData({
          inputListData: that.data.inputListData,
          imageListSrc: that.data.imageListSrc,
          stepNum: that.data.stepNum
        })
        if (that.data.stepNum < 3) {
          that.setData({
            bzFold: false
          })
        }
        break;
    }
  },

  inputValue2: function (e) {
    let that = this;
    switch (e.target.dataset.tag) {
      case 'ZL':
        if (e.target.dataset.type == 'name') {
          that.data.zhuliaoNameList[e.target.dataset.idx]["zhuLiaoName"] = e.detail.value;
        } else {
          if (e.target.dataset.type == 'count') {
            that.data.zhuliaoNameList[e.target.dataset.idx]["zhuLiaoWeight"] = e.detail.value;
          }
        }
        break;
      case 'FL':
        if (e.target.dataset.type == 'name') {
          that.data.fuliaoNameList[e.target.dataset.idx]["fuliaoName"] = e.detail.value;
        } else {
          if (e.target.dataset.type == 'count') {
            that.data.fuliaoNameList[e.target.dataset.idx]["fuliaoWeight"] = e.detail.value;
          }
        }
        break;
      case 'TL':
        if (e.target.dataset.type == 'name') {
          that.data.tiaoliaoNameList[e.target.dataset.idx]["tiaoliaoName"] = e.detail.value;
        } else {
          if (e.target.dataset.type == 'count') {
            that.data.tiaoliaoNameList[e.target.dataset.idx]["tiaoliaoWeight"] = e.detail.value;
          }
        }
        break;
    }
  },

  chooseImg: function (e) {
    let that = this;
    switch (e.target.dataset.tag) {
      case 'ZL':
        wx.chooseImage({
          count: 1,
          sourceType: ['album', 'camera'],
          success: function (res) {
            wx.uploadFile({
              url: myurl + '/upload_image',
              filePath: res.tempFilePaths[0],
              name: 'xx',
              header: {},
              formData: {},
              success: function (res) {
                that.data.zhuliaoImgList[e.target.dataset.idx] = myurl + JSON.parse(res.data).data;
                that.setData({
                  zhuliaoImgList: that.data.zhuliaoImgList
                })
                console.log(that.data.zhuliaoImgList[e.target.dataset.idx])
              },
            })
          },
        })
        break;
      case 'FL':
        wx.chooseImage({
          count: 1,
          sourceType: ['album', 'camera'],
          success: function (res) {
            wx.uploadFile({
              url: myurl + '/upload_image',
              filePath: res.tempFilePaths[0],
              name: 'xx',
              header: {},
              formData: {},
              success: function (res) {
                that.data.fuliaoImgList[e.target.dataset.idx] = myurl + JSON.parse(res.data).data;
                that.setData({
                  fuliaoImgList: that.data.fuliaoImgList
                })
                console.log(that.data.fuliaoImgList[e.target.dataset.idx]);
              },
            })
          },
        })
        break;
      case 'TL':
        wx.chooseImage({
          count: 1,
          sourceType: ['album', 'camera'],
          success: function (res) {
            wx.uploadFile({
              url: myurl + '/upload_image',
              filePath: res.tempFilePaths[0],
              name: 'xx',
              header: {},
              formData: {},
              success: function (res) {
                that.data.tiaoliaoImgList[e.target.dataset.idx] = myurl + JSON.parse(res.data).data;
                that.setData({
                  tiaoliaoImgList: that.data.tiaoliaoImgList
                })
                console.log(that.data.tiaoliaoImgList[e.target.dataset.idx]);
              },
            })
          },
        })
        break;
    }
  },

  submitShiCai: function () {
    let that = this;
    wx.request({
      url: myurl + '/dish/upload_dish',
      data: {
        ingredients: JSON.stringify(that.data.zhuliaoNameList), //主料
        excipient: JSON.stringify(that.data.fuliaoNameList),//辅料
        seasoning: JSON.stringify(that.data.tiaoliaoNameList),//调料
        zlImgList: that.data.zhuliaoImgList,
        flImgList: that.data.fuliaoImgList,
        tlImgList: that.data.tiaoliaoImgList
      },
      header: { enctype: "multipart/form-data" },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) { console.log(res); },
    })
  },

  fold:function(e){
    let that=this;
    switch (e.target.dataset.type){
      case 'ZL':
        that.setData({
          zlFold:!that.data.zlFold
        })
        break;
      case 'FL':
        that.setData({
          flFold: !that.data.flFold
        })
        break;
      case 'TL':
        that.setData({
          tlFold: !that.data.tlFold
        })
        break;
      case 'BZ':
        that.setData({
          bzFold: !that.data.bzFold
        })
        break;
    }
  },


  chooseImage2: function (e) {
    let that = this;
    console.log(e);
    wx.chooseImage({
      count: 1,
      sizeType: [],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.uploadFile({
          url: myurl+'/upload_image',
          filePath: res.tempFilePaths[0],
          name: 'xx',
          formData: {type:'step'},
          success: function(res) {
            that.data.imageListSrc[e.target.dataset.idx] = myurl + JSON.parse(res.data).data;
            that.data.stepList[e.target.dataset.idx]["newStepImgSrc"] = myurl + JSON.parse(res.data).data;
            that.setData({
              imageListSrc: that.data.imageListSrc
            })
          }
        })
      },
    })
  },

  // addStep: function () {
  //   this.data.inputListData[this.data.stepNum] = "";
  //   this.data.imageListSrc[this.data.stepNum] = "";
  //   // that.data.stepList.push({ "newStepText": (j + 1) + "、" + that.data.inputListData[j], "newStepImgSrc": imgList[j] });
  //   this.data.stepList.push({"newStepText": "", "newStepImgSrc":"" });
  //   this.setData({
  //     stepNum: this.data.stepNum + 1,
  //     inputListData: this.data.inputListData,
  //     imageListSrc: this.data.imageListSrc,
  //     stepList:this.data.stepList
  //   })
  // },

  inputValue3: function (e) {
    //console.log(e);//e.detail.value
    this.data.inputListData[e.target.dataset.idx] = e.detail.value;
    this.data.stepList[e.target.dataset.idx]["newStepText"] = (e.target.dataset.idx + 1) + "、" + e.detail.value;
  },

  inputDescription:function(e){
    this.data.description = e.detail.value;
  },

  

})