// pages/login/resNext.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    pwd: "",
    reparpwd: "",
    jsphone: '',
    name:"",
    jsyam: "",
    //分享人id
    fxcustid: '',
    userdata: "",
    //下拉框
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['请选择客户类型', '办事处', '代理', '消费者'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    //下拉框
    showss: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatass: ['请选择专属业务负责人(可选)', '消费账户', '平台返利账户', '微信钱包'], //下拉列表的数据
    indexss: 0, //选择的下拉列 表下标,

    //
    accountname: "",
    accountid: "",
  },
//图片自适应
imageLoad: function (e) {
  let _this = this;
  let $width = e.detail.width, //获取图片真实宽度
    $height = e.detail.height,
    ratio = $width / $height; //图片的真实宽高比例
  let viewWidth = 350, //设置图片显示宽度，
    viewHeight = 350 / ratio; //计算的高度值
  _this.setData({
    imgwidth: viewWidth,
    imgheight: viewHeight
  })
},
autoImage: function (e) {

  var that = this;
  var originalWidth = e.detail.width;
  var originalHeight = e.detail.height;
  var imageWidth = 0;
  var imageHeight = 0;
  wx.getSystemInfo({
    complete: (res) => {
      var winWidth = res.windowWidth;
      if (originalWidth > winWidth) {
        var autoWidth = winWidth;
        var autoHeight = (autoWidth * originalHeight) / originalWidth;
        imageWidth = autoWidth + 'px';
        imageHeight = autoHeight + 'px';
      } else {
        imageWidth = originalWidth + 'px';
        imageHeight = originalHeight + 'px';
      }
      that.setData({
        imageWidth: imageWidth,
        imageHeight: imageHeight
      });
    }
  })
},
  //获取用户名
  getPhone: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  //获取用户输入密码
  getMiMa: function (e) {
    console.log(e.detail.value)
    this.setData({
      pwd: e.detail.value
    })
  },
  //获取用户第二次输入密码
  getQueRenMiMa: function (e) {
    console.log(e.detail.value)
    this.setData({
      reparpwd: e.detail.value
    })
  },
  //注册
  zhuce() {
    let phone = this.data.jsphone
    let mima = this.data.pwd
    console.log("点击了注册")
    // console.log("zhanghao", zhanghao)
    console.log("phone", phone)
    console.log("mima", mima)

    // 校验密码
    if (mima.length < 4) {
      wx.showToast({
        icon: 'none',
        title: '密码至少4位',
      })
      return
    };
    if (this.data.pwd != this.data.reparpwd) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
      return;
    };

    // 注册功能的实现
    let url = app.globalData.root + '/register?action=addCoustomer';
    var data = new Object();
    let ind = this.data.indexs - 1
    console.log(ind)
 
      let datalist = {
        "phone": this.data.jsphone,
        "custname": this.data.jsphone,
        "name":this.data.jsphone,
        "password": this.data.pwd,
        "isvalid":"1",
        "score":"0",
       "balance":"0",
       "accountname":this.data.jsphone,
      };
      app.wxRequest('POST', url, {
        "data": JSON.stringify(datalist)
      }, (res) => {
        console.log(res,JSON.stringify(datalist))
        let info = res.data
      if(info=="此用户名已注册"){
        wx.showToast({
          icon:"none",
          title: '此用户名已注册',
        })
      }else if(info=="false"){
        wx.showToast({
          icon:"none",
          title: '注册失败',
        })
      }else{
        wx.navigateTo({
          url: 'login',
        });
        wx.showToast({
          title: '注册成功',
        })
      }
      }, )
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = app.globalData.root + '/register?action=loadChargeid'
    let data = {}
    app.wxRequest("POST", url, data, (res) => {
      console.log(res.data)
      this.setData({
        selectDatass: res.data
      })
    }, (err) => {
      console.log(err)
    })
    // if(Object.keys(wx.getStorageSync('alluserid')).length==0){
    //   wx.showToast({
    //     icon:"none",
    //     title:"空的",
    //   })
    // }else{
    //   this.setData({
    //     fxcustid:wx.getStorageSync('alluserid').alluserid
    //    })
    //    wx.showToast({
    //     icon:"none",
    //     title:this.data.fxcustid,
    //   })
    // };
    console.log(options)
    let jsphone = options.phone
    let jsyzm = options.yzm
    this.setData({
      jsphone: jsphone,
      jsyam: jsyzm,
      fxcustid: options.sharfxcustid,
    })
    if (options.sharfxcustid != "undefined") {
      this.setData({
        fxcustid: options.sharfxcustid,
      })
    } else if (options.iOSfxcustid != "undefined") {
      this.setData({
        fxcustid: options.iOSfxcustid,
      })
    } else if (options.androidfxcustid != "undefined") {
      this.setData({
        fxcustid: options.androidfxcustid,
      })
    } else if (wx.getStorageSync('sharuserid') != '') {
      let sharuserid = wx.getStorageSync('sharuserid')
      this.setData({
        fxcustid: sharuserid,
      })
    } else {
      this.setData({
        fxcustid: '',
      })
    }
  },
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  selectTapss() {
    this.setData({
      showss: !this.data.showss,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });

  },
  optionTapss(e) {
    let Indexss = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let accountid = e.currentTarget.dataset.accountid;
    let accountname = e.currentTarget.dataset.accountname;
    console.log(Indexss, accountid, accountname)
    this.setData({
      indexss: Indexss,
      accountid: accountid,
      accountname: accountname,
      showss: !this.data.showss
    });

  },
  //图片适应屏幕
  autoImage: function (e) {
    var that = this;
    var originalWidth = e.detail.width;
    var originalHeight = e.detail.height;
    var imageWidth = 0;
    var imageHeight = 0;
    wx.getSystemInfo({
      complete: (res) => {
        var winWidth = res.windowWidth;
        if (originalWidth > winWidth) {
          var autoWidth = winWidth;
          var autoHeight = (autoWidth * originalHeight) / originalWidth;
          imageWidth = autoWidth + 'px';
          imageHeight = autoHeight + 'px';
        } else {
          imageWidth = originalWidth + 'px';
          imageHeight = originalHeight + 'px';
        }
        that.setData({
          imageWidth: imageWidth,
          imageHeight: imageHeight
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})