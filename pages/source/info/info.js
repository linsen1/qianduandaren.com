// pages/source/info/info.js
var config = require('../../../config');
var util = require('../../../utils/util');
const app = getApp();
var self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    type:'',
    bigImgUrl:'',
    onelineUrl:'',
    downURLBaidu:'',
    downUrlTX:'',
    about:'',
    content:'',
    created_at:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self=this;
    getinfo(options.id);
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
    util.JumpRegUser();
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
  copyonline:function(){
    wx.setClipboardData({
      data: self.data['onelineUrl'],
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showModal({
              title: '提示',
              content: '复制成功,别忘记打开浏览器进行体验哟',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  console.log('确定')
                } else if (res.cancel) {
                  console.log('取消')
                }
              }
            })
          }
        })
      }
    })
  },
  copydown: function () {
    wx.setClipboardData({
      data: self.data['downUrlTX'],
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showModal({
              title: '提示',
              content: '复制成功,别忘记打开浏览器下载哟',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('确定')
                } else if (res.cancel) {
                  console.log('取消')
                }
              }
            })
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: self.data['title'],
      success: function (res) {

        // 转发成功
      },
      fail: function (res) {
        console.log('失败');
        // 转发失败
      }
    }
  
  }
})
function getinfo(id){
  wx.request({
    url: config.service.getResourceInfo+'/'+id, //仅为示例，并非真实的接口地址
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      self.setData({
        title: res.data.title,
        type: res.data.type,
        bigImgUrl: res.data.bigImgUrl,
        onelineUrl: res.data.onelineUrl,
        downURLBaidu: res.data.downURLBaidu,
        downUrlTX: res.data.downUrlTX,
        about: res.data.about,
        content: res.data.conetent,
        created_at: res.data.created_at,
        type: getClassName(res.data.type)
      });
      wx.setNavigationBarTitle({
        title: res.data.title
      });
    }
  })}
  function getClassName(type){
    if(type==0){
      return '电子书';
    }
    else if(type==1){
      return '源码';
    }
    else{
      return '课程';
    }
  }