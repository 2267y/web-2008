// pages/tabClass/tabClass.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonId: "",
    
    kc: "",
    //角色
    userClass: false,
    //下拉   
    selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    jxarr: "",
    index: 0, //选择的下拉列表下标
    bianliang: 'none',
    bianliang2: 'none',
    //产品详情
    proData: "",
    number: 1,
    //图片自适应
    imageWidth: "",
    imageHeight: "",
    lickwidth: "",
    lickheight: "",
    // currentTab: 0, //预设默认选中的栏目
    scrollLeft: 0, //tab滚动条距离左侧距离
    navbar: ["商品", "详情", "评论"],
    currentIndex: 0,
    status: false,
    allSee: [],
    buttons: [{
      id: 1,
      name: '全部'
    }, {
      id: 2,
      name: '好评'
    }, {
      id: 3,
      name: '中评'
    }, {
      id: 4,
      name: '差评'
    }],
    mssg: '',
    //下拉选框jxproid
    jxproid: [],
    //
    infocount: "",
    //
    type: "",
    proid: "",
    //产品成交数量
    monthcount: "",
    //商品图片
    bigImges: "",
    imgData: [],
    imgUrl: "",
    imgUrlll: "",
    bingimgdate: "",
    //评论
    commentData: [],
    //评论数量
    commentDataNum: "",
    //是否搜藏
    isCollection: false,
  },
    //加入购物车
    goshoppingcart: function (e) {
      app.isLogin();
      console.log(e)
      //执行加入购物车的操作
      let data = '{"proid":"' + e.currentTarget.dataset.proid + '","type":"' + e.currentTarget.dataset.type + '","proname":"' + e.currentTarget.dataset.proname + '","count":"' + 1 + '","price":"' + e.currentTarget.dataset.saleprice + '","specification":"' + e.currentTarget.dataset.specification + '"}';
      let url = app.globalData.root + '/shoppingcart?action=addShoppingCart'
      app.wxRequest("POST", url, {
        "data": data
      }, (res) => {
        console.log(res, data)
        if (res.data == "true") {
          wx.showToast({
            title: '加入购物车成功',
          })
        } else if (res.data == "false") {
          wx.showToast({
            title: '加入购物车失败',
            icon: "none"
          })
        } else {
          wx.showToast({
            title:"请先登录",
            icon: "none"
          })
        }
      }, (err) => {
        console.log(err)
        wx.showToast({
          title: '服务器请求失败',
          icon: "none"
        })
      })
    },
  //添加我的足迹insertLookHistory
  zhuji: function (proid, type) {
    let url = app.globalData.root + '/lookhistory?action=insertLookHistory'
    let data = {
      "proid": proid,
      "type": type,
    }
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(res, data)
    }, (err) => {
      console.log(err)
    })

  },
  //图片自适应
  imageLoad: function (e) {
    let _this = this;
    let $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    let viewWidth = 750, //设置图片显示宽度，
      viewHeight = 750 / ratio; //计算的高度值
    _this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  },
  //图片自适应
  lickLoad: function (e) {
    let _this = this;
    let $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    let viewWidth = 250, //设置图片显示宽度，
      viewHeight = 250 / ratio; //计算的高度值
    _this.setData({
      lickwidth: viewWidth,
      lickheight: viewHeight
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    console.log(e.currentTarget.dataset)
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },
  //客服电话
  kefu: function () {
    wx.makePhoneCall({
      phoneNumber: '18340032859',
    })
  },
  //跳转提交订单
  goOrder: function (option) {
    app.isLogin();
    console.log(option)
    if (option.currentTarget.dataset.count == 0) {
      wx.showToast({
        title: '数量不能为0',
        icon: "none"
      })
    } else {
      if (this.data.index == 0) {
       
        wx.navigateTo({
          url: '/pages/submitorder/submitorder?count=' +
            option.currentTarget.dataset.count +
            '&proid=' + option.currentTarget.dataset.proid +
            '&type=' + option.currentTarget.dataset.type +
            '&id=' + option.currentTarget.dataset.id +
            '&price=' + option.currentTarget.dataset.price +
            '&proDanweiname=' + option.currentTarget.dataset.prodanweiname  +
            '&proname=' + option.currentTarget.dataset.proname
        })
      } else if (this.data.index == 1) {
        wx.navigateTo({
          url: '/pages/submitorder/submitorder?count=' +
          option.currentTarget.dataset.count +
          '&proid=' + option.currentTarget.dataset.proid +
          '&type=' + option.currentTarget.dataset.type +
          '&id=' + option.currentTarget.dataset.id +
          '&price=' + option.currentTarget.dataset.price +
          '&proDanweiname=' + option.currentTarget.dataset.prodanweiname  +
          '&proname=' + option.currentTarget.dataset.proname
        })
      } else {
        console.log("2----2------------------------2-----------------2")
        wx.navigateTo({
          url: '/pages/submitorder/submitorder?count=' +
          option.currentTarget.dataset.count +
          '&proid=' + option.currentTarget.dataset.proid +
          '&type=' + option.currentTarget.dataset.type +
          '&id=' + option.currentTarget.dataset.id +
          '&price=' + option.currentTarget.dataset.price +
          '&proDanweiname=' + option.currentTarget.dataset.prodanweiname  +
          '&proname=' + option.currentTarget.dataset.proname
        })
      }
   
    }

  },
  addShopcar: function () {
    app.isLogin();
    let url = app.globalData.root + '/shoppingcart?action=addShoppingCart'
    let data = new Object()
    let datalist = {
      "proid": this.data.proid,
      "proname": this.data.proData.proname,
      "specification": this.data.proData.specification,
      "price": this.data.proData.proprice,
      "count": 1,
      "type": this.data.type,
      "prono": this.data.proData.prono,
      "mainunitid": this.data.proData.mainunit,
      "mainunitname": this.data.proData.mainunitname,
    }
    app.wxRequest("POST", url, {
      "data": JSON.stringify(datalist)
    }, (res) => {
      console.log(res, JSON.stringify(datalist))
      if (res.data == "true") {
        wx.showToast({
          title: '加入购物车成功',
        })
      } else {
        wx.showToast({
          icon: "none",
          title: '加入购物车失败',
        })
      }
    }, (err) => {
      console.log(res)
    })
  },
  add: function () {
    this.setData({
      number: this.data.number + 1
    })
  },
  jian: function () {

    if (this.data.number == 1) {
      wx.showToast({
        icon: "none",
        title: '不能小于1件',
      })
    } else {
      this.setData({
        number: this.data.number - 1
      })
    }

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
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击tab
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  // navbar切换 
  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
    if (this.data.currentIndex == 1) {
      this.setData({
        bianliang: 'block',
        bianliang2: "none"
      })
    } else if (this.data.currentIndex == 2) {
      this.setData({
        bianliang2: "block",
        bianliang: 'none'
      })
    } else {
      this.setData({
        bianliang2: "none",
        bianliang: 'none'
      })
    }
  },

  //评价按钮
  radioButtonTap: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    this.setData({
      buttonId: id
    })
    console.log(id)
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons[i].checked = true;
      } else {
        //其他的位置为false
        this.data.buttons[i].checked = false;
      }
    }
    let flag = ''
    if (e.currentTarget.dataset.id == 1) {
      flag = ''
      console.log("all")
    } else if (e.currentTarget.dataset.id == 2) {
      flag = 'good'
      console.log("good")
    } else if (e.currentTarget.dataset.id == 3) {
      flag = 'middle'
      console.log("middle")
    } else {
      flag = 'bad'
      console.log("bad")
    }
    this.comment(this.data.proid, this.data.type, flag);
    this.setData({
      buttons: this.data.buttons,
      mssg: "id:" + id
    })
  },
  checkButtonTap: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        if (this.data.buttons[i].checked == true) {
          this.data.buttons[i].checked = false;

        } else {
          this.data.buttons[i].checked = true;

        }
      }
    }
    this.setData({
      buttons: this.data.buttons,
      mssg: "id:" + id
    })

  },
  goshopCar: function () {
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })
  },
  godetail: function (options) {
    console.log(options)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + options.currentTarget.dataset.id + '&type=' + options.currentTarget.dataset.type,
    })
  },
  //大家都在看
  autherSee: function () {
    let url = app.globalData.root + '/mall/showproduct?action=getOrderProduct'
    let data = {}
    app.wxRequest("POST", url, data, (res) => {
      console.log(res.data)
      this.setData({
        allSee: res.data
      })
    }, (err) => {
      console.log(err)
    })
  },
  //检查是否收藏
  checkCollection: function () {
    let that = this
    let url = app.globalData.root + '/collect?action=checkCollection'
    let data = new Object()
    data.proid = that.data.proid;
    data.type = that.data.type
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      if (res.data == "false") {
        that.setData({
          isCollection: false
        })
      } else {
        this.setData({
          isCollection: true
        })
      }
      console.log(res, JSON.stringify(data))
    })
  },
  //点击收藏
  changeSc: function () {
    let that = this
    let url = app.globalData.root + '/collect?action=addCollection'
    let data = new Object()
    data.proid = that.data.proid;
    data.type = that.data.type
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      if (res.data == "已收藏") {

        wx.showToast({
          title: res.data,
          icon: "none"
        })
      } else if (res.data == "true") {
        wx.showToast({
          title: '收藏成功',
        })
        that.setData({
          isCollection: true
        })
      } else if (res.data == "false") {
        wx.showToast({
          title: '收藏失败',
          icon: "none"
        })
      } else {
        wx.showToast({
          title: '请先登录',
          icon: "none"
        })
      }
      console.log(res, JSON.stringify(data))
      var timerName = setTimeout(function () {
        app.isLogin();
      }, 2000)
    })
  },

  /**
   * 生命周期函数--监听页面加载  zhuji
   */
  onLoad: function (options) {
    console.log(options)
    let imgpath = app.globalData.imgtpathurl
    this.setData({
      imgUrlll: imgpath,
      type: options.type,
      proid: options.proid,
    })
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let url = app.globalData.root + '/mall/showproduct?action=productDetail'
    let data = new Object()
    let datalist = {
      "type": that.data.type,
      "proid": that.data.proid,
    }
    app.wxRequest("POST", url, {
      "data": JSON.stringify(datalist)
    }, (res) => {
      console.log(res.data, datalist)
      that.setData({
        proData: res.data[0],
      })
      wx.hideLoading()
    }, (err) => {
      wx.showToast({
        icon: "none",
        title: '服务器请求出错',
      })
    })
this.imgData();
  },
  //加入购物车 /shoppingcart?action=addShoppingCart

  //评论加载/evaulteManage?action=searchEvalute&table=evaluate
  // comment: function (proid, type, flag) {
  //   let that = this
  //   let url = app.globalData.root + '/evaulteManage?action=searchEvalute&table=evaluate';
  //   let data = new Object()
  //   let datalist = {
  //     "proid": proid,
  //     "type": type,
  //     "flag": flag
  //   }
  //   app.wxRequest("POST", url, {
  //     "params": JSON.stringify(datalist)
  //   }, (res) => {
  //     console.log(res, JSON.stringify(datalist))
  //     that.setData({
  //       commentData: res.data,
  //       commentDataNum: res.data.length
  //     })
  //   }, (err) => {
  //     console.log(err)
  //     wx.showToast({
  //       icon: "none",
  //       title: '服务器出错',
  //     })
  //   })
  // },
  //查询每月成交量/mall/showproduct?action=getTotalMonthCount
  // loadMonthTraceCount: function () {
  //   let url = app.globalData.root + '/mall/showproduct?action=getTotalMonthCount';
  //   let data = new Object();
  //   let dataList = {
  //     "proid": this.data.proid,
  //     "type": this.data.type
  //   }
  //   app.wxRequest("POST", url, {
  //     "data": JSON.stringify(dataList)
  //   }, (res) => {
  //     console.log(res.data)
  //     this.setData({
  //       monthcount: res.data[0]
  //     })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // },
  // 请求商品详情图片/mall/showproduct?action=productPicDetail
  imgData: function () {
    let url = app.globalData.root + '/mall/showproduct?action=productPicDetail';
    let data = new Object();
    let dataList = {
      "proid": this.data.proid,
      "type": this.data.type
    }
    app.wxRequest("POST", url, {
      "data": JSON.stringify(dataList)
    }, (res) => {
      console.log(res.data)
      this.setData({
        imgData: res.data
      })
    }, (err) => {
      console.log(err)
    })
  },
  //按钮样式

  /**
   * 生命周期函数--监听页面初次渲染完成      let imgArr= proData.note
 
      let indexstr = imgArr.indexOf("\"");
      let indexend = imgArr.indexOf("\" title");
      let imgdate = imgArr.substring(indexstr + 1, indexend);
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