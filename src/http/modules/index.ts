import http from '../abstract'
import { CustomResponse } from '../types'

/** 共用接口 */
/**
 * @desc 登录
 * @param {手机号}
 * @param {验证码}
 */
// 传送数据
export interface LoginPostParams {
  phone: string
  sms_code: string
}
// 接收数据中data的类型
interface LoginResType {
  token: string
}
export const login = (params: LoginPostParams): Promise<CustomResponse<LoginResType>> =>
  http.post({ url: `Basic.loginApi`, params })

/**
 * @desc 登录短信
 * @param {手机号}
 */
interface SendSmsPostParams {
  phone: string
}
export const sendSms = (params: SendSmsPostParams) => http.post({ url: `Basic.sendSmsApi`, params })

/**
 * @desc 手机区号列表
 */
export const getAreaCode = () => http.get({ url: `Basic.getAreaCodeApi` })

/**
 * @desc 首页信息
 */
export const getUserInfo = () => http.get({ url: `Basic.getUserInfoApi` })

/**
 * @desc 文件上传
 */
export const uploadFile = (params: FormData) =>
  http.post({ url: `Basic.uploadFileApi`, params, timeout: 500000, headers: { 'content-type': 'multipart/form-data' } })

/**
 * @desc 退出登录
 */
export const destroyToken = () => http.post({ url: `Basic.destroyTokenApi` })
