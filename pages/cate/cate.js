// pages/cate/cate.js
const unit = require('../../utils/util.js');
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topCate:[],  //左侧顶级栏目
        
        curr:1,      //左侧默认选中项
        rightImg:'',  //默认右侧的图片
        rightName:'', //右侧默认名

        sonCate:[]     //右侧子栏目
    },

    // 左侧顶级栏目获取
    getLeft(){
        var url = app.globalData.http_url + "cate/appCate"
        var params={}
        unit.wxRequest(url, params, data => {
            this.setData({
                topCate:data
            })
        }, data => { }, data => { })
    },

    //右侧图片及左侧默认选中 
    getRight(pid){
        var url = app.globalData.http_url + "cate/get_one_cate"
        var params=pid
        unit.wxRequest(url, params, data => {
            this.setData({
                rightImg: data.thumb,
                curr: data.id,
                rightName: data.cate_name
            })
        }, data => { }, data => { })
    },

    //右侧子栏目获取 
    getRightSon(pid){
        var url = app.globalData.http_url + "cate/get_son_cate"
        var params = {
            pid:pid
        }
        unit.wxRequest(url, params, data => {
            this.setData({
                sonCate: data
            })
        }, data => { }, data => { })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getLeft()

        //右侧图片获取及左侧默认选中
        this.getRight()
        
        var pid=this.data.curr
        //右侧默认子栏目获取
        this.getRightSon(pid)
        // wx.request({
        //     url: 'http://localhost/legou/public/index.php/api/index/get_son_cate/pid/'+pid, 
        //     success(res) {
        //         that.setData({
        //             sonCate:res.data
        //         })
        //     }
        // })



    },

    //选中相应的顶级栏目改变相应的子栏目
    changId(e){
        var that=this
        var id=e.target.dataset.id
        that.setData({
            curr:id
        })

        //右侧图片获取及左侧默认选中
        this.getRight(id)
        // wx.request({
        //     url: 'http://localhost/legou/public/index.php/api/cate/get_one_cate/id/'+id,
        //     success(res) {
        //         that.setData({
        //             rightImg: res.data.thumb,
        //             curr: res.data.id,
        //             rightName: res.data.cate_name
        //         })
        //     }
        // })

        var pid = that.data.curr
        //右侧默认子栏目获取
        this.getRightSon(pid)
        // wx.request({
        //     url: 'http://localhost/legou/public/index.php/api/cate/get_son_cate/pid/' + pid,
        //     success(res) {
        //         that.setData({
        //             sonCate: res.data
        //         })
        //     }
        // })



    },
    cateList(e){
        var cid=e.currentTarget.dataset.cateId
        wx.navigateTo({
            url: '/pages/goodslist/goodslist?cid='+cid
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