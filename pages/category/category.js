const util = require('../../utils/util.js');
const app = getApp();
const myurl = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: ['中华菜系', '家常菜谱', '各地小吃', '疾病调理', '功能性调理', '脏腑调理', '人群膳食'],
    _cuisine: {
      '中华菜系': ["川菜", "湘菜", "粤菜", "东北菜", "江西菜", "豫菜", "广西菜", "浙菜", "苏菜", "闽菜", "沪菜", "京菜", "西北菜", "山西菜", "港台菜", "云贵菜", "湖北菜", "徽菜", "鲁菜", "其它菜"],
      '家常菜谱': ["家常菜", "海鲜", "凉菜", "汤粥", "热菜", "素食", "卤酱", "时尚饮品", "糕点主食", "甜品点心", "火锅底料", "酱料蘸料", "微波炉", "干果制作", "私家菜"],
      '各地小吃': ["广东小吃", "北京小吃", "四川小吃", "山东小吃", "陕西小吃", "湖南小吃", "河南小吃", "上海小吃", "江苏小吃", "河北小吃", "浙江小吃", "重庆小吃", "湖北小吃", "天津小吃", "江西小吃", "广西小吃", "新疆小吃", "福建小吃", "云南小吃", "贵州小吃", "辽宁小吃", "甘肃小吃", "香港小吃", "台湾小吃", "安徽小吃", "黑龙江小吃", "成都小吃", "西藏小吃", "宁夏小吃", "蒙古小吃", "青海小吃", "海南小吃", "山西小吃", "吉林小吃"],
      '疾病调理': ["前列腺", "肠炎", "高血压", "糖尿病", "高血脂", "冠心病", "中风", "消化性溃疡", "防癌抗癌", "胆石症", "麻疹", "结核病", "肾炎", "肝硬化", "痛风", "胃炎", "甲状腺", "动脉硬化", "肝炎", "贫血", "子宫脱垂", "更年期", "月经不调", "痔疮", "痛经", "小儿遗尿", "关节炎", "跌打骨折损伤", "咽炎", "骨质疏松", "肺气肿", "尿路结石", "术后", "口腔溃疡", "支气管炎", "耳鸣"],
      '功能性调理': ["美容", "神经衰弱", "消化不良", "减肥", "延缓衰老", "补虚养身", "滋阴补肾", "乌发", "壮腰健肾", "补阳壮阳", "不孕不育", "夜尿多", "明目", "清热解毒", "产后调理", "营养不良", "益智补脑", "脚气", "防暑", "健脾开胃", "清热去火", "祛痰", "肢寒畏冷", "通乳", "解酒", "增肥", "头痛"],
      '脏腑调理': ["养肝", "补肾", "养肺", "补心", "补脾", "补血", "补气", "气血双补", "感冒", "哮喘", "腹泻", "失眠", "癫痫", "便秘", "水肿", "活血化瘀", "疏肝理气", "利尿", "健忘", "呕吐", "阳痿早泄", "痢疾", "心悸", "自汗盗汗", "胃调养", "咳喘"],
      '人群膳食': ["产妇", "幼儿", "孕妇", "婴儿", "哺乳期", "老人", "学龄期儿童", "青少年", "高温环境作业人群", "学龄前儿童", "低温环境作业人群", "围孕期", "运动员", "接触电离辐射人员", "接触化学毒素人员"]
    },
    cuisine: ["川菜", "湘菜", "粤菜", "东北菜", "江西菜", "豫菜", "广西菜", "浙菜", "苏菜", "闽菜", "沪菜", "京菜", "西北菜", "山西菜", "港台菜", "云贵菜", "湖北菜", "徽菜", "鲁菜", "其它菜"],
    currMenu:'中华菜系',
    cateType:'菜系',
    category:[],
    _subCategory:{},
    subCategory:['蔬菜','水果','薯类淀粉','菌藻'],
    currMenu2: '蔬果类',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.request({
      url: myurl+'/ingredients/category',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('category:',res);
        for(let i=0;i<res.data.data.length;i++){
          that.data.category.push(res.data.data[i].category);
        }
        that.setData({
          category:that.data.category
        })
      },
    })
    wx.request({
      url: myurl+'/ingredients/subcategory',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('subcategory:', res);
        for (let j = 0; j < res.data.data.length; j++) {
          if (!(that.data._subCategory).hasOwnProperty(res.data.data[j].category)){
            that.data._subCategory[res.data.data[j].category]=[];
          }
          that.data._subCategory[res.data.data[j].category].push(res.data.data[j].subcategory);
        }
        that.setData({
          _subCategory: that.data._subCategory
        })
      },
    })
  },

  switchMenu:function(e){
    let that=this;
    if(that.data.cateType=='菜系'){
      that.setData({
        currMenu: e.target.dataset.tag,
        cuisine: that.data._cuisine[e.target.dataset.tag]
      })
    }else{
      that.setData({
        currMenu2: e.target.dataset.tag,
        subCategory: that.data._subCategory[e.target.dataset.tag]
      })
    }
    
  },

  switchCate:function(e){
    this.setData({
      cateType: e.target.dataset.tag,
    })
  },

  showSubCateDish:function(e){
    let that=this;
    if (that.data.cateType=='菜系'){
      wx.navigateTo({
        url: '/pages/showDishList/showDishList?_type=类别&tag=' + e.target.dataset.tag + '&cate=' + that.data.cateType,
      })
    }else{
      wx.navigateTo({
        url: '/pages/showIngreList/showIngreList?_type=类别&tag=' + e.target.dataset.tag + '&cate=' + that.data.cateType,
      })
    }
    
  },

})