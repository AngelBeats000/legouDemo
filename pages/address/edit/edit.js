// pages/address/edit/edit.js
const unit = require('../../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        address_name:'',
        phone:'',
        address:''
    },

    //得到要修改的数据
    getEdit(id){
        var openid = app.globalData.openid
        var token = app.globalData.userInfo.token
        var url = app.globalData.http_url + 'Address/getEdit'
        var params = { id: id, openid: openid, token: token }
        unit.wxRequest(url, params, data => {
            if(data.status){
                this.setData({
                    address_name: data.data.address_name,
                    phone: data.data.phone,
                    address: data.data.address
                })
            }
        }, data => { }, data => { })
    },

    //修改收货地址
    formSubmit(e) {
        var id=this.data.id
        var data = e.detail.value
        var openid = app.globalData.openid
        var token = app.globalData.userInfo.token
        var url = app.globalData.http_url + 'Address/edit'
        var params = { 
            id: id,
            openid: openid, 
            token: token, 
            address_name: data.address_name, 
            phone: data.phone, 
            address: data.address 
        }
        unit.wxRequest(url, params, data => {
            if (data.status) {
                wx.navigateBack({
                    delta: 1
                })
            }else{
                wx.showToast({
                    title: data.msg,
                    icon: 'none'
                })
            }
        }, data => { }, data => { });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getEdit(options.id)
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