// pages/sumbit/sumbit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ttMoney:"",
    totalPrice: "",
    orderno: "",
    headd: false,
    headd2: false,
    chooseIndex: '',
    carData: "false",
    commodityName: "",
    yue:"",
  },

  goTopups: function (options) {
    wx.navigateTo({
      url: '/pages/user/topups/topups',
    })
  },
    //查询当前余额/mallLogin?action=searchUserInfo
    yue: function () {
      let url = app.globalData.root + '/mallLogin?action=searchUserInfo'
      let data = {}
      app.wxRequest("POST", url, data, (res) => {
        console.log(res.data[0].balance)
        this.setData({
          yue: res.data[0].balance
        })
      }, (err) => {
        console.log(err)
      })
    },
  //切换按钮
  headd: function () {
    this.setData({
      headd: !this.data.headd,
      headd2: false,

      chooseIndex: 1,
    })
  },
  headd2: function () {
    this.setData({
      headd2: !this.data.headd2,
      headd: false,
      chooseIndex: 2,
    })
  },

  //支付
  submit: function () {
    if (this.data.chooseIndex == 1) {
      wx.showLoading({
        title: '余额支付中',
      })
      //余额支付
      let url = app.globalData.root + '/zhifubao?action=yueZhiFu'
      let data = new Object()
      data.orderno = this.data.orderno
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        console.log(res)
        if (res.data == "true") {
          wx.navigateTo({
            url: '/pages/user/order/order?currentTab=' + 0,
          })
          wx.showToast({
            title: '支付成功',
          })
        } else if (res.data == "false") {
          wx.showToast({
            icon: "none",
            title: '支付失败',
          })
        } else {
          wx.showToast({
            title: res.data,
            icon: "none"
          })
        }
        wx.hideLoading()
      }, (err) => {
        console.log(err)
      })
    } else if (this.data.chooseIndex == 2) {
       app.dyCode();
      wx.showLoading({
        title: '支付中请稍等',
      })
      // let openId = wx.getStorageSync('openid').openid
      let code = wx.getStorageSync('code')
      console.log(wx.getStorageSync('code'))
      let appid = 'wx6de703182c8fb4f7'
      if (this.data.carData == "true") {
        var url = app.globalData.root + '/xiaochengxu?action=xiaochengxuPay&code=' + code + '&appid=' + appid + '&commodityName=\'华抗包装\'' + '&totalPrice=' + this.data.ttMoney * 100  + '&orderno=' + this.data.orderno;
      } else {
        var url = app.globalData.root + '/xiaochengxu?action=xiaochengxuPay&code=' + code + '&appid=' + appid + '&commodityName=' + this.data.commodityName + '&totalPrice= ' + this.data.ttMoney * 100 + '&orderno=' + this.data.orderno;
      }
      let data = {}
      app.wxRequest("POST", url, data, (res) => {
        console.log(res, url)
        //微信支付api
        wx.requestPayment({
          timeStamp: "" + res.data[0].timeStamp ,
          nonceStr: res.data[0].nonceStr,
          package: res.data[0].package,
          signType: res.data[0].signType,
          paySign: res.data[0].paySign,
          success(res) {
            console.log(res)
            wx.navigateTo({

                
            url: '/pages/user/order/order?currentTab=' + 2,
           

            })
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            });
          },
          fail(res) {
            console.log(res)
            wx.showToast({
              title: '支付失败',
              icon:"npne",
              duration: 2000
            })
          }
        })

        wx.hideLoading()
      }, (err) => {
        console.log(err)
        wx.showToast({
          icon: "none",
          title: '服务器开小差了',
        })
      })
      //微信支付
    } else {
      wx.showToast({
        title: '请选择支付方式',
        icon: "none"
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.yue()
    this.setData({
      ttMoney:options.totalMoney,
      totalPrice: options.totalPrice,
      orderno: options.orderno,
      carData: options.carData,
      commodityName: options.commodityName,
    })

    app.isLogin();
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