// pages/edit/edit.js
import { CityList } from '../pca.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl: app.globalUrl.apiUrl + '/wx/mini/mall/buyer/address/view/',
    editUrl: app.globalUrl.apiUrl + '/wx/mini/mall/buyer/address/edit/',
    id: '',
    codes: [],
    city: '',
    citylist: CityList,
    addressInfo: {},
    regions: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id:options.id,
      s_userId: wx.getStorageSync('userId')
    });
    var that = this;
    wx.request({
      url: that.data.viewUrl + that.data.id,
      data:{},
      method:"GET",
      success: function(res){
        if(res.data.code == 200){
          that.setData({
            addressInfo:{
              contacts: res.data.data.contacts,
              phoneNum: res.data.data.phoneNum,
              province: res.data.data.province,
              city: res.data.data.city,
              area: res.data.data.area,
              addressDetail: res.data.data.addressDetail
            },
            regions:{
              provinceId: res.data.data.provinceId,
              cityId: res.data.data.cityId,
              areaId: res.data.data.areaId,
            }
          })
        }
      }
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
  onSelect(e) {
    this.setData({
      codes: e.detail.code,
      city: e.detail.value
    });
    this.setData({
      addressInfo: {
        contacts: this.data.addressInfo.contacts,
        phoneNum: this.data.addressInfo.phoneNum,
        addressDetail: this.data.addressInfo.addressDetail,
        province: this.data.city[0],
        city: this.data.city[1],
        area: this.data.city[2]
      },
      regions:{
        provinceId: this.data.codes[0],
        cityId: this.data.codes[1],
        areaId: this.data.codes[2],
      }
    })

  },
  edit: function(){
    var that = this;
    wx.request({
      url: that.data.editUrl + that.data.id,
      method:"POST",
      data:{
        userId: that.data.s_userId,
        provinceId: that.data.regions.provinceId,
        cityId: that.data.regions.cityId,
        areaId: that.data.regions.areaId,
        addressDetail: that.data.addressDetail,
        phoneNum: that.data.phoneNum,
        contacts: that.data.contacts
      },
      success:function(res){
        if(res.data.code == 200){
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
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