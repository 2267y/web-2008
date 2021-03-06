 //获取应用实例
 var app = getApp()
 Page({
   data: {
     provinceid: "",
     cityid: "",
     areaid: "",
     address: "",
     mobile: "",
     index: "",
     shiindex: "",
     quindex: "",
     objectArray: [],
     objectArrayshi: [],
     objectArrayqu: [],
     //接收参数
     seladdress: "",
     selcity: "",
     selprovince: "",
     selcustname: "",
     selphone: "",
     seldistrict: "",
     selmodify: "",
     //删除收货地址对应id
     selid: "",
     xiugai: "",
     //修改
     xiugaiName: "",
     xiugaiPhone: "",
     xiugaiAddress: "",
   },
   getInputvalname: function (e) {
     console.log(e.detail.value)
     this.setData({
       xiugaiName: e.detail.value
     })
   },
   getInputvalphone: function (e) {
     console.log(e.detail.value)
     this.setData({
       xiugaiPhone: e.detail.value
     })
   },
   getInputvaladdress: function (e) {
     console.log(e.detail.value)
     this.setData({
       xiugaiAddress: e.detail.value
     })
   },
   //修改地址/mallAddressManage?action=updateCustAddress
   xiugaiadd: function () {
     console.log(wx.getStorageSync('user'))
     let id = wx.getStorageSync('user').id
     let url = app.globalData.root + '/mallAddressManage?action=updateCustAddress';
     var data = new Object();
     let datalist = {
       //  "person_tel": this.data.xiugaiPhone,
       //  "person_name": this.data.xiugaiName,
       "address": this.data.xiugaiAddress,
       "id": this.data.selid,
       "provinceid": this.data.provinceid,
       "cityid": this.data.cityid,
       "areaid": this.data.areaid,
       "villageid": "",
       "isdefault": "1",
     };
     app.wxRequest('POST', url, {
       "data": JSON.stringify(datalist)
     }, (res) => {
       console.log(JSON.stringify(datalist), res)
       wx.navigateBack({})
       if (res.data == "true") {
         wx.showToast({
           title: '修改成功',
           icon: 'success',
           duration: 2000
         })
       } else {
         wx.showToast({
           title: '修改失败',
           icon: 'none',
           duration: 2000
         })
       }
     }), (err) => {}
   },
   bindCancel: function () {
     wx.navigateBack({})
   },
   //添加收货地址
   bindSave: function (e) {
     console.log(e)
     var that = this;
     var linkMan = e.detail.value.linkMan;
     var address = e.detail.value.addres;
     var mobile = e.detail.value.mobile;
     that.setData({
       linkMan: linkMan,
       address: address,
       mobile: mobile
     })

     if (linkMan == "") {
       wx.showModal({
         title: '提示',
         content: '请填写联系人姓名',
         showCancel: false
       })
       return
     }
     if (mobile == "") {
       wx.showModal({
         title: '提示',
         content: '请填写手机号码',
         showCancel: false
       })
       return
     }
     if (this.data.index == "") {
       wx.showModal({
         title: '提示',
         content: '请选择省分',
         showCancel: false
       })
       return
     }
     if (this.data.shiindex == "") {
       wx.showModal({
         title: '提示',
         content: '请选择市',
         showCancel: false
       })
       return
     }
     if (this.data.quindex == "") {
       wx.showModal({
         title: '提示',
         content: '请选择区',
         showCancel: false
       })
       return
     }

     if (address == "") {
       wx.showModal({
         title: '提示',
         content: '请填写详细地址',
         showCancel: false
       })
       return
     }
     console.log(wx.getStorageSync('user'))
     let id = wx.getStorageSync('user').id
     let url = app.globalData.root + '/mallAddressManage?action=addCustAddress';
     var data = new Object();
     let datalist = {
       "address": this.data.address,
    
       "provinceid": this.data.provinceid,
       "cityid": this.data.cityid,
       "areaid": this.data.areaid,
       "isdefault": "1",
       "villageid": "",

     };
     console.log(this.data.mobile, this.data.linkMan, this.data.address)
     app.wxRequest('POST', url, {
       "data": JSON.stringify(datalist)
     }, (res) => {
       console.log("添加地址", res, datalist)
       wx.navigateBack({})
       wx.showToast({
         title: '增加成功',
         icon: 'success',
         duration: 2000
       })
     }), (err) => {}
   },
   //  //删除收货地址
   //  deleteAddress: function () {
   //    var that = this;
   //    var id = that.data.selid;
   //    wx.showModal({
   //      title: '提示',
   //      content: '确定要删除该收货地址吗？',
   //      success: function (res) {
   //        if (res.confirm) {
   //          let url = app.globalData.root + '/mallAddressManage?action=delCustAddress';
   //          var data = new Object();
   //          let datalist = {
   //            "addressid": id,
   //          };
   //          app.wxRequest('POST', url, {
   //            "data": JSON.stringify(datalist)
   //          }, (res) => {
   //            console.log(JSON.stringify(datalist), "获取数据成功", res)
   //            wx.navigateBack({})
   //            wx.showToast({
   //              title: '增加成功',
   //              icon: 'success',
   //              duration: 2000
   //            })
   //          })
   //        } else if (res.cancel) {
   //          console.log('用户点击取消')
   //          wx.showToast({
   //            title: '删除失败',
   //            icon: none,
   //            duration: 2000
   //          })
   //        }
   //      }
   //    })
   //  },

   //省 register?action=loadProvince
   bindPickerChange: function (e) {
     console.log('picker发送选择改变，携带值为', e.detail.value, e)
     this.setData({
       xiugai: 'xiuGai'
     })
     let provinceid = this.data.objectArray[e.detail.value].areaid
     this.setData({
       index: e.detail.value,
       provinceid: provinceid
     })
     console.log(this.data.provinceid, "provinceid")
     //市

     let shiurl = app.globalData.root + '/register?action=loadCity';
     let shidatalist = {
       "provinceid": this.data.provinceid,
     };
     app.wxRequest('POST', shiurl, {
       "params": JSON.stringify(shidatalist)
     }, (res) => {
       var objectArrayshi = res.data;
       console.log("获取数据成功==市", objectArrayshi)
       this.setData({
         objectArrayshi: objectArrayshi
       })
     })


   },
   //市
   bindPickerChangeshi: function (e) {
     console.log('picker发送选择改变，携带值为', e.detail.value)

     let cityid = this.data.objectArrayshi[e.detail.value].areaid
     console.log(cityid, "cityid")

     let quurl = app.globalData.root + '/register?action=loadCountry';
     let qudatalist = {
       "cityid": cityid,
     };
     app.wxRequest('POST', quurl, {
       "params": JSON.stringify(qudatalist)
     }, (res) => {
       var objectArrayqu = res.data;
       console.log("获取数据成功==区", objectArrayqu)
       console.log("areaid", objectArrayqu[e.detail.value].areaid)

       let areaid = objectArrayqu[e.detail.value].areaid
       this.setData({
         objectArrayqu: objectArrayqu,
         cityid: cityid,
         areaid: areaid
       })

     })
     this.setData({
       shiindex: e.detail.value,
     })
   },
   //区
   bindPickerChangequ: function (e) {
     console.log('picker发送选择改变，携带值为', e.detail.value)
     this.setData({
       quindex: e.detail.value,
     })
   },

   selectCity: function () {},


   onLoad: function (e) {
     app.isLogin();
     wx.showLoading({
       title: '数据加载中...',
     })
     setTimeout(function () {
       wx.hideLoading()
     }, 2000)
     console.log(e)
     var that = this;
     // this.initCityData(1);
     let seladdress = e.address
     let selcity = e.city
     let selprovince = e.province
     let selcustname = e.name
     let selphone = e.receivephone
     let seldistrict = e.area
     let selmodify = e.modify
     let xiugai = e.xiugai
     //删除地址对应id
     let selid = e.id
     this.setData({
       seladdress: seladdress,
       selcity: selcity,
       selprovince: selprovince,
       selcustname: selcustname,
       selphone: selphone,
       seldistrict: seldistrict,
       selmodify: selmodify,
       xiugai: xiugai,
       selid: selid
     })
     //省
     let url = app.globalData.root + '/register?action=loadProvince';
     let datalist = {};
     app.wxRequest('POST', url, datalist, (res) => {
       var objectArray = res.data;
       console.log("获取数据成功==省", objectArray)
       this.setData({
         objectArray: objectArray
       })
     })
   },


 })