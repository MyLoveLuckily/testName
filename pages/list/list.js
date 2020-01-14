// pages/list/list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginUrl: app.globalUrl.apiUrl + "/wx/mini/mall/user/login/",
    listUrl: app.globalUrl.apiUrl +"/wx/mini/mall/buyer/address/list",
    delUrl: app.globalUrl.apiUrl +'/wx/mini/mall/buyer/address/delete/',
    userId:"",
    addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: that.data.loginUrl + res.code,
            data: {},
            method: 'GET',
            success: function (res) {
              if (res.data.code == 200) {
                wx.setStorage({
                  key: 'userId',
                  data: res.data.data.id,
                })
                that.setData({
                  userId: res.data.data.id
                })
              }
              that.getListFun(that);
            }
          })
        }
      }
    })
  },
  getListFun: function(that){
      wx.request({
        url: that.data.listUrl+'?userId=' + that.data.userId,
        data: {},
        method: 'GET',
        success: function(res) {
          if(res.data.code == 200){
            console.log(res.data.data.data)
            that.setData({
              addressList:res.data.data.data
            })
          }
        }
      })
  },
  add:function(){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },
  edit:function(event){
    console.log(11);
    var ind = event.currentTarget.dataset.ind;
    wx.navigateTo({
      url: '/pages/edit/edit?id=' + ind,
    })
  },
  del:function(event){
    console.log(111);
    var ind = event.currentTarget.dataset.ind;
    console.log(ind);
    var that = this;
    wx.request({
      url: that.data.delUrl + ind,
      data: {},
      method: 'DELETE',
      success: function (res) {
        if (res.data.code == 200) {
          that.getListFun(that);
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
    this.getListFun(this);
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