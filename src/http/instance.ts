import axios, { AxiosRequestConfig, Method } from 'axios'
import type { ILoadingInstance } from 'element-plus'
import { ElLoading } from 'element-plus'
import { getCookie } from '@/common/utils'
import { errorMap } from '@/common/constant'

// 定义接口
interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: Function
}

// 取消重复请求
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken
// axios 实例
const instance = axios.create({
  timeout: 10000,
  responseType: 'json'
})
let loadingInstance: ILoadingInstance

// 移除重复请求
const removePending = (config: AxiosRequestConfig, isReq?: boolean) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      list.data === config.data
    ) {
      // console.log(list)
      if (isReq) {
        // 执行取消操作
        if (import.meta.env.MODE === 'production') {
          list.cancel(`操作太频繁，请稍后再试!`)
        } else {
          list.cancel(`请求太频繁，请联系开发检查代码!!!`)
        }
      }
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    loadingInstance = ElLoading.service({
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.3)'
    })

    // console.log('request', request)
    removePending(request, true)
    request.cancelToken = new CancelToken((c) => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: JSON.stringify(request.data), // response.config.data返回的是JSON.stringify后的值
        cancel: (message: string) => {
          console.log('取消请求', message, request)
          return c(message)
        }
      })
    })
    // 请求拦截，拦截成功后在请求头中设定token
    request.headers.Authorization = getCookie('token')
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    loadingInstance.close()
    // console.log('response.config', response)
    removePending(response.config)

    return response
  },
  (error) => {
    loadingInstance.close()
    const response = error.response
    if (response) {
      const status = response.status
      // 根据返回的http状态码做不同的处理
      switch (status) {
        // case 401:
        //   // token失效
        //   break
        default:
          console.log('instance', errorMap[status], response)
          break
      }
    }

    // 超时重新请求
    const config = error.config
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message })
      }
      // 增加重试计数
      config.__retryCount++
      // 创造新的Promise来处理指数后退
      const backoff = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, RETRY_DELAY || 1)
      })
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config)
      })
    }
    return Promise.reject(response || { message: error.message })
  }
)

export default instance
