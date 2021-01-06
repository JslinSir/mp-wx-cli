/*
 * @Description: 系统配置信息
 */
import { ENV, HOST } from './env'
class Config {
    constructor() {
      // 版本号
      this.version = '1.0.0'
      
  
      // app环境
      this.appEnv = ENV

      //app 域名   
      this.appHost = HOST
      
  
      const { miniProgram: { appId } } = wx.getAccountInfoSync()
      this.appId = appId
      
      // release 标识
      this.release = 0
    
    }
  }
  
  module.exports = new Config()