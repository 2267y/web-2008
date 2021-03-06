// pages/productorder/productorder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    pronameLIKE: "",
    likePro: [],
    imgUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //跳转详情页面
  goDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?type=' + e.currentTarget.dataset.type + '&proid=' + e.currentTarget.dataset.proid,
    })
  },
  onLoad: function (options) {
    let imgpath = app.globalData.imgtpathurl
    console.log(options)
    this.setData({
      imgUrl: imgpath,
      pronameLIKE: options.pronameLIKE
    })
    this.loadproductinfo()

  },
  //加载产品信息
  loadproductinfo: function () {
    let url = app.globalData.root + '/mall/yongpinshowproduct?action=loadProductInfo'
    let params = {
      "pronameLIKE": this.data.pronameLIKE,
      "specialid": "",
      "effect": "",
      "biaoshi": "",
      "protypeidother": "",
      "sorts": ""
    }
    app.wxRequest("POST", url, {
      "params": JSON.stringify(params)
    }, (res) => {
      console.log(res)
      this.setData({
        likePro: res.data
      })
    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '请求服务出错',
        icon: "none"
      })
    })
  },
  //   ajaxCallback(root+"/mall/yongpinshowproduct?action=loadProductInfo"+callback1+"&page="+page+"&rows=6",{"params":JSON.stringify(params)},function(info){

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