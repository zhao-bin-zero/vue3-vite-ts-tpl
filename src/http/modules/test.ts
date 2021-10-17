// import http from '../abstract'
// import { CustomResponse, ListPageGetParams } from '../types'

// /** 测试相关接口 */
// /**
//  * @desc 列表
//  * @param {page	页数，默认 1}
//  * @param {page_size	页数，默认 10}
//  */
// 传送数据
// declare interface TestGetParams extends ListPageGetParams {
//
// }
// 接收数据中data的类型
// declare interface TestListData {
//   list: []
// }
// export const getTestList = (params: TestGetParams): Promise<CustomResponse<TestListData>> =>
//   http.get({ url: `Test.testListApi`, params })
