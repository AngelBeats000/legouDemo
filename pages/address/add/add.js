// pages/address/add/add.js
const unit = require('../../../utils/util.js');
const app = getApp();
Page({














    
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    //添加收货地
    formSubmit(e){
        var data = e.detail.value
        var openid = app.globalData.openid
        var token = app.globalData.userInfo.token
        var url = app.globalData.http_url + 'Address/add'
        var params = { openid: openid, token: token, address_name: data.address_name,phone: data.phone,address: data.address }
        unit.wxRequest(url, params, data => {
            if (data.status) {
                this.setData({
                    address: data.data
                })
                wx.navigateBack({
                    delta: 1
                })
            }
        }, data => { }, data => { });
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