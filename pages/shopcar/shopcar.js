// pages/shopCar/shopCar.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  /**
   * 页面的初始数据
   */
  data: {
    idarr: "",
    //购物车提交订单数量显示
    carOrderCount: [],
    //价格显示
    arrPrice: [],
    imgUrl: "",
    adminShow: true, //编辑或完成      
    totalPrice: 0, //总金额 
    allselect: false, //是否全选    
    selectArr: [], //已选择的商品  
    newsTab: ["健康", "情感", "职场", "育儿", "文学", "青葱", "科技", "达人"],
    cartData: [],
    carNull: false,
  },
  //跳转详情
  godetail: function (options) {
    console.log(options.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/detail/detail?proid=' + options.currentTarget.dataset.proid + '&type=' + options.currentTarget.dataset.type,
    })
  },
  //删除商品/shoppingcart?action=deleteShoppingCart   selectArr
  delProd: function () {

  },
  //计算价格
  calculateTotal: function () {
    var selectArr = this.data.selectArr; //已选择的商品
    var totalPrice = 0;
    if (selectArr.length) { //如果存在商品就计算价格
      for (var i = 0; i < selectArr.length; i++) {
        totalPrice += selectArr[i].count * selectArr[i].price;
      }
      totalPrice = totalPrice.toFixed(2); //乘法有点问题, 需要保留一下小数
      console.log("计算价格:", totalPrice)
      this.setData({
        totalPrice: totalPrice
      })
     
    } else { //不存在商品就把总价格置为 0
      this.setData({
        totalPrice: 0
      })
    }


  },
  //判断是否为全选  
  judgmentAll: function () {
    var cartData = this.data.cartData; //初始数据
    var selectArr = this.data.selectArr; //已选择的商品
    if (selectArr.length == cartData.length) { //长度相等就是全部选上了
      this.setData({
        allselect: true
      })
    } else {
      this.setData({
        allselect: false
      })
    }
  },
  //全选
  allcheckTap: function () {
    var that = this;
    var cartData = that.data.cartData; //初始数据
    var selectArr = []; //定义空数组
    var allselect = !that.data.allselect; //data里的是否全选先改变状态存着

    if (allselect) { //如果为真, 初始数据里的每条checked变为true, 然后push到定义的空数组里
      for (var i = 0; i < cartData.length; i++) {
        cartData[i].checked = true;
        selectArr.push(cartData[i])
      }
    } else { //不为真就变成false, 定义的数组再置空一次
      for (var i = 0; i < cartData.length; i++) {
        cartData[i].checked = false;
      }
      selectArr = [];
    }
    that.setData({ //重新设置数据
      cartData: cartData, //初始的数据
      allselect: allselect, //全选的状态
      selectArr: selectArr //已选择的商品
    })
    that.calculateTotal(); // 最后计算一次价格 (计算价格放到重置数据之前会出问题)
  },
  //单个商品选择
  checkTap: function (e) {
    var index = e.currentTarget.dataset.index; //取到渲染的下标
    var cartData = this.data.cartData; //初始数据
    var selectArr = this.data.selectArr; //已选择的商品数组
    cartData[index].checked = !cartData[index].checked //没选中的就要选中, 选中了的就取消选中状态
    if (cartData[index].checked) { //如果选中了, 就放到一选择的商品数组里
      for (var i = 0; i < cartData.length; i++) {
        if (cartData[i] == cartData[index]) {
          selectArr.push(cartData[index])
        }
      }
      this.judgmentAll(); //计算价格
    } else { //取消选中就从已选择的商品数组里移除
      for (var i = 0; i < selectArr.length; i++) {
        if (selectArr[i].id == cartData[index].id) {
          selectArr.splice(i, 1)
        }
      }
      this.judgmentAll(); //选择的时候要判断是不是已经选择了全部的
    }
    this.calculateTotal(); //计算一次价格
    console.log("已选择的商品:", selectArr)
    this.setData({ //重置数据
      cartData: cartData,
      selectArr: selectArr
    })
  },
  //数量加减
  numchangeTap: function (e) {
    var types = e.currentTarget.dataset.types; //加和减的两张图片上分别设置了types属性
    var index = e.currentTarget.dataset.index; //获取下标
    console.log(index)
    var cartData = this.data.cartData; //初始数据
    if (types == 'minus') { //减
      var count = cartData[index].count;
      if (count <= 1) { //不允许商品数量小于1 ,  都添加到购物车了还要减到0是几个意思? 反正有个删除按钮

        wx.showToast({
          icon: "none",
          title: '不能小于0',
        })
      } else {
        cartData[index].count--;
        this.setData({
          cartData: cartData
        })
        this.calculateTotal(); //计算价格
      }
    }
    if (types == "add") { //加
      cartData[index].count++; //加就不判断了
      this.setData({
        cartData: cartData
      })
      this.calculateTotal(); //计算价格
    }
  },
  //删除商品 
  deleteshopTap: function () { //要删除 肯定是已经选中了的商品, 所以肯定在 selectArr里面

    let idarr = []

    let url = app.globalData.root + '/shoppingcart?action=deleteShoppingCart'
    let data = new Object()
    let listdata = {}
    for (let i = 0; i < this.data.selectArr.length; i++) {
      listdata.ids = this.data.selectArr[i].id;
      idarr.push(this.data.selectArr[i].id)
      this.setData({
        idarr: idarr.toString()
      })
    }
    listdata = {
      "ids": this.data.idarr
    }
    console.log(this.data.idarr)
    app.wxRequest("POST", url, {
      "data": JSON.stringify(listdata)
    }, (res) => {
      console.log(res, JSON.stringify(listdata))
      if (res.data == "true") {
        var cartData = this.data.cartData; //初始数据
        var selectArr = this.data.selectArr; //已选择的商品数组
        if (selectArr.length) { //如果以选择的商品数组里有长度
          for (var i = 0; i < cartData.length; i++) {
            for (var j = 0; j < selectArr.length; j++) {
              if (cartData[i].id == selectArr[j].id) { //把初始数据的对应id的数据删掉就好了
                cartData.splice(i, 1);
              }
            }
          }
          this.setData({ //重置一下数据
            cartData: cartData,
            selectArr: [] //已选择的数组置空
          })
          this.calculateTotal(); //计算价格
        }
        this.carList();
      } else {
        wx.showToast({
          title: '删除失败',
          icon: "none"
        })
      }
    }, (err) => {
      console.log(err)
    })
  },
  //编辑或完成
  adminTap: function () { //切换四个按钮的显示
    this.setData({
      adminShow: !this.data.adminShow
    })
  },
  //结算
  toApply: function (e) {
    console.log(e)
    if (this.data.selectArr == '') {
      wx.showToast({
        title: '亲,您还没添加商品哦!',
        icon: "none",
      })
    } else { 
      let url = app.globalData.root + '/shoppingcart?action=updShoppingCart'
      let shoppingobject = {
        "cardlist": []
      }
      console.log(this.data.selectArr.length, this.data.selectArr)
      let carOrderCount = [];
      for (let a = 0; a < this.data.selectArr.length; a++) {
        console.log(a);
        var data1 = new Object();
        data1.id = this.data.selectArr[a].id;
        data1.proid = this.data.selectArr[a].proid;
        data1.proname = this.data.selectArr[a].proname;
        data1.count = this.data.selectArr[a].count;
        data1.price = this.data.selectArr[a].price;
        data1.money = this.data.selectArr[a].money;
        data1.type = this.data.selectArr[a].type;
        data1.specification = this.data.selectArr[a].specification;
        console.info(JSON.stringify(data1))
        shoppingobject.cardlist.push(data1);
        console.info("========"+JSON.stringify(shoppingobject.cardlist));
        carOrderCount.push(this.data.selectArr[a].count)
      }
      this.setData({
        carOrderCount: carOrderCount
      })
      console.log(carOrderCount, shoppingobject)
      app.wxRequest("POST", url, {
        "data": JSON.stringify(shoppingobject)
      }, (res) => {
        if (res.data == "true") {
          if (wx.getStorageSync('user').custtypeid == 0) {
            let shoppingcardids = []
            let cPrice = []
            for (let i = 0; i < this.data.selectArr.length; i++) {
              let idList = this.data.selectArr[i].id;
              let price = this.data.selectArr[i].price
              shoppingcardids.push(idList);
              cPrice.push(price);
            } console.log(shoppingcardids)
            wx.navigateTo({
              url: '/pages/submitorder/submitorder?shoppingcardids=' + shoppingcardids + '&totalPrice=' + this.data.totalPrice + '&cprice=' + JSON.stringify(cPrice) + '&carOrderCount=' + this.data.carOrderCount,
            })
          } else if (wx.getStorageSync('user').custtypeid == 1) {
            let shoppingcardids = []
            let cPrice = []
            for (let i = 0; i < this.data.selectArr.length; i++) {
              let idList = this.data.selectArr[i].id;
              let price = this.data.selectArr[i].price
              shoppingcardids.push(idList);
              cPrice.push(price);
            } console.log(shoppingcardids)
            wx.navigateTo({
              url: '/pages/submitorder/submitorder?shoppingcardids=' + shoppingcardids + '&totalPrice=' + this.data.totalPrice + '&cprice=' + JSON.stringify(cPrice) + '&carOrderCount=' + this.data.carOrderCount,
            })
          } else {
            let shoppingcardids = []
            let cPrice = []
            for (let i = 0; i < this.data.selectArr.length; i++) {
              let idList = this.data.selectArr[i].id;
              let price = this.data.selectArr[i].price
              shoppingcardids.push(idList);
              cPrice.push(price);
             
            } console.log(shoppingcardids)
            wx.navigateTo({
              url: '/pages/submitorder/submitorder?shoppingcardids=' + shoppingcardids + '&totalPrice=' + this.data.totalPrice + '&cprice=' + JSON.stringify(cPrice) + '&carOrderCount=' + this.data.carOrderCount,
            })
          }
        } else {
          wx.showToast({
            title: '产品计算失败',
            icon: "none"
          })
        }
        console.log(res, JSON.stringify(shoppingobject), this.data.carOrderCount)
      }, (err) => {
        console.log(err)
        wx.showToast({
          title: '请求服务器失败',
          icon: "none"
        })
      })
    }
    console.log("已选择的商品:", this.data.selectArr)
  },
  /**
   * 生命周期函数--监听页面加载
   * 
   */
  //购物车小计
  totalMoney:function(){
     let url =app.globalData.root+'/shoppingcart?action=totalMoney'
     app.wxRequest("POST",url,{"data":"{}"},(res)=>{
       console.log(res)
     },(err)=>{
       console.log(err)
       wx.showToast({
         title: '请求服务器出错',
         icon:"none"
       })
     })
  },
  onLoad: function (options) {
    
    app.isLogin();
    this.totalMoney();
    this.setData({
        ischeck:wx.getStorageSync('ischeck')
    })
    if(this.data.ischeck!='false'){
    let imgUrl = app.globalData.imgtpathurl
    this.setData({
      imgUrl: imgUrl
    })
   
    // this.hotPro()
  }else{
    wx.navigateTo({
      url: '../indexx/indexx',
    })
  }
  },
  //加载购物车列表
  carList: function () {
    wx.showLoading({
      title: '加载中',
    })
    let url = app.globalData.root + '/shoppingcart?action=searchShoppingCart'
    let data = {}
    app.wxRequest("POST", url, data, (res) => {
      console.log(res.data)
      if (res.data.length == 0) {
        this.setData({
          cartData: res.data,
          carNull: true
        })
      } else {
        this.setData({
          cartData: res.data,
          carNull: false
        })
        if (wx.getStorageSync('user').custtypeid == 0) {
          let arrPrice0 = [];
          for (let i = 0; i < res.data.length; i++) {
            let price0 = res.data[i].price0
            arrPrice0.push(price0)
          }
          this.setData({
            arrPrice: arrPrice0
          })
        } else if (wx.getStorageSync('user').custtypeid == 1) {
          let arrPrice1 = [];
          for (let i = 0; i < res.data.length; i++) {
            let price1 = res.data[i].price1
            arrPrice1.push(price1)
          }
          this.setData({
            arrPrice: arrPrice1
          })
        } else if (wx.getStorageSync('user').custtypeid == 2) {
          let arrPrice2 = [];
          for (let i = 0; i < res.data.length; i++) {
            let price2 = res.data[i].price2
            arrPrice2.push(price2)
          }
          this.setData({
            arrPrice: arrPrice2
          })
        }
      }
      wx.hideLoading()
    }, (err) => {
      console.log(err)
    })

  },
  //今日热卖/mall/showproduct?action=getOrderProduct
  // hotPro: function () {
  //   let url = app.globalData.root + '/mall/showproduct?action=getOrderProduct';
  //   let data = {}
  //   app.wxRequest("POST", url, data, (res) => {
  //     console.log(res)
  //     this.setData({
  //       newsTab: res.data
  //     })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.isLogin();
    this.carList();
    this.setData({
      totalPrice: 0,
      selectArr: [],
    })
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