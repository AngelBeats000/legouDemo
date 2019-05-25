// pages/welcome/welcome.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        time:5
    },
    
    // count_down(that){
    //     var a=this.data
    //     if( a.time<= 0) {
    //         wx.reLaunch({
    //             url: '/pages/index/index'
    //         })
    //         that.setData({
    //             time: -1
    //         })  
    //         return
    //     }
    //     setTimeout(function () {
    //         that.setData({
    //             time:a.time--
    //         }) 
    //         count_down()
    //     }, 1000)
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // count_down(this)
        setTimeout(function () {
            wx.switchTab({
                url: '../index/index',
            })
        }, 1000)
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