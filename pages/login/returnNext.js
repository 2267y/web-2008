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
    jsphone:'',
    jsyam:"",
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
  //获取用户输入电话
  getPhone: function (e) {
    
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
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
   if(this.data.pwd != this.data.reparpwd){
      wx.showToast({
        title: '两次密码不一致',
        icon:'none'
      })
      return ;
   };
    //修改密码实现
    let url = app.globalData.root + '/register?action=upPassword';
    let data = {
      "phone":phone,
      "password":mima,
    };
    app.wxRequest('POST', url,{
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(data,res)
      if (res.data=="true") {
        wx.showToast({
          title: '修改成功',
        })
        app.globalData.Cookie = "";
        wx.navigateTo({
          url: '/pages/login/login',
        })
      } else {
        wx.showToast({
          title: '修改失败',
          icon:'none',
        })
      }
    }), (err) => {
      wx.showToast({
        title: '请求服务器错误',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let jsphone = options.phone
   let jsyzm = options. yzm
   this.setData({
    jsphone:jsphone,
    jsyam:jsyzm
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