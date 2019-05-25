//index.js
//获取应用实例 
const app = getApp()
// 
const unit=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   轮播图配置
    imgUrl:[],
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,

    //商品测试图片
    goodslist:[
        {
            thumb:"https://www.tongpankt.com/images/g1.png",
            title:'小姐姐',
            price:99,
            collect:0
        },
        {
            thumb: "https://www.tongpankt.com/images/g2.png",
            title: '小妹妹',
            price: "天价",
            collect: 0
        },
        {
            thumb: "https://www.tongpankt.com/images/g3.png",
            title: '女装大佬',
            price: "无价",
            collect: 0
        }
    ]

  },
  loadIndex:function(){
      var url = app.globalData.http_url+"banner/appbanner"
      var params={}
      unit.wxRequest(url,params,data=>{
          this.setData({
              imgUrl: data
          })
      },data=>{},data=>{})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadIndex()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.loadIndex()
    //   var that = this
    //   wx.request({
    //       url: 'http://127.0.0.1/legou/public/index.php/api/banner/appbanner',
    //       success(res) {
    //           console.log(res.data)
    //           that.setData({
    //               imgUrl:res.data
    //           })
    //       }
    //   })
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