//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    addressList: [],
    address: "",
    city: "",
    province: "",
    name: "",
    receivephone: "",
    area: "",
    modify: "",
    id: ""
  },
  
  selectTap: function (e) {
    let shopinfo = e.currentTarget.dataset.item;
    
    let pages = getCurrentPages(); //获取页面栈
    let prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      mydata: shopinfo,
    
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  //设为默认地址
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let url = app.globalData.root + '/mallAddressManage?action=updCustAddressDefault';
    var data = new Object();
    let datalist = {
      "id": e.detail.value
    };
    app.wxRequest('POST', url, {
      "data": JSON.stringify(datalist)
    }, (res) => {
      this.initShippingAddress();
      console.log("获取数据成功", res)
    })
    var that = this;
    that.setData({
      payTypeList: e.detail.value,
    })
 
  },

  selectTap: function (e) {
    let shopinfo = e.currentTarget.dataset.item;
    let pages = getCurrentPages(); //获取页面栈
    let prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      mydata: shopinfo,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  addAddess: function () {
    wx.navigateTo({
      url: "/pages/addressList/address"
    })
  },
  editAddess: function (e) {
    console.log(e)
    let address = e.currentTarget.dataset.item.address;
    let city = e.currentTarget.dataset.item.city;
    let province = e.currentTarget.dataset.item.province;
    let name = e.currentTarget.dataset.item.name;
    let receivephone = e.currentTarget.dataset.item.phone;
    let area = e.currentTarget.dataset.item.area;
    let modify = e.currentTarget.dataset.modify;
    let id = e.currentTarget.dataset.item.id;
    this.setData({
      address: address,
      city: city,
      province: province,
      name: name,
      receivephone: receivephone,
      area: area,
      modify: modify,
      id: id,
    })
    wx.navigateTo({
      url: "/pages/addressList/address?address=" +
        this.data.address +
        '&city=' + this.data.city +
        '&province=' + this.data.province +
        '&name=' + this.data.name +
        '&receivephone=' + this.data.receivephone +
        '&area=' + this.data.area +
        '&modify=' + this.data.modify +
        '&id=' + this.data.id+
        '&xiugai=' + 'xiugai'
    })
  },
  //删除收货地址
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var isdefault = e.currentTarget.dataset.isdefault;
    if (isdefault == "1") {
      wx.showToast({
        title: '默认地址不允许删除',
        icon: 'none',
      });
      return;
    } else {
      wx.showModal({
        title: '提示',
        content: '确定要删除该收货地址吗？',
        success: function (res) {
          if (res.confirm) {
            let url = app.globalData.root + '/mallAddressManage?action=delCustAddress';
            var data = new Object();
            let datalist = {
              "addressid": id,
            };
            app.wxRequest('POST', url, {
              "data": JSON.stringify(datalist)
            }, (res) => {
              console.log(JSON.stringify(datalist), "获取数据成功", res)

              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              that.initShippingAddress();
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.showToast({
              title: '删除失败',
              icon: none,
              duration: 2000
            })
          }
        }
      })
    }
  },

  onLoad: function () {
  


  },
  onShow: function () {
    this.initShippingAddress();
    // this.morendizhi();

  },
  morendizhi:function(){
    let url = app.globalData.root + '/myorder?action=searchAddressM';
    let data = {}
    app.wxRequest('POST', url, {"data":JSON.stringify(data)}, (res) => {
      console.log(res)
      let addressList = res.data
      this.setData({
        addressList: addressList
      })
      // wx.navigateBack({})
      console.log(addressList)
    }), (err) => {
      console.log(err)
    }
  },
  initShippingAddress: function () {
    let that=this
    let url = app.globalData.root + '/myorder?action=searchAddress';
    let data = {}
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      let addressList = res.data
      that.setData({
        addressList: addressList
      })
      // wx.navigateBack({})
      console.log(addressList)
    }), (err) => {
      console.log(err)
    }
  }

})