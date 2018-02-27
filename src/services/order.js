// import { stringify } from 'qs'
import callApi from './callApi'
const entrySrc = 'http://v.test.b.renliwo.com/entry/apicenter'
// const entrySrc = 'http://rm.test.renliwo.com/entry/apicenter'

/**
 * 获取增员订单列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function increaseOrderQuery(params) {
  let formData = {
    'order.v1.orderQuery.increaseOrderQuery': {
      appId: 'wowoohr_my_vendor',
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 批量增员
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function recruitOverOrder(params) {
  let formData = {
    'order.v1.orderOperate.recruitOverOrder': {
      appId: 'wowoohr_my_vendor',
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取订单失败原因
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function failReason(params) {
  let formData = {
    'order.v1.order.apply.failReason': {
      appId: 'wowoohr_my_vendor',
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 申报失败订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function confirmFail(params) {
  let formData = {
    'order.v1.order.apply.confirmFail': {
      appId: 'wowoohr_my_vendor',
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}
// {"order.v1.order.apply.confirmFail":{"id":"897240fb26ad8dea","failReason":"A1","appId":"wowoohr_my_vendor","token":"C2DjSSR9Sq9JGpbevzopNg","userId":"2260fb99cfb9fd8d","sign":"fba1154aee7f085718cffbe8432a3757e2f6c23e"}}
