

/**
 * 异步延迟函数
 *
 * @export
 * @param {*} timeout
 * @returns {Promise}
 */
export const delay = timeout =>
  new Promise(resolve => {
    setTimeout(resolve, timeout)
  })

export const sleep = delay


/**
 * 为Promise包装一个cancel方法，让其变得可取消
 * @param {Promise} promise
 * @returns {Promise}
 */
export const makeCancelablePromise = promise => {
  let rejectFn

  const wrappedPromise = new Promise((resolve, reject) => {
    rejectFn = reject

    Promise.resolve(promise)
      .then(resolve)
      .catch(reject)
  })

  wrappedPromise.cancel = () => {
    promise.__canceled = true
    rejectFn({ canceled: true })
  }

  return wrappedPromise
}

/**
 * 生成不重复的唯一ID字符串
 * @param {string} prefix 可选的前缀
 * @returns {string}
 */
export const generateUnid = (prefix = '') => {
  return `${prefix}${(
    Math.random()
      .toString(13)
      .split('.')[1] || ''
  ).slice(0, 8)}${(uniqueIdIndex += 1)}`
}

/**
 * 判断空数组
 * @param {Array} array 需要判断的数组
 * @returns {boolean}
 */

export const emptyArray = array => {
  let empty = false
  if (!(array instanceof Array)) {
    array = []
  }
  empty = array.length === 0
  return empty
}

/**
 * 判断空对象
 * @param {Object} object 需要判断的对象
 * @returns {boolean}
 */
export const emptyObject = object => {
  let empty = false
  if (!(object instanceof Object)) {
    object = {}
  }
  empty = Object.keys(object).length === 0
  return empty
}

/**
 * 判断空字符串
 * @param {String} string 需要判断的字符串
 * @returns {boolean}
 */
export const emptyString = string => {
  let empty = false
  if (!(typeof string === 'string')) {
    string = ''
  }
  if (typeof string === 'undefined' || string == null || string === '') {
    empty = true
  }

  return empty
}

export const isEmptyValue = value => {
  return typeof value === 'undefined' || value == null || value === ''
}


/**
 * 生成UUID随机数
 *
 * @export  生成UUID随机数
 * @returns string
 */
export function genUUID() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01

  // eslint-disable-next-line
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

/**
 * 剔除对象value前后空格
 * @param {Object} object 需要处理的对象
 * @returns {Object}
 */
export const trimObject = object => {
  const params = {}
  if (emptyObject(object) === false) {
    // 非空对象
    Object.entries(object).map(item => {
      const [key, value] = item
      let newValue = value
      if (Object.prototype.toString.call(value) === '[object String]') {
        newValue = value.trim()
      }
      Object.assign(params, { [key]: newValue })
    })
  }
  return params
}