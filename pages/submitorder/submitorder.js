// pages/submitorder/submitorder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //详情页传递参数
    proname: "",
    jxstockcount: "",
    jxdanweiname: "",
    jxdanweiid: "",
    jxprice: "",
    jxcount: "",
    jxtype: "",
    //点击选了地址
    clickAdders: true,
    //carPrice
    carPrice: [],
    totalPrice: "",
    imgUrl: "",
    //默认地址
    morenAdress: [],
    shopList: "",
    shareshow: true,
    //显示要购买的商品详情
    price: "",
    shoppingcardids: [],
    type: " ",
    count: " ",
    id: " ",
    proid: " ",
    orderProList: [],
    //计算总价
    sum: "",
    totalpric: '',
  },
  ////显示需要提交的商品详情myorder?action=searchProDetaiweixin,shoppingcardids（购物车id），type，count，id，proid,
  pro: function (shoppingcardids, type, count, id, proid) {
    let url = app.globalData.root + '/myorder?action=searchProDetai'
    let data = new Object()
    data.shoppingcardids = shoppingcardids,
      data.type = type,
      data.count = count,
      data.id = id,
      data.proid = proid,
      app.wxRequest("POST", url, {
        "data": JSON.stringify(data)
      }, (res) => {
        this.setData({
          orderProList: res.data
        })
        console.log(this.data.orderProList)
        let sumTotal = [];
        //计算总价
        for (let i = 0; i < this.data.orderProList.length; i++) {
          let carr = this.data.orderProList[i].count
          let sum = carr * this.data.orderProList[i].price
          sumTotal.push(sum)
        }
        var sum = 0,
          l = sumTotal.length;
        for (var i = 0; i < l; i++) {
          sum += sumTotal[i];
        }
        this.setData({
          sum: sum
        })
        console.log(res, JSON.stringify(data), sumTotal, sum)
      }, (err) => {
        console.log(err)
      })
  },
  proData: function () {
    console.log(this.data.shoppingcardids, this.data.type, this.data.count, this.data.id, this.data.proid)
    if (this.data.shoppingcardids == undefined) {
      let a = "";
      this.setData({
        shoppingcardids: a
      })
      this.pro(this.data.shoppingcardids, this.data.type, this.data.count, this.data.id, this.data.proid)
    } else {
      this.pro(this.data.shoppingcardids, this.data.type, this.data.count, this.data.id, this.data.proid)
    }

  },
  goaddress: function () {
    this.setData({
      clickAdders: false
    })
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    })
  },
  //查询默认收货地址 /myorder?action=searchAddressM
  morenAdders: function () {
    // let userId = wx.getStorageSync('user')
    // console.log(userId.id)

    let url = app.globalData.root + '/myorder?action=searchAddressM';
    let data = {}
    app.wxRequest('POST', url, {
      "data": JSON.stringify(data)
    }, (res) => {
      let morenAdress = res.data[0]
      this.setData({
        morenAdress: morenAdress
      })
      // wx.navigateBack({})
      console.log(morenAdress, res)
    }), (err) => {
      console.log(err)
    }
  },

  gobuy: function () {
    if (this.data.shopList.name == undefined && this.data.morenAdress.custname == undefined) {
      wx.showToast({
        title: '请填写收货地址',
        icon: "none"
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      console.log(this.data.shopList.name, this.data.morenAdress.custname, "-------------------------")
      if (this.data.totalPrice != undefined) {
        console.log("购物车下单")
        //购物车提交订单
        if (this.data.clickAdders) {
          console.log("购物车下单未选择地址")
          var data = new Object()
          data.table = "pro_order";
          data.custid = this.data.morenAdress.custid;
          data.custname = this.data.morenAdress.custname;
          data.custphone = this.data.morenAdress.phone;
          data.custaddress = this.data.morenAdress.province + this.data.morenAdress.city + this.data.morenAdress.area + this.data.morenAdress.address;
          data.totalcount = this.data.carOrderCount;
          data.totalmoney = this.data.totalPrice;
          data.provinceid = this.data.morenAdress.provinceid;
          data.cityid = this.data.morenAdress.cityid;
          data.areaid = this.data.morenAdress.areaid;
          data.villageid = this.data.morenAdress.villageid;

          //查询订单中商品信息
          let url = app.globalData.root + '/myorder?action=productOrderDetail'
          let cdata = {
            "shoppingcardids": this.data.shoppingcardids
          }
          app.wxRequest("POST", url, {
            "data": JSON.stringify(cdata)
          }, (res) => {
            console.log(res.data)
            let proList = [];
            for (let i = 0; i < res.data.length; i++) {
              var listobject = new Object();
              listobject.table = "pro_order_detail";
              listobject.proid = res.data[i].proid;
              listobject.proname = res.data[i].proname;
              listobject.specification = res.data[i].specification;
              listobject.price = res.data[i].price;
              listobject.count = res.data[i].count;
              listobject.money = res.data[i].count * res.data[i].money;
              listobject.type = res.data[i].type;
              //listobject.type=n.type;
              proList.push(listobject);
            }
            let url = app.globalData.root + '/myorder?action=searchProDetai'
            let cmdata = {
              "shoppingcardids": this.data.shoppingcardids
            }
            app.wxRequest("POST", url, {
              "data": JSON.stringify(cmdata)
            }, (res) => {
              console.log(res.data, "二次=============================================")
              var jxproList = [];
              for (let i = 0; i < res.data.length; i++) {
                var listobject = new Object();
                listobject.proname = res.data[i].proname;
                listobject.jxproid = res.data[i].proid;
                let accounts = wx.getStorageSync('user')
                if (this.data.shoppingcardids != "") {
                  listobject.count = res.data[i].count;
                } else {
                  listobject.count = this.data.count;
                }
                jxproList.push(listobject);
              }
              console.log(jxproList, listobject)
              data.proList = proList;
              data = JSON.stringify(data);
              if (res.data != '') {
                if (res.data) {
                  let url = app.globalData.root + '/myorder?action=addMyOrder'
                  app.wxRequest("POST", url, {
                    "data": data
                  }, (res) => {
                    console.log("/myorder?action=addMyOrder", res.data, data)
                    if (res.data != "false") {
                      var orderno = res.data.substring(8, 22);
                      var totalMoney = res.data.substring(33, res.data.length);
                      wx.navigateTo({
                        url: '/pages/sumbit/sumbit?totalMoney=' + totalMoney + '&orderno=' + orderno + '&carData=true',
                      })
                      wx.hideLoading()
                    } else {
                      wx.hideLoading()
                      wx.showToast({
                        title: '添加订单失败',
                        icon: "none"
                      })
                    }

                  }, (err) => {
                    wx.showToast({
                      title: '服务器错误',
                      icon: "none"
                    })

                  })
                } else {
                  wx.showToast({
                    title: res.data,
                    icon: "none"
                  })
                }
              } else {
                wx.showToast({
                  title: '提交订单不能为空',
                  icon: "none"
                })
              }
            }, (err) => {
              console.log(err)
            })
          }, (err) => {
            console.log(err)
          })
        } else {
          console.log("购物车下单选择了地址")
          var data = new Object()
          data.table = "pro_order";
          data.custid = this.data.custid;
          data.custname = this.data.shopList.name;
          data.custphone = this.data.shopList.phone;
          data.custaddress = this.data.shopList.province + this.data.shopList.city + this.data.shopList.area + this.data.shopList.address;
          data.totalcount = this.data.carOrderCount;
          data.totalmoney = this.data.totalPrice;
          data.provinceid = this.data.shopList.provinceid;
          data.cityid = this.data.shopList.cityid;
          data.areaid = this.data.shopList.areaid;
          data.villageid = this.data.shopList.villageid;

          //查询订单中商品信息/myorder?action=productOrderDetail  this.data.shoppingcardids
          let url = app.globalData.root + '/myorder?action=productOrderDetail'
          let cdata = {
            "shoppingcardids": this.data.shoppingcardids
          }
          app.wxRequest("POST", url, {
            "data": JSON.stringify(cdata)
          }, (res) => {
            console.log(res.data)
            let proList = [];

            for (let i = 0; i < res.data.length; i++) {
              var listobject = new Object();
              listobject.table = "pro_order_detail";
              listobject.proid = res.data[i].proid;
              listobject.proname = res.data[i].proname;
              listobject.specification = res.data[i].specification;
              listobject.price = res.data[i].price;
              listobject.count = res.data[i].count;
              listobject.money = res.data[i].count * res.data[i].money;
              listobject.type = res.data[i].type;
              proList.push(listobject);
            }
            let url = app.globalData.root + '/myorder?action=searchProDetai'
            let cmdata = {
              "shoppingcardids": this.data.shoppingcardids
            }
            app.wxRequest("POST", url, {
              "data": JSON.stringify(cmdata)
            }, (res) => {
              console.log(res.data, "二次=============================================")
              var jxproList = [];

              for (let i = 0; i < res.data.length; i++) {
                var listobject = new Object();
                listobject.proname = res.data[i].proname;
                listobject.jxproid = res.data[i].proid;
                let accounts = wx.getStorageSync('user')
                if (this.data.shoppingcardids != "") {
                  listobject.count = res.data[i].count;
                } else {
                  listobject.count = this.data.count;
                }
                jxproList.push(listobject);
              }
              data.proList = proList;
              data = JSON.stringify(data);
              if (res.data != '') {

                console.log(res, "/myorder?action=searchstockcount 成功")
                if (res.data) {
                  let url = app.globalData.root + '/myorder?action=addMyOrder'
                  app.wxRequest("POST", url, {
                    "data": data
                  }, (res) => {
                    console.log(" /myorder?action=addMyOrder 成功", res.data, data)
                    if (res.data != "false") {
                      var orderno = res.data.substring(8, 22);
                      var totalMoney = res.data.substring(33, res.data.length);
                      wx.navigateTo({
                        url: '/pages/sumbit/sumbit?totalMoney=' + totalMoney + '&orderno=' + orderno + '&carData=true',
                      })
                      wx.hideLoading()
                    } else {
                      wx.hideLoading()
                      wx.showToast({
                        title: '添加订单失败',
                        icon: "none"
                      })
                    }

                  }, (err) => {
                    wx.showToast({
                      title: '服务器错误',
                      icon: "none"
                    })

                  })
                } else {
                  wx.showToast({
                    title: res.data,
                    icon: "none"
                  })
                }
              } else {
                wx.showToast({
                  title: '提交订单不能为空',
                  icon: "none"
                })
              }
            }, (err) => {
              console.log(err)
            })
          }, (err) => {
            console.log(err)
          })
        }
      } else {
        console.log("详情页下单", this.data.totalPrice)
        //商品详情提交订单
        if (this.data.clickAdders) {
          console.log("详情页下单未选择地址")
          let data = new Object()
          //用户未选择地址
          var data = new Object()
          data.table = "pro_order";
          data.custid = this.data.morenAdress.custid;
          data.custname = this.data.morenAdress.custname;
          data.custphone = this.data.morenAdress.phone;
          data.custaddress = this.data.morenAdress.province + this.data.morenAdress.city + this.data.morenAdress.area + this.data.morenAdress.address;
          data.totalcount = this.data.carOrderCount;
          data.totalmoney = this.data.totalPrice;
          data.provinceid = this.data.morenAdress.provinceid;
          data.cityid = this.data.morenAdress.cityid;
          data.areaid = this.data.morenAdress.areaid;
          data.villageid = this.data.morenAdress.villageid;
          data.totalcount = "1";
          data.totalmoney = this.data.price;

          //查询订单中商品信息/myorder?action=productOrderDetail  this.data.shoppingcardids
          let url = app.globalData.root + '/myorder?action=productOrderDetail'
          let xdata = new Object()
          xdata.shoppingcardids = this.data.shoppingcardids,
            xdata.proname = this.data.proname,
            xdata.proid = this.data.proid,
            // xdata.price = this.data.price,
            xdata.count = this.data.count,
            xdata.type = this.data.type,
            xdata.id = this.data.id,
            app.wxRequest("POST", url, {
              "data": JSON.stringify(xdata)
            }, (res) => {
              console.log(res, xdata, res.data[0].count * res.data[0].price)
              var proList = new Array();
              for (let i = 0; i < res.data.length; i++) {
                var listobject = new Object();
                listobject.table = "pro_order_detail";
                listobject.proid = res.data[i].proid;
                listobject.proname = res.data[i].proname;
                listobject.specification = res.data[i].specification;
                listobject.price = res.data[i].price;
                listobject.count = res.data[i].count;
                listobject.money = res.data[i].count * res.data[i].price;
                listobject.type = res.data[i].type;
                proList.push(listobject);
              }
              console.log(proList, "------------------------------------------------")

              let url = app.globalData.root + '/myorder?action=searchProDetai'
              let cmdata = {
                "shoppingcardids": this.data.shoppingcardids,
                "type": this.data.type,
                "count": this.data.count,
                "id": this.data.id,
                "proid": this.data.proid,
                "price": this.data.price,
                "proname": this.data.proname
              }
              app.wxRequest("POST", url, {
                "data": JSON.stringify(cmdata)
              }, (res) => {
                console.log(res.data, "二次=============================================")
                var jxproList = [];

                for (let i = 0; i < res.data.length; i++) {
                  var listobject = new Object();
                  listobject.proname = res.data[i].proname;
                  listobject.jxproid = res.data[i].proid;
                  let accounts = wx.getStorageSync('user')
                  if (this.data.shoppingcardids != "") {
                    listobject.count = res.data[i].count;
                  } else {
                    listobject.count = this.data.count;
                  }
                  jxproList.push(listobject);
                }
                data.proList = proList;
                data = JSON.stringify(data);
                if (res.data != '') {
                  let url = app.globalData.root + '/myorder?action=addMyOrder'
                  app.wxRequest("POST", url, {
                    "data": data
                  }, (res) => {
                    console.log("/myorder?action=addMyOrder 成功", res.data, data)
                    if (res.data != "false") {
                      var orderno = res.data.substring(8, 22);
                      var totalMoney = res.data.substring(33, res.data.length);
                      wx.navigateTo({
                        url: '/pages/sumbit/sumbit?totalMoney=' + totalMoney + '&orderno=' + orderno + '&commodityName=' + this.data.orderProList[0].proname,
                      })
                      wx.hideLoading()
                    } else {
                      wx.showToast({
                        title: '添加订单失败',
                        icon: "none"
                      })
                    }

                  }, (err) => {
                    wx.showToast({
                      title: '服务器错误',
                      icon: "none"
                    })

                  })

                } else {
                  wx.showToast({
                    title: '提交订单不能为空',
                    icon: "none"
                  })
                }
              }, (err) => {
                console.log(err)
              })
            }, (err) => {
              console.log(err)
            })

        } else {
          console.log("详情页下单选择了地址shopList.receivename")
          let data = new Object()
          var data = new Object()
          data.table = "pro_order";
          data.custid = this.data.custid;
          data.custname = this.data.shopList.name;
          data.custphone = this.data.shopList.phone;
          data.custaddress = this.data.shopList.province + this.data.shopList.city + this.data.shopList.area + this.data.shopList.address;
          data.totalcount = this.data.carOrderCount;
          data.totalmoney = this.data.totalPrice;
          data.provinceid = this.data.shopList.provinceid;
          data.cityid = this.data.shopList.cityid;
          data.areaid = this.data.shopList.areaid;
          data.villageid = this.data.shopList.villageid;
          data.totalcount = "1";
          data.totalmoney = this.data.price;
          //查询订单中商品信息/myorder?action=productOrderDetail  this.data.shoppingcardids
          let url = app.globalData.root + '/myorder?action=productOrderDetail'
          let xmdata = new Object()
          xmdata.shoppingcardids = this.data.shoppingcardids,
            xmdata.type = this.data.type,
            xmdata.count = this.data.count,
            // xmdata.price = this.data.price,
            xmdata.id = this.data.id,
            xmdata.proid = this.data.proid,
            xmdata.proname = this.data.proname,
            app.wxRequest("POST", url, {
              "data": JSON.stringify(xmdata)
            }, (res) => {
              console.log(res, JSON.stringify(xmdata))
              var proList = new Array();

              for (let i = 0; i < res.data.length; i++) {
                var listobject = new Object();
                listobject.table = "pro_order_detail";
                listobject.proid = res.data[i].proid;
                listobject.proname = res.data[i].proname;
                listobject.specification = res.data[i].specification;
                listobject.price = res.data[i].price;
                listobject.count = res.data[i].count;
                listobject.money = res.data[i].count * res.data[i].money;
                listobject.type = res.data[i].type;

                proList.push(listobject);
              }


              let url = app.globalData.root + '/myorder?action=searchProDetai'
              let cmdata = {
                "shoppingcardids": this.data.shoppingcardids,
                "type": this.data.type,
                "count": this.data.count,
                "id": this.data.id,
                "proid": this.data.proid,
                "price": this.data.price,
                "proname": this.data.proname
              }
              app.wxRequest("POST", url, {
                "data": JSON.stringify(cmdata)
              }, (res) => {
                console.log(res.data, "二次=============================================", JSON.stringify(cmdata))
                var jxproList = [];

                for (let i = 0; i < res.data.length; i++) {
                  var listobject = new Object();
                  listobject.proname = res.data[i].proname;
                  listobject.jxproid = res.data[i].proid;

                  if (this.data.shoppingcardids != "") {
                    listobject.count = res.data[i].count;
                  } else {
                    listobject.count = this.data.count;
                  }
                  jxproList.push(listobject);
                }
                data.proList = proList;
                data = JSON.stringify(data);
                if (res.data != '') {
                  let url = app.globalData.root + '/myorder?action=addMyOrder'
                  app.wxRequest("POST", url, {
                    "data": data
                  }, (res) => {
                    console.log("/myorder?action=addMyOrder 成功", res.data, data)
                    if (res.data != "false") {
                      var orderno = res.data.substring(8, 22);
                      var totalMoney = res.data.substring(33, res.data.length);
                      wx.navigateTo({
                        url: '/pages/sumbit/sumbit?totalMoney=' + totalMoney + '&orderno=' + orderno + '&commodityName=' + this.data.orderProList[0].proname,
                      })
                      wx.hideLoading()
                    } else {
                      wx.showToast({
                        title: '添加订单失败',
                        icon: "none"
                      })
                    }

                  }, (err) => {
                    wx.showToast({
                      title: '服务器错误',
                      icon: "none"
                    })

                  })

                } else {
                  wx.showToast({
                    title: '提交订单不能为空',
                    icon: "none"
                  })
                }
              }, (err) => {
                console.log(err)
              })
            }, (err) => {
              console.log(err)
            })

        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      jxdanweiname: options.proDanweiname,
      jxdanweiid: options.proDanweiid,
      jxprice: options.price,
      jxcount: options.count,
      jxtype: options.type,
      proname: options.proname,
      totalPrice: options.price * options.count,

      // totalpric: options.totalpric,
    })
    //获取缓存中用户信息
    if (options.cprice) {
      let carPrice = JSON.parse(options.cprice)
      let b = options.carOrderCount.split(',');
      let sum = 0;

      for (let i = 0; i < b.length; i++) {
        let c = parseInt(b[i]);

        sum += c;
      }
      console.log(sum)
      let imgUrl = app.globalData.imgtpathurl
      this.setData({

        imgUrl: imgUrl,
        shoppingcardids: options.shoppingcardids,
        carPrice: carPrice,
        carOrderCount: sum,
        // totalPrice: options.price * options.count,
        totalPrice: options.totalPrice,
      })
    } else {
      console.log(options)
      let imgUrl = app.globalData.imgtpathurl
      this.setData({
        shoppingcardids: options.shoppingcardids,
        // carPrice:carPrice,
        type: options.type,
        id: options.id,
        price: options.price,
        proid: options.proid,
        count: options.count,
        imgUrl: imgUrl,
        totalPrice: options.totalPrice,
      })
    }
    this.proData();
    app.isLogin();
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
    //页面数据传递
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    console.log(currPage.data)
    this.setData({
      clickAdders: currPage.data.clickAdders
    })
    let shopList = currPage.data.mydata;
    console.log(shopList)
    if (shopList) {
      this.setData({
        shopList: shopList,
        shareshow: false
      })
    }
    this.morenAdders();
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