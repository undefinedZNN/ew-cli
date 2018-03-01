// import { stringify } from 'qs'
import callApi from './callApi'
// const entrySrc = 'http://v.test.b.renliwo.com/entry/apicenter'
const entrySrc = 'http://v.test.renliwo.com/entry/apicenter'
const appId = 'wowoohr_my_vendor'

/**
 * 获取增员订单列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function increaseOrderQuery(params) {
  let formData = {
    'order.v1.orderQuery.increaseOrderQuery': {
      appId,
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
      appId,
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
      appId,
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
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

// {"order.v1.orderQuery.moreScreening":{"screenType":"1","appId":"wowoohr_my_vendor","token":"ExdSf7V716SQDgaTbzVABx","userId":"2260fb99cfb9fd8d","sign":"5742174e86e50cb525942f5c43cd48be382097b7"}}
export async function moreScreening(params) {
  let formData = {
    'order.v1.orderQuery.moreScreening': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 文件下载列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getFileDownloadList(params) {
  let formData = {
    'order.download.getFileDownloadList': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 添加文件下载
 * @param {[type]} params [description]
 */
export async function addOrderDownload(params) {
  let formData = {
    'order.download.addOrderDownload': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取订单详情信息
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getOrderDetailInfo(params) {
  let formData = {
    'order.v1.orderQuery.getOrderDetailInfo': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取减员订单列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getReduceOrder(params) {
  let formData = {
    'order.v1.orderQuery.getReduceOrder': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 减员操作
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function reduceComplete(params) {
  let formData = {
    'order.v1.orderOperate.reduceComplete': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取待取消订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function waitCancelOrderQuery(params) {
  let formData = {
    'order.v1.orderQuery.waitCancelOrderQuery': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取所哟订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getVAllOrderList(params) {
  let formData = {
    'order.v1.orderQuery.getVAllOrderList': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取失败订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getFailedOrderList(params) {
  let formData = {
    'order.v1.orderQuery.getFailedOrderList': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}
