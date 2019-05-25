// pages/address/list/list.js
const unit = require('../../../utils/util.js');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    getAddress(){
        var openid = app.globalData.openid;
        var token = app.globalData.userInfo.token;
        var url = app.globalData.http_url + 'Address/getAddress';
        var params = { openid: openid, token: token };
        unit.wxRequest(url, params, data => {
            if(data.status){
                this.setData({
                    address:data.data
                })
            }
        }, data => { }, data => { });
    },

    //添加收货地址
    navToAddAddress(){
        wx.navigateTo({
            url: '../add/add'
        })
    },

    //删除收货地址
    delAddress(e){
        var index = e.currentTarget.dataset.index
        var address = this.data.address
        var addressId = address[index].id
        if (address[index].deafult == 1) {
            this.defaultAddress()     //重新选择默认收货地址
        }
        address.splice(index, 1)
        this.setData({
            address: address
        })

        var openid = app.globalData.openid
        var token = app.globalData.userInfo.token
        var url = app.globalData.http_url + 'Address/delAddress'
        var params = { addressId: addressId, openid: openid, token: token }
        unit.wxRequest(url, params, data => {
            
        }, data => { }, data => { })
    },

    //自动获取默认地址
    defaultAddress(){
        var address=this.data.address
        if( address.length >0 ){
            var openid = app.globalData.openid;
            var url = app.globalData.http_url + 'Address/defaultAddress';
            var params = {  openid: openid };
            unit.wxRequest(url, params, data => {
                address[0].deafult=1
                this.setData({
                    address: address
                })
            }, data => { }, data => { });
        }
        
    },

    //选择默认收货地址
    setDeafult(e){
        var index = e.currentTarget.dataset.index
        var address = this.data.address
        for(var i=0; i<address.length; i++ ){
            address[i].deafult=0
        }
        address[index].deafult = 1
        this.setData({
            address: address
        })
        var id=address[index].id
        var openid = app.globalData.openid
        var token = app.globalData.userInfo.token
        var url = app.globalData.http_url + 'Address/setDeafult'
        var params = { id: id, openid: openid, token: token }
        unit.wxRequest(url, params, data => {

        }, data => { }, data => { })
    },

    //跳转到修改
    navToEditAddress(e){
        var index = e.currentTarget.dataset.index
        var address=this.data.address
        var id=address[index].id
        wx.navigateTo({
            url: '../edit/edit?id='+id
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
        this.getAddress()
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