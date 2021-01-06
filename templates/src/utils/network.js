/*
 * @Date: 2020-05-07 19:16:35
 * @Description: 监听网络状态
 */
// 各种网络类型, wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
const NetworkTypeNone = 0
const NetworkTypeUnknow = 1
const NetworkTypeWifi = 2
const NetworkType4G = 3
const NetworkType3G = 4
const NetworkType2G = 5

const NetworkTypeMappings = {
  none: NetworkTypeNone,
  unknown: NetworkTypeUnknow,
  wifi: NetworkTypeWifi,
  '4g': NetworkType4G,
  '3g': NetworkType3G,
  '2g': NetworkType2G
}

// 当前网络状态
let currentNetworkType

const getNetworkType = () => {
  return currentNetworkType
}

const setNetworkType = type => {
  currentNetworkType = type
}

const update = networkType => {
  const type = NetworkTypeMappings[networkType]

  setNetworkType(type)
}

// 监听网络状态
const startListener = function () {
  wx.getNetworkType({
    success: function (res) {
      update(res.networkType)
    }
  })
  wx.onNetworkStatusChange(({ networkType }) => update(networkType))
}
// 获取网络状态，无网络 返回 false 否则返回true
const getNetworkStatus = networkType => networkType === 'none' || networkType === 'unknown' ? false:true

module.exports = {
  NetworkTypeNone,
  NetworkTypeUnknow,
  NetworkTypeWifi,
  NetworkType4G,
  NetworkType3G,
  NetworkType2G,
  getNetworkType,
  startListener,
  getNetworkStatus,
}