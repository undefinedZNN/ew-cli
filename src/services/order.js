// import { stringify } from 'qs'
import callApi from './callApi'
const entrySrc = 'http://v.test.b.renliwo.com/entry/apicenter'

export async function increaseOrderQuery(params) {
  let formData = {
    'order.v1.orderQuery.increaseOrderQuery': {
      appId: 'wowoohr_my_vendor',
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
  // callApi
  // return request('/api/project/notice');
}
