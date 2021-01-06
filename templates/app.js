/*
 * @Description: 工程入口
 */
import './src/utils/request'
import { entryInit } from './src/entry'
App({
  onLaunch: function () {
    
    entryInit()
  },

  onShow: function (options) {
    console.log(`场景值options:${JSON.stringify(options)}`);
    
  
  },

  globalData: {
    userInfo: null
  }
})