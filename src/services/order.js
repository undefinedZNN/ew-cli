// import { stringify } from 'qs'
import callApi from './callApi'
const entrySrc = 'http://v.test.b.renliwo.com/entry/apicenter'
// const entrySrc = 'http://rm.test.renliwo.com/entry/apicenter'
export async function increaseOrderQuery(params) {
  // 'order.v1.orderQuery.increaseOrderQuery'
  let formData = {
    'order.v1.orderQuery.increaseOrderQuery': {
    // 'ucenter.v1.corporation.queryCorpBriefInfo': {
      appId: 'wowoohr_my_vendor',
      // appId: 'wowoohr_my_rm',
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
  // callApi
  // return request('/api/project/notice');
}

// order.v1.orderOperate.recruitOverOrder
export async function recruitOverOrder(params) {
  let formData = {
    'order.v1.orderOperate.recruitOverOrder': {
    // 'ucenter.v1.corporation.queryCorpBriefInfo': {
      appId: 'wowoohr_my_vendor',
      // appId: 'wowoohr_my_rm',
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}
