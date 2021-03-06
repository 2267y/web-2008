// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:"",
    yue: "",
    //用户信息
    getPersonalInfo: "",
    iUrl: "",
    imgUrl: ""
  },
  //tupianzishiy
  toImage : function(e) {
    var that = this;
    var  originalWidth  = e.detail.width;
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
  //查询当前余额/mallLogin?action=searchUserInfo
  yue: function () {
    let url = app.globalData.root + '/mallLogin?action=searchUserInfo'
    
    app.wxRequest("POST", url, {"params":"{}"}, (res) => {
      console.log(res.data[0].balance)
      this.setData({
        yue: res.data[0].balance
      })
    }, (err) => {
      console.log(err)
    })
  },
  goAllorder: function (options) {
    wx.navigateTo({
      url: '/pages/user/order/order?currentTab=' + options.currentTarget.dataset.currenttab,
    })
  },
  goTopups: function (options) {
    wx.navigateTo({
      url: '/pages/user/topups/topups',
    })
  },
  gomyMsg: function () {
    wx.navigateTo({
      url: '/pages/user/myMsg/myMsg',
    })
  },
  goShoucang: function () {
    wx.navigateTo({
      url: '/pages/shoucang/shoucang',
    })
  },
  goZhuji: function () {
    wx.navigateTo({
      url: '/pages/zhuji/zhuji',
    })
  },
  goDown: function (options) {
    console.log(options)
    wx.navigateTo({
      url: 'download?stype=' + options.currentTarget.dataset.stype,
    })

  },
  goDizhi: function (options) {
    console.log(options)
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    })

  },
  goJilu: function (options) {
    console.log(options)
    wx.navigateTo({
      url: '/pages/jilu/jilu',
    })

  },
  call: function (options) {

    wx.makePhoneCall({
      phoneNumber: '88807917'
    })

  },
  //判断是否登录

  /**
   * 生命周期函数--监听页面加载
   * var rootimg=root+"/customerImages/"+ info[0].autoname;
   */
  onLoad: function (options) {
    
    app.isLogin();
    let userList=wx.getStorageSync('user')
    // app.check();
    this.setData({
        ischeck:wx.getStorageSync('ischeck')
    })
    if(this.data.ischeck!='false'){
    app.isLogin();
    this.yue();
    let iUrl = app.globalData.iUrl
    let imgUrl = app.globalData.imgtpathurl
    this.setData({
      iUrl: iUrl,
      imgUrl: imgUrl,
      userList:userList,
    })
  }else{
    wx.navigateTo({
      url: '../indexx/indexx',
    })
  }
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
    app.isLogin();
    this.persona();
    this.yue()
  },
  //获取用户信息
  persona: function () {
    let that = this
    let url = app.globalData.root + '/personal?action=getPersonalInfo'
 
    app.wxRequest("POST", url, {"data":"{}"}, (res) => {
      that.setData({
        getPersonalInfo: res.data[0]
      })

      console.log(res.data[0])
    }, (err) => {
      console.log(err)
    })
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