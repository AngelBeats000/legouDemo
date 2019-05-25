//app.js

// 
const unit = require('./utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
   
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
              var that=this
              // 发起网络请求
              wx.request({
                  url: 'https://api.weixin.qq.com/sns/jscode2session',
                  data: {
                      appid:'wxb52f0033973b4443',
                      secret:'3dfeedf009a7527774ee1971a1a57f50',
                      grant_type:'authorization_code',
                      js_code: res.code
                  },
                  success(response){
                      console.log(response)
                      if(response.data.openid != null && response.data.openid != undefined){
                          that.globalData.openid=response.data.openid
                          that.getUser()
                      }
                  },
                  fail(error){
                      console.log(error)
                  }
              })
          } else {
              console.log('登录失败！' + res.errMsg)
          } 
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

// 登录
getUser(){
    wx.login({
        success:res=>{
            if (res.code) { 
                var url = this.globalData.http_url + "User/get_user"
                var params = {
                    code: res.code,
                    openid: this.globalData.openid
                }
                unit.wxRequest(url, params, data => {
                    if(data.status==200){
                        this.globalData.userInfo=data.data
                        this.globalData.login=true
                    }else if(data.status==400){
                        this.register()
                    }else{
                        this.globalData.login=false
                        wx.showToast({
                            title: data.msg,
                            icon:'none',
                            duration:2000
                        })
                    }
                }, data => { }, data => { })
            } else {
                console.log('error')
            }
        }
    })
},

// 注册
register(){
    var url = this.globalData.http_url + "User/register"
    var params = {
        openid:this.globalData.openid
    }
    unit.wxRequest(url, params, data => {
        
    }, data => { }, data => { })
},
  
  globalData: {
    userInfo: null,
    http_url: "http://localhost/legou/public/index.php/api/",
    openid:'',
    login:false,
    cartIds:'',
    goodsTotalPrice:''
  }
})