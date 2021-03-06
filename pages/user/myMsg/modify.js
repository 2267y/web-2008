// pages/user/myMsg/modify.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getPersonalInfo: "",
    biaoshi: "",
    valueInput: "",
  },
  //获取用户信息
  persona: function () {
    let that = this
    let url = app.globalData.root + '/personal?action=getPersonalInfo';
    let data = {}
    app.wxRequest("POST", url, data, (res) => {
      that.setData({
        getPersonalInfo: res.data[0]
      })
      console.log(res.data[0])
    }, (err) => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let biaoshi = options.biaoshi
    this.setData({
      biaoshi: biaoshi
    })
  },
  //判断修改资料/personal?action=updPersonalInfo
  xiugaiPanduan: function () {
    if (this.data.biaoshi == "name") {

    }
  },
  //获取输入类容
  valueInput: function (e) {
    this.setData({
      valueInput: e.detail.value
    })
    console.log(this.data.valueInput)
  },
  //修改资料/yongpinpersonal?action=updPersonalInfo
  xiugai: function () {
    console.log(this.data.biaoshi)
    if (this.data.valueInput != "") {
      let url = app.globalData.root + '/personal?action=updPersonalInfo'
      let key = this.data.biaoshi
      let data = {
        [key]: this.data.valueInput,
        "biaoshi": 1
      };
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        console.log(res.data,JSON.stringify(data))
        if (res.data == "true") {
          wx.showToast({
            title: '修改成功',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: -1,
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '修改失败',
            icon: "none"
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: -1,
            })
          }, 2000)
        }
      }, (err) => {
        console.log(err)
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: "none"
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