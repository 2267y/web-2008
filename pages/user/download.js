// pages/user/download.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dtype: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      dtype:options.stype
    })
  },
//图片自适应
autoImage : function(e) {
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