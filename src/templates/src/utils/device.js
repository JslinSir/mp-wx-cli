/*
 * @Date: 2020-05-07 19:27:08
 * @Description: 系统设备信息
 */


class Device {

    constructor() {
  
      /// 设备型号
      this.model = null;
  
      /// 设备像素比
      this.pixelRatio = null;
  
      /// 屏幕大小
      this.screenWidth = null;
      this.screenHeight = null;
  
      /// 可使用窗体大小
      this.windowWidth = null;
      this.windowHeight = null;
  
      /// 操作系统版本
      this.system = null;
  
      /// 微信设置的语言
      this.language = null;
  
      /// 微信版本号
      this.version = null;
  
      /// 客户端基础库版本
      this.SDKVersion = null;
  
      /// 手机品牌
      this.brand = null;
  
      /// 手机电量
      this.batteryLevel = null;
  
      /// 状态栏高度
      this.statusBarHeight = null;
  
      /// 客户端平台
      this.platform = null;
  
      /// 当前运行环境（wx表示在微信端，wxwork表示在企业微信端）
      this.environment = null;
  
      
      /// 底部预留高度（兼容iPhone X）
      this.remainHeight = 0;
    }
  
    // 初始化
    initialize() {
      const res = wx.getSystemInfoSync();
  
      const propertyList = Object.keys(this);
      for (const property of propertyList) {
        const tempData = res[property];
        if (typeof tempData !== 'undefined') {
          this[property] = tempData;
        }
      }
  
      if (typeof res.environment === 'undefined' || res.environment == null) {
        if (wx.qy != null) {
          this.environment = 'wxwork';
        } else {
          this.environment = 'wx';
        }
      }
      
      // 适配iPhone X系列
      if (this.model.indexOf('iPhone X') >= 0) {
        this.remainHeight = 34.0;
      } else if (res.platform === 'ios' && res.safeArea != null && typeof res.safeArea === 'object') {
        this.remainHeight = Math.max(res.screenHeight - res.safeArea.bottom, 0);
      }
    }
  
  
  
  
  }
  
  module.exports = new Device();