/**
 * @Desc: request
 * @Author: wu xingtao
 * @Date: 2023/12/22
 */
import axios from 'axios'
import { md5Http } from '../utils/common'
import { getToken } from '../utils/auth'

const timeout = 10000
const ERRORS = {
  'Network Error': '网络错误，请检查网络',
  [`timeout of ${timeout}ms exceeded`]: '请求超时，服务器未响应',
  'Internal Server Error': '请求服务器错误',
  'Request failed with status code 502': '请求服务器错误',
  api: '接口错误',
}

const pendingAjax = new Map()
const removePendingAjax = (config) => {
  if (!config.cancelDuplicated) return
  const key = config.headers.method

  if (key && pendingAjax.has(key)) {
    const cancel = pendingAjax.get(key)
    cancel(key)
    pendingAjax.delete(key)
  }
}

const addPendingAjax = (config) => {
  if (!config.cancelDuplicated) return
  const key = config.headers.method
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      // 如果pendingAjax中不存在当前请求，添加进去
      if (key && !pendingAjax.has(key)) {
        pendingAjax.set(key, cancel)
      }
    })
}

const service = axios.create({ timeout })

/** 请求拦截 */
service.interceptors.request.use(
  (config) => {
    removePendingAjax(config)
    addPendingAjax(config)
    // 统一追加headers
    // Object.assign(config.headers, {})
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/** 响应拦截 */
service.interceptors.response.use(
  (response) => {
    const { config, data } = response
    removePendingAjax(config)
    if (data.code === 0) {
      return data
    }

    data.msg = data.code == 60010 ? '请先登录您的手机号' : data.msg

    if (config.toast !== false) {
      // Toast(data.msg || '服务器异常，请稍后重试')
    }

    return Promise.reject({ ...data, message: data.msg })
  },
  (error) => {
    const msg = error.message
    if (msg && !axios.isCancel(error)) {
      error.message = ERRORS[msg] || msg || ERRORS.api
      // Toast(error.message)
    }
    return Promise.reject(error)
  }
)

/**
 * 开放平台接口请求
 * @param apiCode
 * @param data
 * @param options
 * @returns {Promise}
 */
export const http = (apiCode, data = {}, options = {}) => {
  const timestamp = Date.now()
  const token = getToken()
  const headers = {
    appkey: options.appkey || 55262,
    method: apiCode,
    format: 'JSON',
    timestamp,
    token,
    sign: md5Http(token, timestamp, data),
  }

  return service({
    ...options,
    url: `/router/rest?${apiCode}`,
    method: 'POST',
    data,
    headers,
  })
}
