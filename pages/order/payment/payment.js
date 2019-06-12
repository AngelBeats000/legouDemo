// pages/order/payment/payment.js
const unit = require('../../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wxData:[],
        order:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            wxData: app.globalData.wxData,
            order: app.globalData.order
        })
    },

    //支付
    wxPay(){
        var order=this.data.order
        var wxData=this.data.wxData

        wx.requestPayment({
            timeStamp: wxData.timeStamp,
            nonceStr: wxData.nonceStr,
            package: wxData.package,
            signType: 'MD5',
            paySign: wxData.paySign,
            success(res) {
                wx.navigateTo({
                    url: '../result/result?status=1&orderId=' + orderId,
                })
            },
            fail(res) {
                wx.navigateTo({
                    url: '../result/result?status=0&orderId=' + orderId,
                })
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