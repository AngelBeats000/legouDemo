// pages/order/submit/submit.js
const unit = require('../../../utils/util.js');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartIds:'',    //购物车id
        cartList:[],      //商品信息
        address:[],     //收货地址信息
        goodsTotalPrice:''   //总价
    },

    //获取购物车商品信息
    getCarts: function () {
        var cartIds = this.data.cartIds
        var openid = app.globalData.openid
        var token = app.globalData.userInfo.token
        var url = app.globalData.http_url + 'cart/getCarts'
        var params = { cartIds: cartIds, openid: openid, token: token }
        unit.wxRequest(url, params, data => {
            console.log(data)
            if(data.status){
                this.setData({
                    cartList: data.cartList,
                    address: data.address
                })
            }
            
        }, data => { }, data => { });
    },

    //下单
    //下单
    submit: function () {
        var cartIds = this.data.cartIds;
        var addressId = this.data.address.id;
        var goodsTotalPrice = this.data.goodsTotalPrice;
        var openid = app.globalData.openid;
        var token = app.globalData.userInfo.token;
        var url = app.globalData.http_url + 'Order/submitOrder';
        var params = { cartIds: cartIds, addressId: addressId, goodsTotalPrice: goodsTotalPrice, openid: openid, token: token };
        unit.wxRequest(url, params, data => {
            if (data.code == 200) {
                app.globalData.wxData = data.data;
                app.globalData.order = data.order;
                wx.showToast({
                    title: '下单完成',
                    icon: 'none',
                    duration: 2000
                });
                setTimeout(function () {
                    wx.navigateTo({
                        url: '../payment/payment',
                    })
                }, 2000)
            } else {
                wx.showToast({
                    title: '请先登录',
                    icon: 'none',
                    duration: 2000
                })
            }
        }, data => { }, data => { });
    },

    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            cartIds: app.globalData.cartIds,
            goodsTotalPrice: app.globalData.goodsTotalPrice
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
        this.getCarts()
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