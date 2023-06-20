// pages/profile/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 页面加载判断全局用户存不存在, 存在则表示登入状态还在
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    onGetPhoneNumber: function (event) {
        console.log(event, 'event');
        if (event.detail.errMsg === 'getPhoneNumber:fail user deny') {
          // 用户拒绝授权手机号码
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'none',
            duration: 2000
          });
        } else {
          // 用户同意授权手机号码
          var encryptedData = event.detail.encryptedData;
          var iv = event.detail.iv;
    
          // 将 encryptedData 和 iv 发送给后端服务器进行解密获取用户手机号码
          // 后续操作...
        }
      },
    login() {
        wx.getUserProfile({
            desc: '获取用户信息',
            success: res => {
                var user = res.userInfo
                //设置全局用户信息
                app.globalData.userInfo = user
                //设置局部用户信息
                this.setData({
                    userInfo: user
                })

                //检查之前是否已经授权登录
                wx.cloud.database().collection('user').where({
                    _openid: app.globalData.user_openid
                }).get({
                    success: res => {
                        //原先没有添加，这里添加
                        if (!res.data[0]) {
                            //将数据添加到数据库
                            wx.cloud.database().collection('user').add({
                                data: {
                                    avatarUrl: user.avatarUrl,
                                    nickName: user.nickName
                                },
                                success: res => {
                                    wx.showToast({
                                        title: '登录成功',
                                        icon: 'none'
                                    })
                                }
                            })
                        } else {
                            //已经添加过了
                            this.setData({
                                userInfo: res.data[0]
                            })
                        }
                    }
                })
            }
        })
    },
    logout() {
        app.globalData.userInfo = null;
        this.setData({
            userInfo: ''
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})