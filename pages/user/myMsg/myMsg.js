// pages/user/myMsg/myMsg.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getPersonalInfo: "",
    iUrl: "",
    imgUrl:"",
  },
  // 跳转到修改用户资料页面
  goModify: function (e) {
    console.log(e)
    wx.navigateTo({
      url: 'modify?biaoshi=' + e.currentTarget.dataset.biaoshi,
    })
  },
  //获取用户信息
  persona: function () {
    let that = this
    let url = app.globalData.root + '/personal?action=getPersonalInfo'
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
  clerLogin: function () {
    let url = app.globalData.root + '/mallLogin?action=exiteMallLogin'
    let data = {}
    app.wxRequest("POST", url, data, (res) => {
      console.log(res.data)
    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })
    wx.showToast({
      title: '退出成功',
    })
    wx.switchTab({
      url: '/pages/user/user',
    })
  },
  //更换头像
  headimage: function () {

    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9      
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        _this.setData({
          head: res.tempFilePaths
        })
        const tempFilePaths = _this.data.head
        // &userId=' + _this.data.getPersonalInfo.id
        wx.showLoading({
          title: '请稍后',
        })
        let url = app.globalData.imgtpathurl + 'personal?action=uploadCustomerImage&userId=' + _this.data.getPersonalInfo.id;
        wx.uploadFile({
          url: url,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          // filePath: `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
          success(res) {
            console.log(res.data)
            const data = res.data
            //do something
            wx.switchTab({
              url: '/pages/user/user',
             }) 
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '修改成功',
                })
              },
            })
          }
        })
        console.log(_this.data.head[0],url)
        // var data = new Object();
        // var obj = {};
        // var arr = _this.data.head[0];
        // console.log(typeof (arr))
        // let datalist = {
        //   "autoname": arr,
        // };
        // app.wxRequest('POST', url, {
        //   "params": JSON.stringify(datalist)
        // }, (res) => {
        //   if (res.data == "true") {
        //     wx.switchTab({
        //       url: '/pages/user/user',
        //     })
        //     wx.showToast({
        //       title: '修改成功',
        //     })
        //   } else {
        //     wx.showToast({
        //       title: '修改失败',
        //       icon: "none"
        //     })
        //   }
        //   console.log("获取数据成功", res, JSON.stringify(datalist))
        // })
      }
    })
  },
  updatahead() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        var imgPaths = res.tempFilePaths
        that.updataheadservice(imgPaths[0]);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let iUrl = app.globalData.iUrl
    let imgUrl = app.globalData.imgtpathurl
    this.setData({
      iUrl: iUrl,
      imgUrl: imgUrl,
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