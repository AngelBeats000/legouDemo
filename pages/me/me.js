// pages/me/me.js
const unit = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        login:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            login:app.globalData.login
        })
    },

    navToOrderList: function () {
        wx.navigateTo({
            url: '../order/list/list'
        })
    },

    //登录
    login(e){
        wx.login({
            success: res => {
                if (res.code) {
                    var url = app.globalData.http_url + "User/get_user"
                    var params = {
                        code: res.code,
                        openid: app.globalData.openid,
                        nick_name: e.detail.userInfo.nickName,
                        head_src: e.detail.userInfo.avatarUrl
                    }
                    unit.wxRequest(url, params, data => {
                        if (data.status == 200) {
                            app.globalData.userInfo = data.data
                            this.setData({
                                login:true
                            })
                        } else {
                            app.globalData.login=false
                            wx.showToast({
                                title: data.msg,
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    }, data => { }, data => { })
                } else {
                    console.log('error')
                }
            }
        })
    },

    //收货地址
    navToAddress(){
        wx.navigateTo({
            url: '../address/list/list'
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