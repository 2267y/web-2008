const app = getApp();
Page({
  data: {
    disabled: false,
    count: 60,
    code: '发送验证码',
    phone: '', 
    zhanghao: '',
    yanZhen: '',
    mima: '',
    ret: '',
    yanZhenma:'',
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
  //获取用户账号
  // getZhangHao(event) {
  //   console.log('获取输入的账号', event.detail.value)
  //   this.setData({
  //     zhanghao: event.detail.value
  //   })
  // },
  //获取用户输入手机号
  getPhone(event) {
    console.log('获取输入的手机号', event.detail.value)
    this.setData({
      phone: event.detail.value
    })
  },
  //获取验证码
  huoQuyzm: function () {
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '输入手机号有误',
        icon: 'none',
        duration: 2000
      })
      return;
    }
//检查是否存在账号 
    let url = app.globalData.root + '/register?action=isExitsPhone'
    let data = new Object()
    let listdata = {
      "phone": this.data.phone
    }
    app.wxRequest('POST', url, {
      'data': JSON.stringify(listdata)
    }, (res) => {
      console.log(res.data, JSON.stringify(listdata))
      //判断手机号是否注册之后获取验证码
      if (res.data != "true") {
        let url = app.globalData.root + '/register?action=getSMSCode'
        let data = new Object()
        let listdata = {
          "phone": this.data.phone
        }
        app.wxRequest('POST', url, {
          'params': JSON.stringify(listdata)
        }, (res) => {
          console.log("请求数据成功" + res.data, JSON.stringify(listdata))
         this.setData({
          yanZhenma:res.data
         })
         const countDown = setInterval(() => {
          if (this.data.count <= 0) {
            this.setData({
              disabled: false,
              count: 60,
              code: '获取验证码'
            })
            clearInterval(countDown)
            return
          }
          this.data.count--
          this.setData({
            count: this.data.count,
            code: this.data.count < 10 ? `请等待0${this.data.count}s` : `请等待${this.data.count}s`,
            disabled: true
          })
        }, 1000);
        }), (err) => {
          console.log("请求服务器出错", err)
        }
      } else {
        wx.showToast({
          title: '该号码未被注册',
          icon: 'none',
        })
      }
    }), (err) => {
      console.log("请求服务器出错", err)
    }

  },
  // 获取用户输入验证码
  getYanZhen(event) {
    console.log('获取输入的密码', event.detail.value)
    this.setData({
      yanZhen: event.detail.value
    })
  },
  goNext: function () {
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '输入手机号有误',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.yanZhen.length != 4) {
      wx.showToast({
        icon: 'none',
        title: '请输入四位数验证码',
      })
      return
    }
    if(this.data.yanZhen == this.data.yanZhenma){
    wx.navigateTo({
      url: 'returnNext?phone=' + this.data.phone + '&yzm=' + this.data.yanZhen,
    })
    }else{
      wx.showToast({
        title: '验证码错误请重新输入',
        icon:'none'
      })
    }

  },

})