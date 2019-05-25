// pages/goodslist/goodslist.js
const unit = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //商品测试图片
        goodslist: [

            // {
            //     thumb: "https://www.tongpankt.com/images/g1.png",
            //     title: '小姐姐',
            //     price: 99,
            //     collect: 0
            // },
            // {
            //     thumb: "https://www.tongpankt.com/images/g2.png",
            //     title: '小妹妹',
            //     price: "天价",
            //     collect: 0
            // },
            // {
            //     thumb: "https://www.tongpankt.com/images/g3.png",
            //     title: '女装大佬',
            //     price: "无价",
            //     collect: 0
            // }
        ],
        //顶部当前栏目的同级栏目 
        cates:[],
        cid:'',        //当前选中的栏目
        page:1          //当前页，用于下拉加载
    },

    // 得到同级栏目
    getCates(cid){
        var url = app.globalData.http_url + "cate/getCates"
        var params={
            id: cid
        }
        unit.wxRequest(url, params, data => {
            this.setData({
                cates: data
            })
        }, data => { }, data => { })
    },

    // 得到栏目下的商品
    getGoods(cid,page){
        var cid = this.data.cid
        var url = app.globalData.http_url + "goods/goodslist"
        var params={
            cid: cid,
            page:page
        }
        unit.wxRequest(url, params, data => {
            var newgoods = data.goods.data
            var goods = this.data.goodslist
            if(newgoods.length>0){
                for(var i in newgoods){
                    goods.push(newgoods[i])
                }
                this.setData({
                    goodslist:goods,
                    page:page+1
                })
            }else{
                wx.showToast({
                    title:"没有更多数据了",
                    icon:"none"
                })
            }
            wx.hideLoading()
        }, data => {
            wx.showToast({
                title: "加载失败",
                icon: "none"
            })
        }, data => {})
    },

    // 跳转到商品详情页
    showGoods(e){
        var id=e.currentTarget.dataset.goodsId
        wx.navigateTo({
            url: '/pages/goods/goods?id='+id
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var cid=options.cid
        this.setData({
            cid: cid
        })
        var page = this.data.page
        this.getCates(cid)
        this.getGoods(cid,page)
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
        wx.showToast({
            title:"正在刷新", 
            icon:"loading"
            })
        this.setData({
            goodslist:[],
            page:1
        })
        this.getGoods(this.data.cid,1)

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        wx.showToast({
            title: '加载中',
            icon:"loading"
        })
        this.getGoods(this.data.cid,this.data.page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})