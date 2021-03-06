// pages/user/balance.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    baLance: "",
    statusList: [{ //顶部状态按钮
        "statusName": "100",
        "id": "100"
      },
      {
        "statusName": "200",
        "id": "200"
      },
      {
        "statusName": "400",
        "id": "400"
      },
      {
        "statusName": "500",
        "id": "500"
      },
      {
        "statusName": "800",
        "id": "800"
      },
      {
        "statusName": "1000",
        "id": "1000"
      },
    ],
    isChecked: 0, //判断是否选中
    zfbisClick: false,
    wxisclick: false,
    currentIndex: 0,
    navbar: ["在线充值", "爱宠卡充值"],
    currentIndex: 0,
    status: false,
    cardno: "",
    wxfunc: "",
    zfbfunc: "",
    card: "",
    yue: "",
  },
  // onChangeTap: function (e) {
  //   this.setData({
  //     isClick: !this.data.isClick,
  //     isclick: false,
  //     func: e.currentTarget.dataset.func,
  //   })
  //   console.log(this.data.func)
  // },
  wxonChange: function (e) {
    this.setData({
      wxisclick: !this.data.wxisclick,
      zfbisclick: false,
      wxfunc: e.currentTarget.dataset.wxfunc,
      zfbfunc: '',
    })
    console.log(this.data.wxfunc, this.data.zfbfunc, this.data.wxfunc)
  },
  zfbonChange: function (e) {
    this.setData({
      zfbisclick: !this.data.zfbisclick,
      wxisclick: false,
      zfbfunc: e.currentTarget.dataset.zfbfunc,
      wxfunc: '',
    })
    console.log(this.data.zfbfunc, this.data.wxfunc, this.data.zfbfunc)
  },
  //绑定顶部状态切换的点击事件
  choiceStatus: function (e) {
    var that = this;
    var code = e.currentTarget.id;
    that.setData({
      isChecked: code,
      card: e.currentTarget.id,
    })
    console.log("card", this.data.card)
  },
  //获取用户输入PIN卡号
  getCardno: function (event) {
    console.log(event.detail.value)
    this.setData({
      cardno: event.detail.value
    })
  },
  //获取用户输入金额
  getnum: function (e) {
    this.setData({
      card: e.detail.value
    })
  },
  //在线充值
  ziFu: function () {
    if (this.data.wxisclick == false && this.data.zfbisclick == undefined) {
      wx.showToast({
        title: '请选择支付方式',
        icon: "none"
      })

    } else if (this.data.wxisclick == true && this.data.zfbisclick == false) {
      wx.showToast({
        title: '微信支付建设中',
        icon: "none"
      })

    } else if (this.data.wxisclick == false && this.data.zfbisclick == true) {
      wx.showToast({
        title: '支付宝支付建设中',
        icon: "none"
      })
    } else {
      wx.showToast({
        title: '请选择正确支付方式',
        icon: "none"
      })

    }

  },
  //PIN充值
  chongZhi: function () {
    if (this.data.cardno == "") {
      wx.showToast({
        icon: 'none',
        title: '卡号不能为空',
      })
    } else {
      let url = app.globalData.root + '/recharge?action=cardRecharge'
      let data = {
        "cardno": this.data.cardno
      }
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        console.log(res,data)
        if (res.data == "true") {
          wx.showToast({
            title: '充值成功',
          })
          this.yue()
        } else if (res.data == "false") {
          wx.showToast({
            title: '卡充值失败',
            icon: "none"
          })
        } else {
          wx.showToast({
            title: res.data,
            icon: "none"
          })
        }
      }, (err) => {
        wx.showToast({
          title: '服务器请求失败',
          icon: "none"
        })
      })
    }
  },



  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.yue();
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