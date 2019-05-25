const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*
// 封装请求，参数分别为
// url: 请求的地址
// params：请求的参数
// successCallback: 请求成功返回的函数
// errorCallback: 请求失败返回的函数
// complaceCallback: 无论请求成功或失败返回的函数
*/
const wxRequest = (url,params,successCallback,errorCallback,completeCallback) =>{
    wx.request({
        url: url, // 仅为示例，并非真实的接口地址
        data: params,
        header: {
            'content-type': 'application/json' // 默认值
        },
        method:"POST",
        success(res) {
            if(res.statusCode==200){
                successCallback(res.data)
            }else{
                errorCallback(res)
            }
        },
        fail(res) {
            errorCallback(res)
        },
        complete(res) {
            completeCallback(res)
        }
    })
}

 // 方法的传递，使其在外边可以使用
module.exports = {
  formatTime: formatTime,
  wxRequest:wxRequest
}
