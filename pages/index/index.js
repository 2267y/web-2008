//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    smallImg: [{
        smimg: "../images/cwfs.png"
      },
      {
        smimg: "../images/cwWodian.png"
      },
      {
        smimg: "../images/cwzl.png"
      },
      {
        smimg: "../images/cwls.png"
      },
      {
        smimg: "../images/cwwj.png"
      },
      {
        smimg: "../images/cwqj.png"
      },
      {
        smimg: "../images/cwbj.png"
      },
      {
        smimg: "../images/cwhl.png"
      },
    ],
    bigImg: [{
        biImg: "../images/fsbanner.jpg"
      },
      {
        biImg: "../images/wodian.jpg"
      },
      {
        biImg: "../images/cwZhuliang.jpg"
      },
      {
        biImg: "../images/cwLinshi.jpg"
      },
      {
        biImg: "../images/cwWanju.jpg"
      },
      {
        biImg: "../images/cwQingjie.jpg"
      },
      {
        biImg: "../images/cwBaojian.jpg"
      },
      {
        biImg: "../images/cwHuli.png"
      },
    ],
    serchVal: '', //输入框值
    arr1: [],
    tehuiPro: [],
    classList: [],
    carouselList: [{img:"http://www.mdtfos.com/590e3fa22226267e1a9596d8e69cf18.jpg"}],
    imgUrl: '',
    msgList: [], //公告
  },
 //获取轮播图/mall/showproduct?action=subjectPic
 getImage:function(){
  let url = app.globalData.root + "/mall/showproduct?action=subjectPic"
  app.wxRequest("POST", url, {
    "params": "{}"
  }, (res) => {
    console.log(res)
    this.setData({
      carouselListl: res.data
    })
  }, (err) => {
    console.log(err)
    wx.showToast({
      title: '服务器请求失败',
      icon: "none"
    })
  })
 },
  //搜索按钮
  goproductorder11: function () {
    if(this.data.serchVal!=''){
       wx.navigateTo({
      url: '../productorder/productorder?pronameLIKE='+this.data.serchVal,
    })
    }else{
      wx.showToast({
        title: '搜索内容不能为空',
        icon:"none"
      })
    }
  },
  //跳转详情页面
  goDetail : function(e){
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?type='+e.currentTarget.dataset.type+'&proid='+e.currentTarget.dataset.proid,
    })
  },
  //获取输入框值
  getInputValue(e) {
    this.setData({
      serchVal: e.detail.value
    })
    console.log(e.detail.value) // 
  },

  //跳转到产品分类页面
  goprotype: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.protypeid == "0") {
      wx.switchTab({
        url: '../class/class',
      })
    } else {
      getApp().globalData.protypeid = e.currentTarget.dataset.protypeid;
      getApp().globalData.protypeidindex = parseInt(e.currentTarget.dataset.index)
      wx.switchTab({
        url: '../class/class',
      })
 

    }

  },
  //加入购物车
  goshoppingcart: function (e) {
    app.isLogin();

    console.log(e)
    //执行加入购物车的操作
    let data = '{"proid":"' + e.currentTarget.dataset.proid + '","type":"' + e.currentTarget.dataset.type + '","proname":"' + e.currentTarget.dataset.proname + '","count":"' + 1 + '","price":"' + e.currentTarget.dataset.saleprice + '","specification":"' + e.currentTarget.dataset.specification + '"}';
    let url = app.globalData.root + '/yongpinshoppingcart?action=addShoppingCart'
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
          title: "请先登录",
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
  //加载公告
  loadnotice: function () {
    let url = app.globalData.root + "/notice?action=getNotice"
    app.wxRequest("POST", url, {
      "params": "{}"
    }, (res) => {
      console.log(res)
      this.setData({
        msgList: res.data
      })
    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '服务器请求失败',
        icon: "none"
      })
    })
  },
  //跳转公告详情页面
  goNotic: function (e) {
    wx.navigateTo({
      url: '../notic/notic?id=' + e.currentTarget.dataset.id,
    })
  },
  // 加载分类root+"/mall/showproduct?action=getProductTress"+ ,{"params":"{}"}
  loadproducttype: function () {
    var that = this
    let url = app.globalData.root + 'mall/showproduct?action=getProductTress'
    console.log(url)
    app.wxRequest("POST", url, {
      "params": "{}"
    }, (res) => {
      var classList = res.data
      console.log(res)
      that.setData({
        classList: classList
      })
      for (var i = 0; i <classList.length; i++) {
        that.productDetail_list(classList[i])
      }

    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '请求服务器失败',
        icon: "none"
      })
    })
  },
  productDetail_list: function (navaData) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let url = app.globalData.root + '/mall/showproduct?action=loadProductInfo'
    let data = new Object();
    data.biaoshi = "product";
    data.sorts = "zonghe";
    data.protypeidother = navaData.id;
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      navaData.prolist = res.data;
      that.data.arr1.push(navaData);
      var compare = function (obj1, obj2) {
        var val1 = obj1.id;
        var val2 = obj2.id;
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
      that.data.arr1 = that.data.arr1.sort(compare);
      that.setData({
        arr1: that.data.arr1
      });
      console.info(that.data.arr1);
     wx.hideLoading()
    }, (err) => {
      console.log(err)
    })
  },
  //加载人气推荐specialProductDetail(){
  // var data='{"biaoshi":"special","sorts":"zonghe"}';
  // ajaxCallback(root+"/mall/yongpinshowproduct?action=loadProductInfo"+callback1,{"params":data},function(info){
  specialProductDetail: function () {
    let data = '{"biaoshi":"special","sorts":"zonghe"}';
    let url = app.globalData.root + "/mall/showproduct?action=loadProductInfo"
    app.wxRequest("POST", url, {
      "params": data
    }, (res) => {
      console.log(res)
      this.setData({
        tehuiPro: res.data
      })
    }, (err) => {
      console.log(err)
    })
  },

  // 生命周期函数+"/productimages/"+ n.autoname;
  onLoad: function (e) {
 console.log(e)
  
    this.getImage() //轮播图
    let imgpath = app.globalData.imgtpathurl
    this.setData({
      imgUrl: imgpath
    })
    this.loadproducttype();
    // this.specialProductDetail();
    this.loadnotice(); //加载公告
    
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
  //请求轮播图
  lunList: function () {
    let url = app.globalData.url + ''
    let data = {}
    app.wx.request("post", url, data, (res) => {
      console.log(res)
      this.setData({
        carouselList: res.data
      })
    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '请求服务器失败',
        icon: "none"
      })
    })
  }
})