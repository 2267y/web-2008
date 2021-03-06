const app = getApp();
Page({
  data: {
    category:[],
    curIndex:0,
    toView: 'guowei',
    protypeid: "",
    proclassList:[],  
    imgUrl:"",
  },
  //跳转详情页面
  goDetail : function(e){
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?type='+e.currentTarget.dataset.type+'&proid='+e.currentTarget.dataset.proid,
    })
  },
  //加载分类
  loadproducttype: function () {
    let url = app.globalData.root + '/mall/showproduct?action=getProductTress'
    console.log(url)
    app.wxRequest("POST", url, {
      "params": "{}"
    }, (res) => {
      console.log(res)
    let category=res.data
    category.unshift({name:"全部"})
      this.setData({
        category: category
      })
      console.log(this.data.category)

    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '请求服务器失败',
        icon: "none"
      })
    })
  },
  //加载分类对应产品
  // var data=new Object();
  // 	data.protypeidother=protypeid;
  //     data.sorts="zonghe";
  // 	//alert(JSON.stringify(data));
  // 	ajaxCallback(root+"/mall/yongpinshowproduct?action=loadProductInfo"+callback1+"&page="+page+"&rows=12",{"params":JSON.stringify(data)},function(info){
  productInfo: function (protypeid) {
    let data = new Object();
    data.protypeidother = protypeid;
    data.sorts = "zonghe";
    let url=app.globalData.root+"/mall/showproduct?action=loadProductInfo"
    app.wxRequest("POST",url,{"params":JSON.stringify(data)},(res)=>{
      console.log(res)
      this.setData({
        proclassList:res.data
      })
    },(err)=>{
      console.log(err)
    })
  },
  switchTab(e) {
    console.log(e)
    getApp().globalData.protypeid = e.target.dataset.id;
    getApp().globalData.protypeidindex = e.target.dataset.index;
    //将获取到的item的id和数组的下表值设为当前的id和下标
    this.setData({
      toView: e.target.dataset.id,
      curIndex: e.target.dataset.index
    })
    this.productInfo(this.data.toView)
  },
  onLoad() {
    this.loadproducttype()
  },
  onShow: function () {
    let imgpath = app.globalData.imgtpathurl
    this.setData({
      imgUrl: imgpath
    })
    var protypeidindex = getApp().globalData.protypeidindex
    var protypeid = getApp().globalData.protypeid
    this.setData({
      curIndex: protypeidindex,
      protypeid: protypeid,
    })
    this.productInfo(protypeid)
    console.log(protypeidindex, protypeid)
  }
})