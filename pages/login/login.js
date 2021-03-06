// pages/login/login.js
const app = getApp();
Page({
  data: {
    zhanghao: '',
    mima: '',
    imageWidth: '',
    imageHeight: '',
    imgwidth: "",
    imgheight: ""
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
  //获取输入的账号
  getZhanghao(event) {
    //console.log('账号', event.detail.value)
    this.setData({
      zhanghao: event.detail.value
    })
    console.log(this.data.zhanghao)
  },
  //获取输入的密码
  getMiMa(event) {
    // console.log('密码', event.detail.value)
    this.setData({
      mima: event.detail.value
    })
    console.log(this.data.mima)
  },
  //点击登陆
  login() {
    console.log(this.data.mima)
    let zhanghao = this.data.zhanghao
    let mima = this.data.mima
    console.log('账号', zhanghao, '密码', mima)
    if (zhanghao == ''||zhanghao ==undefined) {
      wx.showToast({
        icon: 'none',
        title: '账号不能为空',
      })
      return
    }
    if (mima == '' || mima==undefined) {
      wx.showToast({
        icon: 'none',
        title: '密码不能为空',
      })
      return
    }
    // 登录
    let url = app.globalData.root + '/mallLogin?action=checkMallLogin';
    var data = new Object();
    let datalist = {
      "accountname": this.data.zhanghao,
      "password": this.data.mima,
    };
    app.wxRequest('POST', url, {
      "params": JSON.stringify(datalist)
    }, (res) => {
      console.log("获取数据成功", res)
      let user = res.data[0]

      console.log("user", user)
      if (mima == user.password) {
        console.log('登陆成功')
        wx.showToast({
          title: '登陆成功',
        })
        // wx.navigateTo({
        //   url: '../home/home?name=' + user.name,
        // })
        let name = user.name
        console.log(user)
        wx.switchTab({
          url: '../user/user?name=' + user.name,
        })
        // 保存用户登陆状态
        wx.setStorageSync('user', user)
      } else {
        console.log('登陆失败')
        wx.showToast({
          icon: 'none',
          title: '账号或密码不正确',
        })
      }
    })

  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  register: function () {
    console.log("跳转注册页面")
    wx.navigateTo({
      url: 'res',
    })
  },
  retrieve: function () {
    wx.navigateTo({
      url: '/pages/login/returnMima',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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