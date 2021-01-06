## mp-wx-cli

### 如何使用
```
  npm install mp-wx-cli -g

  or

  yarn global add mp-wx-cli

  mp-wx-cli init 

```

### 模板介绍


#### 基础架构
 *工程目录*
 ```
|- app.js  工程入口
|- app.json  小程序原生配置
|- app.wxss  部分公共样式 
|- doc 项目相关文档 
|- src 工程主文件入口
|- src/asserts 资源目录  
|- src/components 公用组件存放目录  
|- src/config  环境配置 域名配置
|- src/lib 项目插件类
|- src/pages 页面路径
|- src/pages/xxx/components  适配当期页面组件
|- src/pages/xxx/service  适配当期页面服务，api存放  request 请求
|- src/service/commonApi  公共的一些api存放
|- src/store     小程序缓存等
|- src/utils     工程工具类  
|- src/entry     程序入口，一些配置，监听，缓存读取，等工程初始操作在此完成  
```
#### 网络请求的封装
*基于 wx.request 的promise 封装* (包括，超时，网络异常处理)
具体可参考 request.js
用法：
```
  request.post(TEST_API,params) //返回一个promise
```

### 状态管理


### 适配
 尺寸：统一rpx ,
 机型：关于机型的适配可以做成一个安全区组件  文章参考 https://blog.csdn.net/sinat_24946363/article/details/105181622

 


