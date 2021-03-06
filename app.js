//app.js
App({
 
  onLaunch: function () {
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        var code = res.code; //返回code
        console.log(code);
        wx.setStorageSync('code', code)
        console.log(wx.getStorageSync('code'))
        var appId = 'wx6de703182c8fb4f7';
        var secret = '08cf3d9b47680408cb2aae115cd4e490';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data //返回openid
            console.log('openid为', openid);
            wx.setStorageSync('openid', openid)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
//

dyCode:function(){
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log(res)
      var code = res.code; //返回code
      console.log(code);
      wx.setStorageSync('code', code)
      console.log(wx.getStorageSync('code'))
      var appId = 'wx6de703182c8fb4f7';
      var secret = '08cf3d9b47680408cb2aae115cd4e490';
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
        data: {},
        header: {
          'content-type': 'json'
        },
        success: function (res) {
          var openid = res.data //返回openid
          console.log('openid为', openid);
          wx.setStorageSync('openid', openid)
        }
      })
    }
  })
},
//检查是否登录/mallLogin?action=isLogin

  //判断用户是否登录
  isLogin: function () {
    let url = this.globalData.root + '/mallLogin?action=isLogin'
    let data = {}
    this.wxRequest("POST", url, data, (res) => {
      console.log(res.data)
      if (res.data == 'false') {
        wx.redirectTo({
          url: '/pages/login/login',
        })
        wx.showToast({
          title: '请先登录',
          icon:"none"
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  //ajax
  wxRequest(method, url, data, callback, errFun, token) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'token': token,
        'Cookie': getApp().globalData.Cookie,
      },
      dataType: 'json',
      success: function (res) {
        //  console.info("=========="+res.header["Set-Cookie"] );
        if (res.header["Set-Cookie"] != null) {
          getApp().globalData.Cookie = res.header["Set-Cookie"]
        }
        callback(res);
      },
      fail: function (err) {
        errFun(err);
      }
    })
  },
  globalData: {
    // root: "http://www.256900.com/",
    root: "https://baocaiyaopin.256900.com:441/",
    imgtpathurl: "http://www.256900.com/"
  }
})