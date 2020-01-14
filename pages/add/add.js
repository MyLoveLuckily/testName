// pages/add/add.js
import { CityList } from '../pca.js';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressIndex: 0,
    addUrl: app.globalUrl.apiUrl + '/wx/mini/mall/buyer/address/add',
    userInfo: app.globalData.userInfo,
    region: "",
    addressDetail: "",
    phoneNum: "",
    contacts: "",
    codes: [],
    city: '',
    citylist: CityList,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      s_userId: wx.getStorageSync('userId')
    })
    console.log(this.data.s_userId);
  },
  bindRegionChange: function(event){
    console.log(event.detail);
    this.setData({
      region:event.detail.value
    })
  },
  addressDetail: function (e) {
    this.setData({
      addressDetail: e.detail.value
    })
  },
  phoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  contacts: function (e) {
    this.setData({
      contacts: e.detail.value
    })
  },
  add:function(){
    var that = this;
    wx.request({
      url: that.data.addUrl,
      method:"POST",
      data:{
        userId: that.data.s_userId,
        provinceId: that.data.codes[0],
        cityId: that.data.codes[1],
        areaId: that.data.codes[2],
        addressDetail: that.data.addressDetail,
        phoneNum:that.data.phoneNum,
        contacts:that.data.contacts
      },
      success: function(res){
        if(res.data.code == 200){
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  onSelect(e) {
    this.setData({
      codes: e.detail.code,
      city: e.detail.value
      
    }),
      console.log(this.data.city)
    console.log(e.detail.code);
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