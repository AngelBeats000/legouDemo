// pages/goods/goods.js
const unit = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图测试数据
        imgUrls:[
            "http://www.tongpankt.com/images/goods/s1.jpg",
            "http://www.tongpankt.com/images/goods/s2.jpg",
            "http://www.tongpankt.com/images/goods/s3.jpg",
            "http://www.tongpankt.com/images/goods/s4.jpg",
        ],
        indicator:true,
        autoplay:true,
        interval:5000,
        duration:1000,

        // 销量测试数据
        minusStatus:'',        //最低下限
        num:1,
        maxusStatus:'',        //最高上限 

        currentab:0,   //详情-评论切换

        //系统高度
        buyHeight:60,
        scrollHeight:0,

        // 服务器返回数据
        status:'',       //服务器返回的状态数据，400表示商品不存在，200表示存在
        goods:[],  //商品信息
        collectStatus:0     //商品是否收藏
       
    },

    // 购买量减
    bindMinus(){
        var num=this.data.num
        var minusStatus
        var maxusStatus
        var stock_num = this.data.goods.stock_num
        if(num>1){
            num--
        }
        if(num<=1){
            minusStatus='disabled'
            maxusStatus=''
        }else if(num >= stock_num){
            minusStatus=''
            maxusStatus='disabled'
        }else{
            minusStatus=''
            maxusStatus=''
        }
        this.setData({
            num:num,
            minusStatus:minusStatus,
            maxusStatus:maxusStatus
        })
    },

    // 购买量加
    bindPlus(){
        var num = this.data.num
        var stock_num = this.data.goods.stock_num
        var minusStatus
        var maxusStatus
        if(num<stock_num){
            num++
        }
        if (num <= 1) {
            minusStatus = 'disabled'
            maxusStatus=''
        }else if(num >= stock_num){
            minusStatus = ''
            maxusStatus='disabled'
        }else{
            minusStatus=''
            maxusStatus=''
        }
        this.setData({
            num: num,
            minusStatus: minusStatus,
            maxusStatus: maxusStatus
        })
    },

    // 点击切换详情和评价
    clicktab(e){
        var curr=e.target.dataset.current
        var currentab=this.data.currentab
        if(curr==currentab){
            return false
        }else{
            this.setData({
                currentab:curr
            })
        }
    },

    changetab(e){
        this.setData({
            currentab:e.detail.current
        })
    },

    //得到商品信息
    getGoods(id){
        var url = app.globalData.http_url +'goods/getgoods'
        var params={
            id:id
        }
        unit.wxRequest(url, params, data => {
            if(data.status==400){
                wx.showToast({
                    title: '该商品不存在',
                    icon: 'none'
                })
                wx.navigateBack({
                    delta: 1
                })
            }else{
                this.setData({
                    goods: data.goods,
                    imgUrls: data.photo

                })
            }

        }, data => { }, data => { })
    },

    // 判断商品是否收藏
    doCollect(id){
        var url=app.globalData.http_url+'Goods/doCollect'
        var param={
            goods_id:id,
            openid:app.globalData.openid
        }
        unit.wxRequest(url, param, data => {
            this.setData({
                collectStatus:data.status
            })
        }, data => { }, data => { })
    },

    // 添加或取消收藏
    addcollect(e){
        var url=app.globalData.http_url+'Goods/addCollect'
        var param={
            openid:app.globalData.openid,
            token:app.globalData.userInfo.token,
            goods_id:e.currentTarget.dataset.goodsId
        }
        unit.wxRequest(url, param, data => {
            if(data.collect){
                this.setData({
                    collectStatus: data.collect
                })
            }
            if(data.status){
                wx.showToast({
                    title: data.msg
                })
            }else{
                wx.showToast({
                    title: data.msg,
                    icon: 'none'
                })
            }
        }, data => { }, data => { })
    },

    // 加入购物车
    addToCart(){
        var url=app.globalData.http_url+'Cart/addCart'
        var goods_id=this.data.goods.id
        var openid=app.globalData.openid
        var token=app.globalData.userInfo.token
        var num = this.data.num
        var param={
            goods_id:goods_id,
            openid:openid,
            token:token,
            num:num
        }
        unit.wxRequest(url, param, data => {
            if(data.status){
                wx.showToast({
                    title: data.msg
                })
            }else{
                wx.showToast({
                    title: data.msg,
                    icon: 'none'
                })
            }
        }, data => { }, data => { })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getGoods(options.id)
        this.doCollect(options.id)
        // 获取不同型号手机的页面高度
        var that=this
        wx.getSystemInfo({
            success: function(res) {
                var screenHeight=res.windowHeight
                var scrollHeight=screenHeight - that.data.buyHeight
                console.log(scrollHeight)
                that.setData({
                    scrollHeight:scrollHeight
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