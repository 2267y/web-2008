// pages/user/order/order.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
    //产品
    proList: [],
    // 顶部菜单切换
    navbar: ['全部', '待付款', "待发货", "待收货", "待评价"],
    // 默认选中菜单
    index: 0,
    pick_name: "",
    currentTab: 0,
    listArray: [], //显示的订单
    showOrderList: [], //获取的订单
    zhuangTai: [],
  },
  //确认收货/myorder?action=confirmOrder
  confirm: function (e) {
    console.log(e)
    let url = app.globalData.root + '/myorder?action=confirmOrder'
    let data = {
      "id": e.currentTarget.dataset.id
    }
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(res, data, this.data.currentTab - 1)
      wx.showToast({
        title: '确认收货成功!',
      })
      if (this.data.currentTab > 0) {
        this.allOrder(this.data.currentTab - 1);
      } else {
        this.allOrder(this.data.currentTab);
      }

    }, (err) => {
      console.log(err)
    })
  },
  //去评价orderno
  goEval: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/eval/eval?orderno=' + e.currentTarget.dataset.orderid,
    })
  },
  // 初始化加载
  created: function () {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res.data);
        if (res.data) {
          that.setData({
            isLogin: true,
            list: res.data
          })
        } else {
          that.setData({
            isLogin: false
          })
        }
        that.setData({
          userid: res.data.id
        })
        var userid = res.data.id;
        that._selectByUserIdNormal(userid);
      },
      fail: function (err) {}
    })
  },
  //顶部tab切换
  navbarTap: function (e) {
    console.log(e.currentTarget.dataset.idx);
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })

    if (that.data.currentTab === 0) {
      console.log("回到全部");
      this.allOrder('');
    } else if (that.data.currentTab === 1) {
      console.log("待付款");
      this.allOrder(0);
    } else if (that.data.currentTab === 2) {
      console.log("待发货");
      this.allOrder(1);
    } else if (that.data.currentTab === 3) {
      console.log("待收货");
      this.allOrder(2);
    } else {
      console.log("待评价");
      this.allOrder(3);
    }
  },

  //支付
  submit: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/sumbit/sumbit?totalMoney=' + e.currentTarget.dataset.totalmoney + '&orderno=' + e.currentTarget.dataset.orderid + '&carData=false',
    })
  },
  //
  //加载全部订单
  allOrder: function (currentTab) {
    wx.showLoading({
      title: '加载中',
    })
    let url = app.globalData.root + '/myorder?action=searchMyOrderNEW'
    let data = {
      "orderstatus": currentTab,
      "orderno": ""
    }
    app.wxRequest("POST", url, {
      "data": JSON.stringify(data)
    }, (res) => {
      console.log(res, JSON.stringify(data))
      this.setData({
        listArray: res.data
      })
      if (this.data.listArray == null) {
        wx.showToast({
          title: '暂无订单',
          icon: "none"
        })
        return;
      }
      let zhuangTai = [];
      for (let i = 0; i < this.data.listArray.length; i++) {
        if (this.data.listArray[i].orderstatus == "0") {
          let zt = "待付款"
          zhuangTai.push(zt)
        } else if (this.data.listArray[i].orderstatus == "1") {
          let zt = "待发货"
          zhuangTai.push(zt)
        } else if (this.data.listArray[i].orderstatus == "2") {
          let zt = "待收货"
          zhuangTai.push(zt)
        } else if (this.data.listArray[i].orderstatus == "3") {
          let zt = "待评价"
          zhuangTai.push(zt)
        } else if (this.data.listArray[i].orderstatus == "4") {
          let zt = "订单完成"
          zhuangTai.push(zt)
        }
      }
      this.setData({
        zhuangTai: zhuangTai
      })
      console.log(this.data.zhuangTai)
      wx.hideLoading()
    }, (err) => {
      console.log(err)
      wx.showToast({
        title: '请求服务器出错',
        icon: "none"
      })
    })


  },
  //加载全部订单
  // allOrder: function (currentTab) {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   //第一个接口
  //   let url = app.globalData.root + '/myorder?action=searchMyOrder'
  //   let data = {
  //     "orderstatus": currentTab,
  //   }
  //   app.wxRequest("POST", url, {
  //     "data": JSON.stringify(data)
  //   }, (res) => {
  //     console.log(res)
  //     this.setData({
  //       listArray: res.data
  //     })
  //     let orderstatusList = [];
  //     let paidtypeList = [];
  //     let zhuangTai = [];
  //     let serchProlistid = "";
  //     let proarrList = [];
  //     for (let i = 0; i < this.data.listArray.length; i++) {
  //       orderstatusList.push(this.data.listArray[i].orderstatus)
  //       paidtypeList.push(this.data.listArray[i].paidtype)
  //       serchProlistid = this.data.listArray[i].id //取id
  //       if (this.data.listArray[i].paidtype == "未付款" && this.data.listArray[i].orderstatus == "0") {
  //         let zt = "未付款"
  //         zhuangTai.push(zt)
  //       } else if (this.data.listArray[i].orderstatus == "0" && this.data.listArray[i].paidtype != "未付款") {
  //         let zt = "待发货"
  //         zhuangTai.push(zt)
  //       } else if (this.data.listArray[i].orderstatus == "1") {
  //         let zt = "部分发货"
  //         zhuangTai.push(zt)
  //       } else if (this.data.listArray[i].orderstatus == "2") {
  //         let zt = "发货完成"
  //         zhuangTai.push(zt)
  //       } else if (this.data.listArray[i].orderstatus == "3") {
  //         let zt = "待评价"
  //         zhuangTai.push(zt)
  //       } else if (this.data.listArray[i].orderstatus == "4") {
  //         let zt = "订单完成"
  //         zhuangTai.push(zt)
  //       }
  //       let url = app.globalData.root + '/myorder?action=searchMyOrderDetail' //第二个接口27382
  //       let data = new Object()
  //       data.orderid = serchProlistid //传id
  //       app.wxRequest("POST", url, {
  //         "data": JSON.stringify(data)
  //       }, (res) => {
  //         console.log(res.data, JSON.stringify(data))
  //         proarrList.push(res.data)
  //         wx.hideLoading()
  //       }, (err) => {
  //         console.log(err)
  //       })
  //     }
  //     // .toString()
  //     setTimeout(() => {
  //       this.setData({
  //         zhuangTai: zhuangTai,
  //         proarrList: proarrList,
  //       })
  //       console.log(typeof (proarrList), proarrList[1], proarrList)
  //     }, 500);
  //     console.log(this.data.proarrList)
  //     wx.hideLoading()
  //   }, (err) => {
  //     console.log(err)
  //   })


  // },
  //删除订单/myorder?action=deleteOrder
  removOrder: function (e) {
    console.log(e.currentTarget.dataset.id)
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定取消当前订单?',
      success(res) {
        if (res.confirm) {
          //刪除对应id订单
          let url = app.globalData.root + '/myorder?action=deleteOrder';
          var data = new Object();
          let datalist = {
            "id": e.currentTarget.dataset.id,
          };
          //params
          app.wxRequest('POST', url, {
            "data": JSON.stringify(datalist)
          }, (res) => {
            console.log("删除成功", res.data, that.data.currentTab)

            wx.showToast({
              title: '删除成功',
            })
            if (that.data.currentTab > 0) {
              let a = that.data.currentTab - 1
              that.allOrder(a);
            } else {
              let a = that.data.currentTab
              that.allOrder(a);
            }

          }), (err) => {
            console.log("获取数据失败", err)
            wx.showToast({
              title: '删除失败',
            })
          }
        } else if (res.cancel) {
          wx.showToast({
            title: '删除失败',
          })
        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imgUrl = app.globalData.imgtpathurl
    let currentTab = options.currentTab
    let b = parseInt(currentTab)
    if (b > 0) {
      let current = b - 1
      console.log(current)
      this.allOrder(current);
      console.log(options)
      this.setData({
        currentTab: currentTab,
        imgUrl: imgUrl
      })
    } else {
      let current = b
      console.log(current)
      this.allOrder(current);
      console.log(options)
      this.setData({
        currentTab: currentTab,
        imgUrl: imgUrl
      })
    }
    // let url = app.globalData.root + '/myorder?action=searchMyOrderDetail'//第二个接口
    //     let data = new Object()
    //     data.orderid = 27518//传id
    //     app.wxRequest("POST", url, {
    //       "data": JSON.stringify(data)
    //     }, (res) => {
    //       console.log(res.data,JSON.stringify(data))

    //     }, (err) => {
    //       console.log(err)
    //     })
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