// pages/cart/cart.js
const unit = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartData:[],
        //系统高度
        buyHeight: 60,
        scrollHeight: 0,

        minusStatus: '',        //最低下限
        maxusStatus: '',        //最高上限 
        dataEmpty:true,         //购物车是否有数据
        checkAll:false,        //全选
        goodsTotalPrice: 0       //总价
    },
    
    //立即结算
    buyNow: function () {
        var cartData = this.data.cartData;
        var cartIds = [];
        if (cartData.length > 0) {
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].selected == 1) {
                    cartIds.push(cartData[i].id);
                }
            }
            cartIds = cartIds.join(',');
            app.globalData.cartIds = cartIds;
            app.globalData.goodsTotalPrice = this.data.goodsTotalPrice;
            //判断用户有没有默认收货地址
            var openid = app.globalData.openid;
            var token = app.globalData.userInfo.token;
            var url = app.globalData.http_url + 'Address/deafultAddress';
            var params = { openid: openid, token: token };
            unit.wxRequest(url, params, data => {
                if (data.code == 200) {
                    wx.navigateTo({
                        url: '../order/submit/submit',
                    })
                } else if (data.code == 401) {
                    wx.navigateTo({
                        url: '../address/add/add',
                    })
                } else {
                    wx.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }, data => { }, data => { });
        } else {
            wx.showToast({
                title: '至少选择一个商品',
                icon: 'none',
                duration: 2000
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //页面高度获取
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                var screenHeight = res.windowHeight
                var scrollHeight = screenHeight - that.data.buyHeight
                console.log(scrollHeight)
                that.setData({
                    scrollHeight: scrollHeight
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.goodsTotalPrice()    //商品总价计算

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getCart()      //加载购物车数据
        this.iFselectAll()  //判断是否全选
        this.firstGoodsTotalPrice()
    },

    // 初次打开购物车计算商品总价
    firstGoodsTotalPrice: function () {
        var openid = app.globalData.openid;
        var token = app.globalData.userInfo.token;
        var url = app.globalData.http_url + 'Cart/firstGoodsTotalPrice';
        var params = { openid: openid, token: token };
        unit.wxRequest(url, params, data => {
            if (data.status) {
                this.setData({
                    goodsTotalPrice: data.goodsTotalPrice
                });
            }
        }, data => { }, data => { });
    },

    //删除
    delCartGoods(e){
        var index = e.currentTarget.dataset.index;
        var cartData = this.data.cartData;
        var goodsId = cartData[index].goods_id;
        if (cartData[index].selected == 1) {
            this.goodsTotalPrice();
        }
        cartData.splice(index, 1);
        this.setData({
            cartData: cartData
        });
        
        var openid = app.globalData.openid;
        var token = app.globalData.userInfo.token;
        var url = app.globalData.http_url + 'Cart/delCartGoods';
        var params = { goods_id: goodsId, openid: openid, token: token };
        unit.wxRequest(url, params, data => {
            this.iFdataEmpty()
        }, data => { }, data => { });
        this.goodsTotalPrice();
    },

    //判断是否还有数据
    iFdataEmpty() {
        var cartData = this.data.cartData
        var check = false
        console.log(cartData.length)
        if(cartData.length<1){
            check=true
        }
        this.setData({
            dataEmpty: check
        })
    },

    // 购买量减
    bindMinus: function (e) {
        var index = e.currentTarget.dataset.index;
        var cartData = this.data.cartData;
        var goodsNum = cartData[index].goods_num;
        if (goodsNum > 1) {
            goodsNum = goodsNum - 1;
        }
        if (goodsNum > cartData[index].stock_num) {
            goodsNum = cartData[index].stock_num
        }
        cartData[index].goods_num = goodsNum;
        this.setData({
            cartData: cartData
        });
        //修改数据库购物车的数量
        this.updateGoodsNum(cartData[index].goods_id, goodsNum);
        if (cartData[index].selected == 1) {
            this.goodsTotalPrice();
        }
    },
    // 购买量加
    bindMaxus: function (e) {
        var index = e.currentTarget.dataset.index;
        var cartData = this.data.cartData;
        var goodsNum = cartData[index].goods_num + 1;
        if (goodsNum > cartData[index].stock_num){
            goodsNum = cartData[index].stock_num
        }
        cartData[index].goods_num = goodsNum;
        this.setData({
            cartData: cartData
        });
        //修改数据库购物车的数量
        this.updateGoodsNum(cartData[index].goods_id, goodsNum);

        if (cartData[index].selected == 1) {
            this.goodsTotalPrice();
        }
    },

    ////修改数据库购物车的数量
    updateGoodsNum(goodsId, goodsNum) {
        var openid = app.globalData.openid;
        var token = app.globalData.userInfo.token;
        var url = app.globalData.http_url + 'Cart/updateGoodsNum';
        var params = { goodsId: goodsId, goodsNum: goodsNum, openid: openid, token: token };
        unit.wxRequest(url, params, data => {
        }, data => { }, data => { });
    },

    //选中状态
    selectBox: function (e) {
        var index = e.currentTarget.dataset.index;
        var cartData = this.data.cartData;
        if (cartData[index].selected == 1) {
            cartData[index].selected = 0
        } else {
            cartData[index].selected = 1
        }
        this.setData({
            cartData: cartData
        });
        // //修改数据表状态值
        this.updateSelected(cartData[index].id, cartData[index].selected);
        this.goodsTotalPrice();
        //判断是否全选
        this.iFselectAll()
    },

    //修改数据表状态值
    updateSelected: function (goodsId, selected) {
        var openid = app.globalData.openid
        var token = app.globalData.userInfo.token
        var url = app.globalData.http_url + 'Cart/updateSelected'
        var params = { goodsId: goodsId, selected: selected, openid: openid, token: token }
        unit.wxRequest(url, params, data => {
        }, data => { }, data => { })
    },

    //判断是否全选
    iFselectAll(){
        var cartData=this.data.cartData
        var check=true
        for(var i=0;i<cartData.length;i++){
            if(cartData[i].selected==0){
                check=false
            }
        }
        this.setData({
            checkAll:check
        })
    },

    //全选/反选
    checkAll: function () {
        var checkAll = !this.data.checkAll;
        var cartData = this.data.cartData;

        if (checkAll) {
            for (var i = 0; i < cartData.length; i++) {
                cartData[i].selected = 1;
            }
        } else {
            for (var i = 0; i < cartData.length; i++) {
                cartData[i].selected = 0;
            }
        }
        this.setData({
            cartData: cartData,
            checkAll: checkAll
        });
        this.updateCheckAll();
        this.goodsTotalPrice();
    },

    //修改数据表全选，反选
    updateCheckAll(){
        var checkAll = this.data.checkAll;
        var selected = 1;
        if (!checkAll) {
            selected = 0;
        }
        var openid = app.globalData.openid;
        var token = app.globalData.userInfo.token;
        var url = app.globalData.http_url + 'Cart/updateCheckAll';
        var params = { selected: selected, openid: openid, token: token };
        unit.wxRequest(url, params, data => {}, data => { }, data => { });
    },

    //计算商品总价
    goodsTotalPrice(){
        var cartData=this.data.cartData
        var goodsTotalPrice=0
        for(var i=0;i<cartData.length;i++){
            if( cartData[i].selected == 1 ){
                goodsTotalPrice += cartData[i].goods_num * cartData[i].shop_price
                
            }
        }
        this.setData({
            goodsTotalPrice: goodsTotalPrice
        })
    },

    // 购物车数据
    getCart(){
        var url = app.globalData.http_url+'Cart/cartList'
        var param={
            openid:app.globalData.openid,
            token: app.globalData.userInfo.token
        }
        unit.wxRequest(url, param, data => {
            if(data.status){
                this.setData({
                    cartData:data.data,
                    dataEmpty:false
                })
            }else{
                this.setData({
                    dataEmpty: true
                })
            }
            
        }, data => { }, data => { })
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