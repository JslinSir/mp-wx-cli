/*
 * @Date: 2020-05-07 18:34:11
 * @Description: 基于 wx.request 的promise 封装
 */

import { appHost, version, appId } from '../configs/index'
import network from "../utils/network"
import userEntry from '../store/user'

// 公用header参数
const commonHeaders = function () {
    const headers = new Object();
    // 系统信息
    headers['Content-Type'] = 'application/json';
    headers['app-id'] = appId;
    headers['app-version'] = version;
    headers['client-name'] = 'mini-program';
    // 用户信息
    if (userEntry.token) {
        headers['x-http-token'] = userEntry.token;
    }
    return headers;
}


const request = param => {
    let { url, data = {}, headers, timeout, method, } = param || {}
    return new Promise((resolve, reject) => {
        method =  method || request.defaultParameters.method
        method = method.toUpperCase()
        timeout = timeout || request.defaultParameters.timeout
        headers = { ...request.defaultParameters.headers, ...headers }
        network.getNetworkType() !== 0 ?
            wx.request({
                url: `${appHost}/${url}`,
                data,
                method,
                header: headers,
                success(res) {
                    resolve(res)
                },
                fail(e) {
                    if(e.errMsg === 'request:fail timeout'){
                        wx.showToast({
                            title: '请求超时',
                            icon: 'none',
                            duration: 2000,
                        })
                    }
                    reject(e)
                },
            })
            :
            wx.showToast({
                title: '加载失败，请先打开网络',
                icon: 'none',
                duration: 2000,
                complete:() => reject('network none')
            })
        
    })
}

// 默认的请求参数 
request.defaultParameters = {
    url: appHost,
    data: {},
    header: commonHeaders(),
    timeout: 50*1000,
    method: 'GET',
}


export const get = (url, data, options) => request({ url, data, method: 'GET', ...options })
export const post = (url, data, options) => request({ url, data, method: 'POST', ...options })

 
export default {get,post}