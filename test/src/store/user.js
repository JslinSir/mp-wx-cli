/*
 * @Date: 2020-05-07 20:01:34
 * @Description: 用户信息
 */
import { STORAGEKEYS } from '../store/constants'

class UserEntity {

  constructor() {
    this.isLogin = false;
    this.openid = null;
    this.wxCode = null;
    // 登录钥匙串
    this.token = null;
    // 用户头像
    this.avatar = null;
    // 手机号码
    this.phone = null;
    // 用户昵称
    this.nickname = null;
    this.needAuthUserInfo = true;  //是否需要访问用户信息
    this.needAuthPhone = true;     // 是否需要授权用户手机号
  }

  // 保存信息
 saveUserInfo = function () {
      wx.setStorageSync(STORAGEKEYS.USER_INFO, '');
    
  }

  // 读取信息
  readUserInfo = function () {
      const userInfo = JSON.parse(wx.getStorageSync(STORAGEKEYS.USER_INFO)||'{}')
      Object.assign(this,userInfo)
  
  }

  // 清理用户信息
  cleanUserInfo = function () {
    this.token = null;
    this.isLogin = false;
    this.avatar = null;
    this.phone = null;
    this.nickname = null;
    this.openid = null;
    this.wxCode = null;
    wx.clearStorage()
  }
}

module.exports = new UserEntity();