/**
 * API URL Dict api 字典
 */

interface UrlDict {
  [key: string]: {
    [key: string]: string
  }
}

const urlDict: UrlDict = {
  Basic: {
    loginApi: '/auth/getToken', // 登录
    sendSmsApi: '/auth/sendSms', // 发送验证码
    getAreaCodeApi: '/public/phone/areaCode', // 区号
    getIndexListApi: '/index/index/list', // 用户信息
    uploadFileApi: '/public/upload/file', // 上传文件
    destroyTokenApi: '/auth/destroyToken' //退出登录
  }
  // Test: {
  //   testListApi: 'testList' // 测试
  // }
}

const getUrl = (biz: string, UrlName: string): string => {
  try {
    const bizKeys = Object.keys(urlDict)
    if (bizKeys.indexOf(biz) < 0) {
      throw new Error('biz not in Dict')
    }
    let hostname = urlDict[biz][UrlName]
    if (!hostname) {
      throw new Error('url not in Dict')
    }
    if (hostname.substr(0, 1) === '/') {
      hostname = hostname.substr(1)
    }
    return hostname
  } catch (err) {
    console.error(err)
    return ''
  }
}

export default getUrl
