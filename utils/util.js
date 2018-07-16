var config = require('../config');

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

//注册用户公共函数
const regUser = function (userInfo){
  wx.request({
    url: config.service.RegUser,
    method: 'POST',
    data: {
      openId: wx.getStorageSync('openid'),
      nickName: userInfo.nickName,
      gender: userInfo.gender,
      language: userInfo.language,
      city: userInfo.city,
      province: userInfo.province,
      country: userInfo.country,
      avatarUrl: userInfo.avatarUrl
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      wx.setStorageSync('userInfo', userInfo);
      console.log("用户授权后更新详细用户信息：" + res.data)
    }
})}

const JumpRegUser=function(){
  wx.request({
    url: config.service.checkUser + wx.getStorageSync('openid'),
    method: 'POST',
    success: function (res2) {
      if (res2.data == 1) {
        console.log('已获取授权信息');
      }
      else {
        console.log('跳转页面');
        wx.reLaunch({
          url: '/pages/common/login/login'
        })
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  regUser:regUser,
  JumpRegUser: JumpRegUser
}
